export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  type: 'House' | 'Apartment' | 'Villa' | 'Penthouse';
  status: 'For Sale' | 'For Rent';
  imageUrl: string;
  description: string;
  features: string[];
  yearBuilt: number;
  coordinates: { lat: number; lng: number };
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  rating: number;
  listingsCount: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  description: string;
  image: string;
  walkScore: number;
  safetyScore: number;
  priceGrowth: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}