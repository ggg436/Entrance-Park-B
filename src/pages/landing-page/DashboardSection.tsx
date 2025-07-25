import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState('CROP ANALYTICS');

  const tabs = [
    'CROP ANALYTICS',
    'FARM MANAGEMENT', 
    'MARKET INSIGHTS',
    'WEATHER TRACKING'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Krishak AI helps farmers grow
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Our platform provides farmers with the essential tools and insights needed to create 
            successful, sustainable farming operations, from seed to harvest and beyond.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                onClick={() => setActiveTab(tab)}
                className="px-6 py-2"
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <img 
            src="/dashboard.png" 
            alt="Krishak AI Dashboard Interface"
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;