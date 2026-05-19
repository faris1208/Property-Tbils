export type UserRole = 'buyer' | 'agent' | 'developer' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: UserRole;
  isVerified: boolean;
  isBanned: boolean;
  createdAt: string;
}

export type PropertyType = 'apartment' | 'house' | 'land' | 'commercial' | 'shortlet';
export type PropertyStatus = 'rent' | 'sale';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface PropertyImage {
  id: string;
  url: string;
  isPrimary: boolean;
  displayOrder: number;
}

export interface PropertyAmenity {
  id: string;
  amenity: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: PropertyType;
  price: number;
  currency: string;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  address: string;
  city: string;
  latitude?: number;
  longitude?: number;
  isFeatured: boolean;
  approvalStatus: ApprovalStatus;
  rejectionReason?: string;
  agentId: string;
  agent: User;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
  createdAt: string;
}

export interface Agent {
  id: string;
  userId: string;
  user: User;
  agencyName?: string;
  bio?: string;
  whatsapp?: string;
  phone?: string;
  isVerified: boolean;
  tier: 'free' | 'pro' | 'premium';
}

export interface Lead {
  id: string;
  propertyId: string;
  property: Property;
  agentId: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  type: 'inquiry' | 'inspection';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author: User;
  publishedAt: string;
  createdAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: PaginationMeta;
}

export interface PropertyFilters {
  city?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  keyword?: string;
  sort?: 'newest' | 'price_asc' | 'price_desc';
  page?: number;
  limit?: number;
}
