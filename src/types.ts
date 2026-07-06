export type Language = 'en' | 'it' | 'ar' | 'bn';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface FeatureBenefit {
  title: string;
  description: string;
  iconName: string;
}

export interface ReviewItem {
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarSeed: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
