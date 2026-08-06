export const categoriesData = [
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest audio devices, smart gadgets, cameras, and wearable tech.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    icon: 'FaHeadphones',
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing, luxury watches, stylish footwear & apparel.',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600',
    icon: 'FaTshirt',
  },
  {
    name: 'Beauty',
    slug: 'beauty',
    description: 'Premium skincare, makeup essentials, perfumes & personal grooming.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600',
    icon: 'FaMagic',
  },
  {
    name: 'Home & Kitchen',
    slug: 'home-kitchen',
    description: 'Modern cookware, smart home appliances, decor & furniture.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    icon: 'FaUtensils',
  },
  {
    name: 'Grocery',
    slug: 'grocery',
    description: 'Fresh organic produce, gourmet snacks, beverages & daily essentials.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    icon: 'FaShoppingCart',
  },
  {
    name: 'Mobiles',
    slug: 'mobiles',
    description: 'Flagship smartphones, 5G devices & protective phone accessories.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    icon: 'FaMobileAlt',
  },
  {
    name: 'Laptops',
    slug: 'laptops',
    description: 'High-performance gaming laptops, ultrabooks & work stations.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600',
    icon: 'FaLaptop',
  },
  {
    name: 'Sports',
    slug: 'sports',
    description: 'Fitness gear, gym equipment, sportswear & outdoor adventure tools.',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
    icon: 'FaRunning',
  },
  {
    name: 'Furniture',
    slug: 'furniture',
    description: 'Premium sofas, beds, dining sets, wardrobes & home decor.',
    image: 'https://m.media-amazon.com/images/I/51eam6VqRFL._SX300_SY300_QL70_FMwebp_.jpg',
    icon: 'FaCouch',
  },
  {
    name: 'Toys',
    slug: 'toys',
    description: 'Fun educational games, remote control toys, action figures & puzzles.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&q=80&w=600',
    icon: 'FaGamepad',
  },
];

