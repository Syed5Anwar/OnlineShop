import React, { useState, useEffect } from 'react';
import { Table, Badge, Form, Button } from 'react-bootstrap';
import { FaShoppingBag } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchAllOrders, updateOrderStatus } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { orderStatus: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      loadOrders();
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  return (
    <AdminLayout>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Customer Order Fulfillment & Shipping
        </h3>
        <p className="text-muted small">Total Orders: {orders.length}</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <Table responsive hover className="align-middle border mb-0">
          <thead className="table-light">
            <tr>
              <th>Tracking Code</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Fulfillment Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((ord) => (
              <tr key={ord._id}>
                <td className="fw-bold text-primary">#{ord.trackingNumber || ord._id.substring(0, 8)}</td>
                <td>
                  <div className="fw-semibold small">{ord.user?.name || 'Shopper'}</div>
                  <div className="text-muted x-small">{ord.user?.email}</div>
                </td>
                <td className="small text-muted">{new Date(ord.createdAt).toLocaleDateString()}</td>
                <td className="small">{ord.orderItems?.length} items</td>
                <td className="fw-bold">₹{ord.totalAmount?.toLocaleString('en-IN')}</td>
                <td>
                  <Badge bg={ord.isPaid ? 'success' : 'warning'}>{ord.paymentMethod}</Badge>
                </td>
                <td>
                  <Form.Select
                    size="sm"
                    value={ord.orderStatus}
                    onChange={(e) => handleStatusChange(ord._id, e.target.value)}
                    className="fw-bold"
                    style={{ width: '130px' }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default AdminOrders;
