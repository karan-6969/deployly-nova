
import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, XCircle, File } from 'lucide-react';

interface DragDropUploadProps {
  onUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  uploadingState?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({
  onUpload,
  accept = '*',
  multiple = false,
  maxSize = 50, // Default 50MB
  uploadingState = false,
  errorMessage,
  successMessage
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  const handleFiles = (files: FileList) => {
    // Check file size if maxSize is provided
    let totalSize = 0;
    for (let i = 0; i < files.length; i++) {
      totalSize += files[i].size / (1024 * 1024); // Convert to MB
    }
    
    if (totalSize > maxSize) {
      // Handle size exceeded
      return;
    }
    
    // Start upload animation
    simulateProgress();
    
    // Pass files to the parent component
    onUpload(files);
  };
  
  const simulateProgress = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  return (
    <div className="w-full">
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer group
        ${isDragging 
          ? 'border-terminal-blue bg-terminal-blue/5' 
          : 'border-terminal-gray/50 hover:border-terminal-blue/50 hover:bg-terminal-dark/50'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center py-6">
          {!uploadingState && !errorMessage && !successMessage && (
            <>
              <div className="mb-4 p-3 rounded-full bg-terminal-dark/80 group-hover:bg-terminal-blue/10 transition-colors">
                <Upload size={28} className="text-terminal-blue" />
              </div>
              <h3 className="text-lg font-medium mb-2">Drag files here or click to upload</h3>
              <p className="text-sm text-white/50">
                {multiple ? 'Upload multiple files' : 'Upload a single file'} up to {maxSize}MB
              </p>
            </>
          )}
          
          {uploadingState && (
            <div className="w-full">
              <div className="flex items-center mb-2">
                <File size={20} className="mr-2 text-terminal-blue" />
                <span className="text-sm">Uploading...</span>
                <span className="ml-auto text-xs text-white/50">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-terminal-dark/80 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-terminal-blue rounded-full animate-progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {successMessage && (
            <div className="flex items-center text-terminal-green">
              <CheckCircle size={24} className="mr-2" />
              <span>{successMessage}</span>
            </div>
          )}
          
          {errorMessage && (
            <div className="flex items-center text-terminal-red">
              <XCircle size={24} className="mr-2" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DragDropUpload;
