
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import ChatBot from '@/components/ChatBot';
import { useSidebar } from '@/context/SidebarContext';

const DashboardLayout = () => {
  const location = useLocation();
  const isMarketplace = location.pathname.includes('/marketplace');
  const isWeather = location.pathname.includes('/weather');
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="min-h-screen flex w-full bg-gray-50 overflow-x-hidden">
      <AppSidebar />
      
      {/* Main content with left margin to accommodate fixed sidebar */}
      <div 
        className={`flex-1 flex flex-col ${isCollapsed ? 'ml-[110px]' : 'ml-[300px]'} transition-[margin] duration-200`}
        style={{ width: 'calc(100% - ' + (isCollapsed ? '110px' : '300px') + ')' }}
      >
        {/* Only show the header when NOT on marketplace page */}
        {!isMarketplace && <DashboardHeader />}
        <main className={`flex-1 ${isMarketplace ? 'mt-0' : ''} relative ${
          isWeather 
            ? 'scale-75 origin-top-left w-[130%]' 
            : 'scale-90 origin-top-left w-[110%]'
        }`}>
          <Outlet />
        </main>
      </div>

      {/* ChatBot Components */}
      <ChatBot />
    </div>
  );
};

export default DashboardLayout;
