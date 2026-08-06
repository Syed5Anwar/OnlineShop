import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaStar } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchAllReviews, deleteReview } from '../../services/adminService';
import { toast } from 'react-toastify';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const data = await fetchAllReviews();
      setReviews(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm('Delete this product review?')) {
      try {
        await deleteReview(id);
        toast.success('Review deleted');
        loadReviews();
      } catch (err) {
        toast.error('Failed to delete review');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Product Reviews Moderation
        </h3>
        <p className="text-muted small">Total Reviews Posted: {reviews.length}</p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
        </div>
      ) : (
        <Table responsive hover className="align-middle border mb-0">
          <thead className="table-light">
            <tr>
              <th>User</th>
              <th>Product</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id}>
                <td className="fw-semibold small">{rev.userName}</td>
                <td className="small" style={{ maxWidth: '200px' }}>
                  {rev.product?.name || 'Product'}
                </td>
                <td>
                  <Badge bg="warning" text="dark">
                    <FaStar /> {rev.rating} / 5
                  </Badge>
                </td>
                <td className="small text-muted" style={{ maxWidth: '300px' }}>
                  <strong>{rev.title}:</strong> {rev.comment}
                </td>
                <td className="small text-muted">{new Date(rev.createdAt).toLocaleDateString()}</td>
                <td className="text-center">
                  <Button variant="outline-danger" size="sm" onClick={() => handleDeleteReview(rev._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </AdminLayout>
  );
};

export default AdminReviews;
