import React, { useState, useEffect } from 'react';
import { ChatInterface } from './components/ChatInterface';
import { DataInsights } from './components/DataInsights';
import { DocumentRetriever } from './utils/documentRetrieval';
import { GeminiService } from './services/geminiApi';
import { parseCSV, sampleLoanData } from './utils/csvParser';
import { ChatMessage, LoanRecord } from './types';
import { Database, MessageSquare, BarChart3, AlertTriangle } from 'lucide-react';

function App() {
  const [documents, setDocuments] = useState<LoanRecord[]>(sampleLoanData);
  const [retriever, setRetriever] = useState<DocumentRetriever>(new DocumentRetriever(sampleLoanData));
  const [geminiService] = useState(new GeminiService());
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'chat' | 'insights'>('chat');
  const [insights, setInsights] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize with sample data insights
    loadInsights();
  }, []);

  const loadInsights = async () => {
    try {
      const statistics = retriever.getStatistics();
      const generatedInsights = await geminiService.generateDataInsights(statistics);
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Failed to load insights:', error);
    }
  };

  const handleSendMessage = async (messageContent: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError('');

    try {
      // Retrieve relevant documents
      const searchResults = retriever.searchDocuments(messageContent, 5);
      
      // Generate AI response
      const aiResponse = await geminiService.generateResponse(messageContent, searchResults);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
        sources: searchResults.map(result => result.record.Loan_ID)
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      setError('Failed to generate response. Please check your API key and try again.');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I encountered an error while processing your request. Please try again or check if the API key is valid.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const csvContent = await file.text();
      const parsedData = parseCSV(csvContent);
      
      if (parsedData.length > 0) {
        setDocuments(parsedData);
        const newRetriever = new DocumentRetriever(parsedData);
        setRetriever(newRetriever);
        
        // Generate new insights for uploaded data
        const statistics = newRetriever.getStatistics();
        const generatedInsights = await geminiService.generateDataInsights(statistics);
        setInsights(generatedInsights);
        
        // Add system message about successful upload
        const uploadMessage: ChatMessage = {
          id: Date.now().toString(),
          content: `Successfully loaded ${parsedData.length} loan records from your CSV file. You can now ask questions about this data!`,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, uploadMessage]);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Failed to process the CSV file. Please ensure it has the correct format.');
    }
  };

  const handleShowInsights = () => {
    setCurrentView('insights');
  };

  const statistics = retriever.getStatistics();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">RAG Q&A Chatbot</h1>
              <p className="text-sm text-gray-600">Intelligent loan approval analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {documents.length.toLocaleString()} records loaded
            </div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setCurrentView('chat')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'chat'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Chat
              </button>
              <button
                onClick={() => setCurrentView('insights')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentView === 'insights'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Insights
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mx-6 mt-4 rounded-r-lg">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError('')}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-120px)]">
        {currentView === 'chat' ? (
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onShowInsights={handleShowInsights}
            onFileUpload={handleFileUpload}
          />
        ) : (
          <div className="h-full overflow-y-auto">
            <DataInsights statistics={statistics} insights={insights} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
