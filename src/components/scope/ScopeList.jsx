import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBadge, Button, Modal, Select, TextArea } from '../common';
import { updateScopeStatus } from '../../redux/slices/scopesSlice';
import { addHistoryEntry } from '../../redux/slices/historySlice';
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

    // Check if moving backward and reason is required
    if (newIndex < currentIndex && !reason.trim()) {
      alert('Reason is required when moving to a previous status');
      return;
    }

    // Update scope status
    dispatch(updateScopeStatus({
      id: scope.id,
      status: newStatus,
      updatedBy: currentUser?.id
    }));

    // Add history entry
    dispatch(addHistoryEntry({
      projectId,
      module: 'Scope',
      recordId: scope.id,
      fromStatus: scope.status,
      toStatus: newStatus,
      reason: reason || `Status changed to ${newStatus}`,
      changedBy: currentUser?.id
    }));

    setStatusModal({ open: false, scope: null });
  };

  if (scopes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No scope artifacts yet. Add your first scope document.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {scopes.map((scope) => (
        <div
          key={scope.id}
          className={`border rounded-lg p-4 ${
            scope.isLatest ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{scope.scopeTitle}</h4>
                {scope.isLatest && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                    Latest
                  </span>
                )}
                <span className="text-xs text-gray-500">v{scope.version}</span>
              </div>
              {scope.scopeType && (
                <p className="text-sm text-gray-500 mt-1">{scope.scopeType}</p>
              )}
              <a
                href={scope.artifactLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
              >
                View Document
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => handleStatusClick(scope)}>
                <StatusBadge status={scope.status} />
              </button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Updated by {getUserName(scope.updatedBy)}</span>
            <span>{formatDateTime(scope.updatedAt)}</span>
          </div>
          {scope.comments && (
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {scope.comments}
            </p>
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
