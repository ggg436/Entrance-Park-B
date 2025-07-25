import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useTranslation } from 'react-i18next';
import { getSpecificChartData, getDefaultSkillsDistributionData, SkillsDistributionData } from '@/lib/chartData';
import { Skeleton } from '@/components/ui/skeleton';

export const CropDistributionChart = () => {
  const { t } = useTranslation();
  const [skillsDistributionData, setSkillsDistributionData] = useState<SkillsDistributionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        // Try to get user-specific data from Firestore
        const userData = await getSpecificChartData<SkillsDistributionData>('skillsDistributionData');
        
        if (userData && userData.length > 0) {
          setSkillsDistributionData(userData);
        } else {
          // Fall back to default data if no user data exists
          setSkillsDistributionData(getDefaultSkillsDistributionData());
        }
      } catch (error) {
        console.error('Error loading skills distribution data:', error);
        // Fall back to default data on error
        setSkillsDistributionData(getDefaultSkillsDistributionData());
      } finally {
        setLoading(false);
      }
    };
    
    loadChartData();
  }, []);
  
  // Check if there's any non-zero data
  const hasData = skillsDistributionData.some(item => item.value > 0);
  
  if (loading) {
    return (
      <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
        <CardHeader className="pb-2 px-4 pt-4">
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="px-2 pb-4 flex-1 flex flex-col">
          <Skeleton className="h-[350px] w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white border border-gray-200/50 rounded-2xl overflow-hidden shadow-sm h-full flex flex-col">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Skills in Demand</CardTitle>
          <select className="text-sm border border-gray-100 rounded-md px-3 py-1 bg-gray-50">
            <option>{t('time.thisMonth')}</option>
            <option>{t('time.lastMonth')}</option>
            <option>{t('time.thisQuarter')}</option>
          </select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-4 flex-1 flex flex-col">
        {hasData ? (
          <>
            <ResponsiveContainer width="99%" height={350}>
              <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Pie
                  data={skillsDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={110}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {skillsDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {skillsDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-gray-700">{entry.name}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full flex-col">
            <div className="text-gray-400 text-lg mb-2">{t('chart.noDataAvailable')}</div>
            <p className="text-gray-500 text-sm text-center max-w-md">
              Skills data will appear here once you start applying to jobs
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
