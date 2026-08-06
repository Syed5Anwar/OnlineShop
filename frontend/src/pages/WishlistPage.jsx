import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import { WishlistContext } from '../context/WishlistContext';

const WishlistPage = () => {
  const { wishlistItems } = useContext(WishlistContext);

  if (wishlistItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 bg-white rounded-4 shadow-sm border max-w-600 mx-auto">
          <FaHeart className="display-1 text-danger mb-3 opacity-50" />
          <h3 className="fw-bold mb-2">Your Wishlist is Empty</h3>
          <p className="text-muted mb-4">Save products you love by clicking the heart icon on any card.</p>
          <Button as={Link} to="/shop" variant="primary" className="btn-primary-blue btn-lg px-4">
            Explore Trending Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        My Wishlist ({wishlistItems.length} items)
      </h2>

      <Row className="g-4">
        {wishlistItems.map((product) => (
          <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WishlistPage;
