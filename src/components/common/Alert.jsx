import React from 'react';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';

const variants = {
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-500'
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-500'
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    text: 'text-amber-800',
    icon: AlertTriangle,
    iconColor: 'text-amber-500'
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    text: 'text-red-800',
    icon: XCircle,
    iconColor: 'text-red-500'
  }
};

const Alert = ({ variant = 'info', title, children, onClose }) => {
  const styles = variants[variant];
  const Icon = styles.icon;

  return (
    <div className={`rounded-2xl border p-4 ${styles.bg} ${styles.border}`}>
      <div className="flex">
        <div className={`flex-shrink-0 ${styles.iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-semibold ${styles.text}`}>{title}</h3>
          )}
          {children && (
            <div className={`mt-1 text-sm ${styles.text}`}>{children}</div>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto -mx-1.5 -my-1.5 p-1.5 rounded-lg hover:bg-white/50 transition-colors ${styles.text}`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
