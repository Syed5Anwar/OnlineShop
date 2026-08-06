import React from 'react';
import { FaCheckCircle, FaTruck, FaBox, FaTimesCircle } from 'react-icons/fa';

const OrderTracker = ({ status, deliveryStatus }) => {
  if (status === 'Cancelled') {
    return (
      <div className="alert alert-danger d-flex align-items-center gap-3 my-3 rounded-3">
        <FaTimesCircle className="fs-2 text-danger" />
        <div>
          <h6 className="fw-bold mb-1">Order Cancelled</h6>
          <p className="mb-0 small">{deliveryStatus || 'This order has been cancelled and refunded if applicable.'}</p>
        </div>
      </div>
    );
  }

  const steps = [
    { title: 'Order Placed', key: 'Processing' },
    { title: 'Shipped', key: 'Shipped' },
    { title: 'Out for Delivery', key: 'In Transit' },
    { title: 'Delivered', key: 'Delivered' },
  ];

  const getStepIndex = (st) => {
    if (st === 'Processing') return 0;
    if (st === 'Shipped') return 1;
    if (st === 'Delivered') return 3;
    return 0;
  };

  const currentIndex = getStepIndex(status);

  return (
    <div className="my-4 p-4 border rounded-3 bg-light">
      <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
        <FaTruck className="text-primary" /> Delivery Status & Tracking Timeline
      </h6>
      <p className="text-muted small mb-4">{deliveryStatus || 'Your package is being processed.'}</p>

      <div className="d-flex justify-content-between position-relative">
        <div
          className="position-absolute top-50 start-0 translate-middle-y bg-secondary"
          style={{ height: '4px', width: '100%', zIndex: 0 }}
        ></div>
        <div
          className="position-absolute top-50 start-0 translate-middle-y bg-success transition-all"
          style={{
            height: '4px',
            width: `${(currentIndex / 3) * 100}%`,
            zIndex: 1,
            transition: 'width 0.5s ease',
          }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          return (
            <div key={index} className="text-center position-relative z-2">
              <div
                className={`rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 fw-bold ${
                  isCompleted ? 'bg-success text-white' : 'bg-white text-secondary border'
                }`}
                style={{ width: '40px', height: '40px' }}
              >
                {isCompleted ? <FaCheckCircle /> : index + 1}
              </div>
              <span className={`small ${isCompleted ? 'fw-bold text-dark' : 'text-muted'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracker;
