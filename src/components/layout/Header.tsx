
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tractor, Wheat, Sprout } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { navLinks } from './header-config';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="w-full px-8 py-6 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <div className="flex items-center gap-3" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
              <Tractor className="w-6 h-6 text-white absolute" />
              <Wheat className="w-4 h-4 text-white absolute bottom-1 right-1" />
              <Sprout className="w-3 h-3 text-white absolute top-1 right-1" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-zinc-900 tracking-[4px] uppercase">
                KRISHAK AI
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              link.items ? (
                <NavigationMenu key={link.title}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors bg-transparent text-base">
                        {link.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="grid gap-3 p-6 w-[400px]">
                          {link.items.map((item) => (
                            <NavigationMenuLink asChild key={item.title}>
                              <div 
                                className="flex flex-col space-y-2 cursor-pointer hover:bg-accent hover:text-accent-foreground p-3 rounded-md"
                                onClick={() => navigate(item.href)}
                              >
                                {item.icon && (
                                  <div className="flex items-center gap-2">
                                    <item.icon className="h-5 w-5 text-green-600" />
                                    <h3 className="text-lg font-bold">{item.title}</h3>
                                  </div>
                                )}
                                {!item.icon && <h3 className="text-lg font-bold">{item.title}</h3>}
                                <p className="text-sm text-muted-foreground font-medium">
                                  {item.description}
                                </p>
                              </div>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <a 
                  key={link.title}
                  onClick={() => navigate(link.href)}
                  className="text-zinc-900 font-bold hover:text-zinc-600 transition-colors text-base cursor-pointer"
                >
                  {link.title}
                </a>
              )
            ))}
          </nav>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:block">
            <Button 
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 mr-4"
              onClick={() => user ? navigate('/dashboard') : navigate('/signup')}
            >
              Register
            </Button>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-bold text-base shadow-lg"
            onClick={() => user ? navigate('/dashboard') : navigate('/login')}
          >
            {user ? 'Dashboard' : 'Login'}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
