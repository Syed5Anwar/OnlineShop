import React from 'react';
import { Container, Accordion, Card } from 'react-bootstrap';

const FAQPage = () => {
  return (
    <Container className="py-5 max-w-800">
      <div className="text-center mb-5">
        <h1 className="fw-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Frequently Asked Questions (FAQs)
        </h1>
        <p className="text-muted">Find quick answers to common questions about orders, payments, and shipping.</p>
      </div>

      <Accordion defaultActiveKey="0" className="shadow-sm rounded-4 overflow-hidden">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="fw-bold">How do I track my order delivery?</Accordion.Header>
          <Accordion.Body className="text-muted">
            Once your order is placed, go to <strong>My Orders</strong> from your account menu. Click on the <strong>Track Status</strong> button to view real-time timeline updates and courier dispatch status.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header className="fw-bold">What payment methods are supported?</Accordion.Header>
          <Accordion.Body className="text-muted">
            Trendkart supports Cash on Delivery (COD), Stripe Credit/Debit Cards (Visa, Mastercard, RuPay), UPI, and NetBanking.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header className="fw-bold">How do I apply coupon discount codes?</Accordion.Header>
          <Accordion.Body className="text-muted">
            During checkout or in your Shopping Cart page, enter your promo code (e.g. <code>TREND20</code> or <code>WELCOME10</code>) in the coupon code box and click Apply to enjoy instant savings.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
          <Accordion.Header className="fw-bold">What is the return & refund policy?</Accordion.Header>
          <Accordion.Body className="text-muted">
            We offer a hassle-free 7-day return policy for unused items with original brand tags and packaging intact.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQPage;
