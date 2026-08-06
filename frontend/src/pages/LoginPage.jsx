import React, { useState, useContext } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaSignInAlt, FaEnvelope, FaLock, FaUserShield } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      toast.success(`Welcome back, ${res.data.name}!`);
      if (res.data.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate(redirect ? `/${redirect}` : '/');
      }
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleDemoAdmin = () => {
    setEmail('admin@trendkart.com');
    setPassword('admin123');
  };

  const handleDemoUser = () => {
    setEmail('user@trendkart.com');
    setPassword('user123');
  };

  return (
    <Container className="py-5">
      <div className="max-w-450 mx-auto">
        <Card className="border-0 shadow-lg rounded-4 p-4">
          <div className="text-center mb-4">
            <h3 className="brand-logo mb-1">
              Trend<span>kart</span>
            </h3>
            <p className="text-muted small">Log in to manage orders, wishlist & cart</p>
          </div>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email Address</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaEnvelope />
                </span>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold d-flex justify-content-between">
                <span>Password</span>
                <a href="#forgot" onClick={() => toast.info('Demo password reset token generated!')} className="text-decoration-none small">
                  Forgot Password?
                </a>
              </Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="btn-primary-blue w-100 py-2 fw-bold d-flex align-items-center justify-content-center gap-2 mb-3"
              disabled={loading}
            >
              <FaSignInAlt /> Login to Account
            </Button>
          </Form>

          {/* Quick Demo Credentials */}
          <div className="bg-light p-3 rounded-3 border text-center my-3">
            <div className="fw-bold small text-uppercase text-secondary mb-2 d-flex align-items-center justify-content-center gap-1">
              <FaUserShield /> Quick Demo Logins
            </div>
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="outline-primary" size="sm" onClick={handleDemoUser}>
                Demo User
              </Button>
              <Button variant="outline-danger" size="sm" onClick={handleDemoAdmin}>
                Demo Admin
              </Button>
            </div>
          </div>

          <div className="text-center small text-muted mt-3">
            Don't have an account?{' '}
            <Link to="/register" className="fw-bold text-primary text-decoration-none">
              Register Now
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default LoginPage;
