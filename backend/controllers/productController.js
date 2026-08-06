import Product from '../models/Product.js';

// @desc    Fetch all products with filtering, search, sorting & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 12;
    const page = Number(req.query.pageNumber) || 1;

    let query = {};

    // Search Keyword
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: 'i' } },
        { brand: { $regex: req.query.keyword, $options: 'i' } },
        { description: { $regex: req.query.keyword, $options: 'i' } },
        { category: { $regex: req.query.keyword, $options: 'i' } },
      ];
    }

    // Category Filter (Flexible case-insensitive matching for name, slug, singular/plural)
    if (req.query.category && req.query.category !== 'All' && req.query.category.trim() !== '') {
      const catParam = decodeURIComponent(req.query.category).trim();
      const basePattern = catParam
        .replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
        .replace(/\\-/g, '[\\s\\-&]+')
        .replace(/s$/i, '');
      query.category = { $regex: new RegExp(`^${basePattern}s?$`, 'i') };
    }

    // Brand Filter
    if (req.query.brand && req.query.brand !== 'All' && req.query.brand.trim() !== '') {
      query.brand = req.query.brand;
    }

    // Price Range Filter
    if ((req.query.minPrice && Number(req.query.minPrice) > 0) || (req.query.maxPrice && Number(req.query.maxPrice) < 350000)) {
      const minP = req.query.minPrice ? Number(req.query.minPrice) : 0;
      const maxP = req.query.maxPrice ? Number(req.query.maxPrice) : 350000;
      query.price = { $gte: minP, $lte: maxP };
    }

    // Rating Filter
    if (req.query.minRating) {
      query.rating = { $gte: Number(req.query.minRating) };
    }

    // Badge Filters
    if (req.query.isFeatured === 'true') query.isFeatured = true;
    if (req.query.isTrending === 'true') query.isTrending = true;
    if (req.query.isBestSeller === 'true') query.isBestSeller = true;
    if (req.query.isNewArrival === 'true') query.isNewArrival = true;

    // Sorting
    let sort = {};
    if (req.query.sortBy === 'price-low') {
      sort = { price: 1 };
    } else if (req.query.sortBy === 'price-high') {
      sort = { price: -1 };
    } else if (req.query.sortBy === 'rating') {
      sort = { rating: -1 };
    } else if (req.query.sortBy === 'newest') {
      sort = { createdAt: -1 };
    } else {
      sort = { createdAt: -1 };
    }

    const count = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sort)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    // Get list of distinct brands for filter options
    const brands = await Product.distinct('brand');

    res.json({
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalProducts: count,
      brands,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get special showcase products (Featured, Trending, Best Sellers, New Arrivals)
// @route   GET /api/products/showcase/section
// @access  Public
export const getShowcaseProducts = async (req, res) => {
  try {
    let featured = await Product.find({ isFeatured: true }).limit(15);
    let trending = await Product.find({ isTrending: true }).limit(8);
    let bestSellers = await Product.find({ isBestSeller: true }).limit(8);
    let newArrivals = await Product.find({ isNewArrival: true }).limit(8);

    const allProducts = await Product.find({}).limit(15);
    if (!featured || featured.length === 0) featured = allProducts;
    if (!trending || trending.length === 0) trending = allProducts.slice(2, 6);
    if (!bestSellers || bestSellers.length === 0) bestSellers = allProducts.slice(4, 8);
    if (!newArrivals || newArrivals.length === 0) newArrivals = allProducts.slice(6, 10);

    res.json({
      featured,
      trending,
      bestSellers,
      newArrivals,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      description,
      price,
      discountPrice,
      category,
      images,
      stockQuantity,
      specifications,
      isFeatured,
      isTrending,
      isBestSeller,
      isNewArrival,
    } = req.body;

    const discountPercentage =
      price && discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

    const product = new Product({
      name,
      brand,
      description,
      price,
      discountPrice: discountPrice || price,
      discountPercentage,
      category,
      images: images && images.length > 0 ? images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800'],
      stockQuantity: stockQuantity || 10,
      specifications: specifications || [],
      isFeatured: isFeatured || false,
      isTrending: isTrending || false,
      isBestSeller: isBestSeller || false,
      isNewArrival: isNewArrival || false,
      rating: 4.5,
      numReviews: 1,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.brand = req.body.brand || product.brand;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.discountPrice = req.body.discountPrice !== undefined ? req.body.discountPrice : product.discountPrice;
      
      if (product.price && product.discountPrice) {
        product.discountPercentage = Math.round(((product.price - product.discountPrice) / product.price) * 100);
      }

      product.category = req.body.category || product.category;
      if (req.body.images) product.images = req.body.images;
      if (req.body.stockQuantity !== undefined) product.stockQuantity = req.body.stockQuantity;
      if (req.body.specifications) product.specifications = req.body.specifications;
      if (req.body.isFeatured !== undefined) product.isFeatured = req.body.isFeatured;
      if (req.body.isTrending !== undefined) product.isTrending = req.body.isTrending;
      if (req.body.isBestSeller !== undefined) product.isBestSeller = req.body.isBestSeller;
      if (req.body.isNewArrival !== undefined) product.isNewArrival = req.body.isNewArrival;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: product._id });
      res.json({ message: 'Product removed successfully' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
