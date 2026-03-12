import { Property, Agent, Neighborhood, Testimonial } from '../types';

export const properties: Property[] = [
  {
    id: '1',
    title: 'Azure Waters Modern Villa',
    price: 4250000,
    location: 'Laguna Beach, CA',
    beds: 5,
    baths: 4.5,
    sqft: 4800,
    type: 'Villa',
    status: 'For Sale',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/luxury-villa-1-df902063-1773299727541.webp',
    description: 'A masterpiece of modern architecture with sweeping ocean views and state-of-the-art amenities.',
    features: ['Infinity Pool', 'Home Theater', 'Smart Home System', 'Wine Cellar'],
    yearBuilt: 2023,
    coordinates: { lat: 33.5427, lng: -117.7854 }
  },
  {
    id: '2',
    title: 'Skyline Urban Penthouse',
    price: 2100000,
    location: 'Downtown Seattle, WA',
    beds: 3,
    baths: 3,
    sqft: 2200,
    type: 'Penthouse',
    status: 'For Sale',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/penthouse-interior-1-e536286c-1773299727521.webp',
    description: 'Luxurious urban living with floor-to-ceiling windows and panoramic city views.',
    features: ['Private Terrace', 'Professional Kitchen', 'Concierge Service', 'Fitness Center'],
    yearBuilt: 2021,
    coordinates: { lat: 47.6062, lng: -122.3321 }
  },
  {
    id: '3',
    title: 'Garden Retreat Family Home',
    price: 850000,
    location: 'Austin, TX',
    beds: 4,
    baths: 3,
    sqft: 3100,
    type: 'House',
    status: 'For Sale',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/suburban-house-1-b3c38093-1773299732069.webp',
    description: 'Perfect family home with a spacious backyard and modern interior finishes.',
    features: ['Large Backyard', 'Gourmet Kitchen', 'Solar Panels', 'Hardwood Floors'],
    yearBuilt: 2019,
    coordinates: { lat: 30.2672, lng: -97.7431 }
  },
  {
    id: '4',
    title: 'The Glass Residence',
    price: 3400000,
    location: 'Miami, FL',
    beds: 4,
    baths: 4.5,
    sqft: 4000,
    type: 'Apartment',
    status: 'For Sale',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/modern-apartment-1-9468d941-1773299732386.webp',
    description: 'A stunning display of contemporary glass architecture in the heart of the city.',
    features: ['Ocean Front', 'Outdoor Kitchen', 'Private Elevator', 'Spa'],
    yearBuilt: 2022,
    coordinates: { lat: 25.7617, lng: -80.1918 }
  }
];

export const agents: Agent[] = [
  {
    id: 'a1',
    name: 'Sarah Mitchell',
    role: 'Senior Associate',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/agent-2-2db99b49-1773299727431.webp',
    phone: '(555) 123-4567',
    email: 'sarah.m@estateluxe.com',
    rating: 4.9,
    listingsCount: 42
  },
  {
    id: 'a2',
    name: 'David Chen',
    role: 'Luxury Specialist',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/agent-1-5ae59643-1773299727074.webp',
    phone: '(555) 987-6543',
    email: 'david.c@estateluxe.com',
    rating: 5.0,
    listingsCount: 28
  }
];

export const neighborhoods: Neighborhood[] = [
  {
    id: 'n1',
    name: 'Coastal Heights',
    description: 'A vibrant community known for its scenic views and upscale lifestyle.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/neighborhood-1-b781cfad-1773299726568.webp',
    walkScore: 85,
    safetyScore: 92,
    priceGrowth: 8.5
  },
  {
    id: 'n2',
    name: 'Silicon Valley South',
    description: 'The heart of innovation with top-rated schools and modern amenities.',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/d80cc09c-1209-4318-a6fa-88e761c0524c/modern-apartment-1-9468d941-1773299732386.webp',
    walkScore: 72,
    safetyScore: 95,
    priceGrowth: 12.4
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'James Wilson',
    role: 'Homeowner',
    content: 'The search process was seamless. We found our dream home in just two weeks!',
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    id: 't2',
    name: 'Elena Rodriguez',
    role: 'Real Estate Investor',
    content: 'The market trends data provided by EstateLuxe is second to none. Truly a game changer.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

export const marketTrendsData = [
  { month: 'Jan', price: 750000 },
  { month: 'Feb', price: 780000 },
  { month: 'Mar', price: 765000 },
  { month: 'Apr', price: 810000 },
  { month: 'May', price: 840000 },
  { month: 'Jun', price: 890000 },
];