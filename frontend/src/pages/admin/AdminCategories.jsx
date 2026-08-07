import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Card, Form, Button } from 'react-bootstrap';
import { FaTags, FaPlus, FaTrash } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchCategories } from '../../services/productService';
import { createCategory, deleteCategory } from '../../services/adminService';
import { getImageUrl } from '../../services/api';
import { toast } from 'react-toastify';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await createCategory({ name, description, image });
      toast.success('Category created successfully');
      setName('');
      setDescription('');
      setImage('');
      loadCategories();
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Delete this category?')) {
      try {
        await deleteCategory(id);
        toast.success('Category deleted');
        loadCategories();
      } catch (err) {
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="mb-4">
        <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Category Management (Exactly 10 Categories)
        </h3>
        <p className="text-muted small">Manage e-commerce root product categories</p>
      </div>

      <Row className="g-4">
        <Col md={5}>
          <Card className="border-0 shadow-sm rounded-3 p-3 bg-light">
            <h5 className="fw-bold mb-3">Add New Category</h5>
            <Form onSubmit={handleAddCategory}>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Category Name *</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://..."
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-semibold">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="btn-primary-blue w-100 fw-bold">
                <FaPlus className="me-2" /> Add Category
              </Button>
            </Form>
          </Card>
        </Col>

        <Col md={7}>
          <Table responsive hover className="align-middle border mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Slug</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => (
                <tr key={cat._id}>
                  <td>{index + 1}</td>
                  <td className="fw-semibold">
                    <div className="d-flex align-items-center gap-2">
                      {cat.image && (
                        <img
                          src={getImageUrl(cat.image)}
                          alt={cat.name}
                          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                          className="rounded-circle"
                        />
                      )}
                      <span>{cat.name}</span>
                    </div>
                  </td>
                  <td className="small text-muted">{cat.slug || cat.name.toLowerCase()}</td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteCategory(cat._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminCategories;
