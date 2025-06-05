import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Building2, 
  Languages, 
  Phone,
  FileText
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const AppSidebar = ({ currentPage, setCurrentPage }: AppSidebarProps) => {
  const menuItems = [
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', color: 'text-blue-600' },
    { id: 'documents', icon: FileText, label: 'Documents & Renewals', color: 'text-teal-600' },
    { id: 'qa', icon: MessageSquare, label: 'Ask Me Anything', color: 'text-green-600' },
    { id: 'hub', icon: Users, label: 'Community Hub', color: 'text-purple-600' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', color: 'text-orange-600' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', color: 'text-red-600' },
    { id: 'language', icon: Languages, label: 'Learn French', color: 'text-indigo-600' },
    { id: 'translate', icon: Languages, label: 'Translate', color: 'text-cyan-600' },
    { id: 'contact', icon: Phone, label: 'Contact Us', color: 'text-pink-600' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <div 
            className="text-xl font-bold cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentPage('checklist')}
          >
            pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Your guide to French education
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setCurrentPage(item.id)}
                      className="w-full"
                    >
                      <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : item.color}`} />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
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
      </SidebarFooter>
    </Sidebar>
  );
};
