
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, FileCheck, Eye, Users } from 'lucide-react';
import { VisitorInsightsChart } from './charts/VisitorInsightsChart';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatNumber } from '@/lib/formatters';

export const SalesSummarySection = () => {
  const { t } = useTranslation();
  
  const careerMetrics = [
    {
      title: 'Job Applications',
      value: 24,
      isCurrency: false,
      change: 12,
      icon: Briefcase,
      bgColor: "bg-blue-100",
      iconColor: "text-white",
      circleBg: "bg-blue-400"
    },
    {
      title: 'Profile Views',
      value: 312,
      isCurrency: false,
      change: 18,
      icon: Eye,
      bgColor: "bg-purple-100",
      iconColor: "text-white",
      circleBg: "bg-purple-400"
    },
    {
      title: 'Interviews',
      value: 5,
      isCurrency: false,
      change: 8,
      icon: FileCheck,
      bgColor: "bg-green-100",
      iconColor: "text-white",
      circleBg: "bg-green-400"
    },
    {
      title: 'Network Growth',
      value: 28,
      isCurrency: false,
      change: 15,
      icon: Users,
      bgColor: "bg-amber-100",
      iconColor: "text-white",
      circleBg: "bg-amber-400"
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
      {/* Today's Activity */}
      <Card className="bg-white border border-gray-200/50 rounded-lg overflow-hidden shadow-sm h-full w-full relative">
        <CardHeader className="pb-0 px-3 pt-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-zinc-900">Career Activity</CardTitle>
            <button className="text-xs text-gray-600 border border-gray-100 rounded-md px-2 py-0.5 bg-gray-50 hover:bg-gray-100">
              {t('dashboard.export')}
            </button>
          </div>
          <p className="text-xs text-gray-600 mb-2">Your job search progress this month</p>
        </CardHeader>
        <CardContent className="absolute bottom-6 left-0 right-0 px-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {careerMetrics.map((item, index) => {
              // Format value based on type (currency or regular number)
              const formattedValue = item.isCurrency 
                ? formatCurrency(item.value) 
                : formatNumber(item.value);
                
              return (
                <div key={index} className={`${item.bgColor} rounded-xl p-3 shadow-sm`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-10 h-10 rounded-full ${item.circleBg} flex items-center justify-center`}>
                      <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-zinc-900 mb-0.5">{formattedValue}</div>
                  <div className="text-xs text-gray-600 mb-0.5">{item.title}</div>
                  <div className="text-xs text-blue-600">+{item.change}% {t('dashboard.fromLastMonth')}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Visitor Insights */}
      <VisitorInsightsChart />
    </div>
  );
};