export const productsData = [
  // 1. ELECTRONICS (7 Products)
  {
    name: 'Noise Master Buds Max, Sound by Bose Wireless Over-Ear Headphones, Adaptive ANC, LHDC 5.0, Immersive Spatial Audio,Upto 60H Playtime, Fast Pairing, Wear Detection(Titanium)',
    brand: 'Sony',
    description: 'Industry-leading noise canceling headphones with two processors and 8 microphones for unprecedented sound quality and crystal-clear hands-free calling.',
    price: 11999,
    discountPrice: 9959.17,
    discountPercentage: 17,
    rating: 4.8,
    numReviews: 240,
    category: 'Electronics',
    images: [
      'https://m.media-amazon.com/images/I/618JO08cG+L._SY450_.jpg'
    ],
    stockQuantity: 45,
    specifications: [
      { key: 'Connectivity', value: 'Bluetooth 5.2' },
      { key: 'Battery Life', value: '30 Hours' },
      { key: 'Noise Cancellation', value: 'Active dual noise canceling' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Apple AirPods Pro (2nd Generation) with MagSafe',
    brand: 'Apple',
    description: 'Reengineered for even richer audio experiences. Next-level Active Noise Cancellation and Adaptive Transparency.',
    price: 24900,
    discountPrice: 21990,
    discountPercentage: 12,
    rating: 4.9,
    numReviews: 512,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 60,
    specifications: [
      { key: 'Chip', value: 'Apple H2 Headphone Chip' },
      { key: 'Charging Case', value: 'MagSafe (USB-C)' },
      { key: 'Water Resistance', value: 'IPX4' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'JBL Charge 5 Portable Bluetooth Speaker',
    brand: 'JBL',
    description: 'Delivers bold JBL Original Pro Sound with an optimized long excursion driver, separate tweeter, and dual pumping JBL bass radiators.',
    price: 6780,
    discountPrice: 2508.6,
    discountPercentage: 63,
    rating: 4.6,
    numReviews: 189,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Output Power', value: '40 Watt' },
      { key: 'Playtime', value: '20 Hours' },
      { key: 'Waterproof', value: 'IP67 Waterproof & Dustproof' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    name: 'Samsung 55-Inch QLED 4K Smart TV',
    brand: 'Samsung',
    description: 'Quantum Processor 4K with Quantum HDR, 100% Color Volume with Quantum Dot technology and Motion Xcelerator Turbo+ for smooth gaming.',
    price: 79900,
    discountPrice: 59990,
    discountPercentage: 25,
    rating: 4.7,
    numReviews: 135,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 15,
    specifications: [
      { key: 'Resolution', value: '4K Ultra HD (3840 x 2160)' },
      { key: 'Refresh Rate', value: '120Hz' },
      { key: 'OS', value: 'Tizen OS' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Bose SoundLink Flex Bluetooth Speaker',
    brand: 'Bose',
    description: 'State-of-the-art design, clear sound, and deep bass. Packed with exclusive technologies and custom transducer for immersive audio.',
    price: 15900,
    discountPrice: 12990,
    discountPercentage: 18,
    rating: 4.7,
    numReviews: 95,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'Battery', value: 'Up to 12 hours' },
      { key: 'Rating', value: 'IP67 dust and waterproof' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Canon EOS R6 Mark II Mirrorless Camera',
    brand: 'Canon',
    description: '24.2 MP Full-Frame CMOS sensor with 4K 60p uncropped video recording and Dual Pixel CMOS AF II technology.',
    price: 219990,
    discountPrice: 199990,
    discountPercentage: 9,
    rating: 4.9,
    numReviews: 42,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 10,
    specifications: [
      { key: 'Sensor', value: '24.2 MP Full-Frame' },
      { key: 'Video', value: '4K 60fps 10-bit' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Xiaomi Power Bank 4i 20000mAh 33W Super Fast Charging PD',
    brand: 'Xiaomi',
    description: 'Ultra-powerful two-way charging with Smart Digital Display and 140W power output to charge laptops and phones at high speed.',
    price: 6556,
    discountPrice: 3999,
    discountPercentage: 39,
    rating: 4.8,
    numReviews: 168,
    category: 'Electronics',
    images: [
      'https://m.media-amazon.com/images/I/31ma3UQESZL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 50,
    specifications: [
      { key: 'Capacity', value: '24,000mAh' },
      { key: 'Max Output', value: '140W PD 3.1' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },

  // 2. FASHION (7 Products)
  {
    name: 'Levis Men and Women 511 Slim Fit Jeans',
    brand: 'Levis',
    description: 'A modern slim with room to move. Added stretch for all-day comfort. Premium denim crafted with precision.',
    price: 780,
    discountPrice: 600.6,
    discountPercentage: 23,
    rating: 4.5,
    numReviews: 310,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 80,
    specifications: [
      { key: 'Material', value: '99% Cotton, 1% Elastane' },
      { key: 'Fit', value: 'Slim Fit' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Nike Air Force 1 07 Sneaker',
    brand: 'Nike',
    description: 'The radiance lives on in the Nike Air Force 1 07, the b-ball icon that puts a fresh spin on what you know best.',
    price: 9695,
    discountPrice: 8245,
    discountPercentage: 15,
    rating: 4.8,
    numReviews: 620,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Sole', value: 'Rubber Air Cushioning' },
      { key: 'Color', value: 'Triple White' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Tommy Hilfiger Oxford Solid Slim Fit Shirt',
    brand: 'Tommy Hilfiger',
    description: 'Elevate your casual wardrobe with this pure cotton Oxford shirt featuring signature brand flag embroidery.',
    price: 560,
    discountPrice: 521,
    discountPercentage: 7,
    rating: 4.4,
    numReviews: 120,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 55,
    specifications: [
      { key: 'Fabric', value: '100% Organic Cotton' },
      { key: 'Sleeve', value: 'Long Sleeve' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Fossil Gen 6 Touchscreen Smartwatch',
    brand: 'Fossil',
    description: 'Stainless steel case with brown leather strap. SpO2 sensor, heart rate tracking, Snapdragon Wear 4100+ platform.',
    price: 23995,
    discountPrice: 16796,
    discountPercentage: 30,
    rating: 4.3,
    numReviews: 88,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Compatibility', value: 'Android & iOS' },
      { key: 'Water Resistance', value: '3 ATM' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    name: 'Ray-Ban Aviator Classic Sunglasses',
    brand: 'Ray-Ban',
    description: 'Currently one of the most iconic sunglass models in the world. Originally designed for U.S. aviators in 1937.',
    price: 11590,
    discountPrice: 9272,
    discountPercentage: 20,
    rating: 4.7,
    numReviews: 245,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 35,
    specifications: [
      { key: 'Frame', value: 'Gold Metal' },
      { key: 'Lens', value: 'G-15 Green Classic' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Puma Mens Tracksuit Set',
    brand: 'Puma',
    description: 'Full-zip jacket and track pants combo with moisture-wicking dryCELL technology.',
    price: 4999,
    discountPrice: 2999,
    discountPercentage: 40,
    rating: 4.4,
    numReviews: 95,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 50,
    specifications: [
      { key: 'Fit', value: 'Regular' },
      { key: 'Closure', value: 'Full Zipper' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Zara Womens Elegant Blazer',
    brand: 'Zara',
    description: 'Double-breasted blazer with lapel collar, long sleeves and pronounced shoulders.',
    price: 6990,
    discountPrice: 4990,
    discountPercentage: 28,
    rating: 4.6,
    numReviews: 78,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Style', value: 'Formal Blazer' },
      { key: 'Fabric', value: 'Polyester Blend' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },

  // 3. BEAUTY (7 Products)
  {
    name: 'Estee Lauder Advanced Night Repair Serum 50ml',
    brand: 'Estee Lauder',
    description: 'Deep and fast night renewal serum for radiant, younger-looking skin with Chronolux Power Signal Technology.',
    price: 10500,
    discountPrice: 8925,
    discountPercentage: 15,
    rating: 4.8,
    numReviews: 180,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Volume', value: '50 ml' },
      { key: 'Skin Type', value: 'All Skin Types' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'MAC Matte Lipstick - Velvet Teddy',
    brand: 'MAC',
    description: 'The iconic product that made M.A.C famous. Long-wearing matte formula features high color payoff.',
    price: 2200,
    discountPrice: 1870,
    discountPercentage: 15,
    rating: 4.7,
    numReviews: 430,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 100,
    specifications: [
      { key: 'Finish', value: 'Matte' },
      { key: 'Shade', value: 'Velvet Teddy (Deep Beige)' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'BEARDO Godfather Perfume For Man, 100ml | Aromatic, Spicy Perfume For Men | EAU DE PARFUM | Perfume For Men',
    brand: 'BEARDO',
    description: 'A powerful, noble fragrance with spicy citrus notes of Calabrian Bergamot and mysterious Sichuan Pepper.',
    price: 1200,
    discountPrice: 420,
    discountPercentage: 65,
    rating: 4.9,
    numReviews: 290,
    category: 'Beauty',
    images: [
      'https://m.media-amazon.com/images/I/31BKWyvMuLL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'Scent Type', value: 'Fresh & Woody' },
      { key: 'Volume', value: '100 ml' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'The Derma Co 10% Niacinamide Serum with 2% Zinc, Powered by Deep Penetration Formula™',
    brand: 'The Derma Co',
    description: 'High-strength vitamin and mineral blemish formula designed to reduce the appearance of skin blemishes and congestion.',
    price: 599,
    discountPrice: 491,
    discountPercentage: 18,
    rating: 4.6,
    numReviews: 850,
    category: 'Beauty',
    images: [
      'https://m.media-amazon.com/images/I/61jwhrAkkIL._SY450_.jpg'
    ],
    stockQuantity: 150,
    specifications: [
      { key: 'Key Ingredient', value: '10% Niacinamide, 1% Zinc PCA' },
      { key: 'Target', value: 'Blemishes & Oiliness' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Himalaya Dark Spot Clearing Turmeric Face Serum, 15 mL | with 10% Glycolic Acid, 2% Niacinamide & Organically sourced Turmeric',
    brand: 'Himalaya',
    description: 'Intense hydrating serum formulation that plumps up skin and reduces fine lines by up to 60%.',
    price: 299,
    discountPrice: 236,
    discountPercentage: 21,
    rating: 4.5,
    numReviews: 310,
    category: 'Beauty',
    images: [
      'https://m.media-amazon.com/images/I/61+j-wJ4qAL._SY450_.jpg'
    ],
    stockQuantity: 70,
    specifications: [
      { key: 'Volume', value: '30 ml' },
      { key: 'Formulation', value: 'Lightweight Serum' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Maybelline New York Lash Sensational Sky High Waterproof Mascara, Very Black',
    brand: 'Maybelline',
    description: 'Delivers full volume and limitless length with an exclusive Flex Tower mascara brush that bends to extend every lash.',
    price: 799,
    discountPrice: 599,
    discountPercentage: 25,
    rating: 4.6,
    numReviews: 420,
    category: 'Beauty',
    images: [
      'https://m.media-amazon.com/images/I/512zBYEenoL._SY450_.jpg'
    ],
    stockQuantity: 90,
    specifications: [
      { key: 'Type', value: 'Washable Mascara' },
      { key: 'Color', value: 'Very Black' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'CeraVe Hydrating Facial Cleanser 473ml',
    brand: 'CeraVe',
    description: 'Non-foaming face wash with hyaluronic acid, ceramides, and glycerin for normal to dry skin.',
    price: 1650,
    discountPrice: 1399,
    discountPercentage: 15,
    rating: 4.8,
    numReviews: 610,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 65,
    specifications: [
      { key: 'Skin Type', value: 'Normal to Dry' },
      { key: 'Dermatologist Tested', value: 'Yes' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Minimalist Hair Mask For Frizzy Hair, Repairing Dry, Damaged & Dull Hair | Maleic Bond Repair Complex 05% with Transglutaminase, Amino Acids & Ceramides',
    brand: 'Minimalist',
    description: 'At-home bond building treatment that reduces breakage and visibly strengthens hair, improving its look and feel.',
    price: 2950,
    discountPrice: 2499,
    discountPercentage: 15,
    rating: 4.7,
    numReviews: 530,
    category: 'Beauty',
    images: [
      'https://m.media-amazon.com/images/I/61MsN4bwGOL._SY450_.jpg'
    ],
    stockQuantity: 50,
    specifications: [
      { key: 'Hair Type', value: 'Damaged & Color-Treated' },
      { key: 'Volume', value: '100 ml' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Neutrogena Hydro Boost Water Gel Moisturizer 50g',
    brand: 'Neutrogena',
    description: 'Oil-free gel moisturizer with purified hyaluronic acid that instantly quenches dry skin and keeps it smooth and hydrated.',
    price: 1150,
    discountPrice: 899,
    discountPercentage: 22,
    rating: 4.6,
    numReviews: 740,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 120,
    specifications: [
      { key: 'Texture', value: 'Water Gel' },
      { key: 'Skin Type', value: 'All Skin Types' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Clinique Almost Lipstick - Black Honey 1.9g',
    brand: 'Clinique',
    description: 'Not quite a lipstick, not quite a gloss. Sheer, shiny formula provides a transparent slip of color that fuses with your natural lip tone.',
    price: 2400,
    discountPrice: 1999,
    discountPercentage: 17,
    rating: 4.8,
    numReviews: 380,
    category: 'Beauty',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 80,
    specifications: [
      { key: 'Finish', value: 'Sheer Gloss' },
      { key: 'Shade', value: 'Black Honey' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },

  // 4. HOME & KITCHEN (7 Products)
  {
    name: 'Philips Air Fryer HD9252/90 Digital 4.1L',
    brand: 'Philips',
    description: 'Rapid Air technology with unique starfish design spins hot air to create delicious foods crisp on outside and tender on inside.',
    price: 12995,
    discountPrice: 8990,
    discountPercentage: 30,
    rating: 4.7,
    numReviews: 215,
    category: 'Home & Kitchen',
    images: [
      'https://plus.unsplash.com/premium_photo-1672192166833-c8ae84e5e127?auto=format&fit=crop&q=80&w=800',
      'https://plus.unsplash.com/premium_photo-1711051351678-658b273f71d4?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 35,
    specifications: [
      { key: 'Capacity', value: '4.1 Liters' },
      { key: 'Power', value: '1400 Watts' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Dyson V12 Detect Slim Cordless Vacuum Cleaner',
    brand: 'Dyson',
    description: 'Dyson lightweight cordless vacuum with laser illumination that reveals invisible dust on hard floors.',
    price: 55900,
    discountPrice: 47900,
    discountPercentage: 14,
    rating: 4.9,
    numReviews: 95,
    category: 'Home & Kitchen',
    images: [
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 12,
    specifications: [
      { key: 'Run Time', value: 'Up to 60 minutes' },
      { key: 'Suction Power', value: '150 AW' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Nespresso Vertuo Pop Coffee Pod Machine, Mango Yellow',
    brand: 'Nespresso',
    description: 'Compact capsule coffee machine for 4 cup sizes at the touch of a button using Centrifusion extraction technology.',
    price: 10000,
    discountPrice: 8000,
    discountPercentage: 20,
    rating: 4.6,
    numReviews: 110,
    category: 'Home & Kitchen',
    images: [
      'https://m.media-amazon.com/images/I/51GowJlHNVL._SX679_.jpg'
    ],
    stockQuantity: 22,
    specifications: [
      { key: 'Water Tank', value: '0.6 Liters' },
      { key: 'Heating Time', value: '30 seconds' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Titan Black Metal Pendulum Wall Clock with Open Dial, Gold-Tone Hands & Indices, Silent Sweep, Model W0086MP01',
    brand: 'Titan',
    description: 'Tri-ply construction ensures faster cooking and uniform heat distribution with food grade 304 stainless steel.',
    price: 5495,
    discountPrice: 3499,
    discountPercentage: 36,
    rating: 4.5,
    numReviews: 160,
    category: 'Home & Kitchen',
    images: [
      'https://m.media-amazon.com/images/I/71CrlTUlCoL._SL1500_.jpg'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Material', value: 'Tri-ply Stainless Steel' },
      { key: 'Induction Compatible', value: 'Yes' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Prestige Stainless Steel 3 Pc Cookware Set with 2 Glass Lids | Platina Popular | Fry Pan 22cm/1.9L',
    brand: 'Prestige',
    description: 'Soft, plush microfibre comforter filled with 200 GSM hollow siliconized polyester filling for cozy sleep.',
    price: 3730,
    discountPrice: 2313,
    discountPercentage: 38,
    rating: 4.3,
    numReviews: 340,
    category: 'Home & Kitchen',
    images: [
      'https://m.media-amazon.com/images/I/41H8xfg1zRL._SX300_SY300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 75,
    specifications: [
      { key: 'Size', value: 'Queen (228cm x 254cm)' },
      { key: 'Filling', value: '200 GSM Polyester' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Proven Nexon Aqua Water Purifier for Home RO+UV+UF+TDS | Copper + Mineral Guard + Alkaline | For Borewell & Hard Water',
    brand: 'Proven',
    description: 'RO + UV + UF + TDS Control water purification technology with UV LED in storage tank.',
    price: 7000,
    discountPrice: 6160,
    discountPercentage: 12,
    rating: 4.6,
    numReviews: 280,
    category: 'Home & Kitchen',
    images: [
      'https://m.media-amazon.com/images/I/81dupLLmjmL._AC_UL480_FMwebp_QL65_.jpg'
    ],
    stockQuantity: 28,
    specifications: [
      { key: 'Tank Capacity', value: '8 Litres' },
      { key: 'Purification Speed', value: '20L/hr' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    name: 'Halonix Wi-Fi Enabled Smart LED Bulb 12W B22D (16 Million Colors + Warm White/Neutral White/White)',
    brand: 'Halonix',
    description: 'WiFi smart bulb compatible with Amazon Alexa and Google Assistant with 16 million colors and dimming controls.',
    price: 1299,
    discountPrice: 699,
    discountPercentage: 46,
    rating: 4.4,
    numReviews: 530,
    category: 'Home & Kitchen',
    images: [
      'https://m.media-amazon.com/images/I/41XRAicBzaL._SX342_SY445_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 120,
    specifications: [
      { key: 'Wattage', value: '12 Watt' },
      { key: 'Wireless Type', value: 'Wi-Fi 2.4GHz' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },

  // 5. GROCERY (7 Products)
  {
    name: 'Ferrero Rocher Fine Hazelnut Chocolates Pack of 24',
    brand: 'Ferrero',
    description: 'Whole crunchy hazelnut in the center, a delicious creamy hazelnut filling, a crisp wafer shell covered with chocolate and gently roasted pieces.',
    price: 935,
    discountPrice: 879,
    discountPercentage: 6,
    rating: 4.9,
    numReviews: 740,
    category: 'Grocery',
    images: [
      'https://m.media-amazon.com/images/I/41wXwAJqp9L._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 100,
    specifications: [
      { key: 'Weight', value: '300 grams' },
      { key: 'Pack Size', value: '24 Pieces' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Nescafe Gold Blend Premium Instant Coffee 200g',
    brand: 'Nescafe',
    description: 'Crafted with high quality Arabica coffee beans roasted to golden perfection for a rich aroma and smooth taste.',
    price: 995,
    discountPrice: 799,
    discountPercentage: 20,
    rating: 4.8,
    numReviews: 480,
    category: 'Grocery',
    images: [
      'https://m.media-amazon.com/images/I/71v0Vae-CbL._AC_UL480_FMwebp_QL65_.jpg'
    ],
    stockQuantity: 85,
    specifications: [
      { key: 'Weight', value: '200g Jar' },
      { key: 'Bean Type', value: 'Arabica & Robusta' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Tata Tea Chakra Gold Premium Leaf, Rich Aroma & Taste, Black Tea With Leaf, 500 gram',
    brand: 'Tata Tea',
    description: 'Abundant in antioxidants, supports immune health and boosts energy with natural organic Tulsi leaves.',
    price: 442,
    discountPrice: 380,
    discountPercentage: 14,
    rating: 4.7,
    numReviews: 290,
    category: 'Grocery',
    images: [
      'https://m.media-amazon.com/images/I/51YY5n4poYL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 90,
    specifications: [
      { key: 'Quantity', value: '100 Tea Bags' },
      { key: 'Certification', value: 'USDA Organic' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Rich Almonds Nuts',
    brand: 'Happilo',
    description: '100% natural raw almonds, high in protein and dietary fiber. Zero cholesterol and zero trans fat.',
    price: 649,
    discountPrice: 449,
    discountPercentage: 30,
    rating: 4.6,
    numReviews: 610,
    category: 'Grocery',
    images: [
      'https://rukminim2.flixcart.com/image/1536/1536/xif0q/nut-dry-fruit/c/x/z/-original-imah6k5rsjtxtrfy.jpeg?q=90'
    ],
    stockQuantity: 110,
    specifications: [
      { key: 'Weight', value: '500g' },
      { key: 'Type', value: 'California Almonds' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Nutella Hazelnut Spread with Cocoa 750g',
    brand: 'Nutella',
    description: 'The original hazelnut spread made with quality ingredients like roasted hazelnuts and cocoa.',
    price: 799,
    discountPrice: 679,
    discountPercentage: 15,
    rating: 4.9,
    numReviews: 890,
    category: 'Grocery',
    images: [
      'https://th.bing.com/th?id=OPAC.D%2BOCnUHGvY9FuQ474C474&w=380&h=380&o=5&dpr=1.3&pid=21.1'
    ],
    stockQuantity: 70,
    specifications: [
      { key: 'Weight', value: '750g' },
      { key: 'Diet Type', value: 'Vegetarian' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Saffola Gold Edible Cooking Oil 5L Jar',
    brand: 'Saffola',
    description: 'Blended cooking oil with Proterol technology that helps manage cholesterol levels.',
    price: 1150,
    discountPrice: 949,
    discountPercentage: 17,
    rating: 4.7,
    numReviews: 340,
    category: 'Grocery',
    images: [
      'https://m.media-amazon.com/images/I/41P2hYlFzyL._SY300_SX300_QL70_ML2_.jpg'
    ],
    stockQuantity: 60,
    specifications: [
      { key: 'Volume', value: '5 Litres' },
      { key: 'Blend', value: 'Rice Bran & Sunflower Oil' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'India Gate Basmati Rice Super | Premium, Long Grain & Aged Raw Basmati Rice',
    brand: 'India Gate',
    description: 'Rich aroma and long fluffy grains after cooking. Perfect for everyday biryani and steamed rice.',
    price: 549,
    discountPrice: 429,
    discountPercentage: 22,
    rating: 4.5,
    numReviews: 420,
    category: 'Grocery',
    images: [
      'https://m.media-amazon.com/images/I/41dqLF2dYGL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 80,
    specifications: [
      { key: 'Weight', value: '5 kg' },
      { key: 'Grain Length', value: 'Medium Long' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },

  // 6. MOBILES (7 Products)
  {
    name: 'Apple iPhone 15 Pro Max 256GB Natural Titanium',
    brand: 'Apple',
    description: 'Forged in titanium. Feature-revolutionizing A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    price: 159900,
    discountPrice: 144900,
    discountPercentage: 9,
    rating: 4.9,
    numReviews: 820,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'Display', value: '6.7-inch Super Retina XDR OLED 120Hz' },
      { key: 'Processor', value: 'A17 Pro (3nm)' },
      { key: 'Main Camera', value: '48MP + 12MP Ultra Wide + 12MP Telephoto 5x' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray, 12GB RAM, 512GB)',
    brand: 'Samsung',
    description: 'Galaxy AI is here. 200MP camera with Quad Tele system, built-in S Pen, and Snapdragon 8 Gen 3 for Galaxy processor.',
    price: 139999,
    discountPrice: 129999,
    discountPercentage: 7,
    rating: 4.8,
    numReviews: 540,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Display', value: '6.8-inch Dynamic AMOLED 2X 120Hz' },
      { key: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { key: 'Battery', value: '5000 mAh with 45W Fast Charging' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: "OnePlus 15R | 16GB+512GB | Mint Breeze | World's First Snapdragon® 8 Gen 5 | 7400mAh Battery | Personalised AI",
    brand: 'OnePlus',
    description: 'Smooth Beyond Belief. Powered by Snapdragon 8 Gen 5 with 4th Gen Hasselblad Camera System for Mobile and 100W SUPERVOOC charging.',
    price: 69999,
    discountPrice: 64999,
    discountPercentage: 7,
    rating: 4.7,
    numReviews: 380,
    category: 'Mobiles',
    images: [
      'https://m.media-amazon.com/images/I/61h53LtSVVL._AC_UY327_FMwebp_QL65_.jpg'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Display', value: '6.82-inch 2K 120Hz ProXDR' },
      { key: 'RAM/Storage', value: '16GB / 512GB' },
      { key: 'Charging', value: '100W Wired, 50W Wireless' },
      { key: 'Battery', value: '7400mAh' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Google Pixel 8 Pro (Obsidian, 128GB)',
    brand: 'Google',
    description: 'The most powerful Pixel yet with Google Tensor G3 chip, fully upgraded camera setup, and breakthrough AI features.',
    price: 106999,
    discountPrice: 89999,
    discountPercentage: 16,
    rating: 4.6,
    numReviews: 210,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Processor', value: 'Google Tensor G3' },
      { key: 'Screen', value: '6.7-inch Super Actua display' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Xiaomi 14 Ultra (16GB RAM, 512GB Storage)',
    brand: 'Xiaomi',
    description: 'Leica Quad Camera System with 1-inch sensor, Stepless Variable Aperture, and Snapdragon 8 Gen 3 chipset.',
    price: 99999,
    discountPrice: 89999,
    discountPercentage: 10,
    rating: 4.7,
    numReviews: 160,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 18,
    specifications: [
      { key: 'Camera', value: 'Leica 50MP 1-inch Main' },
      { key: 'Charging', value: '90W HyperCharge' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Realme GT 6 5G (Fluid Silver, 12GB, 256GB)',
    brand: 'Realme',
    description: 'AI Flagship Killer featuring Snapdragon 8s Gen 3, 6000 nits Ultra Bright Display, and 120W charging.',
    price: 44999,
    discountPrice: 38999,
    discountPercentage: 13,
    rating: 4.5,
    numReviews: 140,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 45,
    specifications: [
      { key: 'Battery', value: '5500 mAh + 120W SUPERVOOC' },
      { key: 'Chipset', value: 'Snapdragon 8s Gen 3' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Nothing Phone (2a) 5G (White, 8GB, 128GB)',
    brand: 'Nothing',
    description: 'Unique Glyph Interface design, powered by MediaTek Dimensity 7200 Pro and custom Nothing OS 2.5.',
    price: 25999,
    discountPrice: 23999,
    discountPercentage: 8,
    rating: 4.5,
    numReviews: 410,
    category: 'Mobiles',
    images: [
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 65,
    specifications: [
      { key: 'Design', value: 'Transparent Back with Glyph Interface' },
      { key: 'Display', value: '6.7-inch Flexible AMOLED 120Hz' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },

  // 7. LAPTOPS (7 Products)
  {
    name: 'Apple MacBook Pro 16-inch M3 Max (36GB RAM, 1TB SSD)',
    brand: 'Apple',
    description: 'Mind-blowing performance with M3 Max 16-core CPU and 40-core GPU. Up to 22 hours of battery life and Liquid Retina XDR display.',
    price: 349900,
    discountPrice: 324900,
    discountPercentage: 7,
    rating: 4.9,
    numReviews: 190,
    category: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 15,
    specifications: [
      { key: 'Chip', value: 'Apple M3 Max' },
      { key: 'RAM', value: '36GB Unified Memory' },
      { key: 'Display', value: '16.2-inch Liquid Retina XDR' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'ASUS ROG Strix SCAR 16 Gaming Laptop',
    brand: 'ASUS',
    description: 'Intel Core i9-14900HX, NVIDIA GeForce RTX 4080 12GB GPU, 32GB DDR5 RAM, 1TB PCIe 4.0 SSD, 16-inch QHD+ 240Hz Nebula HDR Display.',
    price: 289990,
    discountPrice: 259990,
    discountPercentage: 10,
    rating: 4.8,
    numReviews: 85,
    category: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 10,
    specifications: [
      { key: 'GPU', value: 'NVIDIA RTX 4080 12GB' },
      { key: 'CPU', value: 'Intel Core i9-14900HX' },
      { key: 'Refresh Rate', value: '240Hz Mini-LED' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Dell 15 SmartChoice (Previously Inspiron), Intel 13th Gen Core i5-1334U, 16GB, 1TB SSD, FHD,15.6"/39.62cm, Win 11, MSO\'24, Silver, 1.62kg, [Dell 15], 12 Month McAfee, Backlit KB, Thin & Light Laptop',
    brand: 'Dell',
    description: 'Crafted with machined aluminum and Gorilla Glass 3. Powered by Intel Core Ultra processors with built-in AI engine.',
    price: 99478,
    discountPrice: 68990,
    discountPercentage: 31,
    rating: 4.6,
    numReviews: 75,
    category: 'Laptops',
    images: [
      'https://m.media-amazon.com/images/I/41IFwIo5sYL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Display', value: '15.6-inch FHD (1920 x 1080)' },
      { key: 'Processor', value: 'Intel 13th Gen Core i5-1334U' },
      { key: 'RAM', value: '16GB' },
      { key: 'Storage', value: '1TB SSD' },
      { key: 'Weight', value: '1.62 kg' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'HP Spectre x360 2-in-1 OLED Touch Laptop',
    brand: 'HP',
    description: 'Intel Core Ultra 7 155H, 16GB LPDDR5, 1TB SSD, 14-inch 2.8K OLED 120Hz Touchscreen with Stylus pen included.',
    price: 169990,
    discountPrice: 149990,
    discountPercentage: 12,
    rating: 4.7,
    numReviews: 62,
    category: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 14,
    specifications: [
      { key: 'Form Factor', value: '360 convertible touchscreen' },
      { key: 'Display', value: '2.8K (2880 x 1800) OLED 120Hz' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Lenovo IdeaPad Slim 3 Intel Core i5 13th Gen',
    brand: 'Lenovo',
    description: '15.6-inch FHD Antiglare laptop with 16GB RAM, 512GB SSD, Windows 11 & MS Office 2021 preloaded.',
    price: 65990,
    discountPrice: 49990,
    discountPercentage: 24,
    rating: 4.4,
    numReviews: 310,
    category: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 45,
    specifications: [
      { key: 'Processor', value: 'Intel Core i5-13420H' },
      { key: 'RAM', value: '16GB LPDDR5' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Acer Nitro V 15, Intel core i7-13th Gen 13620H, NVIDIA GeForce RTX - 5050 8GB, 16 GB, 512 GB, Full HD',
    brand: 'Acer',
    description: 'Intel Core i7 13th Gen 13620H, 16GB RAM, 512GB SSD, NVIDIA GeForce RTX 5050 8GB Graphics, 15.6-inch Full HD IPS Display.',
    price: 139999,
    discountPrice: 119990,
    discountPercentage: 14,
    rating: 4.6,
    numReviews: 120,
    category: 'Laptops',
    images: [
      'https://m.media-amazon.com/images/I/31MZG-M5o2L._SX300_SY300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'GPU', value: 'NVIDIA GeForce RTX 5050 8GB' },
      { key: 'CPU', value: 'Intel Core i7-13620H 13th Gen' },
      { key: 'RAM', value: '16GB' },
      { key: 'Storage', value: '512GB SSD' },
      { key: 'Display', value: '15.6-inch Full HD IPS' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Apple MacBook Air 13-inch M2 (8GB RAM, 256GB SSD)',
    brand: 'Apple',
    description: 'Incredibly thin design, 13.6-inch Liquid Retina display, 18-hour battery life, 1080p FaceTime HD camera.',
    price: 99900,
    discountPrice: 84900,
    discountPercentage: 15,
    rating: 4.8,
    numReviews: 760,
    category: 'Laptops',
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 55,
    specifications: [
      { key: 'Weight', value: '1.24 kg' },
      { key: 'Chip', value: 'Apple M2 8-core CPU' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },

  // 8. SPORTS (7 Products)
  {
    name: 'Decathlon Domyos Motorized Treadmill T540B',
    brand: 'Decathlon',
    description: 'Comfortable treadmill with a wide running deck, 24 pre-set programs, and max speed of 16 km/h.',
    price: 49999,
    discountPrice: 39999,
    discountPercentage: 20,
    rating: 4.6,
    numReviews: 95,
    category: 'Sports',
    images: [
      'https://m.media-amazon.com/images/I/51uuMH4GGhL._AC_UL480_FMwebp_QL65_.jpg'
    ],
    stockQuantity: 15,
    specifications: [
      { key: 'Motor Power', value: '1.25 HP Continuous' },
      { key: 'Max User Weight', value: '130 kg' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Yonex Astrox Attack 10DG Ultra Strong| Made with Japanese Graphite|Strung Badminton Racquet with Full Cover (80 Grams - 32 Lbs, Legion Blue)',
    brand: 'Yonex',
    description: 'Head-heavy power racket featuring Namd graphite technology for explosive smash power and steep attack angle.',
    price: 2999,
    discountPrice: 2129.29,
    discountPercentage: 29,
    rating: 4.8,
    numReviews: 140,
    category: 'Sports',
    images: [
      'https://m.media-amazon.com/images/I/51lRUkwQmFL._SL1000_.jpg'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Weight/Grip', value: '4U (83g) / G5' },
      { key: 'Flex', value: 'Stiff' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Wilson Rubber NBA DRV Series Basketball - DRV, Orange, Size 7-29.5',
    brand: 'Wilson',
    description: 'Full grain leather cover built for indoor play with deep channel design for superior grip and control.',
    price: 1200,
    discountPrice: 936,
    discountPercentage: 22,
    rating: 4.7,
    numReviews: 210,
    category: 'Sports',
    images: [
      'https://m.media-amazon.com/images/I/81E2VQQE0SL._SL1500_.jpg'
    ],
    stockQuantity: 50,
    specifications: [
      { key: 'Material', value: 'Composite Leather' },
      { key: 'Size', value: 'Official Size 7' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    name: 'Cosco Hex Dumbbell Set 20kg (10kg x 2)',
    brand: 'Cosco',
    description: 'Rubber encased hexagonal dumbbells with contoured chrome handles to prevent rolling and protect floors.',
    price: 4500,
    discountPrice: 3299,
    discountPercentage: 26,
    rating: 4.5,
    numReviews: 180,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Weight', value: '2 x 10kg' },
      { key: 'Material', value: 'Cast Iron with Rubber Coating' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Manduka PRO Yoga Mat 6mm Thick',
    brand: 'Manduka',
    description: 'Ultra-dense cushioning provides unmatched support, joint protection, and lifetime guarantee.',
    price: 8900,
    discountPrice: 7490,
    discountPercentage: 16,
    rating: 4.8,
    numReviews: 110,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 35,
    specifications: [
      { key: 'Thickness', value: '6 mm' },
      { key: 'Dimensions', value: '180cm x 66cm' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Adidas FIFA World Cup Match Football',
    brand: 'Adidas',
    description: 'Thermally bonded seamless construction for predictable trajectory and low water absorption.',
    price: 3999,
    discountPrice: 2999,
    discountPercentage: 25,
    rating: 4.6,
    numReviews: 155,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 60,
    specifications: [
      { key: 'Certification', value: 'FIFA Quality Pro' },
      { key: 'Size', value: 'Size 5' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false
  },
  {
    name: 'Garmin Forerunner 265 Running Smartwatch',
    brand: 'Garmin',
    description: 'Bright AMOLED touchscreen display with advanced training metrics, recovery insights, and multi-band GPS.',
    price: 39000,
    discountPrice: 22620,
    discountPercentage: 42,
    rating: 4.9,
    numReviews: 90,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Display', value: '1.3-inch AMOLED' },
      { key: 'Battery Mode', value: 'Up to 13 days in Smartwatch mode' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },

  // 9. FURNITURE (5 Products)
  {
    name: 'AS Furniture Arts Solid Sheesham Wood 6 Seater Sofa Set For Living Room Wooden Sofa Set For Living Room Furniture 3+2+1 (Standard, Natural Teak Finish)',
    brand: 'AS Furniture Arts',
    description: 'Premium solid Sheesham wood 6 seater sofa set for living room. Includes 3-seater, 2-seater and 1-seater sofas with natural teak finish. Durable and elegant furniture for your home.',
    price: 74000,
    discountPrice: 45140,
    discountPercentage: 39,
    rating: 5,
    numReviews: 0,
    category: 'Furniture',
    images: [
      'https://m.media-amazon.com/images/I/51eam6VqRFL._SX300_SY300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 10,
    specifications: [
      { key: 'Material', value: 'Solid Sheesham Wood' },
      { key: 'Seater', value: '6 Seater (3+2+1)' },
      { key: 'Finish', value: 'Natural Teak Finish' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Hexagon Wall Shelves Set of 6 | Wooden Floating Wall Shelf for Home Decor | Honeycomb Design Wall Rack for Living Room',
    brand: 'Hexagon',
    description: 'Set of 6 hexagonal wooden floating wall shelves with honeycomb design. Perfect for home decor, living room wall rack, displaying photos, plants, books and decorative items.',
    price: 1300,
    discountPrice: 858,
    discountPercentage: 34,
    rating: 5,
    numReviews: 0,
    category: 'Furniture',
    images: [
      'https://m.media-amazon.com/images/I/61avpOT1vPL._SX679_.jpg'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'Material', value: 'Wood' },
      { key: 'Set Includes', value: '6 Shelves' },
      { key: 'Design', value: 'Hexagon Honeycomb' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Nilkamal Joyce 3 Door Wooden Wardrobe with Mirror for Bedroom | Almirah with 8 Shelves & 1 Hanging Rod | Clothes Cupboard',
    brand: 'Nilkamal',
    description: 'Nilkamal Joyce 3 door wooden wardrobe with mirror for bedroom. Features 8 shelves and 1 hanging rod for organized clothes storage. Durable and stylish clothes cupboard for your home.',
    price: 34000,
    discountPrice: 24140,
    discountPercentage: 29,
    rating: 5,
    numReviews: 0,
    category: 'Furniture',
    images: [
      'https://m.media-amazon.com/images/I/61B8V05OWoL._SX679_.jpg'
    ],
    stockQuantity: 15,
    specifications: [
      { key: 'Material', value: 'Wood' },
      { key: 'Doors', value: '3 Door with Mirror' },
      { key: 'Shelves', value: '8 Shelves' },
      { key: 'Hanging Rod', value: '1 Hanging Rod' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Modern Round Side Table, Home Decor for Living Room, Bed Side Tables for Bed Room, stools for Home, Furniture for Home, 2-Tier White Shelves, 30 x 30 x 40 cm',
    brand: 'Modern',
    description: 'Modern round side table with 2-tier white shelves. Perfect as bed side table, living room decor, or stool for home. Compact size 30 x 30 x 40 cm fits anywhere.',
    price: 999,
    discountPrice: 489.51,
    discountPercentage: 51,
    rating: 5,
    numReviews: 0,
    category: 'Furniture',
    images: [
      'https://m.media-amazon.com/images/I/41mMXaU95-L._SX300_SY300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Material', value: 'Wood' },
      { key: 'Dimensions', value: '30 x 30 x 40 cm' },
      { key: 'Design', value: '2-Tier Round' },
      { key: 'Color', value: 'White' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },
  {
    name: 'Furniture Single Seater Swing Chair with Stand & Cushion Outdoor Indoor Balcony Garden Patio,Powder Coated Frame,UV Protected Wicker,Premium Cushion NS-17',
    brand: 'Furniture',
    description: 'Single seater swing chair with stand and premium cushion. Perfect for outdoor, indoor, balcony, garden and patio. Features powder coated frame, UV protected wicker and premium cushion for maximum comfort.',
    price: 10786,
    discountPrice: 5285.14,
    discountPercentage: 51,
    rating: 5,
    numReviews: 0,
    category: 'Furniture',
    images: [
      'https://m.media-amazon.com/images/I/61lyVN9E-ML.jpg'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Type', value: 'Single Seater Swing Chair' },
      { key: 'Frame', value: 'Powder Coated' },
      { key: 'Wicker', value: 'UV Protected' },
      { key: 'Cushion', value: 'Premium Cushion Included' },
      { key: 'Model', value: 'NS-17' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: true
  },

  // 10. TOYS (7 Products)
  {
    name: 'LEGO Star Wars Millennium Falcon 75257',
    brand: 'LEGO',
    description: 'Inspire kids and adults with 1,351 pieces including 7 LEGO Star Wars characters and rotating top/bottom gun turrets.',
    price: 16999,
    discountPrice: 13999,
    discountPercentage: 18,
    rating: 4.9,
    numReviews: 175,
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 25,
    specifications: [
      { key: 'Pieces', value: '1351' },
      { key: 'Age Group', value: '9+ Years' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Hot Wheels 20-Car Gift Pack Assortment',
    brand: 'Hot Wheels',
    description: 'Collection of 20 1:64 scale die-cast vehicles with realistic details and authentic decos.',
    price: 4999,
    discountPrice: 4349,
    discountPercentage: 13,
    rating: 4.8,
    numReviews: 320,
    category: 'Toys',
    images: [
      'https://m.media-amazon.com/images/I/81nJShD5KaL._SX522_.jpg'
    ],
    stockQuantity: 60,
    specifications: [
      { key: 'Scale', value: '1:64' },
      { key: 'Quantity', value: '20 Cars' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Barbie Dreamhouse 3-Story Dollhouse with Slide',
    brand: 'Barbie',
    description: '3 stories, 10 indoor and outdoor living areas, customizable lights and sounds, plus a pool slide.',
    price: 5000,
    discountPrice: 2700,
    discountPercentage: 46,
    rating: 4.7,
    numReviews: 90,
    category: 'Toys',
    images: [
      'https://m.media-amazon.com/images/I/817G+NLTwrL._SX522_.jpg'
    ],
    stockQuantity: 15,
    specifications: [
      { key: 'Height', value: '3.75 Feet Tall' },
      { key: 'Accessories Included', value: '75+ pieces' }
    ],
    isFeatured: true,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'NERF Elite 2.0 Commander RD-6 Blaster',
    brand: 'NERF',
    description: '6-dart rotating drum blaster with 12 Official Nerf darts, tactical rails, and stock/barrel attachment points.',
    price: 2000,
    discountPrice: 1260,
    discountPercentage: 37,
    rating: 4.6,
    numReviews: 240,
    category: 'Toys',
    images: [
      'https://m.media-amazon.com/images/I/61tMrAHHq2L._SX522_.jpg'
    ],
    stockQuantity: 70,
    specifications: [
      { key: 'Firing Distance', value: 'Up to 90 Feet (27 meters)' },
      { key: 'Darts Included', value: '12 Official Darts' }
    ],
    isFeatured: false,
    isTrending: true,
    isBestSeller: true,
    isNewArrival: false
  },
  {
    name: 'Royal Buzz 3x3 Magic Speed Rubix cube',
    brand: 'Rubiks',
    description: 'Track your solves in real-time, learn algorithms, and battle speedcubers globally via smartphone app.',
    price: 128,
    discountPrice: 33,
    discountPercentage: 74,
    rating: 4.5,
    numReviews: 110,
    category: 'Toys',
    images: [
      'https://images.unsplash.com/photo-1567646303972-f7de3a9c0a05?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1496354265829-17b1c7b7c363?auto=format&fit=crop&q=80&w=800'
    ],
    stockQuantity: 30,
    specifications: [
      { key: 'Connectivity', value: 'Bluetooth 5.0' },
      { key: 'Battery Life', value: '60 Hours' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'Transformers Studio Series Leader Class Optimus Prime',
    brand: 'Hasbro',
    description: 'Collectible 8.5-inch action figure inspired by iconic movie scenes, converts from robot to truck mode in 44 steps.',
    price: 6999,
    discountPrice: 5499,
    discountPercentage: 21,
    rating: 4.8,
    numReviews: 85,
    category: 'Toys',
    images: [
      'https://m.media-amazon.com/images/I/516hq31NoyL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 20,
    specifications: [
      { key: 'Height', value: '8.5 inches' },
      { key: 'Conversion', value: '44 Steps' }
    ],
    isFeatured: false,
    isTrending: false,
    isBestSeller: false,
    isNewArrival: true
  },
  {
    name: 'RC Monster Truck 4WD High Speed Off-Road Car',
    brand: 'Bezgar',
    description: '1:16 scale remote control truck with 40 km/h top speed, waterproof electronics, and dual rechargeable batteries.',
    price: 5999,
    discountPrice: 3999,
    discountPercentage: 33,
    rating: 4.6,
    numReviews: 195,
    category: 'Toys',
    images: [
      'https://m.media-amazon.com/images/I/51GnV3OlNxL._SY300_SX300_QL70_FMwebp_.jpg'
    ],
    stockQuantity: 40,
    specifications: [
      { key: 'Max Speed', value: '40 km/h' },
      { key: 'Control Range', value: '80 Meters' }
    ],
    isFeatured: true,
    isTrending: true,
    isBestSeller: false,
    isNewArrival: false
  }
];

export const couponsData = [
  {
    code: 'TREND20',
    discountPercentage: 20,
    minPurchaseAmount: 1000,
    maxDiscountAmount: 2000,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'WELCOME10',
    discountPercentage: 10,
    minPurchaseAmount: 500,
    maxDiscountAmount: 1000,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
  {
    code: 'BIGSALE50',
    discountPercentage: 50,
    minPurchaseAmount: 3000,
    maxDiscountAmount: 2500,
    expiryDate: new Date('2028-12-31'),
    isActive: true,
  },
];
