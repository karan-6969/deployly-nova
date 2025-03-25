
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-terminal-black">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="fixed top-4 left-4 z-30 p-2 rounded-full bg-terminal-dark border border-terminal-gray/30 text-white/70 hover:text-terminal-blue hover:border-terminal-blue/50 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        )}
        
        <div className="container mx-auto px-6 py-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
