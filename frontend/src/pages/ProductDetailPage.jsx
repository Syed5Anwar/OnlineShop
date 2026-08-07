import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Badge, Table, Alert } from 'react-bootstrap';
import {
  FaHeart,
  FaShoppingCart,
  FaBolt,
  FaBalanceScale,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaCheck,
} from 'react-icons/fa';
import Rating from '../components/Rating';
import ProductCard from '../components/ProductCard';
import CompareModal from '../components/CompareModal';
import { fetchProductDetails, fetchProducts, addReview } from '../services/productService';
import { getImageUrl } from '../services/api';
import { CartContext } from '../context/CartContext';
import { WishlistContext } from '../context/WishlistContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Review Form States
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  // Comparison States
  const [compareItems, setCompareItems] = useState([]);
  const [showCompareModal, setShowCompareModal] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductDetails(id);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setActiveImage(data.images[0]);
        }

        // Load Related Products from same category
        const relData = await fetchProducts({ category: data.category, pageSize: 4 });
        setRelatedProducts(relData.products.filter((p) => p._id !== id));
      } catch (err) {
        console.log('Error loading product details', err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleCompare = () => {
    if (!compareItems.some((item) => item._id === product._id)) {
      setCompareItems((prev) => [...prev, product]);
      toast.info('Added to compare list!');
    }
    setShowCompareModal(true);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to leave a product review.');
      return;
    }
    setSubmittingReview(true);
    try {
      await addReview(product._id, {
        rating: newRating,
        title: newTitle,
        comment: newComment,
      });
      toast.success('Thank you! Your review has been submitted.');
      // Refresh product details
      const updatedData = await fetchProductDetails(id);
      setProduct(updatedData);
      setNewComment('');
      setNewTitle('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2 text-muted">Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger">Product not found.</Alert>
        <Link to="/shop" className="btn btn-primary">
          Back to Shop
        </Link>
      </Container>
    );
  }

  const activePrice = product.discountPrice || product.price;
  const isWishlisted = isInWishlist(product._id);

  return (
    <Container className="py-4">
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb small">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none">
              Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="text-decoration-none">
              {product.category}
            </Link>
          </li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      {/* Main Product Display Card */}
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-5">
        <Row className="g-4">
          {/* Image Gallery Column */}
          <Col md={6}>
            <div className="border rounded-4 p-3 bg-light text-center mb-3" style={{ height: '400px' }}>
              <img
                src={getImageUrl(activeImage)}
                alt={product.name}
                className="w-100 h-100"
                style={{ objectFit: 'contain' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>
            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="d-flex gap-2 justify-content-center overflow-auto">
                {product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`${product.name} ${idx}`}
                    className={`rounded-3 border p-1 cursor-pointer ${
                      activeImage === img ? 'border-primary border-2' : ''
                    }`}
                    style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            )}
          </Col>

          {/* Product Info Column */}
          <Col md={6} className="d-flex flex-column">
            <div className="text-uppercase fw-bold text-secondary mb-1" style={{ letterSpacing: '0.5px' }}>
              {product.brand}
            </div>
            <h2 className="fw-bold mb-2 text-dark" style={{ fontFamily: 'Outfit, sans-serif' }}>
              {product.name}
            </h2>

            {/* Ratings & Stock */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
              <span className="text-muted">|</span>
              <span className={`fw-bold small ${product.stockQuantity > 0 ? 'text-success' : 'text-danger'}`}>
                {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity} units)` : 'Out of Stock'}
              </span>
            </div>

            {/* Price Section */}
            <div className="bg-light p-3 rounded-3 mb-3 border">
              <div className="d-flex align-items-baseline gap-3">
                <span className="display-6 fw-extrabold text-dark">₹{activePrice.toLocaleString('en-IN')}</span>
                {product.discountPrice && (
                  <>
                    <span className="text-decoration-line-through text-muted fs-5">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <Badge bg="success" className="fs-6 px-2 py-1">
                      {product.discountPercentage}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <div className="text-muted small mt-1">Inclusive of all taxes & free shipping on eligible orders</div>
            </div>

            <p className="text-muted mb-4">{product.description}</p>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <label className="fw-bold text-secondary small">QUANTITY:</label>
              <div className="input-group" style={{ width: '130px' }}>
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </Button>
                <Form.Control
                  type="text"
                  className="text-center fw-bold"
                  value={quantity}
                  readOnly
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => setQuantity((prev) => Math.min(product.stockQuantity, prev + 1))}
                  disabled={quantity >= product.stockQuantity}
                >
                  +
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-wrap gap-2 mb-4">
              <Button
                variant="warning"
                size="lg"
                className="btn-accent-orange flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={handleAddToCart}
                disabled={product.stockQuantity <= 0}
              >
                <FaShoppingCart /> Add to Cart
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="btn-primary-blue flex-grow-1 fw-bold d-flex align-items-center justify-content-center gap-2"
                onClick={handleBuyNow}
                disabled={product.stockQuantity <= 0}
              >
                <FaBolt /> Buy Now
              </Button>
              <Button
                variant={isWishlisted ? 'danger' : 'outline-danger'}
                size="lg"
                onClick={() => toggleWishlist(product)}
                title="Wishlist"
              >
                <FaHeart />
              </Button>
              <Button variant="outline-secondary" size="lg" onClick={handleCompare} title="Compare">
                <FaBalanceScale />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-auto border-top pt-3 d-flex gap-4 text-muted small">
              <div className="d-flex align-items-center gap-2">
                <FaTruck className="text-primary fs-5" /> Free Express Delivery
              </div>
              <div className="d-flex align-items-center gap-2">
                <FaShieldAlt className="text-success fs-5" /> 1 Year Brand Warranty
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Specifications Table */}
      {product.specifications && product.specifications.length > 0 && (
        <Card className="border-0 shadow-sm rounded-4 p-4 mb-5">
          <h4 className="fw-bold mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Technical Specifications
          </h4>
          <Table responsive bordered hover className="align-middle">
            <tbody>
              {product.specifications.map((spec, i) => (
                <tr key={i}>
                  <td className="bg-light fw-bold text-secondary" style={{ width: '30%' }}>
                    {spec.key}
                  </td>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}

      {/* Reviews & Submission Form Section */}
      <Card className="border-0 shadow-sm rounded-4 p-4 mb-5">
        <h4 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Customer Reviews ({product.numReviews})
        </h4>

        <Row className="g-4">
          <Col md={7}>
            {product.numReviews === 0 ? (
              <Alert variant="info">No reviews yet for this product. Be the first to review!</Alert>
            ) : (
              <div className="d-flex flex-column gap-3">
                {/* Sample reviews */}
                <div className="p-3 border rounded-3 bg-light">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="fw-bold text-dark">Verified Shopper</span>
                    <Rating value={product.rating} />
                  </div>
                  <h6 className="fw-bold text-primary mb-1">Authentic & High Quality Product</h6>
                  <p className="text-muted small mb-0">
                    Works exactly as specified in the specifications. Quick delivery and top-notch packaging by Trendkart!
                  </p>
                </div>
              </div>
            )}
          </Col>

          <Col md={5}>
            <div className="p-3 bg-light border rounded-3">
              <h5 className="fw-bold mb-3">Write a Customer Review</h5>
              {user ? (
                <Form onSubmit={handleReviewSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Rating</Form.Label>
                    <Form.Select
                      value={newRating}
                      onChange={(e) => setNewRating(Number(e.target.value))}
                    >
                      <option value="5">5 ★★★★★ - Excellent</option>
                      <option value="4">4 ★★★★☆ - Very Good</option>
                      <option value="3">3 ★★★☆☆ - Average</option>
                      <option value="2">2 ★★☆☆☆ - Poor</option>
                      <option value="1">1 ★☆☆☆☆ - Terrible</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Review Headline</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="e.g. Great performance & fast shipping"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold small">Detailed Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Write your experience with this product..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="btn-primary-blue w-100 fw-bold" disabled={submittingReview}>
                    Submit Review
                  </Button>
                </Form>
              ) : (
                <div className="text-center py-3">
                  <p className="text-muted small mb-2">You must be logged in to post a review.</p>
                  <Link to="/login" className="btn btn-outline-primary btn-sm px-4 fw-semibold">
                    Login to Review
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Card>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="mb-5">
          <h4 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Related Products in {product.category}
          </h4>
          <Row className="g-4">
            {relatedProducts.map((relProd) => (
              <Col key={relProd._id} xs={12} sm={6} md={3}>
                <ProductCard product={relProd} />
              </Col>
            ))}
          </Row>
        </section>
      )}

      {/* Comparison Modal */}
      <CompareModal
        show={showCompareModal}
        onHide={() => setShowCompareModal(false)}
        products={compareItems}
        removeCompareItem={(remId) => setCompareItems((prev) => prev.filter((p) => p._id !== remId))}
      />
    </Container>
  );
};

export default ProductDetailPage;
