import React from 'react';
import { FileText, TrendingUp, Users, User } from 'lucide-react';

const CustomReportSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              CUSTOM REPORTS
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Custom reports that guide your{' '}
              <span className="text-blue-600">farm's growth</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our flexible reporting tools allow you to track the metrics that matter most to your farm, 
              providing actionable insights to optimize your operations and increase profitability.
            </p>

            {/* Stats */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-900">15%</div>
                <div className="text-gray-600">Increase in crop yield</div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-900">1.2X</div>
                <div className="text-gray-600">Return on investment</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Main workspace area */}
              <div className="mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="text-gray-600 font-medium">Custom Reports</div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute top-4 right-4 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Dashboard Report Card */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900 text-sm">Dashboard Report</h3>
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">140K</span>
                  </div>
                </div>
                
                {/* Mini chart visualization */}
                <div className="h-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-end justify-center p-2">
                  <div className="flex items-end gap-1 h-full">
                    <div className="w-2 bg-blue-300 rounded-t h-1/3"></div>
                    <div className="w-2 bg-blue-400 rounded-t h-1/2"></div>
                    <div className="w-2 bg-blue-500 rounded-t h-3/4"></div>
                    <div className="w-2 bg-blue-600 rounded-t h-full"></div>
                    <div className="w-2 bg-blue-500 rounded-t h-2/3"></div>
                    <div className="w-2 bg-blue-400 rounded-t h-1/2"></div>
                  </div>
                </div>
              </div>

              {/* User avatar */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-white">
                <User className="w-6 h-6 text-gray-600" />
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-4 w-2 h-2 bg-indigo-400 rounded-full"></div>
              <div className="absolute bottom-20 left-8 w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomReportSection;