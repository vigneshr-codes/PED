import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileText, ExternalLink, Sparkles, Clock, MessageSquare } from 'lucide-react';
import { StatusBadge, Button, Modal, Select, TextArea } from '../common';
import { updateScopeStatus } from '../../redux/slices/scopesSlice';
import { SCOPE_STATUSES } from '../../constants/statusConfig';
import { formatDateTime } from '../../utils/dateUtils';

const ScopeList = ({ scopes, projectId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { items: users } = useSelector((state) => state.users);

  const [statusModal, setStatusModal] = useState({ open: false, scope: null });
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || userId;
  };

  const handleStatusClick = (scope) => {
    setStatusModal({ open: true, scope });
    setNewStatus(scope.status);
    setReason('');
  };

  const handleStatusChange = () => {
    const scope = statusModal.scope;
    const currentIndex = SCOPE_STATUSES.indexOf(scope.status);
    const newIndex = SCOPE_STATUSES.indexOf(newStatus);

    if (newIndex < currentIndex && !reason.trim()) {
      alert('Reason is required when moving to a previous status');
      return;
    }

    dispatch(updateScopeStatus({
      id: scope.id,
      status: newStatus,
      updatedBy: currentUser?.id,
      projectId,
      reason: {
        fromStatus: scope.status,
        reason: reason || `Status changed to ${newStatus}`
      }
    }));

    setStatusModal({ open: false, scope: null });
  };

  if (scopes.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">No scope artifacts yet</p>
        <p className="text-sm mt-1">Add your first scope document to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scopes.map((scope) => (
        <div
          key={scope.id}
          className={`border rounded-2xl p-5 transition-all duration-200 hover:shadow-md ${
            scope.isLatest
              ? 'border-blue-200 bg-gradient-to-br from-blue-50/50 to-white'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <h4 className="font-semibold text-gray-900">{scope.scopeTitle}</h4>
                {scope.isLatest && (
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Latest
                  </span>
                )}
                <span className="text-xs text-gray-400 font-medium">v{scope.version}</span>
              </div>
              {scope.scopeType && (
                <p className="text-sm text-gray-500 mt-1.5">{scope.scopeType}</p>
              )}
              <a
                href={scope.artifactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium transition-colors"
              >
                <span>View Document</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStatusClick(scope)}
                className="transition-transform hover:scale-105"
              >
                <StatusBadge status={scope.status} />
              </button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <span>Updated by</span>
              <span className="font-medium text-gray-700">{getUserName(scope.updatedBy)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDateTime(scope.updatedAt)}</span>
            </span>
          </div>
          {scope.comments && (
            <div className="mt-3 flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p>{scope.comments}</p>
            </div>
          )}
        </div>
      ))}

      {/* Status Change Modal */}
      <Modal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, scope: null })}
        title="Update Scope Status"
        size="sm"
      >
        <div className="space-y-4">
          <Select
            label="New Status"
            options={SCOPE_STATUSES}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />

          {statusModal.scope &&
            SCOPE_STATUSES.indexOf(newStatus) <
              SCOPE_STATUSES.indexOf(statusModal.scope.status) && (
            <TextArea
              label="Reason for moving backward"
              required
              placeholder="Please provide a reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusModal({ open: false, scope: null })}
            >
              Cancel
            </Button>
            <Button onClick={handleStatusChange}>Update Status</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ScopeList;
