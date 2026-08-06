import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaAward, FaUsers, FaShippingFast, FaShieldAlt } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <Container className="py-5">
      <div className="text-center max-w-700 mx-auto mb-5">
        <span className="badge bg-primary text-uppercase px-3 py-2 fw-bold mb-2">ABOUT TRENDKART</span>
        <h1 className="fw-extrabold display-5 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
          India’s Premier Full-Stack Online Shopping Destination
        </h1>
        <p className="lead text-muted">
          Empowering millions of shoppers with 100% genuine products, lightning-fast delivery, and an unmatched digital retail experience.
        </p>
      </div>

      <Row className="g-4 mb-5">
        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-4 text-center h-100">
            <FaAward className="display-4 text-warning mb-3 mx-auto" />
            <h5 className="fw-bold mb-1">Top Rated</h5>
            <p className="text-muted small mb-0">Award-winning customer satisfaction & quality assurance</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-4 text-center h-100">
            <FaUsers className="display-4 text-primary mb-3 mx-auto" />
            <h5 className="fw-bold mb-1">1 Million+</h5>
            <p className="text-muted small mb-0">Registered buyers and verified customer reviews</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-4 text-center h-100">
            <FaShippingFast className="display-4 text-success mb-3 mx-auto" />
            <h5 className="fw-bold mb-1">Pan-India Delivery</h5>
            <p className="text-muted small mb-0">Express dispatch to 19,000+ pincodes across India</p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-4 text-center h-100">
            <FaShieldAlt className="display-4 text-danger mb-3 mx-auto" />
            <h5 className="fw-bold mb-1">Secure Checkout</h5>
            <p className="text-muted small mb-0">Bank-grade 256-bit SSL encrypted Stripe & COD options</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
