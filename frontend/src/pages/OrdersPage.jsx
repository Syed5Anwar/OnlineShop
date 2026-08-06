import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Table, Badge, Button, Modal } from 'react-bootstrap';
import { FaEye, FaTimes, FaFileInvoice, FaTruck } from 'react-icons/fa';
import OrderTracker from '../components/OrderTracker';
import InvoiceModal from '../components/InvoiceModal';
import { fetchMyOrders, cancelOrder } from '../services/orderService';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchMyOrders();
      setOrders(data);
    } catch (err) {
      console.log('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        toast.success('Order cancelled successfully');
        loadOrders();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Failed to cancel order');
      }
    }
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        My Order History & Tracking
      </h2>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : orders.length === 0 ? (
        <Card className="border-0 shadow-sm rounded-4 p-5 text-center">
          <h4 className="fw-bold text-muted mb-2">No Orders Placed Yet</h4>
          <p className="text-muted small mb-4">Start exploring 70+ products across 10 categories.</p>
          <Link to="/shop" className="btn btn-primary-blue btn-lg px-4 mx-auto">
            Browse Catalog
          </Link>
        </Card>
      ) : (
        <Card className="border-0 shadow-sm rounded-4 p-3">
          <Table responsive hover className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order Tracking No.</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="fw-bold text-primary">#{order.trackingNumber || order._id.substring(0, 8)}</td>
                  <td className="small text-muted">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <img
                        src={order.orderItems[0]?.image}
                        alt={order.orderItems[0]?.name}
                        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        className="rounded border"
                      />
                      <span className="small text-truncate" style={{ maxWidth: '180px' }}>
                        {order.orderItems[0]?.name}{' '}
                        {order.orderItems.length > 1 && `+ ${order.orderItems.length - 1} more`}
                      </span>
                    </div>
                  </td>
                  <td className="fw-bold">₹{order.totalAmount.toLocaleString('en-IN')}</td>
                  <td className="text-center">
                    <Badge
                      bg={
                        order.orderStatus === 'Delivered'
                          ? 'success'
                          : order.orderStatus === 'Cancelled'
                          ? 'danger'
                          : order.orderStatus === 'Shipped'
                          ? 'info'
                          : 'warning'
                      }
                      className="px-2 py-1"
                    >
                      {order.orderStatus}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <div className="d-flex gap-1 justify-content-center">
                      <Button
                        variant="light"
                        size="sm"
                        className="border"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowTrackerModal(true);
                        }}
                        title="Track Status Timeline"
                      >
                        <FaTruck className="text-primary" />
                      </Button>
                      <Button
                        variant="light"
                        size="sm"
                        className="border"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowInvoiceModal(true);
                        }}
                        title="View Tax Invoice"
                      >
                        <FaFileInvoice className="text-secondary" />
                      </Button>
                      {order.orderStatus === 'Processing' && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleCancel(order._id)}
                          title="Cancel Order"
                        >
                          <FaTimes />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Tracker Timeline Modal */}
      <Modal show={showTrackerModal} onHide={() => setShowTrackerModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            Track Order #{selectedOrder?.trackingNumber}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <OrderTracker status={selectedOrder.orderStatus} deliveryStatus={selectedOrder.deliveryStatus} />
          )}
        </Modal.Body>
      </Modal>

      {/* Invoice Modal */}
      {selectedOrder && (
        <InvoiceModal
          show={showInvoiceModal}
          onHide={() => setShowInvoiceModal(false)}
          order={selectedOrder}
        />
      )}
    </Container>
  );
};

export default OrdersPage;
