import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBadge, Button, Modal, Select, TextArea } from '../common';
import { updateEstimateStatus } from '../../redux/slices/estimatesSlice';
import { addHistoryEntry } from '../../redux/slices/historySlice';
import { ESTIMATE_STATUSES } from '../../constants/statusConfig';
import { formatDateTime } from '../../utils/dateUtils';
import { formatCurrency, formatFTP } from '../../utils/formatters';

const EstimateList = ({ estimates, projectId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { items: users } = useSelector((state) => state.users);

  const [statusModal, setStatusModal] = useState({ open: false, estimate: null });
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || userId;
  };

  const handleStatusClick = (estimate) => {
    setStatusModal({ open: true, estimate });
    setNewStatus(estimate.status);
    setReason('');
  };

  const handleStatusChange = () => {
    const estimate = statusModal.estimate;
    const currentIndex = ESTIMATE_STATUSES.indexOf(estimate.status);
    const newIndex = ESTIMATE_STATUSES.indexOf(newStatus);

    // Check if skipping external review
    const skippingExternal =
      estimate.status === 'Sent for Internal Review' && newStatus === 'Approved';

    if ((newIndex < currentIndex || skippingExternal) && !reason.trim()) {
      alert(
        skippingExternal
          ? 'Justification required when skipping external review'
          : 'Reason required when moving to a previous status'
      );
      return;
    }

    dispatch(updateEstimateStatus({
      id: estimate.id,
      status: newStatus
    }));

    dispatch(addHistoryEntry({
      projectId,
      module: 'Estimate',
      recordId: estimate.id,
      fromStatus: estimate.status,
      toStatus: newStatus,
      reason: reason || `Status changed to ${newStatus}`,
      changedBy: currentUser?.id
    }));

    setStatusModal({ open: false, estimate: null });
  };

  if (estimates.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No estimates yet. Add your first estimate workbook.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {estimates.map((estimate) => (
        <div
          key={estimate.id}
          className={`border rounded-lg p-4 ${
            estimate.isLatest ? 'border-purple-200 bg-purple-50/30' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{estimate.estimateName}</h4>
                {estimate.isLatest && (
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-xs rounded-full">
                    Latest
                  </span>
                )}
                <span className="text-xs text-gray-500">v{estimate.version}</span>
                {estimate.estimateType && (
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {estimate.estimateType}
                  </span>
                )}
              </div>

              <div className="mt-2 flex space-x-6 text-sm">
                <div>
                  <span className="text-gray-500">FTP:</span>{' '}
                  <span className="font-medium">{formatFTP(estimate.estimatedFTP)}</span>
                </div>
                <div>
                  <span className="text-gray-500">Value:</span>{' '}
                  <span className="font-medium">
                    {formatCurrency(estimate.estimatedDollarValue, estimate.currency)}
                  </span>
                </div>
              </div>

              <a
                href={estimate.workbookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-2 inline-block"
              >
                View Workbook
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => handleStatusClick(estimate)}>
                <StatusBadge status={estimate.status} />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Owner: {getUserName(estimate.estimateOwner)}</span>
            <span>{formatDateTime(estimate.updatedAt)}</span>
          </div>

          {estimate.notes && (
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {estimate.notes}
            </p>
          )}
        </div>
      ))}

      {/* Status Change Modal */}
      <Modal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, estimate: null })}
        title="Update Estimate Status"
        size="sm"
      >
        <div className="space-y-4">
          <Select
            label="New Status"
            options={ESTIMATE_STATUSES}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />

          {statusModal.estimate && (
            (ESTIMATE_STATUSES.indexOf(newStatus) <
              ESTIMATE_STATUSES.indexOf(statusModal.estimate.status) ||
              (statusModal.estimate.status === 'Sent for Internal Review' &&
                newStatus === 'Approved')) && (
              <TextArea
                label={
                  statusModal.estimate.status === 'Sent for Internal Review' &&
                  newStatus === 'Approved'
                    ? 'Justification for skipping external review'
                    : 'Reason for moving backward'
                }
                required
                placeholder="Please provide a reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            )
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusModal({ open: false, estimate: null })}
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

export default EstimateList;
