
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TerminalSection, { CopyButton } from '../components/TerminalSection';
import { Book, ChevronRight, Code, Copy, Key } from 'lucide-react';
import { getApiKey } from '../services/mockData';

const ApiDocs = () => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('authentication');
  
  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const key = await getApiKey();
        setApiKey(key);
      } catch (error) {
        console.error('Error fetching API key:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchApiKey();
  }, []);
  
  const sections = [
    { id: 'authentication', title: 'Authentication' },
    { id: 'upload', title: 'Upload Images' },
    { id: 'list', title: 'List Images' },
    { id: 'delete', title: 'Delete Images' },
    { id: 'get', title: 'Get Image' },
  ];
  
  const getCommandsForSection = (sectionId: string) => {
    switch (sectionId) {
      case 'authentication':
        return [
          {
            prompt: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.deployly.app/v1/images',
            output: (
              <div>
                <p className="mb-3">Replace <span className="text-terminal-yellow">YOUR_API_KEY</span> with your actual API key:</p>
                <div className="bg-terminal-black/50 p-2 rounded mb-3 font-mono text-sm overflow-x-auto">
                  <span className="text-terminal-green">Authorization: Bearer </span>
                  <span className="text-terminal-yellow">{apiKey}</span>
                </div>
                <p>Include this header in all your API requests to authenticate.</p>
              </div>
            )
          }
        ];
      
      case 'upload':
        return [
          {
            prompt: 'curl -X POST -H "Authorization: Bearer YOUR_API_KEY" -F "file=@/path/to/image.jpg" https://api.deployly.app/v1/images/upload',
            output: (
              <div>
                <p className="mb-3">This will upload an image and return a JSON response with the URL:</p>
                <div className="bg-terminal-black/50 p-2 rounded mb-3 font-mono text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": {
    "id": "img_5f3e8c2a7b9d",
    "url": "https://images.deployly.app/5f3e8c2a7b9d.jpg",
    "name": "image.jpg",
    "size": "1.2 MB",
    "uploaded_at": "2023-08-15T14:32:10Z"
  }
}`}
                </div>
              </div>
            )
          }
        ];
        
      case 'list':
        return [
          {
            prompt: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.deployly.app/v1/images',
            output: (
              <div>
                <p className="mb-3">Returns a list of all your uploaded images:</p>
                <div className="bg-terminal-black/50 p-2 rounded mb-3 font-mono text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": [
    {
      "id": "img_5f3e8c2a7b9d",
      "url": "https://images.deployly.app/5f3e8c2a7b9d.jpg",
      "name": "image.jpg",
      "size": "1.2 MB",
      "uploaded_at": "2023-08-15T14:32:10Z"
    },
    {
      "id": "img_6g4f9d3b8c0e",
      "url": "https://images.deployly.app/6g4f9d3b8c0e.png",
      "name": "logo.png",
      "size": "450 KB",
      "uploaded_at": "2023-08-14T09:18:05Z"
    }
  ],
  "total": 2
}`}
                </div>
              </div>
            )
          }
        ];
        
      case 'delete':
        return [
          {
            prompt: 'curl -X DELETE -H "Authorization: Bearer YOUR_API_KEY" https://api.deployly.app/v1/images/img_5f3e8c2a7b9d',
            output: (
              <div>
                <p className="mb-3">Deletes an image by its ID:</p>
                <div className="bg-terminal-black/50 p-2 rounded mb-3 font-mono text-sm overflow-x-auto">
                  {`{
  "success": true,
  "message": "Image deleted successfully"
}`}
                </div>
              </div>
            )
          }
        ];
        
      case 'get':
        return [
          {
            prompt: 'curl -H "Authorization: Bearer YOUR_API_KEY" https://api.deployly.app/v1/images/img_5f3e8c2a7b9d',
            output: (
              <div>
                <p className="mb-3">Gets metadata for a specific image:</p>
                <div className="bg-terminal-black/50 p-2 rounded mb-3 font-mono text-sm overflow-x-auto">
                  {`{
  "success": true,
  "data": {
    "id": "img_5f3e8c2a7b9d",
    "url": "https://images.deployly.app/5f3e8c2a7b9d.jpg",
    "name": "image.jpg",
    "size": "1.2 MB",
    "uploaded_at": "2023-08-15T14:32:10Z"
  }
}`}
                </div>
                <p className="mb-3">To get the actual image file, use the URL directly:</p>
                <div className="bg-terminal-black/50 p-2 rounded font-mono text-sm">
                  <span className="text-terminal-green">https://images.deployly.app/5f3e8c2a7b9d.jpg</span>
                </div>
              </div>
            )
          }
        ];
        
      default:
        return [];
    }
  };
  
  return (
    <Layout>
      <div className="page-transition">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">API Documentation</h1>
          
          <div className="flex items-center gap-3">
            <CopyButton text={apiKey} />
            
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 text-white/70 hover:text-white hover:border-terminal-gray transition-colors flex items-center gap-2"
            >
              <Book size={18} />
              <span>Full Documentation</span>
            </a>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="glass-panel rounded-lg p-4 sticky top-8">
              <h2 className="text-lg font-semibold mb-4">API Reference</h2>
              
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button 
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors flex items-center justify-between
                        ${activeSection === section.id 
                          ? 'bg-terminal-blue/10 text-terminal-blue' 
                          : 'text-white/70 hover:bg-terminal-dark/80 hover:text-white'}`}
                    >
                      <span>{section.title}</span>
                      {activeSection === section.id && <ChevronRight size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 pt-6 border-t border-terminal-gray/30">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded bg-terminal-blue/10 flex items-center justify-center mr-3">
                    <Key size={16} className="text-terminal-blue" />
                  </div>
                  <span className="font-medium">Your API Key</span>
                </div>
                
                {isLoading ? (
                  <div className="h-6 bg-terminal-gray/30 rounded animate-pulse"></div>
                ) : (
                  <div className="bg-terminal-dark rounded-md p-2 font-mono text-xs mb-2 border border-terminal-gray/30 break-all">
                    {apiKey}
                  </div>
                )}
                
                <CopyButton text={apiKey} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Code size={20} className="mr-2 text-terminal-blue" />
                {sections.find(s => s.id === activeSection)?.title || 'API Reference'}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                {activeSection === 'authentication' && (
                  <div className="mb-6">
                    <p className="mb-4">
                      To authenticate with the API, you need to include your API key in the <code>Authorization</code> header of your requests. The API uses Bearer token authentication.
                    </p>
                  </div>
                )}
                
                {activeSection === 'upload' && (
                  <div className="mb-6">
                    <p className="mb-4">
                      Upload images to your storage with a simple POST request. The API accepts form data with a file field.
                    </p>
                  </div>
                )}
                
                {activeSection === 'list' && (
                  <div className="mb-6">
                    <p className="mb-4">
                      Retrieve a list of all images in your storage. The response includes metadata and URLs for each image.
                    </p>
                  </div>
                )}
                
                {activeSection === 'delete' && (
                  <div className="mb-6">
                    <p className="mb-4">
                      Remove images from your storage when they're no longer needed. This action cannot be undone.
                    </p>
                  </div>
                )}
                
                {activeSection === 'get' && (
                  <div className="mb-6">
                    <p className="mb-4">
                      Get detailed information about a specific image, including its URL for direct access.
                    </p>
                  </div>
                )}
                
                <TerminalSection 
                  title={`Example: ${sections.find(s => s.id === activeSection)?.title || 'API'}`}
                  commands={getCommandsForSection(activeSection)}
                />
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Code Examples</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-terminal-dark rounded-lg p-4 border border-terminal-gray/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-terminal-blue">JavaScript</span>
                    <CopyButton text={`fetch('https://api.deployly.app/v1/images', {
  headers: {
    'Authorization': 'Bearer ${apiKey}'
  }
})
.then(response => response.json())
.then(data => console.log(data));`} />
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-white/90">{`fetch('https://api.deployly.app/v1/images', {
  headers: {
    'Authorization': 'Bearer ${apiKey.substring(0, 15)}...'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}</code>
                  </pre>
                </div>
                
                <div className="bg-terminal-dark rounded-lg p-4 border border-terminal-gray/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-terminal-green">Python</span>
                    <CopyButton text={`import requests

headers = {
    'Authorization': 'Bearer ${apiKey}'
}

response = requests.get('https://api.deployly.app/v1/images', headers=headers)
data = response.json()
print(data)`} />
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-white/90">{`import requests

headers = {
    'Authorization': 'Bearer ${apiKey.substring(0, 15)}...'
}

response = requests.get(
    'https://api.deployly.app/v1/images', 
    headers=headers
)
data = response.json()
print(data)`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApiDocs;
