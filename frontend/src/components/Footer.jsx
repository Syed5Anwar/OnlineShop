import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {
  FaTruck,
  FaShieldAlt,
  FaHeadset,
  FaRedo,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing to Trendkart newsletter!');
      setEmail('');
    }
  };

  return (
    <footer className="mt-5 text-light" style={{ backgroundColor: '#0f172a' }}>
      {/* Service Badges */}
      <div className="py-4 border-bottom border-secondary" style={{ backgroundColor: '#1e293b' }}>
        <Container>
          <Row className="g-3 text-center">
            <Col xs={6} md={3}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaTruck className="text-warning fs-2" />
                <div className="text-start">
                  <div className="fw-bold small text-uppercase">Free Delivery</div>
                  <div className="text-muted x-small">On orders above ₹1000</div>
                </div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaShieldAlt className="text-warning fs-2" />
                <div className="text-start">
                  <div className="fw-bold small text-uppercase">100% Genuine</div>
                  <div className="text-muted x-small">Direct brand warranties</div>
                </div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaRedo className="text-warning fs-2" />
                <div className="text-start">
                  <div className="fw-bold small text-uppercase">7 Days Return</div>
                  <div className="text-muted x-small">Hassle-free refunds</div>
                </div>
              </div>
            </Col>
            <Col xs={6} md={3}>
              <div className="d-flex align-items-center justify-content-center gap-3">
                <FaHeadset className="text-warning fs-2" />
                <div className="text-start">
                  <div className="fw-bold small text-uppercase">24/7 Customer Care</div>
                  <div className="text-muted x-small">Dedicated support helpline</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main Footer Links */}
      <div className="py-5">
        <Container>
          <Row className="g-4">
            <Col lg={4} md={6}>
              <h4 className="brand-logo text-white mb-3">
                Trend<span className="text-warning">kart</span>
              </h4>
              <p className="text-secondary small mb-3">
                Trendkart is India’s premier full-stack e-commerce marketplace delivering authentic electronics, fashion, beauty, home essentials, mobiles, laptops, books, and toys directly to your doorstep.
              </p>
              <div className="d-flex gap-3 text-secondary">
                <a href="#facebook" className="text-light hover-warning"><FaFacebookF /></a>
                <a href="#twitter" className="text-light hover-warning"><FaTwitter /></a>
                <a href="#instagram" className="text-light hover-warning"><FaInstagram /></a>
                <a href="#linkedin" className="text-light hover-warning"><FaLinkedinIn /></a>
              </div>
            </Col>

            <Col lg={2} md={3} sm={6}>
              <h6 className="fw-bold text-white text-uppercase mb-3">Quick Links</h6>
              <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                <li><Link to="/" className="text-decoration-none text-secondary hover-white">Home</Link></li>
                <li><Link to="/shop" className="text-decoration-none text-secondary hover-white">Shop Catalog</Link></li>
                <li><Link to="/about" className="text-decoration-none text-secondary hover-white">About Trendkart</Link></li>
                <li><Link to="/contact" className="text-decoration-none text-secondary hover-white">Contact Us</Link></li>
                <li><Link to="/compare" className="text-decoration-none text-secondary hover-white">Compare Products</Link></li>
                <li><Link to="/output" className="text-decoration-none text-secondary hover-white">Data Output</Link></li>
              </ul>
            </Col>

            <Col lg={2} md={3} sm={6}>
              <h6 className="fw-bold text-white text-uppercase mb-3">Customer Care</h6>
              <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
                <li><Link to="/faq" className="text-decoration-none text-secondary hover-white">FAQs & Help</Link></li>
                <li><Link to="/orders" className="text-decoration-none text-secondary hover-white">Track Order</Link></li>
                <li><Link to="/privacy" className="text-decoration-none text-secondary hover-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-decoration-none text-secondary hover-white">Terms & Conditions</Link></li>
              </ul>
            </Col>

            <Col lg={4} md={6}>
              <h6 className="fw-bold text-white text-uppercase mb-3">Stay Updated</h6>
              <p className="text-secondary small mb-3">
                Subscribe to get special discount coupons, flash sale notifications, and weekly deal updates.
              </p>
              <Form onSubmit={handleNewsletterSubmit} className="d-flex gap-2">
                <Form.Control
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-dark text-light border-secondary"
                />
                <Button type="submit" variant="warning" className="fw-bold px-3">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>

          <hr className="border-secondary my-4" />

          <div className="d-md-flex justify-content-between align-items-center text-center text-secondary small">
            <p className="mb-md-0">
              © {new Date().getFullYear()} Trendkart Online Retail Marketplace. All Rights Reserved.
            </p>
            <p className="mb-0">
              Designed & Built with MERN Stack • Production Ready
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
