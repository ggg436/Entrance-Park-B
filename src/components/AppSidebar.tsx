
import React, { useEffect, useState } from 'react';
import { 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Star,
  BarChart3,
  Rss,
  Search,
  DollarSign,
  Settings,
  HelpCircle,
  LineChart,
  MessageSquare,
  FileText,
  Building,
  BookOpen,
  Bell,
  Users,
  BarChart2
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useSidebar } from '@/context/SidebarContext';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';
import { useUserProfile } from '@/hooks/useUserProfile';

export const AppSidebar = () => {
  const { isCollapsed, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { profile, loading } = useUserProfile();
  const [navigationItems, setNavigationItems] = useState<Array<{
    title: string;
    url: string;
    icon: React.ElementType;
    showFor?: string[]; // Added for filtering
    onClick?: () => void; // Added for click handlers
  }>>([]);

  useEffect(() => {
    console.log("Profile state:", profile);
    // Define all navigation items
    const allItems = [
      { 
        title: t('common.dashboard'), 
        url: '/dashboard',
        icon: BarChart3,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']  // Show for all users
      },
      { 
        title: 'Job Search', 
        url: '/dashboard/jobs',
        icon: Search,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      {
        title: 'My Applications',
        url: '/dashboard/applications',
        icon: Briefcase,
        showFor: ['jobseeker', 'user', 'farmer']  
      },
      {
        title: 'Company Dashboard',
        url: '/dashboard/company',
        icon: Building,
        showFor: ['employer', 'user', 'farmer']  
      },
      { 
        title: 'Career Feed', 
        url: '/dashboard/feed',
        icon: Rss,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: t('common.messaging'), 
        url: '/dashboard/messaging',
        icon: MessageSquare,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: 'AI CV Maker', 
        url: '/dashboard/cv-maker',
        icon: FileText,
        showFor: ['employer', 'jobseeker', 'user', 'farmer', 'agency']
      },
      {
        title: 'CV Analyzer',
        url: '/dashboard/cv-analyzer',
        icon: BarChart2,
        showFor: ['employer', 'jobseeker', 'user', 'farmer', 'agency']
      },
      { 
        title: 'Jobs', 
        url: '/dashboard/jobs',
        icon: Briefcase,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: 'Courses', 
        url: '/dashboard/courses',
        icon: GraduationCap,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: t('common.pricing'), 
        url: '/dashboard/pricing',
        icon: DollarSign,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: 'Network', 
        url: '/dashboard/network',
        icon: Users,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: t('common.help'), 
        url: '/dashboard/help',
        icon: HelpCircle,
        showFor: ['employer', 'jobseeker', 'user', 'farmer']
      },
      { 
        title: 'AI Chat', 
        url: '/dashboard/chat',
        icon: MessageSquare,
        showFor: ['employer', 'jobseeker', 'user', 'farmer', 'agency']
      },
    ];

    // Filter navigation items based on user type or show all if no profile
    const userType = profile?.userType || 'user';
    console.log("Current user type:", userType);
    
    // Show all items by default - we're adding support for legacy user types as well
    const filteredItems = allItems.filter(item => 
      item.showFor === undefined || item.showFor.includes(userType)
    );
    
    console.log("Navigation items:", filteredItems);
    setNavigationItems(filteredItems);
  }, [profile, t]);

  const isActive = (url: string) => {
    if (url === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(url);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast.success(t('common.signedOut'));
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error(t('common.signOutError'));
    }
  };

  const handleGetPro = () => {
    navigate('/dashboard/pricing');
  };

  return (
    <aside className={`${isCollapsed ? 'w-[110px]' : 'w-[300px]'} fixed top-0 left-0 h-screen bg-white border-r border-gray-100 flex flex-col transition-all duration-200 z-30`}>
      {/* Custom Sidebar Slider */}
      <div className="absolute -right-3 top-6 z-40">
        <button 
          onClick={toggleSidebar}
          className="w-7 h-7 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-blue-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-blue-600" />
          )}
        </button>
      </div>

      {/* Brand Section - positioned above top edge */}
      <NavLink to="/dashboard" className="flex items-center px-6 h-[50px] flex-shrink-0 bg-white mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <Briefcase className="w-6 h-6 text-white absolute" />
          <GraduationCap className="w-4 h-4 text-white absolute bottom-1 right-1" />
          <BookOpen className="w-3 h-3 text-white absolute top-1 right-1" />
        </div>
        <span className={`ml-3 text-2xl font-semibold transition-opacity duration-200 whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 hidden' : 'opacity-100 block'}`}>
          CareerBoost
        </span>
      </NavLink>

      {/* Scrollable Section - Contains navigation, pro card, and language switcher */}
      <div className="flex-1 overflow-y-auto pt-2 flex flex-col justify-between">
        {/* Navigation Section */}
        <div>
          <nav className="px-4">
            <div className="space-y-2">
              {navigationItems.map((item) => (
                item.onClick ? (
                  <button
                    key={item.url}
                    onClick={item.onClick}
                    className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 rounded-2xl cursor-pointer text-gray-600 hover:bg-gray-50`}
                    title={isCollapsed ? item.title : ''}
                  >
                    <item.icon className={`w-7 h-7 flex-shrink-0 text-gray-400`} />
                    <span className={`text-lg font-medium ${isCollapsed ? 'hidden' : 'block'}`}>
                      {!isCollapsed && item.title}
                    </span>
                  </button>
                ) : (
                  <NavLink
                    key={item.url}
                    to={item.url}
                    className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 rounded-2xl cursor-pointer ${
                      isActive(item.url)
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    title={isCollapsed ? item.title : ''}
                  >
                    <item.icon className={`w-7 h-7 flex-shrink-0 ${isActive(item.url) ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`text-lg font-medium ${isCollapsed ? 'hidden' : 'block'}`}>
                      {!isCollapsed && item.title}
                    </span>
                  </NavLink>
                )
              ))}
            </div>
          </nav>

          {/* Pro Version Card */}
          <div className={`p-5 ${isCollapsed ? 'hidden' : 'block'}`}>
            <div className="bg-blue-600 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-yellow-300" />
                <span className="text-lg font-semibold">CareerBoost {t('common.pro')}</span>
              </div>
              <p className="text-base text-blue-100 mb-4">
                Unlock premium features to boost your career growth
              </p>
              <Button 
                className="w-full bg-white text-blue-600 hover:bg-blue-50 rounded-2xl text-base py-3"
                onClick={handleGetPro}
              >
                {t('common.get')} {t('common.pro')}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sign Out - Now positioned at the bottom of scrollable area */}
        <div className="p-4 pb-8">
          <button 
            onClick={handleSignOut}
            className={`flex items-center ${isCollapsed ? 'justify-center w-full px-0 mx-1' : 'gap-4 px-5'} py-4 text-gray-600 rounded-2xl cursor-pointer hover:bg-gray-50 w-full`}
            title={isCollapsed ? t('common.signOut') : ''}
          >
            <LogOut className="w-7 h-7 flex-shrink-0 text-gray-400" />
            <span className={`text-lg font-medium transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              {!isCollapsed && t('common.signOut')}
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};
