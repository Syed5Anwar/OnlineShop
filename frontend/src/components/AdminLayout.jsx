import React, { useContext } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation, Navigate } from 'react-router-dom';
import {
  FaChartPie,
  FaBox,
  FaTags,
  FaShoppingBag,
  FaUsers,
  FaStar,
  FaArrowLeft,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { user, isAdmin } = useContext(AuthContext);
  const location = useLocation();

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const menuItems = [
    { title: 'Dashboard Analytics', path: '/admin/dashboard', icon: FaChartPie },
    { title: 'Manage Products', path: '/admin/products', icon: FaBox },
    { title: 'Manage Categories', path: '/admin/categories', icon: FaTags },
    { title: 'Manage Orders', path: '/admin/orders', icon: FaShoppingBag },
    { title: 'Manage Users', path: '/admin/users', icon: FaUsers },
    { title: 'Manage Reviews', path: '/admin/reviews', icon: FaStar },
  ];

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Admin Sidebar */}
        <Col lg={3} xl={2} className="mb-4">
          <div className="bg-white p-3 rounded-3 shadow-sm border">
            <div className="pb-3 mb-3 border-bottom d-flex align-items-center justify-content-between">
              <div>
                <h6 className="fw-bold mb-0 text-primary">ADMIN PORTAL</h6>
                <small className="text-muted">{user.email}</small>
              </div>
            </div>

            <Nav className="flex-column nav-pills gap-1">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Nav.Link
                    key={index}
                    as={Link}
                    to={item.path}
                    className={`d-flex align-items-center gap-2 fw-semibold px-3 py-2 rounded-2 ${
                      isActive ? 'active bg-primary text-white' : 'text-dark hover-bg-light'
                    }`}
                  >
                    <Icon />
                    <span>{item.title}</span>
                  </Nav.Link>
                );
              })}
            </Nav>

            <div className="mt-4 pt-3 border-top">
              <Link to="/" className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
                <FaArrowLeft /> Exit Admin Panel
              </Link>
            </div>
          </div>
        </Col>

        {/* Admin Main Content */}
        <Col lg={9} xl={10}>
          <div className="bg-white p-4 rounded-3 shadow-sm border min-vh-75">{children}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout;
