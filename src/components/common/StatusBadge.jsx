import React from 'react';
import { getStatusColor } from '../../constants/statusConfig';

const StatusBadge = ({ status, size = 'md', showDot = true }) => {
  const colors = getStatusColor(status);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full ${colors.bg} ${colors.text} ${sizeClasses[size]}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${colors.dot}`} />
      )}
      {status}
    </span>
  );
};

export default StatusBadge;
