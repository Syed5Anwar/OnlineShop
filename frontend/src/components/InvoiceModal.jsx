import React, { useRef } from 'react';
import { Modal, Button, Table, Badge } from 'react-bootstrap';
import { FaPrint, FaDownload, FaReceipt } from 'react-icons/fa';

const InvoiceModal = ({ show, onHide, order }) => {
  const printRef = useRef(null);

  if (!order) return null;

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2 fw-bold text-primary">
          <FaReceipt /> Tax Invoice - #{order.trackingNumber || order._id.substring(0, 8)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4" ref={printRef}>
        {/* Invoice Header */}
        <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-4">
          <div>
            <h3 className="brand-logo mb-0">
              Trend<span>kart</span>
            </h3>
            <p className="text-muted small mb-0">Trendkart Retail E-Commerce Pvt Ltd.</p>
            <p className="text-muted small mb-0">GSTIN: 29AAAAA0000A1Z5 | Support: support@trendkart.com</p>
          </div>
          <div className="text-end">
            <h5 className="fw-bold text-uppercase text-secondary mb-1">Tax Invoice</h5>
            <p className="mb-0 small"><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="mb-0 small"><strong>Invoice No:</strong> INV-{order._id.substring(0, 8).toUpperCase()}</p>
            <Badge bg={order.isPaid ? 'success' : 'warning'} className="mt-1">
              {order.isPaid ? 'PAID' : 'PAYMENT PENDING'}
            </Badge>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="row mb-4">
          <div className="col-6">
            <h6 className="fw-bold text-primary mb-2">Billed To:</h6>
            <p className="mb-1 fw-semibold">{order.shippingAddress?.fullName}</p>
            <p className="mb-1 text-muted small">{order.shippingAddress?.street}</p>
            <p className="mb-1 text-muted small">
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.zipCode}
            </p>
            <p className="mb-0 text-muted small">Mobile: {order.shippingAddress?.mobile}</p>
          </div>
          <div className="col-6 text-end">
            <h6 className="fw-bold text-primary mb-2">Order Summary:</h6>
            <p className="mb-1 small"><strong>Payment Method:</strong> {order.paymentMethod}</p>
            <p className="mb-1 small"><strong>Order Status:</strong> {order.orderStatus}</p>
            <p className="mb-0 small"><strong>Tracking Code:</strong> {order.trackingNumber}</p>
          </div>
        </div>

        {/* Items Table */}
        <Table responsive bordered className="mb-4 align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Product Description</th>
              <th className="text-center">Price</th>
              <th className="text-center">Qty</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="fw-semibold">{item.name}</div>
                </td>
                <td className="text-center">₹{item.price.toLocaleString('en-IN')}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end fw-bold">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Calculation Total */}
        <div className="row justify-content-end">
          <div className="col-md-5">
            <div className="d-flex justify-content-between py-1 border-bottom">
              <span className="text-muted">Items Subtotal:</span>
              <span className="fw-semibold">₹{order.itemsPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between py-1 border-bottom">
              <span className="text-muted">GST (18% Included):</span>
              <span className="fw-semibold">₹{order.taxPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="d-flex justify-content-between py-1 border-bottom">
              <span className="text-muted">Shipping Charges:</span>
              <span className="fw-semibold">
                {order.shippingPrice === 0 ? 'FREE' : `₹${order.shippingPrice}`}
              </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="d-flex justify-content-between py-1 border-bottom text-success">
                <span>Coupon Discount:</span>
                <span>- ₹{order.discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="d-flex justify-content-between py-2 fs-5 fw-bold text-primary">
              <span>Grand Total:</span>
              <span>₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handlePrint} className="btn-primary-blue d-flex align-items-center gap-2">
          <FaPrint /> Print / Save Invoice PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvoiceModal;
