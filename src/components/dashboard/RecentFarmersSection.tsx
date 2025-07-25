
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, MapPin, Users, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const topCompanies = [
  { 
    name: 'TechCorp Solutions', 
    industry: 'Technology',
    location: 'San Francisco', 
    openRoles: 12,
    logo: 'TC'
  },
  { 
    name: 'InnovateTech', 
    industry: 'Software Development',
    location: 'New York', 
    openRoles: 8,
    logo: 'IT'
  },
  { 
    name: 'Global Consulting Group', 
    industry: 'Business Consulting',
    location: 'Chicago', 
    openRoles: 5,
    logo: 'GC'
  },
  { 
    name: 'CreativeMinds Agency', 
    industry: 'Design & Marketing',
    location: 'Los Angeles', 
    openRoles: 7,
    logo: 'CM'
  },
];

export const RecentFarmersSection = () => {
  const { t } = useTranslation();
  
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-zinc-900">Top Companies</CardTitle>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All
          </button>
        </div>
        <p className="text-sm text-gray-600">Companies actively hiring in your field</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCompanies.map((company, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-md mr-3 flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-600">
                    {company.logo}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-zinc-900">{company.name}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <Building className="h-3 w-3 mr-1" />
                    {company.industry}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <Briefcase className="h-3 w-3 mr-1" />
                  {company.openRoles} roles
                </div>
                <div className="flex items-center text-xs text-gray-600 justify-end mt-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {company.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
