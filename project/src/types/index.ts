export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  price: number;
  averageRating: number;
  type: string;
}

export interface JourneyStage {
  stageName: 'awareness' | 'consideration' | 'purchase' | 'post-purchase' | 'support';
  completed: boolean;
  data: Record<string, any>;
}

export interface Journey {
  id: string;
  userId: string;
  productId: string;
  createdAt: string;
  stages: JourneyStage[];
  overallSatisfaction: number;
  review?: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export type StageData = Record<string, ChartData[]>;