import React from 'react';
import { getStatusColorClass } from '../../utils/helpers';

const StatusBadge = ({ status, className = '' }) => {
  if (!status) return null;
  
  const colorClass = getStatusColorClass(status);
  const displayStatus = status === "Dipinjam" ? "Disetujui" : status;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass} ${className}`}>
      {displayStatus}
    </span>
  );
};

export default StatusBadge;
