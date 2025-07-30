import { LoanRecord } from '../types';

export const parseCSV = (csvContent: string): LoanRecord[] => {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const record: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index];
      
      // Convert numeric fields
      if (['ApplicantIncome', 'CoapplicantIncome', 'LoanAmount', 'Loan_Amount_Term', 'Credit_History'].includes(header)) {
        record[header] = value ? parseFloat(value) : 0;
      } else {
        record[header] = value || '';
      }
    });
    
    return record as LoanRecord;
  });
};

export const sampleLoanData: LoanRecord[] = [
  {
    Loan_ID: 'LP001001',
    Gender: 'Male',
    Married: 'No',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: 5849,
    CoapplicantIncome: 0,
    LoanAmount: 128,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 'Urban',
    Loan_Status: 'Y'
  },
  {
    Loan_ID: 'LP001002',
    Gender: 'Male',
    Married: 'Yes',
    Dependents: '1',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: 4583,
    CoapplicantIncome: 1508,
    LoanAmount: 128,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 'Rural',
    Loan_Status: 'N'
  },
  {
    Loan_ID: 'LP001003',
    Gender: 'Male',
    Married: 'Yes',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'Yes',
    ApplicantIncome: 3000,
    CoapplicantIncome: 0,
    LoanAmount: 66,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 'Urban',
    Loan_Status: 'Y'
  },
  {
    Loan_ID: 'LP001004',
    Gender: 'Male',
    Married: 'Yes',
    Dependents: '0',
    Education: 'Not Graduate',
    Self_Employed: 'No',
    ApplicantIncome: 2583,
    CoapplicantIncome: 2358,
    LoanAmount: 120,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 'Urban',
    Loan_Status: 'Y'
  },
  {
    Loan_ID: 'LP001005',
    Gender: 'Male',
    Married: 'No',
    Dependents: '0',
    Education: 'Graduate',
    Self_Employed: 'No',
    ApplicantIncome: 6000,
    CoapplicantIncome: 0,
    LoanAmount: 141,
    Loan_Amount_Term: 360,
    Credit_History: 1,
    Property_Area: 'Urban',
    Loan_Status: 'Y'
  }
];
