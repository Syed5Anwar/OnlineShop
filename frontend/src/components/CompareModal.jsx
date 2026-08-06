import React from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FaBalanceScale, FaTrash } from 'react-icons/fa';
import Rating from './Rating';

const CompareModal = ({ show, onHide, products = [], removeCompareItem }) => {
  if (!products || products.length === 0) return null;

  return (
    <Modal show={show} onHide={onHide} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2 fw-bold text-primary">
          <FaBalanceScale /> Compare Products ({products.length})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4 overflow-auto">
        <Table bordered hover responsive className="align-middle text-center mb-0">
          <thead>
            <tr>
              <th style={{ minWidth: '150px' }}>Attribute</th>
              {products.map((prod) => (
                <th key={prod._id} style={{ minWidth: '220px' }}>
                  <div className="position-relative">
                    <Button
                      variant="link"
                      className="text-danger position-absolute top-0 end-0 p-0 fs-6"
                      onClick={() => removeCompareItem(prod._id)}
                      title="Remove from comparison"
                    >
                      <FaTrash />
                    </Button>
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      className="mb-2"
                    />
                    <div className="fw-bold text-truncate">{prod.name}</div>
                    <div className="text-primary fw-bold fs-6">
                      ₹{(prod.discountPrice || prod.price).toLocaleString('en-IN')}
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="fw-bold text-secondary">Brand</td>
              {products.map((prod) => (
                <td key={prod._id}>{prod.brand}</td>
              ))}
            </tr>
            <tr>
              <td className="fw-bold text-secondary">Category</td>
              {products.map((prod) => (
                <td key={prod._id}>{prod.category}</td>
              ))}
            </tr>
            <tr>
              <td className="fw-bold text-secondary">Rating</td>
              {products.map((prod) => (
                <td key={prod._id}>
                  <Rating value={prod.rating} text={`${prod.numReviews}`} />
                </td>
              ))}
            </tr>
            <tr>
              <td className="fw-bold text-secondary">Stock Status</td>
              {products.map((prod) => (
                <td key={prod._id}>
                  <span className={`badge ${prod.stockQuantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {prod.stockQuantity > 0 ? `In Stock (${prod.stockQuantity})` : 'Out of Stock'}
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="fw-bold text-secondary">Key Specifications</td>
              {products.map((prod) => (
                <td key={prod._id} className="text-start small">
                  {prod.specifications && prod.specifications.length > 0 ? (
                    <ul className="ps-3 mb-0">
                      {prod.specifications.map((spec, i) => (
                        <li key={i}>
                          <strong>{spec.key}:</strong> {spec.value}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    'N/A'
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close Comparison
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CompareModal;
