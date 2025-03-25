
import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface TerminalSectionProps {
  title: string;
  commands: Array<{
    prompt: string;
    output?: React.ReactNode;
  }>;
}

const TerminalSection: React.FC<TerminalSectionProps> = ({ title, commands }) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  
  useEffect(() => {
    const totalLines = commands.length;
    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < totalLines) {
        currentLine += 1;
        setVisibleLines(currentLine);
      } else {
        clearInterval(interval);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, [commands.length]);
  
  return (
    <div className="terminal-container">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-terminal-red inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-terminal-yellow inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-terminal-green inline-block"></span>
          <span className="ml-2 text-xs text-white/50">{title}</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {commands.slice(0, visibleLines).map((command, index) => (
          <div key={index} className={`animate-fade-in-right`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="command-prompt">
              {command.prompt}
            </div>
            
            {command.output && (
              <div className="pl-5 pt-1 pb-2 text-white/80">
                {command.output}
              </div>
            )}
          </div>
        ))}
        
        {visibleLines < commands.length && (
          <div className="command-prompt blink-cursor"></div>
        )}
      </div>
    </div>
  );
};

interface CopyButtonProps {
  text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button 
      onClick={handleCopy}
      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-terminal-dark border border-terminal-gray/50 text-sm text-white/70 hover:bg-terminal-gray/30 hover:text-white transition-colors"
    >
      {copied ? (
        <>
          <CheckCircle size={14} className="text-terminal-green" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={14} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
};

export default TerminalSection;
