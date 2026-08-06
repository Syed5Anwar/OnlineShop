import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form, Table, Badge } from 'react-bootstrap';
import { FaTrash, FaShoppingBag, FaArrowRight, FaTag } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { validateCoupon } from '../services/orderService';
import { toast } from 'react-toastify';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    coupon,
    setCoupon,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discountAmount,
    totalAmount,
  } = useContext(CartContext);

  const [couponCode, setCouponCode] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const navigate = useNavigate();

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setApplyingCoupon(true);
    try {
      const res = await validateCoupon(couponCode.trim(), itemsPrice);
      setCoupon(res);
      toast.success(res.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon code');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode('');
    toast.info('Coupon code removed');
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 bg-white rounded-4 shadow-sm border max-w-600 mx-auto">
          <FaShoppingBag className="display-1 text-muted mb-3 opacity-50" />
          <h3 className="fw-bold mb-2">Your Shopping Cart is Empty</h3>
          <p className="text-muted mb-4">Explore 70+ products across 10 categories on Trendkart.</p>
          <Button as={Link} to="/shop" variant="primary" className="btn-primary-blue btn-lg px-4">
            Start Shopping Now
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Shopping Cart ({cartItems.length} items)
      </h2>

      <Row className="g-4">
        {/* Cart Items Table */}
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-4 p-3">
            <Table responsive className="align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Product</th>
                  <th className="text-center">Price</th>
                  <th className="text-center">Quantity</th>
                  <th className="text-end">Subtotal</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const product = item.product;
                  const itemPrice = product.discountPrice || product.price;
                  return (
                    <tr key={product._id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            style={{ width: '65px', height: '65px', objectFit: 'contain' }}
                            className="rounded border p-1"
                          />
                          <div>
                            <Link
                              to={`/product/${product._id}`}
                              className="fw-bold text-dark text-decoration-none line-clamp-1"
                              style={{ fontSize: '0.95rem' }}
                            >
                              {product.name}
                            </Link>
                            <div className="text-muted x-small">Brand: {product.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center fw-semibold">₹{itemPrice.toLocaleString('en-IN')}</td>
                      <td className="text-center">
                        <div className="input-group input-group-sm mx-auto" style={{ width: '100px' }}>
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateQuantity(product._id, item.quantity - 1)}
                          >
                            -
                          </Button>
                          <Form.Control
                            type="text"
                            className="text-center fw-bold px-1"
                            value={item.quantity}
                            readOnly
                          />
                          <Button
                            variant="outline-secondary"
                            onClick={() => updateQuantity(product._id, item.quantity + 1)}
                            disabled={item.quantity >= product.stockQuantity}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-primary">
                        ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                      </td>
                      <td className="text-center">
                        <Button
                          variant="link"
                          className="text-danger p-0 fs-5"
                          onClick={() => removeFromCart(product._id)}
                          title="Remove Item"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
              <Button as={Link} to="/shop" variant="outline-primary" className="fw-semibold">
                ← Continue Shopping
              </Button>
              <Button variant="outline-danger" onClick={clearCart} className="fw-semibold">
                Clear Cart
              </Button>
            </div>
          </Card>
        </Col>

        {/* Order Summary Sidebar */}
        <Col lg={4}>
          {/* Coupon Card */}
          <Card className="border-0 shadow-sm rounded-4 p-3 mb-3">
            <h6 className="fw-bold mb-2 d-flex align-items-center gap-2">
              <FaTag className="text-warning" /> Have a Coupon Code?
            </h6>
            {coupon ? (
              <div className="alert alert-success d-flex justify-content-between align-items-center mb-0 p-2">
                <div>
                  <strong>{coupon.code}</strong> applied! Saved ₹{coupon.discountAmount}
                </div>
                <Button variant="link" className="text-danger p-0 fw-bold text-decoration-none ms-2" onClick={removeCoupon}>
                  Remove
                </Button>
              </div>
            ) : (
              <Form onSubmit={handleApplyCoupon} className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="e.g. TREND20 or WELCOME10"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="text-uppercase"
                />
                <Button type="submit" variant="primary" className="btn-primary-blue fw-bold" disabled={applyingCoupon}>
                  Apply
                </Button>
              </Form>
            )}
          </Card>

          {/* Price Breakdown Card */}
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <h5 className="fw-bold mb-3 border-bottom pb-2">Order Price Summary</h5>

            <div className="d-flex justify-content-between py-2 text-secondary">
              <span>Items Total ({cartItems.length}):</span>
              <span className="fw-semibold text-dark">₹{itemsPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="d-flex justify-content-between py-2 text-secondary">
              <span>GST Tax (18% Included):</span>
              <span className="fw-semibold text-dark">₹{taxPrice.toLocaleString('en-IN')}</span>
            </div>

            <div className="d-flex justify-content-between py-2 text-secondary">
              <span>Delivery Charges:</span>
              <span className={`fw-semibold ${shippingPrice === 0 ? 'text-success' : 'text-dark'}`}>
                {shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}
              </span>
            </div>

            {coupon && (
              <div className="d-flex justify-content-between py-2 text-success fw-bold">
                <span>Coupon Discount ({coupon.code}):</span>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <hr />

            <div className="d-flex justify-content-between py-2 fs-5 fw-extrabold text-dark">
              <span>Grand Total:</span>
              <span className="text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
              variant="warning"
              size="lg"
              className="btn-accent-orange w-100 mt-3 fw-bold d-flex align-items-center justify-content-center gap-2"
            >
              Proceed to Checkout <FaArrowRight />
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
