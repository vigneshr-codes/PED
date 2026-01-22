import React from 'react';
import { useSelector } from 'react-redux';
import { FileText, Calculator, Send, ArrowRight, History, User } from 'lucide-react';
import { StatusBadge } from '../common';
import { formatDateTime } from '../../utils/dateUtils';

const HistoryList = ({ projectId }) => {
  const { items: history } = useSelector((state) => state.history);
  const { items: users } = useSelector((state) => state.users);

  const projectHistory = history
    .filter((h) => h.projectId === projectId)
    .sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || userId;
  };

  const getModuleConfig = (module) => {
    switch (module) {
      case 'Scope':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          icon: FileText
        };
      case 'Estimate':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-700',
          icon: Calculator
        };
      case 'VE':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-700',
          icon: Send
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          icon: History
        };
    }
  };

  if (projectHistory.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">No status changes recorded yet</p>
        <p className="text-sm mt-1">Changes will appear here as work progresses</p>
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {projectHistory.map((entry, index) => {
          const config = getModuleConfig(entry.module);
          const Icon = config.icon;

          return (
            <li key={entry.id}>
              <div className="relative pb-8">
                {index !== projectHistory.length - 1 && (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gradient-to-b from-gray-200 to-gray-100"
                    aria-hidden="true"
                  />
                )}
                <div className="relative flex space-x-4">
                  <div>
                    <span
                      className={`h-10 w-10 rounded-xl flex items-center justify-center ring-8 ring-white shadow-sm ${config.bg} ${config.text}`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${config.bg} ${config.text}`}>
                          {entry.module}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatDateTime(entry.changedAt)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center space-x-3">
                        <StatusBadge status={entry.fromStatus} size="sm" />
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                        </div>
                        <StatusBadge status={entry.toStatus} size="sm" />
                      </div>

                      {entry.reason && (
                        <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
                          {entry.reason}
                        </p>
                      )}

                      <div className="mt-3 flex items-center space-x-1.5 text-xs text-gray-500">
                        <User className="w-3.5 h-3.5" />
                        <span>Changed by</span>
                        <span className="font-medium text-gray-700">{getUserName(entry.changedBy)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HistoryList;
