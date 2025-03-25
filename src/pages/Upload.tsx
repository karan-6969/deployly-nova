
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Globe, 
  Code, 
  CheckCircle, 
  ChevronRight 
} from 'lucide-react';
import Layout from '../components/Layout';
import DragDropUpload from '../components/DragDropUpload';

const Upload = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingState, setUploadingState] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentSuccess, setDeploymentSuccess] = useState(false);
  
  const totalSteps = 3;
  
  const handleFileUpload = (files: FileList) => {
    setUploadingState(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadingState(false);
      setUploadSuccess(true);
      // Generate project URL based on name
      if (projectName) {
        setProjectUrl(`https://${projectName.toLowerCase().replace(/\s+/g, '-')}.deployly.app`);
      } else {
        setProjectUrl(`https://project-${Math.floor(Math.random() * 10000)}.deployly.app`);
      }
    }, 3000);
  };
  
  const handleDeploy = () => {
    setIsDeploying(true);
    
    // Simulate deployment process
    setTimeout(() => {
      setIsDeploying(false);
      setDeploymentSuccess(true);
      
      // Redirect to dashboard after deployment
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 4000);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Project Details</h2>
            
            <div className="mb-6">
              <label htmlFor="projectName" className="block text-sm mb-2">Project Name</label>
              <input 
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="my-awesome-website"
                className="w-full px-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 focus:border-terminal-blue focus:outline-none"
              />
            </div>
            
            <div className="flex space-x-4 mb-8">
              <div className="flex-1">
                <label htmlFor="framework" className="block text-sm mb-2">Framework</label>
                <select 
                  id="framework"
                  className="w-full px-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 focus:border-terminal-blue focus:outline-none"
                >
                  <option value="static">Static HTML/CSS/JS</option>
                  <option value="react">React</option>
                  <option value="vue">Vue</option>
                  <option value="angular">Angular</option>
                  <option value="svelte">Svelte</option>
                </select>
              </div>
              
              <div className="flex-1">
                <label htmlFor="buildCommand" className="block text-sm mb-2">Build Command (Optional)</label>
                <input 
                  type="text"
                  id="buildCommand"
                  placeholder="npm run build"
                  className="w-full px-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 focus:border-terminal-blue focus:outline-none"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                onClick={() => setCurrentStep(2)}
                className="px-4 py-2 rounded-md bg-terminal-blue text-white flex items-center gap-2 hover:bg-terminal-blue/80 transition-colors"
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Upload Files</h2>
            
            <div className="mb-8">
              <DragDropUpload 
                onUpload={handleFileUpload}
                uploadingState={uploadingState}
                successMessage={uploadSuccess ? "Files uploaded successfully!" : ""}
              />
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 rounded-md border border-terminal-gray/50 text-white flex items-center gap-2 hover:bg-terminal-dark/50 transition-colors"
              >
                <ChevronLeft size={18} />
                Previous Step
              </button>
              
              <button 
                onClick={() => setCurrentStep(3)}
                disabled={!uploadSuccess}
                className={`px-4 py-2 rounded-md bg-terminal-blue text-white flex items-center gap-2 transition-colors
                ${!uploadSuccess ? 'opacity-50 cursor-not-allowed' : 'hover:bg-terminal-blue/80'}`}
              >
                Next Step
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold mb-6">Deploy Project</h2>
            
            <div className="glass-panel rounded-lg p-6 mb-8">
              <h3 className="font-medium mb-4 flex items-center">
                <Globe size={18} className="mr-2 text-terminal-blue" />
                Project Summary
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between border-b border-terminal-gray/20 pb-2">
                  <span className="text-sm text-white/70">Project Name:</span>
                  <span className="text-sm font-medium">{projectName || 'Unnamed Project'}</span>
                </div>
                
                <div className="flex justify-between border-b border-terminal-gray/20 pb-2">
                  <span className="text-sm text-white/70">Files:</span>
                  <span className="text-sm font-medium">Uploaded</span>
                </div>
                
                <div className="flex justify-between border-b border-terminal-gray/20 pb-2">
                  <span className="text-sm text-white/70">URL:</span>
                  <span className="text-sm font-medium text-terminal-blue">{projectUrl || 'Not generated yet'}</span>
                </div>
              </div>
              
              {!isDeploying && !deploymentSuccess && (
                <button 
                  onClick={handleDeploy}
                  className="w-full py-2 rounded-md bg-terminal-blue text-white font-medium hover:bg-terminal-blue/80 transition-colors"
                >
                  Deploy Project
                </button>
              )}
              
              {isDeploying && (
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Deploying...</span>
                    <span className="text-xs text-white/50">Please wait</span>
                  </div>
                  <div className="w-full h-2 bg-terminal-dark rounded-full overflow-hidden">
                    <div className="h-full bg-terminal-blue rounded-full animate-progress-fill" style={{ width: '0%' }}></div>
                  </div>
                </div>
              )}
              
              {deploymentSuccess && (
                <div className="flex flex-col items-center text-terminal-green space-y-3">
                  <CheckCircle size={36} />
                  <span>Deployment successful!</span>
                  <a 
                    href={projectUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-terminal-blue hover:underline flex items-center gap-1 text-sm"
                  >
                    Visit site <Globe size={14} />
                  </a>
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentStep(2)}
                className={`px-4 py-2 rounded-md border border-terminal-gray/50 text-white flex items-center gap-2 transition-colors
                ${isDeploying ? 'opacity-50 cursor-not-allowed' : 'hover:bg-terminal-dark/50'}`}
                disabled={isDeploying}
              >
                <ChevronLeft size={18} />
                Previous Step
              </button>
              
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 text-white flex items-center gap-2 hover:bg-terminal-dark/70 transition-colors"
              >
                Go to Dashboard
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <Layout>
      <div className="page-transition">
        <div className="flex items-center mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="mr-4 p-2 rounded-full bg-terminal-dark border border-terminal-gray/30 text-white/70 hover:text-terminal-blue hover:border-terminal-blue/50 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold">Upload New Project</h1>
        </div>
        
        <div className="glass-panel rounded-lg p-8 max-w-3xl mx-auto">
          <div className="flex items-center mb-8 relative">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`z-10 flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all
                  ${currentStep > index + 1 
                    ? 'bg-terminal-blue text-black' 
                    : currentStep === index + 1 
                      ? 'bg-terminal-blue/20 border border-terminal-blue text-terminal-blue' 
                      : 'bg-terminal-dark border border-terminal-gray/50 text-white/50'}`}
                >
                  {currentStep > index + 1 ? <CheckCircle size={18} /> : index + 1}
                </div>
                
                {index < totalSteps - 1 && (
                  <div 
                    className={`flex-1 h-1 mx-2 transition-all
                    ${currentStep > index + 1 
                      ? 'bg-terminal-blue' 
                      : 'bg-terminal-dark'}`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {renderStep()}
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
