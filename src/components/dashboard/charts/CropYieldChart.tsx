import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const jobTrendsData = [
  { month: 'months.feb', jobPostings: 1250, applications: 120 },
  { month: 'months.mar', jobPostings: 1420, applications: 145 },
  { month: 'months.apr', jobPostings: 1380, applications: 160 },
  { month: 'months.may', jobPostings: 1550, applications: 185 },
  { month: 'months.jun', jobPostings: 1680, applications: 210 },
  { month: 'months.jul', jobPostings: 1820, applications: 240 },
  { month: 'months.aug', jobPostings: 1950, applications: 260 },
  { month: 'months.sep', jobPostings: 2080, applications: 290 },
  { month: 'months.oct', jobPostings: 2240, applications: 310 },
  { month: 'months.nov', jobPostings: 2100, applications: 280 },
  { month: 'months.dec', jobPostings: 1980, applications: 240 },
  { month: 'months.jan', jobPostings: 2300, applications: 320 },
];

export const CropYieldChart = () => {
  const { t } = useTranslation();

  // Translate month names
  const translatedData = jobTrendsData.map(item => ({
    ...item,
    translatedMonth: t(item.month)
  }));

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-3 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-zinc-900">Job Market Trends</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <button className="px-3 py-1 text-sm bg-gray-50 rounded-lg border border-gray-100">{t('dashboard.12Months')}</button>
              <button className="px-3 py-1 text-sm text-gray-600">{t('dashboard.6Months')}</button>
              <button className="px-3 py-1 text-sm text-gray-600">{t('dashboard.30Days')}</button>
              <button className="px-3 py-1 text-sm text-gray-600">{t('dashboard.7Days')}</button>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-gray-100 bg-gray-50">
            <Download className="w-4 h-4 mr-2" />
            {t('dashboard.exportPDF')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        <div className="w-full flex-1">
          <ResponsiveContainer width="99%" height={320}>
            <LineChart 
              data={translatedData}
              margin={{ top: 10, right: 10, bottom: 20, left: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="translatedMonth" 
                axisLine={false} 
                tickLine={false} 
                className="text-sm text-gray-600"
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                className="text-sm text-gray-600"
                tick={{ fontSize: 12 }}
                width={40}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelFormatter={(label) => label}
              />
              <Line 
                type="monotone" 
                dataKey="jobPostings" 
                stroke="#4f46e5" 
                strokeWidth={2}
                dot={{ fill: '#4f46e5', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#4f46e5' }}
                name="Job Postings"
              />
              <Line 
                type="monotone" 
                dataKey="applications" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#06b6d4' }}
                name="Your Applications"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
            <span className="text-sm text-gray-600">Job Postings</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
            <span className="text-sm text-gray-600">Your Applications</span>
          </div>
          <div className="text-sm font-semibold text-blue-600">{jobTrendsData.reduce((acc, curr) => acc + curr.applications, 0)} Total Applications</div>
        </div>
      </CardContent>
    </Card>
  );
};
