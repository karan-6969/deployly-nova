
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
  const [currentResponseLine, setCurrentResponseLine] = useState<number>(0);
  const [typingText, setTypingText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [commandDone, setCommandDone] = useState<boolean[]>([]);
  const [showEasterEgg, setShowEasterEgg] = useState<boolean>(false);
  
  // Initialize all commands as not done
  useEffect(() => {
    setCommandDone(new Array(commands.length).fill(false));
  }, [commands.length]);
  
  // Handle typing effect for command
  useEffect(() => {
    if (visibleCommands >= commands.length || !autoType) return;
    
    const currentCommand = commands[visibleCommands];
    let timer: NodeJS.Timeout;
    
    if (!isTyping && !commandDone[visibleCommands]) {
      setIsTyping(true);
      let i = 0;
      
      // Type out the command with variable speed for more realism
      timer = setInterval(() => {
        if (i <= currentCommand.command.length) {
          setTypingText(currentCommand.command.substring(0, i));
          i++;
          
          // Random typing speed variations for more human-like effect
          if (Math.random() > 0.7) {
            clearInterval(timer);
            setTimeout(() => {
              timer = setInterval(() => {
                if (i <= currentCommand.command.length) {
                  setTypingText(currentCommand.command.substring(0, i));
                  i++;
                } else {
                  clearInterval(timer);
                  setIsTyping(false);
                  
                  // Mark this command as typed
                  const newCommandDone = [...commandDone];
                  newCommandDone[visibleCommands] = true;
                  setCommandDone(newCommandDone);
                  
                  // After typing the command, wait before showing the response
                  setTimeout(() => {
                    setCurrentResponseLine(0);
                    setTimeout(() => {
                      setVisibleCommands(prev => prev + 1);
                      
                      // Easter egg - occasionally show a "secret" message
                      if (Math.random() > 0.7 && !showEasterEgg) {
                        setShowEasterEgg(true);
                        setTimeout(() => setShowEasterEgg(false), 3000);
                      }
                    }, currentCommand.delay || 1000);
                  }, 300);
                }
              }, typingSpeed + Math.random() * 50);
            }, 200 + Math.random() * 300);
          }
        } else {
          clearInterval(timer);
          setIsTyping(false);
          
          // Mark this command as typed
          const newCommandDone = [...commandDone];
          newCommandDone[visibleCommands] = true;
          setCommandDone(newCommandDone);
          
          // After typing the command, wait before showing the response
          setTimeout(() => {
            setCurrentResponseLine(0);
            setTimeout(() => {
              setVisibleCommands(prev => prev + 1);
            }, currentCommand.delay || 1000);
          }, 300);
        }
      }, typingSpeed);
    }
    
    return () => clearInterval(timer);
  }, [visibleCommands, isTyping, commandDone, autoType, commands, typingSpeed, showEasterEgg]);
  
  // Handle showing response lines with delay
  useEffect(() => {
    if (
      visibleCommands <= 0 || 
      visibleCommands > commands.length || 
      !commandDone[visibleCommands - 1]
    ) return;
    
    const prevCommand = commands[visibleCommands - 1];
    const responseLines = prevCommand.response.length;
    
    if (currentResponseLine < responseLines) {
      // Variable delay between response lines for more realism
      const delay = prevCommand.isCode ? 100 : 100 + Math.random() * 300;
      
      const timer = setTimeout(() => {
        setCurrentResponseLine(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentResponseLine, visibleCommands, commandDone, commands]);
  
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
            
            {(!showPrompt || commandDone[cmdIndex]) && cmdIndex === visibleCommands - 1 && (
              <div className="text-white/80 pl-5 mt-1 space-y-1">
                {cmd.response.slice(0, currentResponseLine).map((line, lineIndex) => (
                  <div 
                    key={lineIndex} 
                    className={`animate-fade-in ${line.includes('✅') ? 'text-terminal-green' : ''} ${line.includes('⚠️') ? 'text-terminal-yellow' : ''} ${cmd.isCode ? 'bg-terminal-dark/70 px-2 py-1 rounded' : ''}`}
                    style={{ animationDelay: `${lineIndex * 0.1}s` }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
            
            {(!showPrompt || commandDone[cmdIndex]) && cmdIndex < visibleCommands - 1 && (
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
            )}
          </div>
        ))}
        
        {visibleCommands < commands.length && showPrompt && (
          <div className="flex items-start">
            <span className="text-terminal-green mr-2">
              <ChevronRight size={14} className="inline" />
            </span>
            <span className="whitespace-pre-wrap break-all">
              {typingText}
              <span className="animate-cursor-blink inline-block w-2 h-4 bg-terminal-blue ml-0.5"></span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface CopyCommandButtonProps {
  text: string;
}

export const CopyCommandButton: React.FC<CopyCommandButtonProps> = ({ text }) => {
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

export default DynamicTerminal;
