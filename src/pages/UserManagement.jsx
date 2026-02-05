import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Modal, Alert } from '../components/common';
import { createUser, updateUser, deleteUser, fetchUsers } from '../redux/slices/usersSlice';
import { USER_ROLES } from '../constants/statusConfig';

const UserManagement = () => {
  const dispatch = useDispatch();
  const { items: users, error } = useSelector((state) => state.users);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });
  const [formError, setFormError] = useState(null);

  const resetForm = () => {
    setFormData({ name: '', email: '', role: '' });
    setFormError(null);
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    resetForm();
    setShowModal(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setFormError(null);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      setFormError('All fields are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      if (editingUser) {
        await dispatch(updateUser({ id: editingUser.id, userData: formData })).unwrap();
      } else {
        await dispatch(createUser(formData)).unwrap();
      }
      setShowModal(false);
      resetForm();
    } catch (err) {
      setFormError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setIsSubmitting(true);
    try {
      await dispatch(deleteUser(id)).unwrap();
      setShowDeleteConfirm(null);
    } catch {
      // error in Redux state
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    {
      key: 'role',
      header: 'Role',
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
          value === 'Admin' ? 'bg-red-50 text-red-700' :
          value === 'Approver' ? 'bg-purple-50 text-purple-700' :
          'bg-blue-50 text-blue-700'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      width: '140px',
      render: (_, row) => (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => handleOpenEdit(row)}>Edit</Button>
          <Button variant="danger" size="sm" onClick={() => setShowDeleteConfirm(row.id)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">Manage users and their roles</p>
        </div>
        <Button onClick={handleOpenAdd}>Add User</Button>
      </div>

      {error && (
        <Alert variant="error" title="Error">
          {error}
          <button
            onClick={() => dispatch(fetchUsers())}
            className="mt-2 text-sm text-red-600 hover:text-red-800 font-medium underline"
          >
            Retry
          </button>
        </Alert>
      )}

      <Table columns={columns} data={users} emptyMessage="No users found." />

      {/* Add / Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editingUser ? 'Edit User' : 'Add User'}
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {formError}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Full name"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="user@company.com"
              disabled={!!editingUser}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-sm bg-white"
            >
              <option value="">Select role</option>
              {USER_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button type="submit" loading={isSubmitting}>
              {editingUser ? 'Update' : 'Add'} User
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Confirm Delete"
        size="sm"
      >
        <p className="text-gray-600 text-sm mb-6">
          Are you sure you want to delete this user? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>Cancel</Button>
          <Button variant="danger" loading={isSubmitting} onClick={() => handleDelete(showDeleteConfirm)}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserManagement;
