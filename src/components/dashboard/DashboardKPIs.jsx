import React from 'react';
import { FolderKanban, CheckCircle2, FileText, Clock, AlertTriangle } from 'lucide-react';
import { KPICard } from '../common';

const DashboardKPIs = ({ kpis, onKPIClick }) => {
  const kpiConfig = [
    {
      key: 'totalActive',
      title: 'Total Active',
      value: kpis.totalActive,
      icon: FolderKanban,
      color: 'blue'
    },
    {
      key: 'scopeCompleted',
      title: 'Scope Completed',
      value: kpis.scopeCompleted,
      icon: CheckCircle2,
      color: 'green'
    },
    {
      key: 'estimatesInReview',
      title: 'Estimates in Review',
      value: kpis.estimatesInReview,
      icon: FileText,
      color: 'purple'
    },
    {
      key: 'veWaitingApproval',
      title: 'VE Waiting Approval',
      value: kpis.veWaitingApproval,
      icon: Clock,
      color: 'orange'
    },
    {
      key: 'overdue',
      title: 'Overdue',
      value: kpis.overdue,
      icon: AlertTriangle,
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
