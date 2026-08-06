import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaClock, FaFire, FaArrowRight, FaAward, FaStar, FaQuoteLeft } from 'react-icons/fa';
import CategoryHeader from '../components/CategoryHeader';
import HeroSlider from '../components/HeroSlider';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchShowcaseSections, fetchCategories } from '../services/productService';

const HomePage = () => {
  const [sections, setSections] = useState({
    featured: [],
    trending: [],
    bestSellers: [],
    newArrivals: [],
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 35, seconds: 22 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [showcaseRes, catRes] = await Promise.all([
          fetchShowcaseSections(),
          fetchCategories(),
        ]);
        setSections(showcaseRes);
        setCategories(catRes);
      } catch (err) {
        console.log('Error loading homepage sections', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      {/* Category Strip */}
      <CategoryHeader />

      {/* Hero Slider */}
      <HeroSlider />

      <Container className="my-5">
        {/* Featured Products Banner */}
        <section className="mb-4">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                🔥 Today's Top Picks
              </h3>
              <p className="text-muted small mb-0">Handpicked deals you can't miss</p>
            </div>
            <Link to="/shop" className="text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
              View All <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={2} />
          ) : (
            <Row className="g-4">
              {(sections.featured || []).slice(0, 2).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={6} lg={6}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Flash Sale Banner */}
        <Card className="border-0 shadow-md mb-5 bg-gradient text-white p-4 rounded-4" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f52ba 100%)' }}>
          <Row className="align-items-center">
            <Col md={7}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Badge bg="danger" className="fs-6 px-3 py-2 text-uppercase d-flex align-items-center gap-1">
                  <FaFire /> Flash Deal of the Day
                </Badge>
                <span className="text-warning fw-bold small">• 80% OFF STOCK</span>
              </div>
              <h2 className="fw-extrabold mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Hurry Up! Offer Ends Soon
              </h2>
              <p className="lead mb-0 text-light small">
                Unbeatable discounts on Sony Noise Canceling Headphones, Apple AirPods Pro & Samsung 4K Smart TVs!
              </p>
            </Col>
            <Col md={5} className="mt-3 mt-md-0 text-md-end">
              <div className="d-inline-flex align-items-center gap-2 bg-dark bg-opacity-50 p-3 rounded-3 border border-secondary mb-2">
                <FaClock className="text-warning fs-3" />
                <div className="text-center">
                  <div className="fs-4 fw-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="x-small text-muted">HOURS</div>
                </div>
                <span className="fs-4 text-warning fw-bold">:</span>
                <div className="text-center">
                  <div className="fs-4 fw-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="x-small text-muted">MINS</div>
                </div>
                <span className="fs-4 text-warning fw-bold">:</span>
                <div className="text-center">
                  <div className="fs-4 fw-bold text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="x-small text-muted">SECS</div>
                </div>
              </div>
              <div>
                <Button as={Link} to="/shop" variant="warning" className="fw-bold px-4 py-2 rounded-pill">
                  Shop Deals Now →
                </Button>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Featured Categories Grid */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Explore Categories
              </h3>
              <p className="text-muted small mb-0">Browse through 10 curated categories</p>
            </div>
            <Link to="/shop" className="text-primary fw-bold text-decoration-none d-flex align-items-center gap-1">
              View All <FaArrowRight />
            </Link>
          </div>

          <Row className="g-3">
            {categories.map((cat) => (
              <Col key={cat._id || cat.slug} xs={6} sm={4} md={3} lg={2.4}>
                <Card
                  as={Link}
                  to={`/shop?category=${encodeURIComponent(cat.name)}`}
                  className="text-decoration-none border-0 shadow-sm text-center p-3 h-100 hover-lift rounded-4"
                  style={{ background: '#ffffff' }}
                >
                  <div className="mx-auto mb-2 overflow-hidden rounded-circle" style={{ width: '70px', height: '70px' }}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.9rem' }}>
                    {cat.name}
                  </h6>
                  <span className="text-muted x-small">Explore Items</span>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Featured Products & Top Deals */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ⭐ Featured Products & Mega Deals
              </h3>
              <p className="text-muted small mb-0">Handpicked top deals with unbelievable savings</p>
            </div>
            <Link to="/shop" className="text-primary fw-bold text-decoration-none">
              View All Products →
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <Row className="g-4">
              {(sections.featured || []).slice(0, 15).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Trending Products */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                🔥 Trending Products
              </h3>
              <p className="text-muted small mb-0">Most popular choices bought by shoppers today</p>
            </div>
            <Link to="/shop?isTrending=true" className="text-primary fw-bold text-decoration-none">
              See All Trending →
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <Row className="g-4">
              {sections.trending.slice(0, 4).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Best Sellers */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                🏆 Best Sellers
              </h3>
              <p className="text-muted small mb-0">Top rated products with 5-star customer reviews</p>
            </div>
            <Link to="/shop?isBestSeller=true" className="text-primary fw-bold text-decoration-none">
              See All Best Sellers →
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <Row className="g-4">
              {sections.bestSellers.slice(0, 4).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* New Arrivals */}
        <section className="mb-5">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                ✨ New Arrivals
              </h3>
              <p className="text-muted small mb-0">Freshly launched gadgets, fashion, and books</p>
            </div>
            <Link to="/shop?isNewArrival=true" className="text-primary fw-bold text-decoration-none">
              See All New Arrivals →
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={4} />
          ) : (
            <Row className="g-4">
              {sections.newArrivals.slice(0, 4).map((product) => (
                <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </section>

        {/* Customer Reviews & Testimonials */}
        <section className="mb-5 py-4 bg-white rounded-4 p-4 border shadow-sm">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark" style={{ fontFamily: 'Outfit, sans-serif' }}>
              What Our Customers Say
            </h3>
            <p className="text-muted small">Over 1,00,000+ happy buyers trust Trendkart every day</p>
          </div>

          <Row className="g-4">
            <Col md={4}>
              <Card className="border-0 bg-light p-3 h-100 rounded-3">
                <Card.Body>
                  <FaQuoteLeft className="text-primary fs-3 mb-2 opacity-50" />
                  <p className="text-muted small">
                    "Trendkart delivered my Sony WH-1000XM5 headphones within 24 hours in pristine original packaging. The price was 20% lower than other platforms!"
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                      alt="Priya S"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>Priya Sharma</h6>
                      <div className="text-warning small"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> Verified Buyer</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 bg-light p-3 h-100 rounded-3">
                <Card.Body>
                  <FaQuoteLeft className="text-primary fs-3 mb-2 opacity-50" />
                  <p className="text-muted small">
                    "Ordered an iPhone 15 Pro Max and Levis jeans. Smooth Stripe payment checkout and real-time order tracking timeline kept me updated."
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                      alt="Rahul K"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>Rahul Kapoor</h6>
                      <div className="text-warning small"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> Verified Buyer</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0 bg-light p-3 h-100 rounded-3">
                <Card.Body>
                  <FaQuoteLeft className="text-primary fs-3 mb-2 opacity-50" />
                  <p className="text-muted small">
                    "The product comparison tool helped me choose between ASUS ROG and MacBook Pro easily. Excellent service and support!"
                  </p>
                  <div className="d-flex align-items-center gap-2 mt-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                      alt="Ananya M"
                      className="rounded-circle"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div>
                      <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: '0.9rem' }}>Ananya Mehta</h6>
                      <div className="text-warning small"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /> Verified Buyer</div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default HomePage;
