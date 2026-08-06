import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for contacting Trendkart! Our support team will reply within 2 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Container className="py-5">
      <div className="text-center max-w-700 mx-auto mb-5">
        <h1 className="fw-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Contact Customer Support
        </h1>
        <p className="text-muted">Have a question regarding your order, refund, or shipping? We are here 24/7.</p>
      </div>

      <Row className="g-4">
        <Col lg={5}>
          <Card className="border-0 shadow-sm rounded-4 p-4 h-100 bg-primary text-white">
            <h4 className="fw-bold mb-4">Get in Touch</h4>
            <div className="d-flex align-items-center gap-3 mb-4">
              <FaPhone className="fs-4 text-warning" />
              <div>
                <div className="small text-uppercase fw-bold text-warning">Toll-Free Helpline</div>
                <div className="fw-semibold">+91 1800-123-TREND (8736)</div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
              <FaEnvelope className="fs-4 text-warning" />
              <div>
                <div className="small text-uppercase fw-bold text-warning">Email Support</div>
                <div className="fw-semibold">support@trendkart.com</div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <FaMapMarkerAlt className="fs-4 text-warning" />
              <div>
                <div className="small text-uppercase fw-bold text-warning">Corporate Office</div>
                <div className="fw-semibold">Trendkart Towers, 123 Tech Park, Bengaluru, India</div>
              </div>
            </div>
          </Card>
        </Col>

        <Col lg={7}>
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-3 text-dark">Send Us a Message</h4>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Your Name *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Email Address *</Form.Label>
                    <Form.Control
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Subject *</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button type="submit" variant="primary" className="btn-primary-blue fw-bold mt-4 px-4 d-flex align-items-center gap-2">
                <FaPaperPlane /> Send Message
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
