import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Pagination, Badge } from 'react-bootstrap';
import { FaThLarge, FaList, FaSlidersH } from 'react-icons/fa';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchProducts } from '../services/productService';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [brand, setBrand] = useState(searchParams.get('brand') || 'All');
  const [priceRange, setPriceRange] = useState(Number(searchParams.get('maxPrice')) || 350000);
  const [minRating, setMinRating] = useState(Number(searchParams.get('minRating')) || 0);
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') || 'newest');
  const [badgeFilter, setBadgeFilter] = useState('');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Data States
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    // Update filters if URL search params change
    const catFromUrl = searchParams.get('category');
    const kwFromUrl = searchParams.get('keyword');
    const brandFromUrl = searchParams.get('brand');
    
    setCategory(catFromUrl || 'All');
    setKeyword(kwFromUrl || '');
    setBrand(brandFromUrl || 'All');

    if (searchParams.get('isTrending')) setBadgeFilter('isTrending');
    else if (searchParams.get('isBestSeller')) setBadgeFilter('isBestSeller');
    else if (searchParams.get('isNewArrival')) setBadgeFilter('isNewArrival');
    else setBadgeFilter('');

    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = {
          pageNumber: page,
          pageSize: 12,
          keyword,
          category: category !== 'All' ? category : '',
          brand: brand !== 'All' ? brand : '',
          maxPrice: priceRange < 350000 ? priceRange : '',
          minRating: minRating > 0 ? minRating : '',
          sortBy,
        };

        if (badgeFilter === 'isTrending') params.isTrending = 'true';
        if (badgeFilter === 'isBestSeller') params.isBestSeller = 'true';
        if (badgeFilter === 'isNewArrival') params.isNewArrival = 'true';

        const data = await fetchProducts(params);
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setTotalProducts(data.totalProducts || 0);
        if (data.brands) setBrands(data.brands);
      } catch (err) {
        console.log('Error fetching products', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [keyword, category, brand, priceRange, minRating, sortBy, badgeFilter, page]);

  const clearAllFilters = () => {
    setCategory('All');
    setBrand('All');
    setPriceRange(350000);
    setMinRating(0);
    setSortBy('newest');
    setBadgeFilter('');
    setKeyword('');
    setPage(1);
    setSearchParams({});
  };

  return (
    <Container className="py-4">
      {/* Header & Mobile Filter Toggle */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h2 className="fw-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Shop Catalog {category !== 'All' ? `- ${category}` : ''}
          </h2>
          <p className="text-muted small mb-0">
            Showing <strong className="text-primary">{totalProducts}</strong> products available
          </p>
        </div>

        {/* Sorting & Layout Switcher */}
        <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
          <Button
            variant="outline-primary"
            className="d-md-none me-auto d-flex align-items-center gap-2 btn-sm"
            onClick={() => setShowMobileFilter(!showMobileFilter)}
          >
            <FaSlidersH /> Filters
          </Button>

          <Form.Select
            size="sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ width: '180px' }}
            className="fw-semibold"
          >
            <option value="newest">Sort by: Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </Form.Select>

          <div className="btn-group btn-group-sm">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'outline-secondary'}
              onClick={() => setViewMode('grid')}
            >
              <FaThLarge />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'outline-secondary'}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </Button>
          </div>
        </div>
      </div>

      <Row>
        {/* Filter Sidebar (Desktop & Mobile Toggle) */}
        <Col lg={3} className={`mb-4 ${showMobileFilter ? 'd-block' : 'd-none d-lg-block'}`}>
          <FilterSidebar
            selectedCategory={category}
            setSelectedCategory={(c) => {
              setCategory(c);
              setPage(1);
            }}
            priceRange={priceRange}
            setPriceRange={(p) => {
              setPriceRange(p);
              setPage(1);
            }}
            minRating={minRating}
            setMinRating={(r) => {
              setMinRating(r);
              setPage(1);
            }}
            selectedBrand={brand}
            setSelectedBrand={(b) => {
              setBrand(b);
              setPage(1);
            }}
            brands={brands}
            badgeFilter={badgeFilter}
            setBadgeFilter={(b) => {
              setBadgeFilter(b);
              setPage(1);
            }}
            clearAllFilters={clearAllFilters}
          />
        </Col>

        {/* Product Grid */}
        <Col lg={9}>
          {loading ? (
            <LoadingSkeleton count={9} />
          ) : products.length === 0 ? (
            <div className="text-center py-5 bg-white rounded-3 border">
              <h4 className="fw-bold text-muted mb-2">No Products Found</h4>
              <p className="text-muted small mb-3">Try adjusting your filters or search keywords.</p>
              <Button variant="primary" className="btn-primary-blue" onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <Row className="g-3">
                {products.map((product) => (
                  <Col key={product._id} xs={12} sm={6} md={viewMode === 'grid' ? 4 : 12}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination>
                    <Pagination.Prev
                      disabled={page === 1}
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />
                    {Array.from({ length: totalPages }).map((_, idx) => (
                      <Pagination.Item
                        key={idx + 1}
                        active={idx + 1 === page}
                        onClick={() => setPage(idx + 1)}
                      >
                        {idx + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      disabled={page === totalPages}
                      onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShopPage;
