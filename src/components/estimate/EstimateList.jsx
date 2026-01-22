import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calculator, DollarSign, ExternalLink, Sparkles, Clock, User, FileSpreadsheet, MessageSquare } from 'lucide-react';
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
      <div className="text-center py-12 text-gray-500">
        <Calculator className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">No estimates yet</p>
        <p className="text-sm mt-1">Add your first estimate workbook to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {estimates.map((estimate) => (
        <div
          key={estimate.id}
          className={`border rounded-2xl p-5 transition-all duration-200 hover:shadow-md ${
            estimate.isLatest
              ? 'border-purple-200 bg-gradient-to-br from-purple-50/50 to-white'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                <Calculator className="w-4 h-4 text-purple-500" />
                <h4 className="font-semibold text-gray-900">{estimate.estimateName}</h4>
                {estimate.isLatest && (
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Latest
                  </span>
                )}
                <span className="text-xs text-gray-400 font-medium">v{estimate.version}</span>
                {estimate.estimateType && (
                  <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {estimate.estimateType}
                  </span>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center space-x-1.5 bg-blue-50 px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">FTP:</span>
                  <span className="font-semibold text-blue-700">{formatFTP(estimate.estimatedFTP)}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Value:</span>
                  <span className="font-semibold text-green-700">
                    {formatCurrency(estimate.estimatedDollarValue, estimate.currency)}
                  </span>
                </div>
              </div>

              <a
                href={estimate.workbookLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 mt-3 font-medium transition-colors"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>View Workbook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStatusClick(estimate)}
                className="transition-transform hover:scale-105"
              >
                <StatusBadge status={estimate.status} />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>Owner:</span>
              <span className="font-medium text-gray-700">{getUserName(estimate.estimateOwner)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDateTime(estimate.updatedAt)}</span>
            </span>
          </div>

          {estimate.notes && (
            <div className="mt-3 flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p>{estimate.notes}</p>
            </div>
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
