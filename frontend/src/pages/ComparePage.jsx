import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBalanceScale } from 'react-icons/fa';
import CompareModal from '../components/CompareModal';
import { fetchProducts } from '../services/productService';

const ComparePage = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const loadSampleCompare = async () => {
      try {
        const res = await fetchProducts({ pageSize: 3 });
        setProducts(res.products || []);
      } catch (err) {
        console.log(err);
      }
    };
    loadSampleCompare();
  }, []);

  return (
    <Container className="py-5 text-center">
      <Card className="border-0 shadow-sm rounded-4 p-5 max-w-700 mx-auto">
        <FaBalanceScale className="display-1 text-primary mb-3" />
        <h3 className="fw-bold mb-2">Product Feature Comparison</h3>
        <p className="text-muted mb-4">
          Compare specifications, ratings, brands, and pricing side-by-side to make informed decisions.
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Button variant="primary" className="btn-primary-blue fw-bold px-4" onClick={() => setShowModal(true)}>
            Open Comparison Table ({products.length} items)
          </Button>
          <Button as={Link} to="/shop" variant="outline-secondary" className="fw-semibold px-4">
            Browse More Products
          </Button>
        </div>
      </Card>

      <CompareModal
        show={showModal}
        onHide={() => setShowModal(false)}
        products={products}
        removeCompareItem={(id) => setProducts((prev) => prev.filter((p) => p._id !== id))}
      />
    </Container>
  );
};

export default ComparePage;
