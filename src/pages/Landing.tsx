
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Code, Upload as UploadIcon, Image as ImageIcon } from 'lucide-react';
import AnimatedTitle from '../components/AnimatedTitle';
import DragDropUpload from '../components/DragDropUpload';

const Landing = () => {
  const navigate = useNavigate();
  const [uploadingState, setUploadingState] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(0);
  
  const features = [
    {
      icon: UploadIcon,
      title: 'Instant Deployment',
      description: 'Upload your static site files and deploy in seconds. Get a unique URL immediately.',
      color: 'terminal-blue',
    },
    {
      icon: ImageIcon,
      title: 'Image Storage',
      description: 'Unlimited image hosting with a powerful API to use in all your projects.',
      color: 'terminal-yellow',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Built for developers with an intuitive CLI, webhooks, and simple integrations.',
      color: 'terminal-green',
    },
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleFeatures(prev => {
        if (prev < features.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  const handleUpload = (files: FileList) => {
    setUploadingState(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadingState(false);
      setUploadSuccess(true);
      
      // Redirect to dashboard after successful upload
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 px-8 flex items-center justify-between border-b border-terminal-gray/30">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-terminal-blue flex items-center justify-center mr-3">
            <span className="text-black font-bold">D</span>
          </div>
          <span className="text-xl font-semibold">Deployly</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/dashboard" className="text-white/70 hover:text-white transition-colors">Dashboard</a>
          <a href="/api-docs" className="text-white/70 hover:text-white transition-colors">API</a>
          <a href="/images" className="text-white/70 hover:text-white transition-colors">Images</a>
        </nav>
        
        <div>
          <button 
            onClick={() => navigate('/dashboard')} 
            className="px-4 py-2 rounded-md bg-terminal-blue text-white font-medium hover:bg-terminal-blue/80 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </header>
      
      <main className="flex-1">
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <AnimatedTitle 
                text="Deploy Your Site in Seconds" 
                className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              />
            </h1>
            
            <p className="text-lg md:text-xl text-white/70 mb-12 max-w-3xl mx-auto">
              The fastest way to deploy static websites and store images. Built for developers who value speed and simplicity.
            </p>
            
            <div className="max-w-xl mx-auto mb-16">
              <DragDropUpload 
                onUpload={handleUpload}
                uploadingState={uploadingState}
                successMessage={uploadSuccess ? "Upload successful! Redirecting to dashboard..." : ""}
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {features.slice(0, visibleFeatures).map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel rounded-lg p-6 text-left transition-all animate-scale-in card-hover"
                >
                  <div className={`w-12 h-12 mb-4 rounded-md bg-${feature.color}/10 flex items-center justify-center`}>
                    <feature.icon className={`text-${feature.color}`} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16 px-8 bg-terminal-dark/50">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Ready to Deploy?</h2>
            
            <button 
              onClick={() => navigate('/dashboard')} 
              className="px-6 py-3 rounded-md bg-terminal-blue text-white font-medium hover:bg-terminal-blue/80 transition-colors flex items-center gap-2 mx-auto"
            >
              Get Started <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </main>
      
      <footer className="py-8 px-8 border-t border-terminal-gray/30">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 rounded bg-terminal-blue flex items-center justify-center mr-2">
              <span className="text-black font-bold text-sm">D</span>
            </div>
            <span className="text-sm">© 2023 Deployly. All rights reserved.</span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">Docs</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
