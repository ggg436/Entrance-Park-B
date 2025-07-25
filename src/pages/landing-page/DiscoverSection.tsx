import React from 'react';
import { Sprout, CloudRain, Tractor, Users, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Define wave background styles
const waveStyles = `
  .wave-bg {
    position: relative;
    background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
  }
  
  .wave-bg::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 150px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' opacity='.25' fill='%230066ff'%3E%3C/path%3E%3Cpath d='M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z' opacity='.5' fill='%230066ff'%3E%3C/path%3E%3Cpath d='M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z' fill='%230066ff' opacity='.2'%3E%3C/path%3E%3C/svg%3E");
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }
`;

const DiscoverSection = () => {
  const features = [
    {
      icon: Sprout,
      description: "Our platform is specially designed for Nepali farmers, with a simple interface that works in local languages and doesn't require technical expertise to use."
    },
    {
      icon: CloudRain,
      description: "Access hyper-local weather forecasting and climate insights specific to Nepal's diverse geographical regions, from the Terai plains to high mountain farms."
    },
    {
      icon: Tractor,
      description: "Get customized recommendations for traditional and modern farming techniques suited to your specific crops, soil conditions, and local agricultural practices."
    },
    {
      icon: Users,
      description: "Connect with a community of thousands of Nepali farmers sharing knowledge, trading tips, and collaborating to overcome common challenges together."
    }
  ];

  return (
    <section className="py-20 px-8 wave-bg relative">
      {/* Add wave styles */}
      <style dangerouslySetInnerHTML={{ __html: waveStyles }} />
      
      {/* Floating dots decoration */}
      <div className="absolute top-20 left-10 w-32 h-32 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-blue-600 rounded-full"
            style={{ 
              top: `${Math.floor(Math.random() * 100)}%`, 
              left: `${Math.floor(Math.random() * 100)}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="absolute top-1/3 right-10 w-32 h-32 opacity-20">
        {[...Array(16)].map((_, i) => (
          <div 
            key={i} 
            className="absolute w-2 h-2 bg-green-600 rounded-full"
            style={{ 
              top: `${Math.floor(Math.random() * 100)}%`, 
              left: `${Math.floor(Math.random() * 100)}%`,
              animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
              Krishak AI: Made for Nepali Farmers
            </h2>
            
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-gray-600 leading-relaxed pt-2">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg">
                Try Krishak AI Free
              </Button>
            </div>
          </div>

          {/* Right Image - Mobile Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-[600px] bg-black rounded-[3rem] p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Mobile Screen Content */}
                  <div className="bg-blue-600 h-24 flex items-center justify-between px-6 text-white">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <Sprout className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">Krishak AI</span>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="text-sm text-gray-600 mb-2">Today's Update</div>
                      <div className="text-gray-900 font-medium">Weather Alert: Light Rain Expected in Eastern Terai</div>
                      <div className="text-xs text-gray-500 mt-2">Updated 20 min ago</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">85%</div>
                        <div className="text-xs text-gray-600">Soil Moisture</div>
                      </div>
                      <div className="bg-green-100 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">28°C</div>
                        <div className="text-xs text-gray-600">Temperature</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium">Rice Field Status</div>
                        <div className="text-xs text-gray-500">Healthy - 3 weeks to harvest</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-sm font-medium">Market Prices</div>
                        <div className="text-xs text-gray-500">Rice NPR 75/kg (+5%)</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4">
                    <div className="flex justify-around">
                      <div className="text-center">
                        <div className="w-6 h-6 bg-blue-600 rounded mx-auto mb-1 flex items-center justify-center">
                          <Sprout className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-xs">Crops</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1 flex items-center justify-center">
                          <CloudRain className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-xs">Weather</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1 flex items-center justify-center">
                          <ShoppingCart className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-xs">Market</div>
                      </div>
                      <div className="text-center">
                        <div className="w-6 h-6 bg-gray-300 rounded mx-auto mb-1 flex items-center justify-center">
                          <Users className="w-3 h-3 text-white" />
                        </div>
                        <div className="text-xs">Community</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;