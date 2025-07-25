import React from 'react';
import { Database, RefreshCw, Users, BarChart3, TrendingUp, User } from 'lucide-react';

const CollaborateSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 relative overflow-hidden">
              {/* Profile avatars floating around */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-orange-600" />
              </div>
              
              <div className="absolute top-16 right-12 w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="absolute bottom-20 left-12 w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>

              {/* Main person */}
              <div className="relative z-10 pt-8 pb-16">
                <div className="w-full h-64 bg-white rounded-xl shadow-lg p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-orange-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-10 h-10 text-orange-600" />
                    </div>
                    <div className="text-gray-700 font-medium">Team Collaboration</div>
                  </div>
                </div>
              </div>

              {/* Chat notification */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-[180px]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-900">Chester Harris</div>
                    <div className="text-xs text-gray-500">Product Manager</div>
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-emerald-400 rounded-full"></div>
              <div className="absolute bottom-1/3 right-8 w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
              COLLABORATE
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Collaborate with your farm team{' '}
              <span className="text-blue-600">anytime, anywhere.</span>
            </h2>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Share real-time data with your farm workers, agronomists, and consultants. 
              Our platform makes it easy to coordinate tasks and make informed decisions together.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-emerald-500 mt-1">✓</div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Share field data</h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-emerald-500 mt-1">✓</div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Real-time sync</h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-emerald-500 mt-1">✓</div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Connect with experts</h3>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 text-emerald-500 mt-1">✓</div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Farm analytics</h3>
                </div>
              </div>

              <div className="flex items-start gap-3 col-span-2">
                <div className="w-5 h-5 text-emerald-500 mt-1">✓</div>
                <div>
                  <h3 className="font-medium text-gray-900 text-sm">Task management</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollaborateSection;