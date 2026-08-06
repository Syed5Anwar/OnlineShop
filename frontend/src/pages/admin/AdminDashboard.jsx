import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaRupeeSign, FaShoppingBag, FaBox, FaUsers, FaEye } from 'react-icons/fa';
import AdminLayout from '../../components/AdminLayout';
import { fetchAdminStats } from '../../services/adminService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchAdminStats();
        setStats(data);
      } catch (err) {
        console.log('Error loading admin stats', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-5">
          <div className="spinner-border text-primary"></div>
          <p className="mt-2 text-muted">Loading Analytics Dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  // Monthly Revenue Line Chart Config
  const revenueChartData = {
    labels: stats?.monthlyData?.map((d) => d.month) || ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Monthly Revenue (₹)',
        data: stats?.monthlyData?.map((d) => d.revenue) || [145000, 182000, 210000, 195000, 240000, 290000, 310000, 340000],
        borderColor: '#0f52ba',
        backgroundColor: 'rgba(15, 82, 186, 0.15)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Category Doughnut Chart Config
  const categoryChartData = {
    labels: stats?.categoryDistribution?.map((c) => c.category) || [],
    datasets: [
      {
        data: stats?.categoryDistribution?.map((c) => c.count) || [],
        backgroundColor: [
          '#0f52ba', '#ff9f00', '#10b981', '#ef4444', '#8b5cf6',
          '#ec4899', '#06b6d4', '#f59e0b', '#64748b', '#3b82f6'
        ],
      },
    ],
  };

  // Order Status Bar Chart Config
  const orderStatusData = {
    labels: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    datasets: [
      {
        label: 'Orders Count',
        data: [
          stats?.orderStatusBreakdown?.Processing || 0,
          stats?.orderStatusBreakdown?.Shipped || 0,
          stats?.orderStatusBreakdown?.Delivered || 0,
          stats?.orderStatusBreakdown?.Cancelled || 0,
        ],
        backgroundColor: ['#ff9f00', '#0f52ba', '#10b981', '#ef4444'],
      },
    ],
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Executive Dashboard & Analytics
          </h3>
          <p className="text-muted small mb-0">Real-time performance metrics and sales statistics</p>
        </div>
        <Badge bg="success" className="px-3 py-2 fs-6">
          System Live
        </Badge>
      </div>

      {/* Summary Metric Widgets */}
      <Row className="g-3 mb-4">
        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3 bg-primary text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-light small text-uppercase fw-bold">Total Revenue</div>
                <h3 className="fw-extrabold mb-0">₹{stats?.metrics?.totalRevenue?.toLocaleString('en-IN')}</h3>
              </div>
              <FaRupeeSign className="fs-1 opacity-50" />
            </div>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3 bg-success text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-light small text-uppercase fw-bold">Total Orders</div>
                <h3 className="fw-extrabold mb-0">{stats?.metrics?.totalOrders}</h3>
              </div>
              <FaShoppingBag className="fs-1 opacity-50" />
            </div>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3 bg-warning text-dark">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-dark small text-uppercase fw-bold">Total Products</div>
                <h3 className="fw-extrabold mb-0">{stats?.metrics?.totalProducts}</h3>
              </div>
              <FaBox className="fs-1 opacity-50" />
            </div>
          </Card>
        </Col>

        <Col sm={6} lg={3}>
          <Card className="border-0 shadow-sm rounded-3 p-3 bg-dark text-white">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="text-light small text-uppercase fw-bold">Total Customers</div>
                <h3 className="fw-extrabold mb-0">{stats?.metrics?.totalUsers}</h3>
              </div>
              <FaUsers className="fs-1 opacity-50" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Visual Analytics Charts Section */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm rounded-3 p-3 h-100">
            <h6 className="fw-bold text-dark mb-3">Monthly Revenue Growth (Jan - Aug)</h6>
            <div style={{ height: '280px' }}>
              <Line data={revenueChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm rounded-3 p-3 h-100">
            <h6 className="fw-bold text-dark mb-3">Category Distribution</h6>
            <div style={{ height: '260px' }}>
              <Doughnut data={categoryChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Card>
        </Col>
      </Row>

      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="border-0 shadow-sm rounded-3 p-3 h-100">
            <h6 className="fw-bold text-dark mb-3">Order Status Fulfillment Breakdown</h6>
            <div style={{ height: '240px' }}>
              <Bar data={orderStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </Card>
        </Col>

        {/* Top Selling Products */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm rounded-3 p-3 h-100">
            <h6 className="fw-bold text-dark mb-3">Top Rated / Selling Products</h6>
            <Table responsive hover size="sm" className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {stats?.topProducts?.map((prod) => (
                  <tr key={prod._id}>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                        />
                        <span className="fw-semibold small text-truncate" style={{ maxWidth: '150px' }}>
                          {prod.name}
                        </span>
                      </div>
                    </td>
                    <td className="small text-muted">{prod.category}</td>
                    <td className="fw-bold small">₹{(prod.discountPrice || prod.price).toLocaleString('en-IN')}</td>
                    <td>
                      <Badge bg="warning" className="text-dark">
                        ★ {prod.rating}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Table */}
      <Card className="border-0 shadow-sm rounded-3 p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="fw-bold mb-0">Recent Customer Orders</h6>
          <Link to="/admin/orders" className="btn btn-outline-primary btn-sm fw-semibold">
            View All Orders
          </Link>
        </div>

        <Table responsive hover className="align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th>Tracking No.</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {stats?.recentOrders?.map((ord) => (
              <tr key={ord._id}>
                <td className="fw-bold text-primary">#{ord.trackingNumber || ord._id.substring(0, 8)}</td>
                <td className="small fw-semibold">{ord.user?.name || 'Customer'}</td>
                <td className="small text-muted">{new Date(ord.createdAt).toLocaleDateString()}</td>
                <td className="fw-bold">₹{ord.totalAmount.toLocaleString('en-IN')}</td>
                <td>
                  <Badge
                    bg={
                      ord.orderStatus === 'Delivered'
                        ? 'success'
                        : ord.orderStatus === 'Cancelled'
                        ? 'danger'
                        : ord.orderStatus === 'Shipped'
                        ? 'info'
                        : 'warning'
                    }
                  >
                    {ord.orderStatus}
                  </Badge>
                </td>
                <td className="text-center">
                  <Link to="/admin/orders" className="btn btn-light btn-sm border">
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </AdminLayout>
  );
};

export default AdminDashboard;
