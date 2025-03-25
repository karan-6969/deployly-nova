
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-black px-4">
      <div className="glass-panel rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
        <h1 className="text-8xl font-bold mb-4 text-terminal-blue">404</h1>
        <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-white/70 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-md bg-terminal-blue text-white font-medium hover:bg-terminal-blue/80 transition-colors flex items-center gap-2 mx-auto"
        >
          <ChevronLeft size={18} />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
