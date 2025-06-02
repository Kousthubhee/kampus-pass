import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userProgress: {
    keys: number;
    completedModules: string[];
    unlockedModules: string[];
  };
}

export const Header = ({ currentPage, setCurrentPage, userProgress }: HeaderProps) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'checklist': return 'Checklist';
      case 'documents': return 'Documents & Renewals';
      case 'qa': return 'Ask Me Anything';
      case 'hub': return 'Community Hub';
      case 'news': return 'Stay Updated';
      case 'affiliation': return 'Our Partners';
      case 'language': return 'Learn French';
      case 'translate': return 'Translate';
      case 'contact': return 'Contact Us';
      case 'profile': return 'Profile';
      case 'notifications': return 'Notifications';
      default: return 'pasS2Kampus';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger />
          
          <div 
            className="flex items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentPage('checklist')}
          >
            <div className="text-2xl font-bold">
              pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              🗝️ Keys: {userProgress.keys}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('notifications')}
              className="relative p-2"
            >
              <Bell className="h-5 w-5" />
              {userProgress.keys > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setCurrentPage('profile')}
              className="p-2"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
