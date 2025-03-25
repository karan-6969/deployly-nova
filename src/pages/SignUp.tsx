
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedTitle from '@/components/AnimatedTitle';
import ThreeJSBackground from '@/components/ThreeJSBackground';

const SignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGitHubSignIn = () => {
    setIsLoading(true);
    
    // Simulate GitHub authentication - in a real app, this would connect to GitHub OAuth
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-terminal-black">
      <ThreeJSBackground />
      
      <div className="glass-panel rounded-lg p-8 w-full max-w-md z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded bg-terminal-blue flex items-center justify-center mr-3">
              <span className="text-black font-bold text-xl">D</span>
            </div>
            <span className="text-2xl font-semibold">Deployly</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            <AnimatedTitle 
              text="Join Deployly" 
              className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
              speed={70}
            />
          </h1>
          
          <p className="text-white/70 mb-6">
            Sign up to deploy your sites and store images in seconds.
          </p>
        </div>
        
        <div className="space-y-6">
          <Button 
            onClick={handleGitHubSignIn}
            className="w-full py-6 bg-[#24292e] hover:bg-[#24292e]/90 text-white"
            disabled={isLoading}
          >
            <Github className="mr-2 h-5 w-5" />
            {isLoading ? "Connecting to GitHub..." : "Sign in with GitHub"}
          </Button>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-terminal-gray/30"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-terminal-dark px-2 text-white/50">Or continue with</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 rounded-md border border-terminal-gray/30 bg-terminal-dark/50 text-white focus:border-terminal-blue focus:ring-1 focus:ring-terminal-blue"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-3 rounded-md border border-terminal-gray/30 bg-terminal-dark/50 text-white focus:border-terminal-blue focus:ring-1 focus:ring-terminal-blue"
                placeholder="Create a password"
              />
            </div>
            
            <Button className="w-full">
              Create Account
            </Button>
          </div>
          
          <div className="text-center mt-6 text-sm text-white/50">
            Already have an account?{" "}
            <a href="#" onClick={() => navigate('/login')} className="text-terminal-blue hover:underline">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
