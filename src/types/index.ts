// Lawyer Info Type
export interface LawyerInfo {
  id: string;
  name: string;
  bio: string;
  education?: string[];
  experience?: string[];
  specializations?: string[];
  updatedAt: Date;
  editorStateJSON?: string | null;
}

// Article Type
export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  imageUrl?: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  editorStateJSON?: string | null;
}

// Article Form Data (for creating/editing)
export interface ArticleFormData {
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  imageUrl?: string | null;
  published: boolean;
  editorStateJSON?: string | null;
}

// Announcement Type
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Announcement Form Data (for creating/editing)
export interface AnnouncementFormData {
  title: string;
  content: string;
  published: boolean;
}

// Contact Message Type
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Contact Form Data (for creating)
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Contact Info Type (for managing site contact information)
export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  addressShort: string; // Kısa adres (mobilde gösterilecek)
  googleMapsIframe: string;
  latitude: string;
  longitude: string;
  updatedAt: Date;
}

// Contact Info Form Data (for creating/editing)
export interface ContactInfoFormData {
  phone: string;
  email: string;
  address: string;
  addressShort: string;
  googleMapsIframe: string;
  latitude: string;
  longitude: string;
}
