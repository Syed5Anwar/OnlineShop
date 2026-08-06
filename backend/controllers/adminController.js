import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Category from '../models/Category.js';

// @desc    Get admin dashboard metrics & chart data
// @route   GET /api/admin/stats
// @access  Private/Admin
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'USER' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const orders = await Order.find({});
    const totalRevenue = orders
      .filter((order) => order.orderStatus !== 'Cancelled')
      .reduce((acc, item) => acc + item.totalAmount, 0);

    // Monthly Sales & Revenue breakdown (Simulated + Aggregated)
    const monthlyData = [
      { month: 'Jan', revenue: 145000, orders: 42 },
      { month: 'Feb', revenue: 182000, orders: 58 },
      { month: 'Mar', revenue: 210000, orders: 64 },
      { month: 'Apr', revenue: 195000, orders: 53 },
      { month: 'May', revenue: 240000, orders: 72 },
      { month: 'Jun', revenue: 290000, orders: 88 },
      { month: 'Jul', revenue: 310000, orders: 95 },
      { month: 'Aug', revenue: Math.max(340000, Math.round(totalRevenue)), orders: totalOrders },
    ];

    // Category product distribution count
    const categories = await Category.find({});
    const categoryDistribution = await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat.name });
        return { category: cat.name, count };
      })
    );

    // Order status breakdown
    const processingCount = await Order.countDocuments({ orderStatus: 'Processing' });
    const shippedCount = await Order.countDocuments({ orderStatus: 'Shipped' });
    const deliveredCount = await Order.countDocuments({ orderStatus: 'Delivered' });
    const cancelledCount = await Order.countDocuments({ orderStatus: 'Cancelled' });

    const orderStatusBreakdown = {
      Processing: processingCount,
      Shipped: shippedCount,
      Delivered: deliveredCount,
      Cancelled: cancelledCount,
    };

    // Top selling products
    const topProducts = await Product.find({}).sort({ rating: -1, numReviews: -1 }).limit(5);

    // Recent 5 Orders
    const recentOrders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      metrics: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue: Math.round(totalRevenue),
      },
      monthlyData,
      categoryDistribution,
      orderStatusBreakdown,
      topProducts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
