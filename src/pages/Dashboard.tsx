
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  ExternalLink, 
  Copy, 
  CheckCircle,
  MoreHorizontal 
} from 'lucide-react';
import Layout from '../components/Layout';
import StatusBadge from '../components/StatusBadge';
import { getDeployedSites, DeployedSite } from '../services/mockData';

const Dashboard = () => {
  const [sites, setSites] = useState<DeployedSite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSites = async () => {
      try {
        const data = await getDeployedSites();
        setSites(data);
      } catch (error) {
        console.error('Error fetching sites:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSites();
  }, []);
  
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="page-transition">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 focus:border-terminal-blue focus:outline-none w-64 text-sm"
              />
            </div>
            
            <Link 
              to="/upload" 
              className="px-4 py-2 rounded-md bg-terminal-blue text-white flex items-center gap-2 hover:bg-terminal-blue/80 transition-colors"
            >
              <Plus size={18} />
              <span>New Project</span>
            </Link>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="glass-panel rounded-lg h-40 animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sites.map((site) => (
              <div 
                key={site.id} 
                className="glass-panel rounded-lg overflow-hidden card-hover"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold truncate">{site.name}</h3>
                    <StatusBadge status={site.status} />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <span className="text-xs text-white/50 mr-2">URL:</span>
                    <span className="text-sm text-terminal-blue truncate flex-1">{site.url}</span>
                    <button 
                      onClick={() => handleCopyUrl(site.url)}
                      className="ml-2 p-1 rounded hover:bg-terminal-gray/30 transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl === site.url ? (
                        <CheckCircle size={16} className="text-terminal-green" />
                      ) : (
                        <Copy size={16} className="text-white/70" />
                      )}
                    </button>
                    <a 
                      href={site.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="ml-1 p-1 rounded hover:bg-terminal-gray/30 transition-colors"
                      title="Open site"
                    >
                      <ExternalLink size={16} className="text-white/70" />
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">Deployed {site.deployedAt}</span>
                    <span className="text-white/50">{site.visits} views</span>
                  </div>
                </div>
                
                <div className="border-t border-terminal-gray/20 p-3 flex justify-between items-center bg-terminal-dark/30">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">
                      {site.status === 'live' ? 'Deployed' : site.status === 'building' ? 'Building' : 'Failed'}
                    </span>
                  </div>
                  
                  <button className="p-1 rounded hover:bg-terminal-gray/30 transition-colors">
                    <MoreHorizontal size={16} className="text-white/70" />
                  </button>
                </div>
              </div>
            ))}
            
            <div className="glass-panel rounded-lg border-2 border-dashed border-terminal-gray/30 flex flex-col items-center justify-center p-6 hover:border-terminal-blue/50 transition-colors group cursor-pointer">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3 bg-terminal-dark/80 group-hover:bg-terminal-blue/10 transition-all">
                <Plus size={24} className="text-terminal-blue" />
              </div>
              <h3 className="font-medium mb-1">Add New Project</h3>
              <p className="text-sm text-white/50">Deploy a new website</p>
            </div>
          </div>
        )}
        
        <div className="mt-12 glass-panel rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          
          <div className="space-y-4">
            <div className="flex items-center py-2 border-b border-terminal-gray/20">
              <div className="w-8 h-8 rounded bg-terminal-blue/10 flex items-center justify-center mr-3">
                <CheckCircle size={16} className="text-terminal-blue" />
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">portfolio-site</span> deployed successfully
                </div>
                <div className="text-xs text-white/50">2 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-center py-2 border-b border-terminal-gray/20">
              <div className="w-8 h-8 rounded bg-terminal-yellow/10 flex items-center justify-center mr-3">
                <Plus size={16} className="text-terminal-yellow" />
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">landing-page</span> site created
                </div>
                <div className="text-xs text-white/50">3 hours ago</div>
              </div>
            </div>
            
            <div className="flex items-center py-2">
              <div className="w-8 h-8 rounded bg-terminal-red/10 flex items-center justify-center mr-3">
                <ExternalLink size={16} className="text-terminal-red" />
              </div>
              <div className="flex-1">
                <div className="text-sm">
                  <span className="font-medium">ecommerce-demo</span> deployment failed
                </div>
                <div className="text-xs text-white/50">3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
