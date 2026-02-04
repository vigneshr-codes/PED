import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Send, ExternalLink, Sparkles, Clock, DollarSign, User, CheckCircle, MessageSquare } from 'lucide-react';
import { StatusBadge, Button, Modal, Select, TextArea } from '../common';
import { updateVEStatus } from '../../redux/slices/veSlice';
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
      status: newStatus,
      projectId,
      reason: {
        fromStatus: ve.status,
        reason: reason || `Status changed to ${newStatus}`,
        changedBy: currentUser?.id
      }
    }));

    setStatusModal({ open: false, ve: null });
  };

  if (veRecords.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Send className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p className="font-medium">No VE submissions yet</p>
        <p className="text-sm mt-1">Add your first VE tool entry to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {veRecords.map((ve) => (
        <div
          key={ve.id}
          className={`border rounded-2xl p-5 transition-all duration-200 hover:shadow-md ${
            ve.isLatest
              ? 'border-orange-200 bg-gradient-to-br from-orange-50/50 to-white'
              : 'border-gray-100 bg-white hover:border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-2">
                <Send className="w-4 h-4 text-orange-500" />
                <h4 className="font-semibold text-gray-900">{ve.submissionName}</h4>
                {ve.isLatest && (
                  <span className="inline-flex items-center px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Latest
                  </span>
                )}
              </div>

              {(ve.veFTP || ve.veDollarValue) && (
                <div className="mt-3 flex flex-wrap gap-4 text-sm">
                  {ve.veFTP && (
                    <div className="flex items-center space-x-1.5 bg-blue-50 px-3 py-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-600">FTP:</span>
                      <span className="font-semibold text-blue-700">{formatFTP(ve.veFTP)}</span>
                    </div>
                  )}
                  {ve.veDollarValue && (
                    <div className="flex items-center space-x-1.5 bg-green-50 px-3 py-1.5 rounded-lg">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">Value:</span>
                      <span className="font-semibold text-green-700">{formatCurrency(ve.veDollarValue)}</span>
                    </div>
                  )}
                </div>
              )}

              <a
                href={ve.veToolReference}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-700 mt-3 font-medium transition-colors"
              >
                <span>View in VE Tool</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleStatusClick(ve)}
                className="transition-transform hover:scale-105"
              >
                <StatusBadge status={ve.status} />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <User className="w-3.5 h-3.5" />
              <span>Submitted by:</span>
              <span className="font-medium text-gray-700">{getUserName(ve.submittedBy)}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDateTime(ve.updatedAt)}</span>
            </span>
          </div>

          {ve.approvedDate && (
            <div className="mt-3 flex items-center space-x-1.5 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg w-fit">
              <CheckCircle className="w-4 h-4" />
              <span>Approved on: {formatDateTime(ve.approvedDate)}</span>
            </div>
          )}

          {ve.notes && (
            <div className="mt-3 flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-xl">
              <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <p>{ve.notes}</p>
            </div>
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
