# RAG Q&A Chatbot with Document Retrieval

A sophisticated Retrieval-Augmented Generation (RAG) chatbot that combines document retrieval with generative AI to provide intelligent responses about loan approval data. Built with React, TypeScript, and Google's Gemini AI.

## 🚀 Features

### Core Functionality
- **Intelligent Document Retrieval**: Advanced vector-based search using TF-IDF and cosine similarity
- **AI-Powered Responses**: Integration with Google Gemini AI for natural language generation
- **Real-time Chat Interface**: Interactive chat with message history and typing indicators
- **CSV Data Upload**: Support for custom loan datasets via CSV file upload
- **Context-Aware Answers**: Responses backed by relevant document retrieval with source citations

### Data Analysis & Insights
- **Statistical Dashboard**: Comprehensive data insights with visual representations
- **AI-Generated Analysis**: Automated trend analysis and pattern recognition
- **Interactive Visualizations**: Progress bars, metric cards, and distribution charts
- **Real-time Statistics**: Dynamic updates based on uploaded data

### User Experience
- **Modern UI/UX**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme Support**: Adaptive color schemes for better accessibility
- **Smooth Animations**: Micro-interactions and hover effects for enhanced engagement

## 🎯 Use Cases

### Financial Analysis
- **Loan Approval Prediction**: Analyze factors that influence loan approval decisions
- **Risk Assessment**: Identify patterns in rejected vs approved applications
- **Income Analysis**: Understand income distribution and its impact on loan outcomes
- **Demographic Insights**: Explore how gender, education, and marital status affect approvals

### Business Intelligence
- **Portfolio Analysis**: Analyze loan portfolio performance and trends
- **Customer Segmentation**: Identify different customer segments and their characteristics
- **Operational Insights**: Understand processing patterns and approval rates
- **Compliance Reporting**: Generate insights for regulatory compliance

### Research & Education
- **Academic Research**: Study loan approval patterns for research purposes
- **Student Projects**: Perfect for machine learning and data science coursework
- **Training Data**: Use as a foundation for building ML models
- **Case Studies**: Real-world example of RAG implementation


## Screenshots:
<img width="1315" height="880" alt="image" src="https://github.com/user-attachments/assets/4e5fdb11-7226-4257-8fd2-0ac9e03ab5f2" />

<img width="984" height="800" alt="image" src="https://github.com/user-attachments/assets/89f08aa4-2f29-4e6b-a34d-00c7778f7a4c" />

<img width="977" height="853" alt="image" src="https://github.com/user-attachments/assets/6e4d50ca-744f-4258-ad66-f5d948aac919" />

## Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons

### AI & Machine Learning
- **Google Gemini AI** - Advanced language model for response generation
- **Custom Vector Store** - TF-IDF based document vectorization
- **Cosine Similarity** - Document relevance scoring algorithm
- **RAG Architecture** - Retrieval-Augmented Generation implementation

### Data Processing
- **CSV Parser** - Custom CSV processing with type inference
- **Document Indexing** - Efficient document storage and retrieval
- **Statistical Analysis** - Real-time data aggregation and insights
- **Vector Search** - Semantic similarity search implementation

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic CSS vendor prefixing
- **TypeScript Compiler** - Static type checking

## 📊 Dataset

The application uses the **Loan Approval Prediction Dataset** from Kaggle, which includes:

- **Loan_ID**: Unique identifier for each loan application
- **Gender**: Applicant's gender (Male/Female)
- **Married**: Marital status (Yes/No)
- **Dependents**: Number of dependents (0, 1, 2, 3+)
- **Education**: Education level (Graduate/Not Graduate)
- **Self_Employed**: Employment type (Yes/No)
- **ApplicantIncome**: Primary applicant's income
- **CoapplicantIncome**: Co-applicant's income
- **LoanAmount**: Requested loan amount
- **Loan_Amount_Term**: Loan term in months
- **Credit_History**: Credit history (1: Good, 0: Poor)
- **Property_Area**: Property location (Urban/Semiurban/Rural)
- **Loan_Status**: Approval status (Y: Approved, N: Rejected)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/rag-qa-chatbot.git
   cd rag-qa-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Update the `GEMINI_API_KEY` in `src/services/geminiApi.ts`
   - Or create a `.env` file (recommended for production):
     ```env
     VITE_GEMINI_API_KEY=your_api_key_here
     ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
npm run preview
```

## 📱 Usage

### Basic Chat
1. Start by asking questions about loan data
2. Use suggested questions or type your own
3. View AI responses with source citations
4. Explore the insights dashboard for data analysis

### Custom Data Upload
1. Click the file upload icon in the chat header
2. Select a CSV file with loan data
3. Wait for processing confirmation
4. Ask questions about your custom dataset

### Example Questions
- "What factors influence loan approval?"
- "Show me statistics about approved vs rejected loans"
- "What is the average income of approved applicants?"
- "How does education level affect loan approval?"
- "What are the trends in loan amounts?"

## 🔧 Configuration

### API Configuration
The application uses Google Gemini AI with the following configuration:
- **Model**: `gemini-1.5-flash-latest` (free tier)
- **Temperature**: 0.7 (balanced creativity)
- **Max Output Tokens**: 2048
- **Top K**: 40
- **Top P**: 0.95

### Vector Store Settings
- **Vector Dimension**: 100
- **Similarity Threshold**: Cosine similarity
- **Top K Results**: 5 (configurable)
- **Indexing Method**: TF-IDF with hash-based vectorization


## Acknowledgments

- **Kaggle** for providing the loan approval dataset
- **Google** for the Gemini AI API
- **React Team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework


## Future Enhancements

- [ ] Multi-language support
- [ ] Advanced filtering and search options
- [ ] Export functionality for insights
- [ ] Integration with other AI models
- [ ] Real-time collaboration features
- [ ] Advanced visualization charts
- [ ] Mobile app version
- [ ] API endpoint for external integration
