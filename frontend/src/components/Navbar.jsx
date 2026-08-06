import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BsNavbar, Nav, Container, Form, InputGroup, Dropdown, Badge, Button } from 'react-bootstrap';
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaSun,
  FaMoon,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBoxOpen,
  FaBalanceScale,
} from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { ThemeContext } from '../context/ThemeContext';
import { fetchProducts } from '../services/productService';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { itemsCount } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        try {
          const res = await fetchProducts({ keyword: searchTerm, pageSize: 5 });
          setSuggestions(res.products || []);
          setShowSuggestions(true);
        } catch (e) {
          console.log(e);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setShowSuggestions(false);
      navigate(`/shop?keyword=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="sticky-top">
      {/* Top Banner Bar */}
      <div className="top-nav text-center">
        <Container>
          <span>🎉 <strong>Trendkart Mega Deal Mania is LIVE!</strong> Enjoy up to 80% Off + Extra 10% Instant Discount on HDFC & SBI Cards!</span>
        </Container>
      </div>

      {/* Main Navbar */}
      <BsNavbar expand="lg" className="main-navbar py-2">
        <Container>
          {/* Brand Logo */}
          <BsNavbar.Brand as={Link} to="/" className="brand-logo me-4">
            Trend<span>kart</span>
          </BsNavbar.Brand>

          {/* Search Bar */}
          <div className="flex-grow-1 mx-lg-4 position-relative" ref={searchRef} style={{ maxWidth: '600px' }}>
            <Form onSubmit={handleSearchSubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Search 70+ products, brands & categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => searchTerm.trim().length >= 2 && setShowSuggestions(true)}
                  className="rounded-start-pill ps-3"
                  style={{ border: '2px solid #0f52ba' }}
                />
                <Button type="submit" variant="primary" className="btn-primary-blue rounded-end-pill px-4">
                  <FaSearch />
                </Button>
              </InputGroup>
            </Form>

            {/* Live Search Auto-Suggest Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                className="position-absolute w-100 bg-white shadow-lg rounded-3 mt-1 py-2 z-3 border"
                style={{ top: '100%', left: 0 }}
              >
                {suggestions.map((item) => (
                  <div
                    key={item._id}
                    className="d-flex align-items-center gap-3 px-3 py-2 text-decoration-none border-bottom cursor-pointer hover-bg-light"
                    onClick={() => {
                      setShowSuggestions(false);
                      setSearchTerm('');
                      navigate(`/product/${item._id}`);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-semibold text-truncate text-dark" style={{ fontSize: '0.9rem' }}>
                        {item.name}
                      </div>
                      <div className="text-muted" style={{ fontSize: '0.78rem' }}>
                        in {item.category} • <strong className="text-success">₹{item.discountPrice || item.price}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              {/* Dark Mode Toggle */}
              <Button
                variant="link"
                onClick={toggleDarkMode}
                className="text-dark p-1 d-flex align-items-center justify-content-center text-decoration-none fs-5"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {darkMode ? <FaSun className="text-warning" /> : <FaMoon className="text-secondary" />}
              </Button>

              {/* Compare Icon */}
              <Nav.Link as={Link} to="/compare" className="d-flex align-items-center gap-1 text-dark fw-semibold">
                <FaBalanceScale className="fs-5 text-primary" />
                <span className="d-lg-none d-xl-inline">Compare</span>
              </Nav.Link>

              {/* Wishlist */}
              <Nav.Link as={Link} to="/wishlist" className="position-relative d-flex align-items-center gap-1 text-dark fw-semibold">
                <FaHeart className="fs-5 text-danger" />
                <span className="d-lg-none d-xl-inline">Wishlist</span>
                {wishlistCount > 0 && (
                  <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                    {wishlistCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* Shopping Cart */}
              <Nav.Link as={Link} to="/cart" className="position-relative d-flex align-items-center gap-1 text-dark fw-semibold">
                <FaShoppingCart className="fs-5 text-warning" />
                <span className="d-lg-none d-xl-inline">Cart</span>
                {itemsCount > 0 && (
                  <Badge bg="primary" pill className="position-absolute top-0 start-100 translate-middle">
                    {itemsCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* User Dropdown */}
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="light" className="d-flex align-items-center gap-2 border-0 bg-transparent fw-bold text-dark">
                    <img
                      src={user.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'}
                      alt={user.name}
                      className="rounded-circle"
                      style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                    />
                    <span>{user.name.split(' ')[0]}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow-lg border-0 rounded-3 mt-2">
                    {isAdmin && (
                      <Dropdown.Item as={Link} to="/admin/dashboard" className="fw-bold text-primary">
                        <FaTachometerAlt className="me-2" /> Admin Dashboard
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item as={Link} to="/profile">
                      <FaUser className="me-2 text-secondary" /> My Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/orders">
                      <FaBoxOpen className="me-2 text-secondary" /> My Orders
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={logout} className="text-danger fw-semibold">
                      <FaSignOutAlt className="me-2" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="d-flex gap-2 ms-2">
                  <Link to="/login" className="btn btn-outline-primary btn-sm px-3 fw-semibold">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary-blue btn-sm px-3">
                    Register
                  </Link>
                </div>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
      </BsNavbar>
    </header>
  );
};

export default Navbar;
