
import React, { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  text: string;
  className?: string;
  speed?: number;
}

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ 
  text, 
  className = "", 
  speed = 50 
}) => {
  const [visibleText, setVisibleText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setVisibleText('');
    setIsComplete(false);
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setVisibleText((prev) => prev + text.charAt(index));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return (
    <div className={`inline-block ${className}`}>
      <span>{visibleText}</span>
      {!isComplete && <span className="inline-block w-2 h-5 bg-terminal-blue ml-1 animate-cursor-blink" />}
    </div>
  );
};

export default AnimatedTitle;
