import React from 'react';
import { Card, Form, Button, Badge } from 'react-bootstrap';
import { FaFilter, FaStar, FaUndo } from 'react-icons/fa';

const categories = [
  'All',
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

const FilterSidebar = ({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
  selectedBrand,
  setSelectedBrand,
  brands = [],
  badgeFilter,
  setBadgeFilter,
  clearAllFilters,
}) => {
  return (
    <Card className="border-0 shadow-sm rounded-3 p-3">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
        <h6 className="fw-bold mb-0 d-flex align-items-center gap-2 text-primary">
          <FaFilter /> Filters
        </h6>
        <Button
          variant="link"
          className="text-danger p-0 small fw-semibold text-decoration-none d-flex align-items-center gap-1"
          onClick={clearAllFilters}
        >
          <FaUndo style={{ fontSize: '0.75rem' }} /> Clear All
        </Button>
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="fw-bold mb-2 small text-uppercase text-secondary">Categories</label>
        <div className="d-flex flex-column gap-1 max-h-200 overflow-auto">
          {categories.map((cat, idx) => (
            <Form.Check
              type="radio"
              id={`cat-${idx}`}
              key={idx}
              label={cat}
              name="category"
              checked={
                selectedCategory === cat ||
                selectedCategory.toLowerCase().replace(/[-&\s]/g, '') === cat.toLowerCase().replace(/[-&\s]/g, '')
              }
              onChange={() => setSelectedCategory(cat)}
              className="small fw-medium cursor-pointer"
            />
          ))}
        </div>
      </div>

      {/* Price Filter Slider */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <label className="fw-bold small text-uppercase text-secondary">Max Price</label>
          <Badge bg="primary" className="fw-bold">
            ₹{priceRange.toLocaleString('en-IN')}
          </Badge>
        </div>
        <Form.Range
          min={500}
          max={350000}
          step={1000}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
        <div className="d-flex justify-content-between text-muted x-small">
          <span>₹500</span>
          <span>₹3,50,000</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="mb-4">
        <label className="fw-bold mb-2 small text-uppercase text-secondary">Customer Rating</label>
        {[4, 3, 2, 1].map((star) => (
          <Form.Check
            type="radio"
            name="rating"
            id={`star-${star}`}
            key={star}
            label={
              <span className="d-inline-flex align-items-center gap-1 small fw-semibold">
                {star} <FaStar className="text-warning" /> & Above
              </span>
            }
            checked={minRating === star}
            onChange={() => setMinRating(star)}
            className="mb-1"
          />
        ))}
      </div>

      {/* Brand Selection */}
      {brands.length > 0 && (
        <div className="mb-4">
          <label className="fw-bold mb-2 small text-uppercase text-secondary">Brands</label>
          <div className="d-flex flex-column gap-1 max-h-180 overflow-auto">
            <Form.Check
              type="radio"
              id="brand-all"
              label="All Brands"
              name="brand"
              checked={selectedBrand === 'All'}
              onChange={() => setSelectedBrand('All')}
              className="small"
            />
            {brands.slice(0, 10).map((brand, idx) => (
              <Form.Check
                type="radio"
                id={`brand-${idx}`}
                key={idx}
                label={brand}
                name="brand"
                checked={selectedBrand === brand}
                onChange={() => setSelectedBrand(brand)}
                className="small fw-medium"
              />
            ))}
          </div>
        </div>
      )}

      {/* Special Highlights Filter */}
      <div>
        <label className="fw-bold mb-2 small text-uppercase text-secondary">Special Showcase</label>
        <Form.Check
          type="checkbox"
          id="badge-trending"
          label="Trending Products"
          checked={badgeFilter === 'isTrending'}
          onChange={(e) => setBadgeFilter(e.target.checked ? 'isTrending' : '')}
          className="small mb-1"
        />
        <Form.Check
          type="checkbox"
          id="badge-bestseller"
          label="Best Sellers"
          checked={badgeFilter === 'isBestSeller'}
          onChange={(e) => setBadgeFilter(e.target.checked ? 'isBestSeller' : '')}
          className="small mb-1"
        />
        <Form.Check
          type="checkbox"
          id="badge-new"
          label="New Arrivals"
          checked={badgeFilter === 'isNewArrival'}
          onChange={(e) => setBadgeFilter(e.target.checked ? 'isNewArrival' : '')}
          className="small"
        />
      </div>
    </Card>
  );
};

export default FilterSidebar;
