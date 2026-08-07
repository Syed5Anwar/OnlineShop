import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import { FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import Rating from './Rating';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { getImageUrl } from '../services/api';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);

  const isWishlisted = isInWishlist(product._id);

  const activePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="product-card">
      {/* Badges Container */}
      <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1 z-2">
        {hasDiscount && (
          <Badge className="badge-discount shadow-sm">
            {product.discountPercentage || Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
          </Badge>
        )}
        {product.isBestSeller && <Badge className="badge-tag badge-bestseller">Best Seller</Badge>}
        {product.isTrending && <Badge className="badge-tag badge-trending">Trending</Badge>}
        {product.isNewArrival && <Badge className="badge-tag badge-new">New Arrival</Badge>}
      </div>

      {/* Wishlist Button */}
      <button
        className={`wishlist-btn-overlay ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
      >
        <FaHeart />
      </button>

      {/* Image Container */}
      <div className="product-image-container">
        <Link to={`/product/${product._id}`} className="w-100 h-100 d-flex align-items-center justify-content-center">
          <img
            src={product.images && product.images.length > 0 ? getImageUrl(product.images[0]) : 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800';
            }}
          />
        </Link>
      </div>

      {/* Product Content */}
      <div className="p-3 d-flex flex-column flex-grow-1">
        <div className="text-muted small text-uppercase fw-bold mb-1" style={{ letterSpacing: '0.5px' }}>
          {product.brand}
        </div>
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark fw-semibold mb-2 line-clamp-2"
          style={{ fontSize: '0.95rem', height: '2.7rem', overflow: 'hidden' }}
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-2">
          <Rating value={product.rating || 4.5} text={`${product.numReviews || 0}`} />
        </div>

        {/* Price Section */}
        <div className="mt-auto d-flex align-items-baseline gap-2 mb-3">
          <span className="fs-5 fw-bold text-dark">₹{activePrice.toLocaleString('en-IN')}</span>
          {hasDiscount && (
            <span className="text-decoration-line-through text-muted small">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
          <Button
            variant="primary"
            className="btn-accent-orange w-100 d-flex align-items-center justify-content-center gap-2 btn-sm fw-bold"
            onClick={() => addToCart(product, 1)}
          >
            <FaShoppingCart /> Add to Cart
          </Button>
          <Button
            as={Link}
            to={`/product/${product._id}`}
            variant="light"
            className="btn-sm border text-secondary d-flex align-items-center justify-content-center"
            title="View Details"
          >
            <FaEye />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
