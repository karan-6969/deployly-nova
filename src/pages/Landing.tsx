import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Code, Upload as UploadIcon, Image as ImageIcon, Command, Github } from 'lucide-react';
import AnimatedTitle from '../components/AnimatedTitle';
import DragDropUpload from '../components/DragDropUpload';
import ThreeJSBackground from '../components/ThreeJSBackground';
import DynamicTerminal from '../components/DynamicTerminal';
import { Button } from '@/components/ui/button';

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
  
  const techJokeTerminalCommands = [
    {
      command: "npx deployly-cli login",
      response: [
        "Logging in to Deployly...", 
        "Authorization successful! Welcome back, human... or are you a robot? 🤔",
        "If you're a robot, remember: ⚠️ Three laws of robotics apply here!"
      ],
      delay: 1200
    },
    {
      command: "npx deployly-cli deploy --dir ./dist",
      response: [
        "Scanning files...",
        "Found 148 files, 12MB of JS frameworks, and one lonely console.log('debug me')...",
        "Uploading assets... (Don't worry, we're not judging your CSS)",
        "Configuring deployment...",
        "Applying quantum entanglement to your static files...",
        "✅ Success! Your site is live at: https://my-app.deployly.app",
        "Time saved: approximately 42 coffee breaks ☕"
      ],
      delay: 1500,
      isCode: true
    },
    {
      command: "npx deployly-cli joke",
      response: [
        "Why do programmers prefer dark mode?",
        "Because light attracts bugs! 🐛",
        "",
        "How many programmers does it take to change a light bulb?",
        "None. It's a hardware problem."
      ],
      delay: 1000
    },
    {
      command: "git commit -m \"Fixed bug that should never have existed\"",
      response: [
        "🤔 Are you sure about that commit message?",
        "Suggested alternatives:",
        "- \"Temporarily fixed the thing we'll break again later\"",
        "- \"It works on my machine™\"",
        "- \"Don't touch this code again, ever\""
      ],
      delay: 1200
    }
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
    <div className="min-h-screen flex flex-col relative cursor-none">
      <ThreeJSBackground />
      
      <header className="py-6 px-8 flex items-center justify-between border-b border-terminal-gray/30 relative z-10">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded bg-terminal-blue flex items-center justify-center mr-3 animate-pulse-glow">
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
          <Button 
            onClick={() => navigate('/dashboard')} 
            variant="outline"
            className="px-4 py-2 rounded-md text-white font-medium border-terminal-blue hover:bg-terminal-blue/10 transition-colors"
          >
            Go to Dashboard
          </Button>
        </div>
      </header>
      
      <main className="flex-1 relative z-10">
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <AnimatedTitle 
                    text="Deploy Your Site in Seconds" 
                    className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                  />
                </h1>
                
                <p className="text-lg md:text-xl text-white/70 mb-8">
                  The fastest way to deploy static websites and store images. Built for developers who value speed and simplicity.
                </p>
                
                <div className="space-x-4">
                  <Button 
                    onClick={() => navigate('/signup')} 
                    className="px-6 py-6 rounded-md bg-terminal-blue text-black font-medium hover:bg-terminal-blue/90 transition-colors shadow-neon-hover flex items-center gap-2"
                  >
                    <Github size={20} />
                    Get Started with GitHub
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/dashboard')} 
                    variant="outline"
                    className="px-6 py-6 rounded-md border-terminal-gray/50 text-white hover:bg-terminal-gray/20 transition-colors"
                  >
                    View Demo
                  </Button>
                </div>
              </div>
              
              <div className="glass-panel rounded-lg overflow-hidden shadow-neon backdrop-blur-md">
                <DynamicTerminal 
                  commands={techJokeTerminalCommands} 
                  title="deployly-cli@1.0.0 - try not to laugh edition"
                />
              </div>
            </div>
            
            <div className="mt-32 mb-16">
              <h2 className="text-3xl font-bold mb-12 text-center">Upload or Deploy via API</h2>
              <div className="max-w-xl mx-auto">
                <DragDropUpload 
                  onUpload={handleUpload}
                  uploadingState={uploadingState}
                  successMessage={uploadSuccess ? "Upload successful! Redirecting to dashboard..." : ""}
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {features.slice(0, visibleFeatures).map((feature, index) => (
                <div 
                  key={index} 
                  className="glass-panel rounded-lg p-6 text-left transition-all animate-scale-in card-hover border border-white/5 group"
                >
                  <div className={`w-12 h-12 mb-4 rounded-md bg-${feature.color}/10 flex items-center justify-center group-hover:shadow-neon-${feature.color} transition-all duration-300`}>
                    <feature.icon className={`text-${feature.color}`} size={24} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-24 px-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-terminal-dark/0 via-terminal-dark/80 to-terminal-dark/0 z-0"></div>
          <div className="max-w-5xl mx-auto relative z-10">
            <h2 className="text-3xl font-bold mb-16 text-center">
              <span className="bg-gradient-to-r from-terminal-blue to-terminal-yellow bg-clip-text text-transparent">
                Start Building Today
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center card-hover">
                <div className="w-16 h-16 rounded-full bg-terminal-blue/10 flex items-center justify-center mb-4">
                  <Command size={28} className="text-terminal-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy CLI</h3>
                <p className="text-white/70">Deploy with a single command using our intuitive CLI tool.</p>
              </div>
              
              <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center card-hover">
                <div className="w-16 h-16 rounded-full bg-terminal-yellow/10 flex items-center justify-center mb-4">
                  <Code size={28} className="text-terminal-yellow" />
                </div>
                <h3 className="text-xl font-semibold mb-2">API Integration</h3>
                <p className="text-white/70">Integrate with your existing workflow using our comprehensive API.</p>
              </div>
              
              <div className="glass-panel p-6 rounded-lg flex flex-col items-center text-center card-hover">
                <div className="w-16 h-16 rounded-full bg-terminal-green/10 flex items-center justify-center mb-4">
                  <Github size={28} className="text-terminal-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">GitHub Sync</h3>
                <p className="text-white/70">Automatically deploy when you push to your GitHub repository.</p>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <Button 
                onClick={() => navigate('/signup')} 
                className="px-8 py-6 rounded-md bg-terminal-blue text-black font-medium hover:bg-terminal-blue/90 transition-colors shadow-neon flex items-center gap-2 mx-auto text-lg"
              >
                Get Started <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 px-8 border-t border-terminal-gray/30 relative z-10 bg-terminal-black/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded bg-terminal-blue flex items-center justify-center mr-3">
                  <span className="text-black font-bold">D</span>
                </div>
                <span className="text-xl font-semibold">Deployly</span>
              </div>
              <p className="text-white/50 text-sm">
                Fast, simple deployment platform for developers.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Features</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Pricing</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Changelog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Terms</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Cookies</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Licenses</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-terminal-gray/30 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/50">
              © {new Date().getFullYear()} Deployly. All rights reserved.
            </div>
            
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Command size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
