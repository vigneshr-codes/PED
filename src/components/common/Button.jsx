import React from 'react';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  success: 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md',
  outline: 'border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700',
  ghost: 'hover:bg-gray-100 text-gray-700'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base'
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
        </>
      )}
    </button>
  );
};

export default Button;
