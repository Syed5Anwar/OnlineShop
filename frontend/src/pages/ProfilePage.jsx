import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { FaUser, FaSave, FaLock, FaMapMarkerAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { user, updateProfile } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || '',
    profileImage: user?.profileImage || '',
    password: '',
    confirmPassword: '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'India',
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    const profileUpdateData = {
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      profileImage: formData.profileImage,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
    };

    if (formData.password) {
      profileUpdateData.password = formData.password;
    }

    const res = await updateProfile(profileUpdateData);
    setSaving(false);
    if (res.success) {
      toast.success('Profile updated successfully!');
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Container className="py-4 max-w-900">
      <h2 className="fw-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
        Account Profile Settings
      </h2>

      <Row className="g-4">
        {/* Profile Avatar Sidebar */}
        <Col md={4}>
          <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
            <Image
              src={formData.profileImage || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'}
              roundedCircle
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              className="mx-auto mb-3 border p-1"
            />
            <h5 className="fw-bold mb-0">{user?.name}</h5>
            <span className="badge bg-primary text-uppercase mt-1 mb-3">{user?.role}</span>

            <Form.Group className="mb-3 text-start">
              <Form.Label className="small fw-semibold text-secondary">Profile Image URL</Form.Label>
              <Form.Control
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://..."
                size="sm"
              />
            </Form.Group>
          </Card>
        </Col>

        {/* Edit Profile Details Form */}
        <Col md={8}>
          <Card className="border-0 shadow-sm rounded-4 p-4">
            <Form onSubmit={handleSubmit}>
              <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                <FaUser /> Personal Information
              </h5>
              <Row className="g-3 mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Mobile Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                <FaMapMarkerAlt /> Shipping Address
              </h5>
              <Row className="g-3 mb-4">
                <Col md={12}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={4}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Zip / Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <h5 className="fw-bold mb-3 text-primary d-flex align-items-center gap-2">
                <FaLock /> Change Password (Optional)
              </h5>
              <Row className="g-3 mb-4">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave blank to keep unchanged"
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="small fw-semibold">Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button
                type="submit"
                variant="primary"
                className="btn-primary-blue fw-bold px-4 d-flex align-items-center gap-2"
                disabled={saving}
              >
                <FaSave /> Save Profile Changes
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
