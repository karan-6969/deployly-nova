
import React from 'react';

type StatusType = 'live' | 'building' | 'failed';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusClasses = () => {
    switch (status) {
      case 'live':
        return 'bg-terminal-green/20 text-terminal-green border-terminal-green/30';
      case 'building':
        return 'bg-terminal-yellow/20 text-terminal-yellow border-terminal-yellow/30';
      case 'failed':
        return 'bg-terminal-red/20 text-terminal-red border-terminal-red/30';
      default:
        return 'bg-terminal-gray/20 text-white/50 border-terminal-gray/30';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'live':
        return (
          <span className="w-2 h-2 rounded-full bg-terminal-green inline-block mr-1.5 animate-pulse"></span>
        );
      case 'building':
        return (
          <span className="w-2 h-2 rounded-full bg-terminal-yellow inline-block mr-1.5 animate-pulse"></span>
        );
      case 'failed':
        return (
          <span className="w-2 h-2 rounded-full bg-terminal-red inline-block mr-1.5"></span>
        );
      default:
        return null;
    }
  };
  
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${getStatusClasses()}`}>
      {getStatusIcon()}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
