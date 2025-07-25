
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoreHorizontal, Building, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';

const recentApplications = [
  { 
    id: 1, 
    position: 'Senior Frontend Developer', 
    company: 'TechCorp Solutions', 
    date: 'Jun 12, 2023', 
    status: 'Applied', 
    location: 'Remote' 
  },
  { 
    id: 2, 
    position: 'UX/UI Designer', 
    company: 'Creative Agency Inc', 
    date: 'Jun 10, 2023', 
    status: 'Interview', 
    location: 'New York, NY' 
  },
  { 
    id: 3, 
    position: 'Product Manager', 
    company: 'InnovateTech', 
    date: 'Jun 7, 2023', 
    status: 'Rejected', 
    location: 'San Francisco, CA' 
  },
  { 
    id: 4, 
    position: 'Full Stack Developer', 
    company: 'DevStream', 
    date: 'Jun 5, 2023', 
    status: 'Assessment', 
    location: 'Chicago, IL' 
  },
];

export const TransactionsSection = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return 'bg-blue-500';
      case 'Interview': return 'bg-green-500';
      case 'Assessment': return 'bg-yellow-500';
      case 'Rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Recent Applications</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <p className="text-sm text-gray-600">Track your job application progress</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((application) => (
            <div key={application.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${getStatusColor(application.status)}`}></div>
                <div>
                  <p className="font-medium text-sm text-zinc-900">{application.position}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <Building className="h-3 w-3 mr-1" />
                    {application.company}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm text-zinc-900">
                  {application.status}
                </p>
                <div className="flex items-center text-xs text-gray-600 justify-end">
                  <Calendar className="h-3 w-3 mr-1" />
                  {application.date}
                </div>
              </div>
              <button className="ml-2 p-1 hover:bg-gray-100 rounded">
                <MoreHorizontal className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
