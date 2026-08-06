import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const res = await register(name, email, password, mobile);
    setLoading(false);

    if (res.success) {
      toast.success(`Account created successfully! Welcome, ${res.data.name}`);
      navigate('/');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <Container className="py-5">
      <div className="max-w-500 mx-auto">
        <Card className="border-0 shadow-lg rounded-4 p-4">
          <div className="text-center mb-4">
            <h3 className="brand-logo mb-1">
              Trend<span>kart</span>
            </h3>
            <p className="text-muted small">Create a new shopper account</p>
          </div>

          {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Full Name *</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaUser />
                </span>
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Email Address *</Form.Label>
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

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Mobile Number</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaPhone />
                </span>
                <Form.Control
                  type="text"
                  placeholder="+91 9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="small fw-semibold">Password *</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-semibold">Confirm Password *</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-light text-muted">
                  <FaLock />
                </span>
                <Form.Control
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
              <FaUserPlus /> Create Trendkart Account
            </Button>
          </Form>

          <div className="text-center small text-muted">
            Already have an account?{' '}
            <Link to="/login" className="fw-bold text-primary text-decoration-none">
              Login Here
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default RegisterPage;
