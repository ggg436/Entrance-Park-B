import React from 'react';
import { BarChart3, RefreshCw, User } from 'lucide-react';

const AnalyticsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
              POWERFUL ANALYTICS
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Track your farm's performance with{' '}
              <span className="text-emerald-600">powerful analytics</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Gain valuable insights into your farm's operations with our advanced analytics tools. 
              Track crop performance, monitor resource usage, and make data-driven decisions.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Custom Dashboards</h3>
                  <p className="text-gray-600 text-sm">Create personalized dashboards to visualize your farm's data and track key metrics.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-Time Data</h3>
                  <p className="text-gray-600 text-sm">Get live updates on your farm's performance so you can react quickly to changing conditions.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              {/* Profile Cards */}
              <div className="absolute top-4 right-4 space-y-3">
                <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-3 min-w-[200px]">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Chester Harris</div>
                    <div className="text-xs text-gray-500">Product Manager • 24m</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-3 min-w-[200px]">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Jennifer Lopez</div>
                    <div className="text-xs text-gray-500">UX Designer • 14m</div>
                  </div>
                </div>
              </div>

              {/* Main figure */}
              <div className="pt-20 pb-8">
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="text-gray-600">Analytics Dashboard</div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-8 w-2 h-2 bg-emerald-400 rounded-full"></div>
              <div className="absolute bottom-16 right-16 w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;