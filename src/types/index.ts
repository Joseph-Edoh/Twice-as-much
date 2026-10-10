export type Category = 
  | 'All'
  | 'Agbada'
  | 'Senator Wear'
  | 'Sneakers'
  | 'Dresses'
  | 'Shoes'
  | 'Wristwatches'
  | 'Eyewear'
  | 'Polos'
  | 'Accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  description: string;
  imageUrl: string;
  secondaryImageUrl?: string;
  colors: ProductColor[];
  sizes: string[];
  inStock: boolean;
  stockCount: number;
  isCustomizable: boolean; // "Make For Me" bespoke available
  tailoringDays?: number;
  rating?: number;
  details?: string[];
}

export type MeasurementKey = 
  | 'shoulderWidth'
  | 'bustChest'
  | 'armLength'
  | 'waist'
  | 'hips'
  | 'garmentLength'
  | 'inseam'
  | 'totalHeight';

export interface BodyMeasurements {
  shoulderWidth: number | string;
  bustChest: number | string;
  armLength: number | string;
  waist: number | string;
  hips: number | string;
  garmentLength: number | string;
  inseam: number | string;
  totalHeight: number | string;
  fitPreference: 'Fitted' | 'Tailored Classic' | 'Relaxed';
  unit: 'in' | 'cm';
}

export interface FabricOption {
  id: string;
  name: string;
  composition: string;
  weightGsm: number;
  momme?: number;
  character: string;
  drape: string;
  priceModifier: number; // additional cost for premium fabric
  swatchHex: string;
  texturePattern: string;
  bestFor: string;
}

export interface CustomBespokeOrder {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  shippingAddress: string;
  notes?: string;
  productReference: {
    id: string;
    name: string;
    basePrice: number;
    imageUrl: string;
  };
  fabric: {
    id: string;
    name: string;
    color: string;
    colorHex: string;
    priceModifier: number;
  };
  measurements: BodyMeasurements;
  totalPrice: number;
  status: 'Pending Review' | 'Pattern Drafting' | 'Fabric Cutting' | 'Hand Tailoring' | 'Fitting Ready' | 'Dispatched';
  targetFittingDate?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  color: ProductColor;
  size: string;
  quantity: number;
  isCustomOrder?: boolean;
  customOrderId?: string;
}

export type ActiveView = 'home' | 'catalog' | 'make-for-me' | 'accessories' | 'admin';
