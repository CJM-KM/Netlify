import { Product, Journey, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'AirPods Pro',
    brand: 'Apple',
    imageUrl: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 249,
    averageRating: 4.7,
    type: 'In-ear',
  },
  {
    id: '2',
    name: 'WH-1000XM4',
    brand: 'Sony',
    imageUrl: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 348,
    averageRating: 4.8,
    type: 'Over-ear',
  },
  {
    id: '3',
    name: 'QuietComfort 45',
    brand: 'Bose',
    imageUrl: 'https://images.pexels.com/photos/3394660/pexels-photo-3394660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 329,
    averageRating: 4.6,
    type: 'Over-ear',
  },
  {
    id: '4',
    name: 'Momentum True Wireless 3',
    brand: 'Sennheiser',
    imageUrl: 'https://images.pexels.com/photos/6033978/pexels-photo-6033978.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    price: 249.95,
    averageRating: 4.4,
    type: 'In-ear',
  },
];

export const mockJourneys: Journey[] = [
  {
    id: '1',
    userId: '1',
    productId: '1',
    createdAt: '2023-01-15T12:00:00Z',
    stages: [
      {
        stageName: 'awareness',
        completed: true,
        data: {
          source: 'Social Media',
          initialImpression: 'Positive',
          awarenessRating: 4,
        },
      },
      {
        stageName: 'consideration',
        completed: true,
        data: {
          alternativesConsidered: ['Sony WF-1000XM4', 'Bose QuietComfort Earbuds'],
          researchMethods: ['YouTube Reviews', 'Tech Blogs'],
          keyFeatures: ['Noise Cancellation', 'Comfort', 'Sound Quality'],
        },
      },
      {
        stageName: 'purchase',
        completed: true,
        data: {
          purchaseLocation: 'Apple Store',
          decisionFactor: 'Brand Reputation',
          price: 249,
        },
      },
      {
        stageName: 'post-purchase',
        completed: true,
        data: {
          usageFrequency: 'Daily',
          satisfaction: 4.5,
          wouldRecommend: true,
        },
      },
      {
        stageName: 'support',
        completed: false,
        data: {},
      },
    ],
    overallSatisfaction: 4.5,
    review: 'Excellent noise cancellation and seamless integration with my iPhone.',
  },
  {
    id: '2',
    userId: '2',
    productId: '2',
    createdAt: '2023-02-10T15:30:00Z',
    stages: [
      {
        stageName: 'awareness',
        completed: true,
        data: {
          source: 'Tech Review Website',
          initialImpression: 'Very Positive',
          awarenessRating: 5,
        },
      },
      {
        stageName: 'consideration',
        completed: true,
        data: {
          alternativesConsidered: ['Bose QuietComfort 45', 'Apple AirPods Max'],
          researchMethods: ['Reddit', 'In-store Demo'],
          keyFeatures: ['Battery Life', 'Noise Cancellation', 'Sound Quality'],
        },
      },
      {
        stageName: 'purchase',
        completed: true,
        data: {
          purchaseLocation: 'Amazon',
          decisionFactor: 'Superior Features',
          price: 348,
        },
      },
      {
        stageName: 'post-purchase',
        completed: true,
        data: {
          usageFrequency: 'Daily',
          satisfaction: 4.8,
          wouldRecommend: true,
        },
      },
      {
        stageName: 'support',
        completed: true,
        data: {
          contactReason: 'Technical Issue',
          responseTime: 'Within 24 hours',
          resolved: true,
          supportSatisfaction: 4.0,
        },
      },
    ],
    overallSatisfaction: 4.7,
    review: 'Best noise cancellation on the market. Battery life is incredible.',
  },
];

export const getJourneyStageData = (productId: string): Record<string, number> => {
  const productJourneys = mockJourneys.filter(journey => journey.productId === productId);
  
  const result = {
    awareness: 0,
    consideration: 0,
    purchase: 0,
    postPurchase: 0,
    support: 0,
  };
  
  productJourneys.forEach(journey => {
    journey.stages.forEach(stage => {
      if (stage.completed) {
        if (stage.stageName === 'awareness') result.awareness++;
        if (stage.stageName === 'consideration') result.consideration++;
        if (stage.stageName === 'purchase') result.purchase++;
        if (stage.stageName === 'post-purchase') result.postPurchase++;
        if (stage.stageName === 'support') result.support++;
      }
    });
  });
  
  return result;
};

// Mock data for charts
export const getSatisfactionByBrand = (): ChartData[] => [
  { name: 'Apple', value: 4.7, fill: '#FF6B6B' },
  { name: 'Sony', value: 4.8, fill: '#4ECDC4' },
  { name: 'Bose', value: 4.6, fill: '#1A535C' },
  { name: 'Sennheiser', value: 4.4, fill: '#FFE66D' },
];

export const getAwarenessSourceData = (): ChartData[] => [
  { name: 'Social Media', value: 45, fill: '#FF6B6B' },
  { name: 'Friends/Family', value: 25, fill: '#4ECDC4' },
  { name: 'Tech Reviews', value: 20, fill: '#1A535C' },
  { name: 'In-store', value: 10, fill: '#FFE66D' },
];

export const getDecisionFactorData = (): ChartData[] => [
  { name: 'Sound Quality', value: 35, fill: '#FF6B6B' },
  { name: 'Noise Cancellation', value: 30, fill: '#4ECDC4' },
  { name: 'Brand Reputation', value: 15, fill: '#1A535C' },
  { name: 'Battery Life', value: 12, fill: '#FFE66D' },
  { name: 'Comfort', value: 8, fill: '#6B705C' },
];