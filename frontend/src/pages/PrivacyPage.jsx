import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPage = () => {
  return (
    <Container className="py-5 max-w-800">
      <Card className="border-0 shadow-sm rounded-4 p-5">
        <h1 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Privacy Policy
        </h1>
        <p className="text-muted">Last updated: August 2026</p>

        <h5 className="fw-bold mt-4">1. Data We Collect</h5>
        <p className="text-muted small">
          When you register or place an order on Trendkart, we collect personal information such as your name, email address, mobile number, shipping address, and payment credentials.
        </p>

        <h5 className="fw-bold mt-4">2. How We Use Your Data</h5>
        <p className="text-muted small">
          Your personal data is strictly used to fulfill orders, process payments, provide real-time shipment updates, send invoices, and improve overall e-commerce service quality.
        </p>

        <h5 className="fw-bold mt-4">3. Payment Security</h5>
        <p className="text-muted small">
          Payment transactions are encrypted using industry-standard SSL protocols. We do not store raw credit/debit card numbers on our servers.
        </p>
      </Card>
    </Container>
  );
};

export default PrivacyPage;
