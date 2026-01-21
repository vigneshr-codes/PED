import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBadge, Button, Modal, Select, TextArea } from '../common';
import { updateVEStatus } from '../../redux/slices/veSlice';
import { addHistoryEntry } from '../../redux/slices/historySlice';
import { VE_STATUSES } from '../../constants/statusConfig';
import { formatDateTime } from '../../utils/dateUtils';
import { formatCurrency, formatFTP } from '../../utils/formatters';

const VEList = ({ veRecords, projectId }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const { items: users } = useSelector((state) => state.users);

  const [statusModal, setStatusModal] = useState({ open: false, ve: null });
  const [newStatus, setNewStatus] = useState('');
  const [reason, setReason] = useState('');

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user?.name || userId;
  };

  const handleStatusClick = (ve) => {
    setStatusModal({ open: true, ve });
    setNewStatus(ve.status);
    setReason('');
  };

  const handleStatusChange = () => {
    const ve = statusModal.ve;

    dispatch(updateVEStatus({
      id: ve.id,
      status: newStatus
    }));

    dispatch(addHistoryEntry({
      projectId,
      module: 'VE',
      recordId: ve.id,
      fromStatus: ve.status,
      toStatus: newStatus,
      reason: reason || `Status changed to ${newStatus}`,
      changedBy: currentUser?.id
    }));

    setStatusModal({ open: false, ve: null });
  };

  if (veRecords.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No VE submissions yet. Add your first VE tool entry.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {veRecords.map((ve) => (
        <div
          key={ve.id}
          className={`border rounded-lg p-4 ${
            ve.isLatest ? 'border-orange-200 bg-orange-50/30' : 'border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium text-gray-900">{ve.submissionName}</h4>
                {ve.isLatest && (
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded-full">
                    Latest
                  </span>
                )}
              </div>

              {(ve.veFTP || ve.veDollarValue) && (
                <div className="mt-2 flex space-x-6 text-sm">
                  {ve.veFTP && (
                    <div>
                      <span className="text-gray-500">FTP:</span>{' '}
                      <span className="font-medium">{formatFTP(ve.veFTP)}</span>
                    </div>
                  )}
                  {ve.veDollarValue && (
                    <div>
                      <span className="text-gray-500">Value:</span>{' '}
                      <span className="font-medium">{formatCurrency(ve.veDollarValue)}</span>
                    </div>
                  )}
                </div>
              )}

              <a
                href={ve.veToolReference}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-2 inline-block"
              >
                View in VE Tool
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => handleStatusClick(ve)}>
                <StatusBadge status={ve.status} />
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs text-gray-500">
            <span>Submitted by: {getUserName(ve.submittedBy)}</span>
            <span>{formatDateTime(ve.updatedAt)}</span>
          </div>

          {ve.approvedDate && (
            <div className="mt-2 text-xs text-green-600">
              Approved on: {formatDateTime(ve.approvedDate)}
            </div>
          )}

          {ve.notes && (
            <p className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
              {ve.notes}
            </p>
          )}
        </div>
      ))}

      {/* Status Change Modal */}
      <Modal
        isOpen={statusModal.open}
        onClose={() => setStatusModal({ open: false, ve: null })}
        title="Update VE Status"
        size="sm"
      >
        <div className="space-y-4">
          <Select
            label="New Status"
            options={VE_STATUSES}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />

          <TextArea
            label="Notes (optional)"
            placeholder="Add any notes..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => setStatusModal({ open: false, ve: null })}
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

export default VEList;
