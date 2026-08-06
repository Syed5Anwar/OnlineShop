import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsPage = () => {
  return (
    <Container className="py-5 max-w-800">
      <Card className="border-0 shadow-sm rounded-4 p-5">
        <h1 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Terms & Conditions
        </h1>
        <p className="text-muted">Last updated: August 2026</p>

        <h5 className="fw-bold mt-4">1. Acceptance of Terms</h5>
        <p className="text-muted small">
          By accessing and shopping on Trendkart, you agree to comply with our platform terms of service, payment policies, and return guidelines.
        </p>

        <h5 className="fw-bold mt-4">2. Product Pricing & Availability</h5>
        <p className="text-muted small">
          All prices listed on Trendkart are in Indian Rupees (INR) and are inclusive of applicable GST taxes. We reserve the right to correct pricing errors or update stock availability.
        </p>

        <h5 className="fw-bold mt-4">3. Order Cancellations</h5>
        <p className="text-muted small">
          Customers may cancel orders anytime before dispatch from the 'My Orders' section. Once shipped, standard return rules apply.
        </p>
      </Card>
    </Container>
  );
};

export default TermsPage;
