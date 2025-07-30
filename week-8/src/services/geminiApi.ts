import { SearchResult } from '../types';

const GEMINI_API_KEY = 'ENTER YOUR API KEY';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export class GeminiService {
  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      console.log('Making API request to Gemini...');
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data: GeminiResponse = await response.json();
      console.log('API Response received:', data);
      
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No response generated');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
      } else {
        throw new Error('Failed to generate response. Please try again.');
      }
    }
  }

  public async generateResponse(query: string, searchResults: SearchResult[]): Promise<string> {
    const context = this.buildContext(searchResults);
    
    const prompt = `
You are an intelligent loan approval assistant with access to a loan dataset. Based on the user's question and the relevant loan records provided below, generate a helpful, accurate, and informative response.

User Question: "${query}"

Relevant Loan Records:
${context}

Instructions:
- Provide a comprehensive answer based on the loan data
- Include specific statistics, trends, or patterns when relevant
- If the question is about loan approval factors, explain what influences approval/rejection
- Use clear, professional language
- If asked about specific loan cases, reference the Loan IDs
- Provide actionable insights when possible

Generate a helpful response:`;

    return await this.callGeminiAPI(prompt);
  }

  private buildContext(searchResults: SearchResult[]): string {
    return searchResults.map((result, index) => {
      const record = result.record;
      return `
Record ${index + 1} (Similarity: ${(result.score * 100).toFixed(1)}%):
- Loan ID: ${record.Loan_ID}
- Gender: ${record.Gender}, Married: ${record.Married}, Dependents: ${record.Dependents}
- Education: ${record.Education}, Self Employed: ${record.Self_Employed}
- Applicant Income: $${record.ApplicantIncome.toLocaleString()}
- Coapplicant Income: $${record.CoapplicantIncome.toLocaleString()}
- Loan Amount: $${record.LoanAmount.toLocaleString()}
- Loan Term: ${record.Loan_Amount_Term} months
- Credit History: ${record.Credit_History === 1 ? 'Good' : 'Poor'}
- Property Area: ${record.Property_Area}
- Loan Status: ${record.Loan_Status === 'Y' ? 'APPROVED' : 'REJECTED'}
      `;
    }).join('\n');
  }

  public async generateDataInsights(statistics: Record<string, any>): Promise<string> {
    const prompt = `
Based on the following loan dataset statistics, provide key insights and trends:

Dataset Statistics:
- Total Records: ${statistics.totalRecords}
- Approved Loans: ${statistics.approvedLoans}
- Rejected Loans: ${statistics.rejectedLoans}
- Approval Rate: ${((statistics.approvedLoans / statistics.totalRecords) * 100).toFixed(1)}%
- Average Applicant Income: $${statistics.averageIncome.toLocaleString()}
- Average Loan Amount: $${statistics.averageLoanAmount.toLocaleString()}
- Gender Distribution: ${statistics.genderDistribution.Male} Male, ${statistics.genderDistribution.Female} Female
- Education Distribution: ${statistics.educationDistribution.Graduate} Graduate, ${statistics.educationDistribution['Not Graduate']} Not Graduate

Provide 3-4 key insights about loan approval patterns, trends, and factors that influence approval decisions.
`;

    return await this.callGeminiAPI(prompt);
  }
}
