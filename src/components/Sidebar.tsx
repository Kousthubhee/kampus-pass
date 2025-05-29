import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Building2, 
  Languages, 
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Sidebar = ({ currentPage, setCurrentPage }: SidebarProps) => {
  const menuItems = [
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', color: 'text-blue-600' },
    { id: 'qa', icon: MessageSquare, label: 'Ask Me Anything', color: 'text-green-600' },
    { id: 'hub', icon: Users, label: 'Community Hub', color: 'text-purple-600' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', color: 'text-orange-600' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', color: 'text-red-600' },
    { id: 'language', icon: Languages, label: 'Learn French', color: 'text-indigo-600' },
    { id: 'translate', icon: Languages, label: 'Translate', color: 'text-cyan-600' },
    { id: 'contact', icon: Phone, label: 'Contact Us', color: 'text-pink-600' },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="text-sm text-gray-500 mb-4">Navigation</div>
      </div>
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-blue-600' : item.color}`} />
                <span className="text-left">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm font-medium text-blue-900 mb-1">Need Help?</div>
          <div className="text-xs text-blue-700 mb-2">
            Reach out to our support team for assistance
          </div>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => setCurrentPage('contact')}
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
};
