import React from 'react';
import { getStatusColor } from '../../constants/statusConfig';

const StatusBadge = ({ status, size = 'md', showDot = true }) => {
  const colors = getStatusColor(status);

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full transition-all duration-200 hover:shadow-sm ${colors.bg} ${colors.text} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span className={`w-2 h-2 rounded-full mr-2 ${colors.dot} animate-pulse`} />
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
