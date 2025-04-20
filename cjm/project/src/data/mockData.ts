import { Product, Journey, JourneyPoint, ProductAnalysis } from '../types';

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    name: 'SoundWave Pro',
    brand: 'AudioMax',
    price: 199.99,
    rating: 4.7,
    imageUrl: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Premium wireless earbuds with active noise cancellation and 30-hour battery life.',
    features: ['Active Noise Cancellation', 'Waterproof IPX7', '30-hour Battery Life', 'Touch Controls'],
    category: 'true-wireless',
  },
  {
    id: '2',
    name: 'BassMaster X1',
    brand: 'DeepSound',
    price: 149.99,
    rating: 4.5,
    imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Deep bass wireless earphones with extraordinary sound quality for bass lovers.',
    features: ['Enhanced Bass', 'Bluetooth 5.2', '24-hour Battery Life', 'Voice Assistant'],
    category: 'wireless',
  },
  {
    id: '3',
    name: 'ClearTalk Elite',
    brand: 'VoiceTech',
    price: 129.99,
    rating: 4.3,
    imageUrl: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Crystal clear call quality with ambient noise reduction technology.',
    features: ['Ambient Noise Reduction', '4-Mic System', '18-hour Battery Life', 'Auto Pairing'],
    category: 'true-wireless',
  },
  {
    id: '4',
    name: 'SportsFit Pro',
    brand: 'ActiveAudio',
    price: 99.99,
    rating: 4.2,
    imageUrl: 'https://images.pexels.com/photos/1591/technology-music-sound-things.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Secure-fit earbuds designed for athletes and active lifestyles.',
    features: ['Secure Ear Hooks', 'Sweat Resistant', '12-hour Battery Life', 'Quick Charge'],
    category: 'wireless',
  },
  {
    id: '5',
    name: 'SilentZone NC700',
    brand: 'NoiseGuard',
    price: 249.99,
    rating: 4.8,
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Ultimate noise cancellation with premium audio quality for immersive sound experience.',
    features: ['Adaptive Noise Cancellation', 'Ambient Mode', '36-hour Battery Life', 'Multi-Device Connection'],
    category: 'noise-cancelling',
  },
];

// Mock Journey Points
const createJourneyPoints = (userId: string, productId: string): JourneyPoint[] => {
  return [
    {
      id: `${productId}-awareness-${userId}`,
      userId,
      productId,
      stage: 'awareness',
      rating: 4,
      feedback: 'Discovered through an Instagram ad. The visuals were appealing.',
      emotion: 'positive',
      touchpoint: 'Social Media',
      date: new Date(Date.now() - 3600000 * 24 * 30).toISOString(),
    },
    {
      id: `${productId}-consideration-${userId}`,
      userId,
      productId,
      stage: 'consideration',
      rating: 3,
      feedback: 'Compared with 3 other brands. Website was informative but could use more comparison tools.',
      emotion: 'neutral',
      touchpoint: 'Product Website',
      date: new Date(Date.now() - 3600000 * 24 * 20).toISOString(),
    },
    {
      id: `${productId}-purchase-${userId}`,
      userId,
      productId,
      stage: 'purchase',
      rating: 5,
      feedback: 'Easy checkout process and fast delivery.',
      emotion: 'positive',
      touchpoint: 'Online Store',
      date: new Date(Date.now() - 3600000 * 24 * 15).toISOString(),
    },
    {
      id: `${productId}-post-purchase-${userId}`,
      userId,
      productId,
      stage: 'post-purchase',
      rating: 4,
      feedback: 'Good sound quality, battery life as advertised, but took time to get used to the controls.',
      emotion: 'positive',
      touchpoint: 'Product Usage',
      date: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    },
  ];
};

// Mock Journeys
export const journeys: Journey[] = [
  {
    id: 'j1',
    userId: 'u1',
    userName: 'Sarah Johnson',
    productId: '1',
    productName: 'SoundWave Pro',
    stages: createJourneyPoints('u1', '1'),
    completedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 30).toISOString(),
  },
  {
    id: 'j2',
    userId: 'u2',
    userName: 'Michael Chen',
    productId: '2',
    productName: 'BassMaster X1',
    stages: createJourneyPoints('u2', '2'),
    completedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 25).toISOString(),
  },
  {
    id: 'j3',
    userId: 'u3',
    userName: 'Emily Rodriguez',
    productId: '3',
    productName: 'ClearTalk Elite',
    stages: createJourneyPoints('u3', '3'),
    completedAt: null,
    createdAt: new Date(Date.now() - 3600000 * 24 * 20).toISOString(),
  },
  {
    id: 'j4',
    userId: 'u4',
    userName: 'David Kim',
    productId: '1',
    productName: 'SoundWave Pro',
    stages: createJourneyPoints('u4', '1'),
    completedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 18).toISOString(),
  },
  {
    id: 'j5',
    userId: 'u5',
    userName: 'Jessica Taylor',
    productId: '5',
    productName: 'SilentZone NC700',
    stages: createJourneyPoints('u5', '5'),
    completedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    createdAt: new Date(Date.now() - 3600000 * 24 * 15).toISOString(),
  },
];

// Mock Product Analysis
export const productAnalyses: Record<string, ProductAnalysis> = {
  '1': {
    productId: '1',
    totalJourneys: 25,
    averageRating: 4.5,
    stageAnalysis: {
      'awareness': {
        stage: 'awareness',
        averageRating: 4.2,
        count: 25,
        positivePercentage: 80,
        negativePercentage: 5,
        neutralPercentage: 15,
        commonTouchpoints: [
          { name: 'Social Media', count: 12 },
          { name: 'YouTube Review', count: 8 },
          { name: 'Friend Recommendation', count: 5 }
        ]
      },
      'consideration': {
        stage: 'consideration',
        averageRating: 4.0,
        count: 22,
        positivePercentage: 75,
        negativePercentage: 10,
        neutralPercentage: 15,
        commonTouchpoints: [
          { name: 'Product Website', count: 15 },
          { name: 'Tech Reviews', count: 12 },
          { name: 'Store Demo', count: 5 }
        ]
      },
      'purchase': {
        stage: 'purchase',
        averageRating: 4.7,
        count: 20,
        positivePercentage: 90,
        negativePercentage: 5,
        neutralPercentage: 5,
        commonTouchpoints: [
          { name: 'Online Store', count: 14 },
          { name: 'Retail Store', count: 6 }
        ]
      },
      'post-purchase': {
        stage: 'post-purchase',
        averageRating: 4.5,
        count: 18,
        positivePercentage: 85,
        negativePercentage: 8,
        neutralPercentage: 7,
        commonTouchpoints: [
          { name: 'Product Usage', count: 18 },
          { name: 'Mobile App', count: 10 }
        ]
      },
      'support': {
        stage: 'support',
        averageRating: 4.0,
        count: 10,
        positivePercentage: 70,
        negativePercentage: 20,
        neutralPercentage: 10,
        commonTouchpoints: [
          { name: 'Email Support', count: 6 },
          { name: 'Chat Support', count: 4 }
        ]
      }
    }
  }
};