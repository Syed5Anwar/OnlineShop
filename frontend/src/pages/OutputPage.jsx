import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Form, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaDownload, FaDatabase, FaBoxOpen, FaTags, FaRupeeSign, FaStar, FaSearch } from 'react-icons/fa';
import { fetchProducts, fetchCategories } from '../services/productService';
import { getImageUrl } from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';

const OutputPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [viewMode, setViewMode] = useState('table'); // table or grid

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productRes, catRes] = await Promise.all([
          fetchProducts({
            pageNumber: page,
            pageSize: 20,
            keyword: searchTerm || '',
            category: selectedCategory !== 'All' ? selectedCategory : '',
          }),
          fetchCategories(),
        ]);
        setProducts(productRes.products || []);
        setTotalPages(productRes.pages || 1);
        setTotalProducts(productRes.totalProducts || 0);
        setCategories(catRes || []);
      } catch (err) {
        console.log('Error loading output data', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, searchTerm, selectedCategory]);

  const handleExport = () => {
    const headers = ['Name', 'Brand', 'Category', 'Price', 'Discount Price', 'Rating', 'Stock', 'Status'];
    const rows = products.map((p) => [
      p.name,
      p.brand,
      p.category,
      p.price,
      p.discountPrice || '-',
      p.rating || '-',
      p.countInStock ?? '-',
      p.isActive ? 'Active' : 'Inactive',
    ]);
    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trendkart-products-output.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    total: totalProducts,
    categories: categories.length,
    discounted: products.filter((p) => p.discountPrice && p.discountPrice < p.price).length,
    avgRating: products.length
      ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
      : '0',
  };

  return (
    <Container className="py-4">
      {/* Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <FaDatabase className="text-primary fs-4" />
            <h2 className="fw-bold mb-0" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Data Output
            </h2>
          </div>
          <p className="text-muted small mb-0">
            Live output from the backend database — <strong className="text-primary">{totalProducts}</strong> products
          </p>
        </div>
        <div className="d-flex gap-2 mt-3 mt-md-0">
          <Button variant="outline-primary" size="sm" onClick={handleExport} className="fw-semibold">
            <FaDownload className="me-1" /> Export CSV
          </Button>
          <div className="btn-group btn-group-sm">
            <Button
              variant={viewMode === 'table' ? 'primary' : 'outline-secondary'}
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-3 mb-4">
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-primary bg-opacity-10 rounded-3 p-3">
                <FaBoxOpen className="text-primary fs-4" />
              </div>
              <div>
                <div className="fs-4 fw-bold text-dark">{stats.total}</div>
                <div className="text-muted small">Total Products</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-success bg-opacity-10 rounded-3 p-3">
                <FaTags className="text-success fs-4" />
              </div>
              <div>
                <div className="fs-4 fw-bold text-dark">{stats.categories}</div>
                <div className="text-muted small">Categories</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning bg-opacity-10 rounded-3 p-3">
                <FaRupeeSign className="text-warning fs-4" />
              </div>
              <div>
                <div className="fs-4 fw-bold text-dark">{stats.discounted}</div>
                <div className="text-muted small">Discounted</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={6} md={3}>
          <Card className="border-0 shadow-sm rounded-4 p-3 h-100">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-danger bg-opacity-10 rounded-3 p-3">
                <FaStar className="text-danger fs-4" />
              </div>
              <div>
                <div className="fs-4 fw-bold text-dark">{stats.avgRating}</div>
                <div className="text-muted small">Avg Rating</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="border-0 shadow-sm rounded-4 p-3 mb-4">
        <Row className="g-2 align-items-center">
          <Col md={6}>
            <div className="position-relative">
              <FaSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
              <Form.Control
                type="text"
                placeholder="Search products by name or brand..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="ps-5"
              />
            </div>
          </Col>
          <Col md={6}>
            <Form.Select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.slug} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
      </Card>

      {/* Data Display */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="text-center py-5 bg-white rounded-4 border">
          <h4 className="fw-bold text-muted mb-2">No Data Found</h4>
          <p className="text-muted small mb-0">Try adjusting your search or category filter.</p>
        </div>
      ) : viewMode === 'table' ? (
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <div className="table-responsive">
            <Table hover className="mb-0 align-middle">
              <thead className="bg-primary text-white">
                <tr>
                  <th className="ps-3">#</th>
                  <th>Product</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Rating</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th className="pe-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => {
                  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
                  return (
                    <tr key={product._id}>
                      <td className="ps-3 text-muted">{(page - 1) * 20 + idx + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={product.images && product.images[0] ? getImageUrl(product.images[0]) : ''}
                            alt={product.name}
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                            className="rounded border bg-white"
                          />
                          <span className="fw-semibold text-dark" style={{ maxWidth: '200px' }}>
                            {product.name}
                          </span>
                        </div>
                      </td>
                      <td className="text-muted">{product.brand}</td>
                      <td>
                        <Badge bg="light" text="dark" className="border">
                          {product.category}
                        </Badge>
                      </td>
                      <td className="fw-bold text-dark">₹{product.price.toLocaleString('en-IN')}</td>
                      <td>
                        {hasDiscount ? (
                          <span className="text-success fw-semibold">
                            ₹{product.discountPrice.toLocaleString('en-IN')}
                            <span className="d-block text-muted small">
                              {product.discountPercentage || Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                            </span>
                          </span>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                      <td>
                        <span className="text-warning">★</span> {product.rating || 'N/A'}
                      </td>
                      <td>
                        <Badge bg={product.countInStock > 0 ? 'success' : 'danger'} pill>
                          {product.countInStock ?? 'N/A'}
                        </Badge>
                      </td>
                      <td>
                        <Badge bg={product.isActive ? 'success' : 'secondary'} pill>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </td>
                      <td className="pe-3">
                        <Button as={Link} to={`/product/${product._id}`} variant="outline-primary" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Card>
      ) : (
        <Row className="g-3">
          {products.map((product) => {
            const hasDiscount = product.discountPrice && product.discountPrice < product.price;
            return (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden h-100">
                  <div className="p-3 bg-light d-flex align-items-center justify-content-center" style={{ height: '140px' }}>
                    <img
                      src={product.images && product.images[0]}
                      alt={product.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <Card.Body>
                    <div className="text-muted small text-uppercase fw-bold mb-1">{product.brand}</div>
                    <h6 className="fw-bold text-dark mb-2 line-clamp-2" style={{ minHeight: '2.5rem' }}>
                      {product.name}
                    </h6>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Badge bg="light" text="dark" className="border">
                        {product.category}
                      </Badge>
                      <span className="text-warning small">★ {product.rating || 'N/A'}</span>
                    </div>
                    <div className="d-flex align-items-baseline gap-2 mb-2">
                      <span className="fs-5 fw-bold text-dark">₹{product.price.toLocaleString('en-IN')}</span>
                      {hasDiscount && (
                        <span className="text-success small fw-semibold">
                          ₹{product.discountPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <Badge bg={product.countInStock > 0 ? 'success' : 'danger'} pill>
                        {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                      </Badge>
                      <Button as={Link} to={`/product/${product._id}`} variant="outline-primary" size="sm">
                        View Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev disabled={page === 1} onClick={() => setPage((prev) => Math.max(prev - 1, 1))} />
            {Array.from({ length: totalPages }).map((_, idx) => (
              <Pagination.Item key={idx + 1} active={idx + 1 === page} onClick={() => setPage(idx + 1)}>
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))} />
          </Pagination>
        </div>
      )}
    </Container>
  );
};

export default OutputPage;