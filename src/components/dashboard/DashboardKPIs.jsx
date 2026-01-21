import React from 'react';
import { KPICard } from '../common';

// Icons as SVG components
const FolderIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const CheckCircleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ExclamationIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
);

const DocumentIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const DashboardKPIs = ({ kpis, onKPIClick }) => {
  const kpiConfig = [
    {
      key: 'totalActive',
      title: 'Total Active',
      value: kpis.totalActive,
      icon: FolderIcon,
      color: 'blue'
    },
    {
      key: 'scopeCompleted',
      title: 'Scope Completed',
      value: kpis.scopeCompleted,
      icon: CheckCircleIcon,
      color: 'green'
    },
    {
      key: 'estimatesInReview',
      title: 'Estimates in Review',
      value: kpis.estimatesInReview,
      icon: DocumentIcon,
      color: 'purple'
    },
    {
      key: 'veWaitingApproval',
      title: 'VE Waiting Approval',
      value: kpis.veWaitingApproval,
      icon: ClockIcon,
      color: 'orange'
    },
    {
      key: 'overdue',
      title: 'Overdue',
      value: kpis.overdue,
      icon: ExclamationIcon,
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {kpiConfig.map((kpi) => (
        <KPICard
          key={kpi.key}
          title={kpi.title}
          value={kpi.value}
          icon={kpi.icon}
          color={kpi.color}
          onClick={() => onKPIClick && onKPIClick(kpi.key)}
        />
      ))}
    </div>
  );
};

export default DashboardKPIs;
