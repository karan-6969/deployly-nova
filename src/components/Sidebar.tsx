
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Image as ImageIcon, 
  Code, 
  ChevronLeft, 
  LogOut 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Upload Site', path: '/upload', icon: Upload },
    { name: 'Image Storage', path: '/images', icon: ImageIcon },
    { name: 'API Docs', path: '/api-docs', icon: Code },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen transition-all duration-300 backdrop-blur-sm bg-terminal-dark/90 border-r border-terminal-gray/30 z-40
      ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-terminal-gray/30">
          {isOpen ? (
            <>
              <Link to="/" className="flex items-center">
                <div className="w-8 h-8 rounded bg-terminal-blue flex items-center justify-center mr-3">
                  <span className="text-black font-bold">D</span>
                </div>
                <span className="text-white font-semibold">Deployly</span>
              </Link>
              <button 
                onClick={toggleSidebar}
                className="text-white/70 hover:text-terminal-blue transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
            </>
          ) : (
            <Link to="/" className="w-8 h-8 mx-auto rounded bg-terminal-blue flex items-center justify-center">
              <span className="text-black font-bold">D</span>
            </Link>
          )}
        </div>
        
        <nav className="flex-1 py-6">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    title={!isOpen ? item.name : undefined}
                  >
                    <item.icon size={20} />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-terminal-gray/30">
          <button className={`sidebar-item w-full justify-center ${!isOpen && 'px-0'}`}>
            <LogOut size={20} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
