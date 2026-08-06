import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const LoadingSkeleton = ({ count = 8 }) => {
  return (
    <Row className="g-3">
      {Array.from({ length: count }).map((_, idx) => (
        <Col key={idx} xs={12} sm={6} md={4} lg={3}>
          <Card className="h-100 border-0 shadow-sm p-3">
            <div className="skeleton mb-3" style={{ height: '180px', borderRadius: '8px' }}></div>
            <div className="skeleton mb-2" style={{ height: '14px', width: '40%' }}></div>
            <div className="skeleton mb-2" style={{ height: '20px', width: '90%' }}></div>
            <div className="skeleton mb-3" style={{ height: '16px', width: '60%' }}></div>
            <div className="mt-auto d-flex justify-content-between align-items-center">
              <div className="skeleton" style={{ height: '24px', width: '45%' }}></div>
              <div className="skeleton" style={{ height: '36px', width: '45%', borderRadius: '6px' }}></div>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LoadingSkeleton;
