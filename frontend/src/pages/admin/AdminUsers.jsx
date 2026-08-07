import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchAllUsers, deleteUser, updateUserRole } from '../../services/adminService';
import { getImageUrl } from '../../services/api';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchAllUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, { role: newRole });
      toast.success('User role updated');
      loadUsers();
    } catch (err) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User removed');
        loadUsers();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Registered User Management
        </h3>
        <p className="text-muted small">Total Registered Users: {users.length}</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <Table responsive hover className="align-middle border mb-0">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Joined Date</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr._id}>
                <td className="fw-semibold">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={usr.profileImage ? getImageUrl(usr.profileImage) : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                      alt={usr.name}
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                      className="rounded-circle"
                    />
                    <span>{usr.name}</span>
                  </div>
                </td>
                <td className="small">{usr.email}</td>
                <td className="small">{usr.mobile || 'N/A'}</td>
                <td className="small text-muted">{new Date(usr.createdAt).toLocaleDateString()}</td>
                <td>
                  <Form.Select
                    size="sm"
                    value={usr.role}
                    onChange={(e) => handleRoleChange(usr._id, e.target.value)}
                    style={{ width: '110px' }}
                    className="fw-bold"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </Form.Select>
                </td>
                <td className="text-center">
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDeleteUser(usr._id)}
                    disabled={usr.role === 'ADMIN'}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default AdminUsers;
