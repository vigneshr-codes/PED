import React from 'react';
import { useSelector } from 'react-redux';
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

  const getModuleColor = (module) => {
    switch (module) {
      case 'Scope':
        return 'bg-blue-100 text-blue-700';
      case 'Estimate':
        return 'bg-purple-100 text-purple-700';
      case 'VE':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (projectHistory.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No status changes recorded yet.
      </div>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {projectHistory.map((entry, index) => (
          <li key={entry.id}>
            <div className="relative pb-8">
              {index !== projectHistory.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getModuleColor(entry.module)}`}
                  >
                    {entry.module === 'Scope' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    {entry.module === 'Estimate' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    )}
                    {entry.module === 'VE' && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${getModuleColor(entry.module)}`}>
                        {entry.module}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDateTime(entry.changedAt)}
                      </span>
                    </div>

                    <div className="mt-2 flex items-center space-x-2">
                      <StatusBadge status={entry.fromStatus} size="sm" />
                      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <StatusBadge status={entry.toStatus} size="sm" />
                    </div>

                    {entry.reason && (
                      <p className="mt-2 text-sm text-gray-600">
                        {entry.reason}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-gray-500">
                      Changed by <span className="font-medium">{getUserName(entry.changedBy)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
