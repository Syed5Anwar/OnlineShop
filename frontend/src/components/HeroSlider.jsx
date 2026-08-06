import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const banners = [
  {
    id: 1,
    title: 'MEGA DEAL MANIA',
    subtitle: 'Up to 80% OFF on Top Brand Electronics & Home Appliances',
    tag: 'LIMITED TIME OFFER',
    category: 'Electronics',
    buttonText: 'Shop Tech Deals',
    bgGradient: 'linear-gradient(135deg, #0f52ba 0%, #1e1b4b 100%)',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 2,
    title: 'MEGA ELECTRONICS & MOBILES FESTIVAL',
    subtitle: 'Next-Gen Flagship Smartphones, Laptops & Audio Devices',
    tag: '5G SMARTPHONES SALE',
    category: 'Mobiles',
    buttonText: 'Explore Mobiles',
    bgGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 3,
    title: 'FASHION FESTIVAL 2026',
    subtitle: 'Upgrade Your Style with Levis, Nike, Zara & Tommy Hilfiger',
    tag: 'MIN 50% TO 70% OFF',
    category: 'Fashion',
    buttonText: 'Shop Fashion',
    bgGradient: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 4,
    title: 'BEAUTY & WELLNESS BONANZA',
    subtitle: 'Premium Skincare, Fragrances & Makeup Essentials',
    tag: 'FLAT 30% EXTRA CASHBACK',
    category: 'Beauty',
    buttonText: 'Discover Beauty',
    bgGradient: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: 5,
    title: 'HOME & KITCHEN ESSENTIALS SALE',
    subtitle: 'Smart Cookware, Air Fryers, Robotic Vacuums & Luxury Decor',
    tag: 'EVERYDAY LOW PRICES',
    category: 'Home & Kitchen',
    buttonText: 'Upgrade Home',
    bgGradient: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
  },
];

const HeroSlider = () => {
  return (
    <div className="hero-slider-section position-relative my-3">
      <Container>
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop={true}
          className="rounded-4 overflow-hidden shadow-lg"
          style={{ height: '380px' }}
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div
                className="w-100 h-100 d-flex align-items-center text-white p-4 p-md-5 position-relative"
                style={{
                  background: banner.bgGradient,
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%), url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div style={{ maxWidth: '650px' }} className="z-2">
                  <span className="badge bg-warning text-dark fw-extrabold mb-2 fs-6 px-3 py-2 rounded-pill">
                    {banner.tag}
                  </span>
                  <h1 className="fw-extrabold display-5 mb-2 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {banner.title}
                  </h1>
                  <p className="lead mb-4 text-light fw-medium fs-5" style={{ opacity: 0.9 }}>
                    {banner.subtitle}
                  </p>
                  <Button
                    as={Link}
                    to={`/shop?category=${encodeURIComponent(banner.category)}`}
                    variant="primary"
                    className="btn-accent-orange btn-lg px-4 py-2 shadow-lg rounded-pill fw-bold fs-6"
                  >
                    {banner.buttonText} →
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default HeroSlider;
