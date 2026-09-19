export type CarCategory = 'MPV' | 'CITY_CAR' | 'LCGC' | 'SUV';
export const CATEGORY_LABEL: Record<CarCategory, string> = {
  MPV: 'MPV',
  CITY_CAR: 'City Car',
  LCGC: 'LCGC',
  SUV: 'SUV',
};
export const CATEGORY_OPTIONS: { value: CarCategory; label: string }[] = [
  { value: 'MPV', label: 'MPV' },
  { value: 'CITY_CAR', label: 'City Car' },
  { value: 'LCGC', label: 'LCGC' },
  { value: 'SUV', label: 'SUV' },
];

export interface PurchasedCar {
  id: number;
  brand: string;
  model: string;
  yearMin: number;
  yearMax: number;
  imageUrl: string;
  priceMin: number;
  priceMax: number;
  category: CarCategory;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export function formatYearRange(min: number, max: number) {
  return min === max ? `${min}` : `${min} - ${max}`;
}

export function formatPrice(n: number) {
  if (n >= 1) return `${Math.round(n / 1)}jt`;
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 1 }).format(n);
}

export function formatPriceRange(min: number, max: number) {
  return `${formatPrice(min)} - ${formatPrice(max)}`;
}
