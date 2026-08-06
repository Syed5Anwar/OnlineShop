import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <Container className="py-5 text-center my-5">
      <div className="max-w-600 mx-auto py-5 bg-white rounded-4 shadow-sm border p-4">
        <FaExclamationTriangle className="display-1 text-warning mb-3" />
        <h1 className="display-4 fw-extrabold text-dark mb-2">404</h1>
        <h3 className="fw-bold mb-3">Page Not Found</h3>
        <p className="text-muted mb-4">
          Oops! The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Button as={Link} to="/" variant="primary" className="btn-primary-blue btn-lg px-4 fw-bold">
          <FaHome className="me-2" /> Back to Homepage
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundPage;
