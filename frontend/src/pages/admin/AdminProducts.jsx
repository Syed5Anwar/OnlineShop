import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';
import { FaPlus, FaEdit, FaTrash, FaBox } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchProducts, createProduct, deleteProduct } from '../../services/productService';
import { toast } from 'react-toastify';

const categories = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Home & Kitchen',
  'Grocery',
  'Mobiles',
  'Laptops',
  'Sports',
  'Furniture',
  'Toys',
];

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    discountPrice: '',
    category: 'Electronics',
    images: '',
    stockQuantity: 10,
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true,
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ pageSize: 100 });
      setProducts(data.products || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted successfully');
        loadProducts();
      } catch (err) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const productPayload = {
        ...newProduct,
        price: Number(newProduct.price),
        discountPrice: newProduct.discountPrice ? Number(newProduct.discountPrice) : Number(newProduct.price),
        stockQuantity: Number(newProduct.stockQuantity),
        images: newProduct.images ? newProduct.images.split(',').map((img) => img.trim()) : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
      };

      await createProduct(productPayload);
      toast.success('Product added successfully!');
      setShowAddModal(false);
      loadProducts();
    } catch (err) {
      toast.error('Failed to create product');
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Product Inventory Management
          </h3>
          <p className="text-muted small mb-0">Total Products: {products.length}</p>
        </div>
        <Button variant="primary" className="btn-primary-blue fw-bold d-flex align-items-center gap-2" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Add New Product
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Badges</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    style={{ width: '45px', height: '45px', objectFit: 'contain' }}
                    className="rounded border p-1"
                  />
                </td>
                <td className="fw-semibold small" style={{ maxWidth: '250px' }}>
                  {prod.name}
                  <div className="text-muted x-small">Brand: {prod.brand}</div>
                </td>
                <td className="small">{prod.category}</td>
                <td className="fw-bold small">₹{(prod.discountPrice || prod.price).toLocaleString('en-IN')}</td>
                <td>
                  <Badge bg={prod.stockQuantity > 0 ? 'success' : 'danger'}>
                    {prod.stockQuantity}
                  </Badge>
                </td>
                <td>
                  {prod.isFeatured && <Badge bg="primary" className="me-1">Featured</Badge>}
                  {prod.isTrending && <Badge bg="warning" text="dark" className="me-1">Trending</Badge>}
                  {prod.isBestSeller && <Badge bg="success">Best Seller</Badge>}
                </td>
                <td className="text-center">
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(prod._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Brand *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Category *</Form.Label>
                  <Form.Select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  >
                    {categories.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Original Price (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={3}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Discount Price (₹)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.discountPrice}
                    onChange={(e) => setNewProduct({ ...newProduct, discountPrice: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Stock Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Image URLs (comma separated)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://..."
                    value={newProduct.images}
                    onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label className="small fw-semibold">Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    required
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="primary" className="btn-primary-blue w-100 mt-4 fw-bold">
              Save & Publish Product
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProducts;
