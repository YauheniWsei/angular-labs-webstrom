export interface Restaurant {
  id: number;
  name: string;
  description: string;
  cuisine: string;
  imageUrl: string;
  rating: number;
  deliveryTimeMin: number;
  deliveryTimeMax: number;
  deliveryFee: number;
  minimumOrderValue: number;
  isActive: boolean;
}

export const CUISINE_LABELS: Record<string, string> = {
  polish: 'Polska',
  italian: 'Włoska',
  american: 'Amerykańska',
  thai: 'Tajska',
  chinese: 'Chińska',
};

export type SortOption = 'rating' | 'deliveryTime' | 'deliveryFee';
