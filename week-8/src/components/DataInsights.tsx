import React from 'react';
import { TrendingUp, Users, DollarSign, CheckCircle, XCircle, GraduationCap } from 'lucide-react';

interface DataInsightsProps {
  statistics: Record<string, any>;
  insights?: string;
}

export const DataInsights: React.FC<DataInsightsProps> = ({ statistics, insights }) => {
  const approvalRate = ((statistics.approvedLoans / statistics.totalRecords) * 100).toFixed(1);

  const StatCard: React.FC<{
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ReactNode;
    color: string;
  }> = ({ title, value, subtitle, icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Dataset Insights</h2>
        <p className="text-gray-600">Key statistics and trends from the loan approval data</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Records"
          value={statistics.totalRecords?.toLocaleString() || '0'}
          icon={<Users className="w-6 h-6 text-white" />}
          color="bg-blue-500"
        />
        
        <StatCard
          title="Approval Rate"
          value={`${approvalRate}%`}
          subtitle={`${statistics.approvedLoans} approved, ${statistics.rejectedLoans} rejected`}
          icon={<CheckCircle className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />
        
        <StatCard
          title="Average Income"
          value={`$${Math.round(statistics.averageIncome || 0).toLocaleString()}`}
          subtitle="Applicant income"
          icon={<DollarSign className="w-6 h-6 text-white" />}
          color="bg-yellow-500"
        />
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            Gender Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Male</span>
              <span className="font-semibold">{statistics.genderDistribution?.Male || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ 
                  width: `${((statistics.genderDistribution?.Male || 0) / statistics.totalRecords) * 100}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Female</span>
              <span className="font-semibold">{statistics.genderDistribution?.Female || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-pink-500 h-2 rounded-full" 
                style={{ 
                  width: `${((statistics.genderDistribution?.Female || 0) / statistics.totalRecords) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Education Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <GraduationCap className="w-5 h-5 mr-2 text-green-500" />
            Education Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Graduate</span>
              <span className="font-semibold">{statistics.educationDistribution?.Graduate || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ 
                  width: `${((statistics.educationDistribution?.Graduate || 0) / statistics.totalRecords) * 100}%` 
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Not Graduate</span>
              <span className="font-semibold">{statistics.educationDistribution?.['Not Graduate'] || 0}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-orange-500 h-2 rounded-full" 
                style={{ 
                  width: `${((statistics.educationDistribution?.['Not Graduate'] || 0) / statistics.totalRecords) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loan Amount Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
          Loan Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">
              ${Math.round(statistics.averageLoanAmount || 0).toLocaleString()}
            </p>
            <p className="text-sm text-gray-600">Average Loan Amount</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{statistics.approvedLoans}</p>
            <p className="text-sm text-gray-600">Approved Loans</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{statistics.rejectedLoans}</p>
            <p className="text-sm text-gray-600">Rejected Loans</p>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      {insights && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            AI-Generated Insights
          </h3>
          <div className="text-gray-700 leading-relaxed whitespace-pre-line">
            {insights}
          </div>
        </div>
      )}
    </div>
  );
};
