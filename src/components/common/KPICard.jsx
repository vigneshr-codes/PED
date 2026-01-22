import React from 'react';

const KPICard = ({
  title,
  value,
  icon: Icon,
  color = 'blue',
  trend,
  trendValue,
  onClick
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      iconBg: 'bg-blue-100',
      icon: 'text-blue-600',
      value: 'text-blue-700'
    },
    green: {
      bg: 'bg-green-50',
      iconBg: 'bg-green-100',
      icon: 'text-green-600',
      value: 'text-green-700'
    },
    yellow: {
      bg: 'bg-amber-50',
      iconBg: 'bg-amber-100',
      icon: 'text-amber-600',
      value: 'text-amber-700'
    },
    orange: {
      bg: 'bg-orange-50',
      iconBg: 'bg-orange-100',
      icon: 'text-orange-600',
      value: 'text-orange-700'
    },
    red: {
      bg: 'bg-red-50',
      iconBg: 'bg-red-100',
      icon: 'text-red-600',
      value: 'text-red-700'
    },
    purple: {
      bg: 'bg-purple-50',
      iconBg: 'bg-purple-100',
      icon: 'text-purple-600',
      value: 'text-purple-700'
    },
    gray: {
      bg: 'bg-gray-50',
      iconBg: 'bg-gray-100',
      icon: 'text-gray-600',
      value: 'text-gray-700'
    }
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-5 transition-all duration-300 hover:shadow-lg hover:border-gray-200 ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className={`mt-2 text-3xl font-bold ${colors.value}`}>{value}</p>
          {trend && (
            <p className={`mt-2 text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${colors.iconBg}`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;
