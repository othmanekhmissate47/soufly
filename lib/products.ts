export type ProductCategory =
  | 'football'
  | 'running'
  | 'fitness'
  | 'recovery'
  | 'accessories'
  | 'supplements';

export type ProductBadge = 'new' | 'hot' | 'sale' | 'exclusive' | null;

export interface ProductVariant {
  size?: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProductCategory;
  categoryLabel: string;
  emoji: string;
  images: string[];
  price: number;
  oldPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: ProductBadge;
  variants: ProductVariant[];
  sizes: string[];
  tags: string[];
  features: string[];
  specs: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  reviews: ProductReview[];
}

export const PRODUCTS: Product[] = [
  {
    id: 'p001',
    slug: 'falcon-x-pro-football-boots',
    name: 'Falcon X Pro',
    tagline: 'Born to dominate. Built to endure.',
    description: 'Pro-grade football boots with advanced traction soleplate and premium kangaroo leather upper.',
    longDescription: 'The Falcon X Pro represents the pinnacle of football boot engineering. Crafted from premium kangaroo leather, these boots deliver unparalleled touch and ball feel while the 360° AllGround traction soleplate provides explosive acceleration and confident turning on any surface. Weighing just 180g, you will barely notice them until you need them most.',
    category: 'football',
    categoryLabel: 'Football',
    emoji: '⚽',
    images: ['⚽', '⚽', '⚽', '⚽'],
    price: 599,
    oldPrice: 799,
    rating: 4.8,
    reviewCount: 234,
    badge: 'new',
    variants: [
      { color: 'Midnight Black', colorHex: '#1a1a2e', stock: 20 },
      { color: 'Flame Red', colorHex: '#c0392b', stock: 12 },
      { color: 'Solar Gold', colorHex: '#f39c12', stock: 8 },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    tags: ['boots', 'football', 'cleats', 'fg', 'kangaroo', 'leather', 'pro'],
    features: [
      'Premium kangaroo leather upper',
      '360° AllGround traction soleplate',
      'Ultralight 180g construction',
      'Waterproof DryShield coating',
      'Anatomic last for precise fit',
      'Carbon fiber heel counter',
    ],
    specs: {
      'Weight': '180g (size 42)',
      'Upper Material': 'Kangaroo leather',
      'Sole': 'Carbon fiber composite',
      'Closure': 'Lace',
      'Ground Type': 'Firm Ground (FG)',
      'Country of Origin': 'Morocco',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r1', author: 'Youssef K.', rating: 5, date: '2025-03-15', comment: 'Best football boots I have ever worn. The leather is buttery smooth.', verified: true },
      { id: 'r2', author: 'Hamza M.', rating: 5, date: '2025-02-28', comment: 'Perfect for hard ground. Incredible traction and very comfortable.', verified: true },
      { id: 'r3', author: 'Amine B.', rating: 4, date: '2025-02-10', comment: 'Great quality, runs slightly small — size up half a size.', verified: true },
    ],
  },
  {
    id: 'p002',
    slug: 'velocity-run-9',
    name: 'Velocity RUN 9',
    tagline: 'Faster than your limits.',
    description: 'Ultra-lightweight running shoes with reactive foam midsole and carbon fiber plate.',
    longDescription: 'The Velocity RUN 9 is engineered for athletes who refuse to slow down. Our proprietary ReactFoam+ midsole absorbs impact and returns energy with every stride, while the embedded carbon fiber plate propels you forward. The breathable engineered mesh upper keeps your feet cool, and the precision-rubber outsole grips the road through every condition.',
    category: 'running',
    categoryLabel: 'Running',
    emoji: '👟',
    images: ['👟', '👟', '👟', '👟'],
    price: 499,
    oldPrice: null,
    rating: 4.9,
    reviewCount: 187,
    badge: 'hot',
    variants: [
      { color: 'Stealth Black', colorHex: '#000000', stock: 25 },
      { color: 'Electric Blue', colorHex: '#0066ff', stock: 18 },
      { color: 'Arctic White', colorHex: '#f5f5f5', stock: 15 },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46', '47'],
    tags: ['shoes', 'running', 'marathon', 'carbon', 'foam', 'speed'],
    features: [
      'ReactFoam+ energy-return midsole',
      'Full-length carbon fiber plate',
      'Breathable engineered mesh upper',
      '9mm heel-to-toe drop',
      'Precision rubber outsole',
      'Reflective heel counter',
    ],
    specs: {
      'Weight': '218g (size 42)',
      'Drop': '9mm',
      'Stack Height': '38mm heel / 29mm forefoot',
      'Upper': 'Engineered mesh',
      'Midsole': 'ReactFoam+',
      'Outsole': 'Precision rubber',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r4', author: 'Sara L.', rating: 5, date: '2025-04-01', comment: 'Shaved 3 minutes off my 10K PB in my first run. Absolutely incredible.', verified: true },
      { id: 'r5', author: 'Mehdi A.', rating: 5, date: '2025-03-20', comment: 'The carbon plate gives you serious propulsion. Worth every dirham.', verified: true },
    ],
  },
  {
    id: 'p003',
    slug: 'iron-grip-elite-gloves',
    name: 'Iron Grip Elite',
    tagline: 'Hold more. Lift more. Be more.',
    description: 'Premium gym gloves with silicone grip pattern and integrated wrist support.',
    longDescription: 'Iron Grip Elite gloves are engineered for serious strength athletes. The dual-layer palm features a silicone hexagonal grip pattern that prevents slippage on bars and dumbbells. The integrated 18-inch wrist wrap provides joint stability under heavy load, while the premium Amara leather construction ensures long-term durability through thousands of reps.',
    category: 'fitness',
    categoryLabel: 'Fitness',
    emoji: '🥊',
    images: ['🥊', '🥊', '🥊', '🥊'],
    price: 199,
    oldPrice: 249,
    rating: 4.7,
    reviewCount: 312,
    badge: 'sale',
    variants: [
      { color: 'Blackout', colorHex: '#1a1a1a', stock: 40 },
      { color: 'Navy Blue', colorHex: '#0066ff', stock: 22 },
      { color: 'Inferno', colorHex: '#ff4500', stock: 15 },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['gloves', 'gym', 'lifting', 'wrist', 'strength', 'training'],
    features: [
      'Silicone hexagonal grip pattern',
      '18-inch wrist support wrap',
      'Premium Amara leather construction',
      'Ventilated back panel',
      'Easy-remove pull tabs',
      'Machine washable',
    ],
    specs: {
      'Material': 'Amara leather + Neoprene',
      'Wrist Support': '18 inches velcro wrap',
      'Palm Grip': 'Silicone hexagon pattern',
      'Closure': 'Velcro + snap hook',
      'Care': 'Machine washable (cold)',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r6', author: 'Karim D.', rating: 5, date: '2025-03-10', comment: 'Best gloves for heavy deadlifts. The wrist support is a game changer.', verified: true },
      { id: 'r7', author: 'Fatima Z.', rating: 4, date: '2025-02-25', comment: 'Great quality. The grip is excellent and they are very comfortable.', verified: true },
    ],
  },
  {
    id: 'p004',
    slug: 'phantom-bag-pro',
    name: 'PhantomBag Pro',
    tagline: 'Carry everything. Compromise nothing.',
    description: 'The ultimate 45L sports bag with waterproof exterior and dedicated compartments.',
    longDescription: 'The PhantomBag Pro is engineered for the athlete who demands more. At 45L capacity with a dedicated ventilated shoe compartment, wet gear pocket, 15-inch laptop sleeve, and multiple external pockets, this bag adapts to your training schedule. The 420D ripstop nylon exterior is completely waterproof, and the padded back panel provides ergonomic comfort on your commute.',
    category: 'accessories',
    categoryLabel: 'Accessories',
    emoji: '🎒',
    images: ['🎒', '🎒', '🎒', '🎒'],
    price: 799,
    oldPrice: null,
    rating: 4.6,
    reviewCount: 98,
    badge: 'new',
    variants: [
      { color: 'Stealth Black', colorHex: '#000000', stock: 20 },
      { color: 'Navy Ops', colorHex: '#1a1a2e', stock: 12 },
      { color: 'Ember Red', colorHex: '#c0392b', stock: 8 },
    ],
    sizes: ['One Size'],
    tags: ['bag', 'sports', 'backpack', 'waterproof', 'gym', 'travel'],
    features: [
      '45L total capacity',
      'Waterproof 420D ripstop nylon',
      'Ventilated shoe compartment',
      'Wet/dry separation pocket',
      '15-inch padded laptop sleeve',
      'Ergonomic back panel system',
    ],
    specs: {
      'Capacity': '45 liters',
      'Material': '420D Ripstop Nylon',
      'Waterproof Rating': 'IPX5',
      'Laptop Size': 'Up to 15 inches',
      'Weight': '1.2kg',
      'Dimensions': '55 × 35 × 25cm',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r8', author: 'Omar B.', rating: 5, date: '2025-04-05', comment: 'Incredible bag. Used it for a football tournament and it handled everything perfectly.', verified: true },
    ],
  },
  {
    id: 'p005',
    slug: 'resistx-band-set',
    name: 'ResistX Band Set',
    tagline: 'Five levels. Infinite possibilities.',
    description: 'Complete 5-band resistance set from 5 to 150 lbs, natural latex, anti-snap guarantee.',
    longDescription: 'The ResistX Band Set delivers a complete home gym in a single package. Five progressive resistance levels (Light/Medium/Heavy/Extra Heavy/Monster) made from 100% natural latex provide smooth, even resistance throughout every movement. The anti-snap technology means you can train with full confidence, and the premium canvas carry pouch keeps your set organized between sessions.',
    category: 'fitness',
    categoryLabel: 'Fitness',
    emoji: '💪',
    images: ['💪', '💪', '💪', '💪'],
    price: 149,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 445,
    badge: null,
    variants: [
      { color: 'Full Set', colorHex: '#ff4500', stock: 100 },
    ],
    sizes: ['Set of 5'],
    tags: ['bands', 'resistance', 'training', 'home', 'gym', 'latex', 'exercise'],
    features: [
      '5 progressive resistance levels (5–150 lbs)',
      '100% natural latex construction',
      'Anti-snap reinforced edges',
      'Canvas carry pouch included',
      'Exercise guide booklet',
      'Anchor strap + handles included',
    ],
    specs: {
      'Resistance Levels': '5 / 15 / 35 / 65 / 100+ lbs',
      'Material': '100% Natural Latex',
      'Length': '104cm (loop)',
      'Width': '13–64mm',
      'Warranty': '1 Year Anti-Snap',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r9', author: 'Nadia E.', rating: 5, date: '2025-03-28', comment: 'Perfect quality. Been using them daily for 3 months without any issue.', verified: true },
      { id: 'r10', author: 'Rachid H.', rating: 5, date: '2025-03-15', comment: 'Essential equipment. Great value, excellent build quality.', verified: true },
    ],
  },
  {
    id: 'p006',
    slug: 'hydroshake-900',
    name: 'HydroShake 900',
    tagline: '24 hours cold. Zero compromise.',
    description: '900ml insulated protein shaker with BlenderBall Pro and leak-proof guarantee.',
    longDescription: 'The HydroShake 900 is the last protein shaker you will ever need. Double-wall vacuum insulation keeps your drinks cold for 24 hours and hot for 12. The BlenderBall Pro wire whisk integrates seamlessly to create lump-free protein shakes every time. The aircraft-grade aluminum construction and leak-proof flip cap make it bulletproof for any gym bag.',
    category: 'accessories',
    categoryLabel: 'Accessories',
    emoji: '🥤',
    images: ['🥤', '🥤', '🥤', '🥤'],
    price: 129,
    oldPrice: 159,
    rating: 4.5,
    reviewCount: 567,
    badge: 'sale',
    variants: [
      { color: 'Ocean Blue', colorHex: '#0066ff', stock: 60 },
      { color: 'Arctic Cyan', colorHex: '#00e5ff', stock: 45 },
      { color: 'Stealth Black', colorHex: '#000000', stock: 50 },
    ],
    sizes: ['900ml'],
    tags: ['shaker', 'protein', 'bottle', 'hydration', 'gym', 'insulated'],
    features: [
      '900ml double-wall vacuum insulation',
      'BlenderBall Pro wire whisk',
      'Cold 24h / Hot 12h performance',
      'Aircraft-grade aluminum body',
      'Leak-proof flip cap with lock',
      'BPA-free, odor-resistant',
    ],
    specs: {
      'Capacity': '900ml',
      'Material': 'Aircraft-grade aluminum',
      'Insulation': 'Double-wall vacuum',
      'Lid': 'Flip cap with safety lock',
      'BPA Free': 'Yes',
      'Weight': '310g',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r11', author: 'Imane T.', rating: 5, date: '2025-04-12', comment: 'Keeps my shake cold all morning. Love the build quality.', verified: true },
      { id: 'r12', author: 'Ali S.', rating: 4, date: '2025-03-30', comment: 'Great shaker. The BlenderBall works perfectly with protein powder.', verified: true },
    ],
  },
  {
    id: 'p007',
    slug: 'apex-compression-shorts',
    name: 'Apex Compression',
    tagline: 'Targeted support. Maximum output.',
    description: 'Advanced compression shorts with muscle-support zones and DryCore moisture-wicking.',
    longDescription: 'Apex Compression shorts are engineered with targeted compression mapping — graduated pressure from ankle to waist supports muscle groups precisely where they need it. The DryCore moisture-wicking fabric pulls sweat away instantly, and the anti-bacterial treatment keeps you fresh through the longest sessions. Four-way stretch construction moves with every motion.',
    category: 'fitness',
    categoryLabel: 'Fitness',
    emoji: '🩳',
    images: ['🩳', '🩳', '🩳', '🩳'],
    price: 249,
    oldPrice: null,
    rating: 4.7,
    reviewCount: 223,
    badge: null,
    variants: [
      { color: 'Black Ops', colorHex: '#1a1a1a', stock: 35 },
      { color: 'Blue Neon', colorHex: '#0066ff', stock: 22 },
      { color: 'Red Force', colorHex: '#c0392b', stock: 18 },
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    tags: ['compression', 'shorts', 'training', 'moisture-wicking', 'gym', 'sports'],
    features: [
      'Targeted graduated compression',
      'DryCore moisture-wicking technology',
      'Anti-bacterial silver ion treatment',
      '4-way stretch fabrication',
      'Flatlock seams to prevent chafing',
      'Deep phone-size pocket',
    ],
    specs: {
      'Fabric': '85% Polyester, 15% Elastane',
      'Technology': 'DryCore moisture-wicking',
      'Compression Level': 'Moderate (15–20 mmHg)',
      'Length': 'Mid-thigh',
      'Care': 'Machine wash cold',
    },
    inStock: true,
    featured: false,
    reviews: [
      { id: 'r13', author: 'Soufiane A.', rating: 5, date: '2025-03-22', comment: 'Great compression. Wore these for a half-marathon and my legs felt amazing.', verified: true },
    ],
  },
  {
    id: 'p008',
    slug: 'yogaflow-mat-pro',
    name: 'YogaFlow Mat Pro',
    tagline: 'Ground yourself. Rise further.',
    description: '6mm natural rubber yoga mat with alignment guide and microfiber non-slip surface.',
    longDescription: 'The YogaFlow Mat Pro is crafted from sustainably sourced natural rubber for a floor grip that never lets you down, topped with a premium microfiber surface that provides exceptional grip even when wet. The laser-engraved alignment guide ensures perfect pose every time, and at 6mm thickness it provides joint-protecting cushioning without sacrificing ground feel.',
    category: 'recovery',
    categoryLabel: 'Recovery',
    emoji: '🧘',
    images: ['🧘', '🧘', '🧘', '🧘'],
    price: 299,
    oldPrice: 399,
    rating: 4.9,
    reviewCount: 156,
    badge: 'hot',
    variants: [
      { color: 'Forest Deep', colorHex: '#1a2e1a', stock: 30 },
      { color: 'Cosmic Purple', colorHex: '#c084fc', stock: 25 },
      { color: 'Midnight Black', colorHex: '#000000', stock: 20 },
    ],
    sizes: ['183cm × 61cm'],
    tags: ['yoga', 'mat', 'recovery', 'rubber', 'meditation', 'pilates'],
    features: [
      '6mm natural rubber base',
      'Laser-engraved alignment guide',
      'Microfiber non-slip top surface',
      'Works dry and wet',
      'Eco-friendly sustainably sourced rubber',
      'Carry strap included',
    ],
    specs: {
      'Dimensions': '183 × 61cm',
      'Thickness': '6mm',
      'Material': 'Natural rubber + Microfiber',
      'Weight': '2.8kg',
      'Eco Certified': 'OEKO-TEX Standard 100',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r14', author: 'Kenza M.', rating: 5, date: '2025-04-08', comment: 'The grip is insane. It literally does not slip even in hot yoga. Perfect.', verified: true },
      { id: 'r15', author: 'Layla R.', rating: 5, date: '2025-03-18', comment: 'Beautiful mat, excellent cushioning and alignment lines are super helpful.', verified: true },
    ],
  },
  {
    id: 'p009',
    slug: 'thunder-boots-fg',
    name: 'Thunder Boots FG',
    tagline: 'Speed woven in. Power built in.',
    description: 'Firm ground football boots with SpeedCage knit upper and All-Condition soleplate.',
    longDescription: 'Thunder Boots FG brings elite performance to the firm ground. The SpeedCage knit upper delivers a sock-like fit with reinforced key touch zones, while the All-Condition AG/FG dual soleplate handles grass and harder surfaces with equal authority. The EHB (External Heel Binding) keeps your heel locked in during sharp direction changes.',
    category: 'football',
    categoryLabel: 'Football',
    emoji: '⚽',
    images: ['⚽', '⚽', '⚽', '⚽'],
    price: 449,
    oldPrice: 599,
    rating: 4.6,
    reviewCount: 342,
    badge: 'sale',
    variants: [
      { color: 'Lightning Gold', colorHex: '#f39c12', stock: 28 },
      { color: 'Stealth Black', colorHex: '#000000', stock: 32 },
      { color: 'Arctic White', colorHex: '#f5f5f5', stock: 14 },
    ],
    sizes: ['39', '40', '41', '42', '43', '44', '45', '46'],
    tags: ['boots', 'football', 'fg', 'ag', 'knit', 'firm-ground', 'speed'],
    features: [
      'SpeedCage dynamic knit upper',
      'All-Condition AG/FG dual soleplate',
      'EHB External Heel Binding',
      'Ultralight 175g construction',
      'Reinforced touch zones',
      'Ribbed sock ankle collar',
    ],
    specs: {
      'Weight': '175g (size 42)',
      'Upper': 'SpeedCage knit',
      'Soleplate': 'AG/FG dual compound',
      'Heel System': 'EHB External Heel Binding',
      'Ground Type': 'Firm Ground / Artificial Ground',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r16', author: 'Zakaria N.', rating: 5, date: '2025-02-14', comment: 'Incredibly light. You forget you are wearing boots. Perfect touch on the ball.', verified: true },
      { id: 'r17', author: 'Mounir C.', rating: 4, date: '2025-02-01', comment: 'Great boots, the heel lock system is excellent. Very happy.', verified: true },
    ],
  },
  {
    id: 'p010',
    slug: 'falcon-recovery-gun',
    name: 'Falcon Recovery Pro',
    tagline: 'Recover faster. Train harder.',
    description: 'Professional percussion massager with 6 speed levels, 4 heads, 8-hour battery.',
    longDescription: 'The Falcon Recovery Pro percussion massager delivers professional-grade muscle treatment at home. With 6 speed levels (1200–3200 RPM), 4 interchangeable attachment heads, and an ultra-quiet 30dB brushless motor, it penetrates deep muscle tissue to accelerate recovery. The 2400mAh battery delivers 8 hours continuous use.',
    category: 'recovery',
    categoryLabel: 'Recovery',
    emoji: '⚡',
    images: ['⚡', '⚡', '⚡', '⚡'],
    price: 699,
    oldPrice: null,
    rating: 4.8,
    reviewCount: 89,
    badge: 'new',
    variants: [
      { color: 'Stealth Black', colorHex: '#000000', stock: 18 },
      { color: 'Navy Ops', colorHex: '#0066ff', stock: 10 },
    ],
    sizes: ['Standard'],
    tags: ['massager', 'recovery', 'percussion', 'muscle', 'physiotherapy'],
    features: [
      '6 speed levels (1200–3200 RPM)',
      '4 interchangeable attachment heads',
      'Ultra-quiet 30dB brushless motor',
      '8-hour battery life',
      'LCD display with force meter',
      'Carry case included',
    ],
    specs: {
      'Speeds': '1200 / 1800 / 2200 / 2600 / 3000 / 3200 RPM',
      'Noise Level': '< 30dB',
      'Battery': '2400mAh Li-ion',
      'Battery Life': '8 hours',
      'Attachments': '4 (Ball, Flat, Fork, Bullet)',
      'Weight': '1.1kg',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r18', author: 'Hassan O.', rating: 5, date: '2025-04-15', comment: 'This thing is a game changer for post-training recovery. Very quiet and powerful.', verified: true },
    ],
  },
  {
    id: 'p011',
    slug: 'sonic-run-ultra-trail',
    name: 'Sonic Run Ultra',
    tagline: 'Trail. Road. No limits.',
    description: 'Versatile trail running shoes with StormFlex waterproofing and aggressive rubber outsole.',
    longDescription: 'Sonic Run Ultra is built for runners who refuse to be stopped by terrain or weather. The StormFlex waterproof membrane keeps your feet dry through stream crossings and wet trails, while the 4mm lugged rubber outsole provides confident grip on mud, rock, and loose terrain. A TPU rock plate shields your soles from sharp objects on technical trails.',
    category: 'running',
    categoryLabel: 'Running',
    emoji: '👟',
    images: ['👟', '👟', '👟', '👟'],
    price: 399,
    oldPrice: null,
    rating: 4.7,
    reviewCount: 201,
    badge: null,
    variants: [
      { color: 'Ember Orange', colorHex: '#ff4500', stock: 22 },
      { color: 'Stealth Black', colorHex: '#000000', stock: 18 },
      { color: 'Arctic White', colorHex: '#f5f5f5', stock: 10 },
    ],
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45', '46'],
    tags: ['shoes', 'running', 'trail', 'waterproof', 'outdoor', 'mountain'],
    features: [
      'StormFlex waterproof membrane',
      '4mm lugged aggressive outsole',
      'TPU rock plate protection',
      'Reinforced toe cap',
      'Quick-drain drainage ports',
      '6mm heel-to-toe drop',
    ],
    specs: {
      'Weight': '298g (size 42)',
      'Drop': '6mm',
      'Waterproofing': 'StormFlex membrane',
      'Outsole': '4mm lugged rubber',
      'Protection': 'TPU rock plate',
    },
    inStock: true,
    featured: false,
    reviews: [
      { id: 'r19', author: 'Tarik M.', rating: 5, date: '2025-03-25', comment: 'Wore these on the Atlas Mountain Trail. Incredible grip and the waterproofing held all day.', verified: true },
    ],
  },
  {
    id: 'p012',
    slug: 'pro-speed-jump-rope',
    name: 'Pro Speed Rope',
    tagline: 'Spin faster. Burn harder.',
    description: 'Adjustable speed jump rope with ball-bearing handles, steel cable, and digital counter.',
    longDescription: 'The Pro Speed Rope is built for double-unders, speed training, and high-intensity cardio work. Dual precision ball-bearing handles spin completely independently, eliminating friction and enabling faster rotations. The 3mm steel cable is adjustable to any length, and the digital counter on the handle tracks reps and calories in real time.',
    category: 'fitness',
    categoryLabel: 'Fitness',
    emoji: '🪢',
    images: ['🪢', '🪢', '🪢', '🪢'],
    price: 89,
    oldPrice: 119,
    rating: 4.6,
    reviewCount: 478,
    badge: 'sale',
    variants: [
      { color: 'Blue Speed', colorHex: '#0066ff', stock: 80 },
      { color: 'Inferno Red', colorHex: '#ff4500', stock: 60 },
    ],
    sizes: ['Adjustable'],
    tags: ['jumprope', 'cardio', 'training', 'speed', 'crossfit', 'boxing'],
    features: [
      'Dual precision ball-bearing handles',
      '3mm adjustable steel cable',
      'Digital rep + calorie counter',
      'Anti-slip foam grip',
      'Cable length: adjustable 2.4–3.6m',
      'Carry bag included',
    ],
    specs: {
      'Cable': '3mm steel with PVC coating',
      'Bearings': 'Dual precision ball-bearings',
      'Counter': 'Digital (reps + calories)',
      'Adjustable Length': '2.4m – 3.6m',
      'Handle Material': 'Aircraft aluminum + foam grip',
    },
    inStock: true,
    featured: true,
    reviews: [
      { id: 'r20', author: 'Yassine K.', rating: 5, date: '2025-04-02', comment: 'Best jump rope for double-unders. The bearings are so smooth.', verified: true },
      { id: 'r21', author: 'Nisrine A.', rating: 4, date: '2025-03-15', comment: 'Great quality at a great price. The digital counter is a nice bonus.', verified: true },
    ],
  },
];

export const CATEGORIES = [
  { key: 'all',          label: 'All Products',  emoji: '🏆', count: PRODUCTS.length },
  { key: 'football',    label: 'Football',       emoji: '⚽', count: PRODUCTS.filter(p => p.category === 'football').length },
  { key: 'running',     label: 'Running',        emoji: '👟', count: PRODUCTS.filter(p => p.category === 'running').length },
  { key: 'fitness',     label: 'Fitness',        emoji: '🏋️', count: PRODUCTS.filter(p => p.category === 'fitness').length },
  { key: 'recovery',    label: 'Recovery',       emoji: '🧘', count: PRODUCTS.filter(p => p.category === 'recovery').length },
  { key: 'accessories', label: 'Accessories',    emoji: '🎒', count: PRODUCTS.filter(p => p.category === 'accessories').length },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter(p => p.featured);
export const NEW_ARRIVALS = PRODUCTS.filter(p => p.badge === 'new');
export const SALE_PRODUCTS = PRODUCTS.filter(p => p.badge === 'sale');

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.categoryLabel.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.description.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q)
  );
}
