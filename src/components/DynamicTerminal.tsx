import React, { useState, useEffect } from 'react';
import { Copy, CheckCircle, ChevronRight, Terminal as TerminalIcon } from 'lucide-react';

interface DynamicTerminalProps {
  commands: Array<{
    command: string;
    response: string[];
    delay?: number;
    showCursor?: boolean;
    isCode?: boolean;
  }>;
  title?: string;
  autoType?: boolean;
  typingSpeed?: number;
  showPrompt?: boolean;
  className?: string;
}

const DynamicTerminal: React.FC<DynamicTerminalProps> = ({ 
  commands, 
  title = "terminal", 
  autoType = true, 
  typingSpeed = 30,
  showPrompt = true,
  className = ""
}) => {
  const [visibleCommands, setVisibleCommands] = useState<number>(0);
  const [commandDone, setCommandDone] = useState<boolean[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);
  
  useEffect(() => {
    setCommandDone(new Array(commands.length).fill(false));
  }, [commands.length]);
  
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setVisibleCommands(prev => (prev < commands.length ? prev + 1 : prev));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [commands.length]);
  
  return (
    <div className={`terminal-container ${className} relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-terminal-red inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-terminal-yellow inline-block"></span>
          <span className="w-3 h-3 rounded-full bg-terminal-green inline-block"></span>
          <span className="ml-2 text-xs text-white/50 flex items-center gap-1">
            <TerminalIcon size={12} className="opacity-70" />
            {title}
          </span>
        </div>
      </div>
      
      {showEasterEgg && (
        <div className="absolute top-12 right-4 text-xs bg-terminal-dark/90 p-2 rounded border border-terminal-blue/50 text-terminal-blue animate-fade-in">
          🔍 You found a secret! You're paying attention!
        </div>
      )}
      
      <div className="space-y-1 font-mono text-sm">
        <div className="text-terminal-yellow font-bold">[ Bring the cursor here and press Enter to see the magic! ]</div>
        {commands.slice(0, visibleCommands).map((cmd, cmdIndex) => (
          <div key={cmdIndex} className="mb-3">
            {showPrompt && (
              <div className="flex items-start">
                <span className="text-terminal-green mr-2 flex-shrink-0">
                  <ChevronRight size={14} className="inline" />
                </span>
                <span className="whitespace-pre-wrap break-all">{cmd.command}</span>
              </div>
            )}
            
            <div className="text-white/80 pl-5 mt-1 space-y-1">
              {cmd.response.map((line, lineIndex) => (
                <div 
                  key={lineIndex} 
                  className={`${line.includes('✅') ? 'text-terminal-green' : ''} ${line.includes('⚠️') ? 'text-terminal-yellow' : ''} ${cmd.isCode ? 'bg-terminal-dark/70 px-2 py-1 rounded' : ''}`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicTerminal;
