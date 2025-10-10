// Lawyer Info Type
export interface LawyerInfo {
  id: string;
  name: string;
  bio: string;
  education?: string[];
  experience?: string[];
  specializations?: string[];
  updatedAt: Date;
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
}
