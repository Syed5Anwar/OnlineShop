import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {
  FaHeadphones,
  FaTshirt,
  FaMagic,
  FaUtensils,
  FaShoppingCart,
  FaMobileAlt,
  FaLaptop,
  FaRunning,
  FaCouch,
  FaGamepad,
} from 'react-icons/fa';

const categories = [
  { name: 'Electronics', icon: FaHeadphones },
  { name: 'Fashion', icon: FaTshirt },
  { name: 'Beauty', icon: FaMagic },
  { name: 'Home & Kitchen', icon: FaUtensils },
  { name: 'Grocery', icon: FaShoppingCart },
  { name: 'Mobiles', icon: FaMobileAlt },
  { name: 'Laptops', icon: FaLaptop },
  { name: 'Sports', icon: FaRunning },
  { name: 'Furniture', icon: FaCouch },
  { name: 'Toys', icon: FaGamepad },
];

const CategoryHeader = () => {
  return (
    <div className="category-header-bar py-1 border-bottom">
      <Container>
        <div className="d-flex align-items-center justify-content-between overflow-auto py-1 hide-scrollbar">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <Link
                key={idx}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="category-item-link"
              >
                <Icon className="text-primary fs-6" />
                <span>{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default CategoryHeader;
