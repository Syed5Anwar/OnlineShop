import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Card, Button, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaBoxOpen, FaFileInvoice, FaHome } from 'react-icons/fa';
import InvoiceModal from '../components/InvoiceModal';
import { fetchOrderDetails } from '../services/orderService';

const OrderSuccessPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const data = await fetchOrderDetails(id);
        setOrder(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (id) loadOrder();
  }, [id]);

  return (
    <Container className="py-5 text-center max-w-700">
      <Card className="border-0 shadow-lg rounded-4 p-5">
        <div className="mb-3">
          <FaCheckCircle className="display-1 text-success" />
        </div>
        <h2 className="fw-extrabold text-dark mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Thank You! Your Order Has Been Placed
        </h2>
        <p className="text-muted mb-4">
          We have received your order. Tracking Code:{' '}
          <strong className="text-primary">{order?.trackingNumber || id}</strong>
        </p>

        {order && (
          <div className="bg-light p-3 rounded-3 text-start border mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Total Amount:</span>
              <strong className="text-dark">₹{order.totalAmount.toLocaleString('en-IN')}</strong>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Payment Method:</span>
              <Badge bg="info">{order.paymentMethod}</Badge>
            </div>
            <div className="d-flex justify-content-between">
              <span className="text-muted">Delivery Address:</span>
              <span className="fw-semibold text-end" style={{ maxWidth: '300px' }}>
                {order.shippingAddress?.street}, {order.shippingAddress?.city}
              </span>
            </div>
          </div>
        )}

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <Button
            variant="outline-primary"
            className="fw-bold d-flex align-items-center gap-2"
            onClick={() => setShowInvoice(true)}
          >
            <FaFileInvoice /> View Tax Invoice
          </Button>
          <Button as={Link} to="/orders" variant="primary" className="btn-primary-blue fw-bold d-flex align-items-center gap-2">
            <FaBoxOpen /> Track My Orders
          </Button>
          <Button as={Link} to="/" variant="light" className="border fw-bold d-flex align-items-center gap-2">
            <FaHome /> Back to Home
          </Button>
        </div>
      </Card>

      {/* Invoice Modal */}
      {order && (
        <InvoiceModal show={showInvoice} onHide={() => setShowInvoice(false)} order={order} />
      )}
    </Container>
  );
};

export default OrderSuccessPage;
