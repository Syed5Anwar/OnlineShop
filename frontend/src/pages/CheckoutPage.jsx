import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { FaLock, FaCreditCard, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../services/orderService';
import { toast } from 'react-toastify';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    cartItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    discountAmount,
    totalAmount,
    clearCart,
  } = useContext(CartContext);

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    mobile: user?.mobile || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    expDate: '12/28',
    cvv: '123',
  });
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    if (!user) {
      toast.info('Please login or register to complete your checkout');
      navigate('/login?redirect=checkout');
    }
  }, [cartItems, user, navigate]);

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.zipCode || !address.mobile) {
      toast.error('Please fill in all required shipping address fields');
      return;
    }

    setPlacingOrder(true);
    try {
      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.product.name,
          quantity: item.quantity,
          image: item.product.images[0],
          price: item.product.discountPrice || item.product.price,
          product: item.product._id,
        })),
        shippingAddress: address,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        discountAmount,
        totalAmount,
      };

      const newOrder = await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-success/${newOrder._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Checkout & Payment
      </h2>

      <Form onSubmit={handlePlaceOrder}>
        <Row className="g-4">
          {/* Shipping & Payment Column */}
          <Col lg={7}>
            {/* Shipping Address Card */}
            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
              <h5 className="fw-bold mb-3 text-primary">1. Shipping & Delivery Address</h5>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Full Name *</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={address.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Mobile Number *</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={address.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Street Address / House No. *</Form.Label>
                    <Form.Control
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleInputChange}
                      placeholder="Flat 402, Sunshine Apartments, MG Road"
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">City *</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">State *</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Pincode / Zip *</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Card>

            {/* Payment Method Card */}
            <Card className="border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 text-primary">2. Payment Method</h5>

              <Form.Check
                type="radio"
                id="pm-cod"
                name="paymentMethod"
                label={
                  <span className="fw-bold d-flex align-items-center gap-2">
                    <FaMoneyBillWave className="text-success fs-5" /> Cash on Delivery (COD)
                  </span>
                }
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="mb-3 p-3 border rounded-3"
              />

              <Form.Check
                type="radio"
                id="pm-stripe"
                name="paymentMethod"
                label={
                  <span className="fw-bold d-flex align-items-center gap-2">
                    <FaCreditCard className="text-primary fs-5" /> Stripe Secure Credit / Debit Card
                  </span>
                }
                checked={paymentMethod === 'Stripe'}
                onChange={() => setPaymentMethod('Stripe')}
                className="mb-3 p-3 border rounded-3"
              />

              {paymentMethod === 'Stripe' && (
                <div className="p-3 bg-light rounded-3 border mb-3">
                  <h6 className="fw-bold mb-2 small text-uppercase">Test Card Simulation</h6>
                  <Row className="g-2">
                    <Col xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Card Number"
                        value={cardDetails.cardNumber}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expDate}
                        onChange={(e) => setCardDetails({ ...cardDetails, expDate: e.target.value })}
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="password"
                        placeholder="CVV"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      />
                    </Col>
                  </Row>
                  <small className="text-muted mt-2 d-block">
                    256-bit SSL encrypted Stripe payment intent.
                  </small>
                </div>
              )}
            </Card>
          </Col>

          {/* Order Summary Column */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Order Items ({cartItems.length})</h5>

              <div className="max-h-300 overflow-auto mb-3">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="d-flex align-items-center gap-3 py-2 border-bottom">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      className="rounded border"
                    />
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-semibold text-truncate small">{item.product.name}</div>
                      <div className="text-muted x-small">
                        Qty: {item.quantity} x ₹
                        {(item.product.discountPrice || item.product.price).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="fw-bold text-dark">
                      ₹
                      {(
                        (item.product.discountPrice || item.product.price) * item.quantity
                      ).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="d-flex justify-content-between py-1 text-secondary small">
                <span>Items Price:</span>
                <span>₹{itemsPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between py-1 text-secondary small">
                <span>GST Tax (18%):</span>
                <span>₹{taxPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between py-1 text-secondary small">
                <span>Shipping:</span>
                <span>{shippingPrice === 0 ? 'FREE' : `₹${shippingPrice}`}</span>
              </div>
              {discountAmount > 0 && (
                <div className="d-flex justify-content-between py-1 text-success small fw-bold">
                  <span>Coupon Discount:</span>
                  <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <hr />

              <div className="d-flex justify-content-between py-2 fs-5 fw-extrabold text-dark">
                <span>Total Amount:</span>
                <span className="text-primary">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <Button
                type="submit"
                variant="warning"
                size="lg"
                className="btn-accent-orange w-100 mt-3 fw-bold d-flex align-items-center justify-content-center gap-2"
                disabled={placingOrder}
              >
                <FaLock /> Place Order Now (₹{totalAmount.toLocaleString('en-IN')})
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default CheckoutPage;
