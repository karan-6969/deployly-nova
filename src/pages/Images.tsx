
import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Image as ImageIcon, 
  RefreshCw, 
  Key, 
  Search, 
  Plus, 
  Eye, 
  Trash,
  CheckCircle, 
  AlertCircle
} from 'lucide-react';
import Layout from '../components/Layout';
import DragDropUpload from '../components/DragDropUpload';
import { CopyButton } from '../components/TerminalSection';
import { getStoredImages, getApiKey, StoredImage } from '../services/mockData';

const Images = () => {
  const [images, setImages] = useState<StoredImage[]>([]);
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingState, setUploadingState] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesData, apiKeyData] = await Promise.all([
          getStoredImages(),
          getApiKey()
        ]);
        
        setImages(imagesData);
        setApiKey(apiKeyData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleUpload = (files: FileList) => {
    setUploadingState(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadingState(false);
      setUploadSuccess(true);
      
      // Reset upload state after a delay
      setTimeout(() => {
        setUploadSuccess(false);
      }, 3000);
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="page-transition">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Image Storage</h1>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input 
                type="text" 
                placeholder="Search images..." 
                className="pl-10 pr-4 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 focus:border-terminal-blue focus:outline-none w-56 text-sm"
              />
            </div>
            
            <button className="p-2 rounded-md bg-terminal-dark border border-terminal-gray/50 text-white/70 hover:text-white hover:border-terminal-gray transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="glass-panel rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <ImageIcon size={18} className="mr-2 text-terminal-blue" />
                Uploaded Images
              </h2>
              
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square rounded-md bg-terminal-dark/80 animate-pulse"></div>
                  ))}
                </div>
              ) : (
                <>
                  {images.length === 0 ? (
                    <div className="text-center py-12">
                      <ImageIcon size={48} className="text-terminal-gray/50 mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No images uploaded yet</h3>
                      <p className="text-sm text-white/50">Upload your first image to get started</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {images.map((image) => (
                        <div 
                          key={image.id} 
                          className="aspect-square rounded-md overflow-hidden relative group cursor-pointer card-hover"
                          onClick={() => setSelectedImage(image)}
                        >
                          <img 
                            src={image.url} 
                            alt={image.name} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                            <span className="text-sm font-medium truncate">{image.name}</span>
                            <span className="text-xs text-white/70">{image.size}</span>
                          </div>
                        </div>
                      ))}
                      
                      <div className="aspect-square rounded-md border-2 border-dashed border-terminal-gray/30 flex flex-col items-center justify-center p-3 hover:border-terminal-blue/50 transition-colors group cursor-pointer">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center mb-2 bg-terminal-dark/80 group-hover:bg-terminal-blue/10 transition-all">
                          <Plus size={20} className="text-terminal-blue" />
                        </div>
                        <span className="text-xs text-center">Upload Image</span>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div>
            <div className="glass-panel rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Key size={18} className="mr-2 text-terminal-yellow" />
                Your API Key
              </h2>
              
              <div className="bg-terminal-dark rounded-md p-3 font-mono text-sm mb-4 border border-terminal-gray/30 break-all">
                {isLoading ? (
                  <div className="h-5 bg-terminal-gray/30 rounded animate-pulse"></div>
                ) : (
                  apiKey
                )}
              </div>
              
              <div className="flex space-x-2">
                <CopyButton text={apiKey} />
                <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-terminal-dark border border-terminal-gray/50 text-sm text-white/70 hover:bg-terminal-gray/30 hover:text-white transition-colors">
                  <RefreshCw size={14} />
                  <span>Regenerate</span>
                </button>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
              
              <DragDropUpload 
                onUpload={handleUpload}
                accept="image/*"
                uploadingState={uploadingState}
                successMessage={uploadSuccess ? "Image uploaded successfully!" : ""}
              />
            </div>
          </div>
        </div>
        
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="glass-panel rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scale-in">
              <div className="flex justify-between items-center p-4 border-b border-terminal-gray/30">
                <h3 className="font-medium">{selectedImage.name}</h3>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="p-1 rounded-full hover:bg-terminal-gray/30 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-terminal-dark/50">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.name} 
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>
              
              <div className="p-4 border-t border-terminal-gray/30">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-xs text-white/50 block mb-1">Size</span>
                    <span className="text-sm">{selectedImage.size}</span>
                  </div>
                  <div>
                    <span className="text-xs text-white/50 block mb-1">Uploaded</span>
                    <span className="text-sm">{selectedImage.uploadedAt}</span>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-terminal-dark border border-terminal-gray/50 text-sm text-white/70 hover:bg-terminal-gray/30 hover:text-white transition-colors">
                    <Eye size={16} />
                    <span>View Original</span>
                  </button>
                  
                  <CopyButton text={selectedImage.url} />
                  
                  <button className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-md bg-terminal-red/10 border border-terminal-red/30 text-sm text-terminal-red hover:bg-terminal-red/20 transition-colors">
                    <Trash size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Images;
