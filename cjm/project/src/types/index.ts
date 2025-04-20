// Product types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  imageUrl: string;
  description: string;
  features: string[];
  category: 'wireless' | 'wired' | 'true-wireless' | 'noise-cancelling';
}

// Journey stage types
export type JourneyStage = 'awareness' | 'consideration' | 'purchase' | 'post-purchase' | 'support';

export interface JourneyPoint {
  id: string;
  userId: string;
  productId: string;
  stage: JourneyStage;
  rating: number;
  feedback: string;
  emotion: 'positive' | 'neutral' | 'negative';
  touchpoint: string;
  date: string;
}

export interface Journey {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  productName: string;
  stages: JourneyPoint[];
  completedAt: string | null;
  createdAt: string;
}

// User feedback types
export interface Feedback {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  stage: JourneyStage;
  createdAt: string;
}

// Analysis types
export interface StageAnalysis {
  stage: JourneyStage;
  averageRating: number;
  count: number;
  positivePercentage: number;
  negativePercentage: number;
  neutralPercentage: number;
  commonTouchpoints: { name: string; count: number }[];
}

export interface ProductAnalysis {
  productId: string;
  totalJourneys: number;
  averageRating: number;
  stageAnalysis: Record<JourneyStage, StageAnalysis>;
}