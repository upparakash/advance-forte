export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Foundation' | 'Intermediate' | 'Advanced';
  category: 'Medical' | 'Engineering' | 'Foundation' | 'Olympiad';
  image: string;
  features: string[];
  examTarget?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  message: string;
  image: string;
  achievement?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialization?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export interface Exam {
  id: string;
  name: string;
  fullName: string;
  description: string;
  image: string;
  features: string[];
  eligibility: string;
  importantDates?: string[];
}

export interface Centre {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  image: string;
  facilities: string[];
}