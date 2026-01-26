import { Layout, Briefcase, ShoppingCart, Building2, FileText, Utensils, Calendar, GraduationCap, User, Heart, Home } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Template {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const templates: Template[] = [
  {
    id: 'saas',
    name: 'SaaS / Software',
    description: 'Product-focused, feature-driven',
    icon: Layout,
  },
  {
    id: 'portfolio',
    name: 'Portfolio (Creative)',
    description: 'Work showcase, visual-heavy',
    icon: Briefcase,
  },
  {
    id: 'ecommerce',
    name: 'E-commerce / Product',
    description: 'Shopping-focused, conversion-driven',
    icon: ShoppingCart,
  },
  {
    id: 'agency',
    name: 'Agency / Studio',
    description: 'Service showcase, case study driven',
    icon: Building2,
  },
  {
    id: 'blog',
    name: 'Blog / Publication',
    description: 'Content-first, reading-optimized',
    icon: FileText,
  },
  {
    id: 'restaurant',
    name: 'Restaurant / Local Business',
    description: 'Location + menu focused',
    icon: Utensils,
  },
  {
    id: 'event',
    name: 'Event / Conference',
    description: 'Schedule + speaker focused',
    icon: Calendar,
  },
  {
    id: 'education',
    name: 'Course / Education',
    description: 'Curriculum + enrollment focused',
    icon: GraduationCap,
  },
  {
    id: 'personal',
    name: 'Personal Brand / Creator',
    description: 'Individual-focused, multi-purpose',
    icon: User,
  },
  {
    id: 'nonprofit',
    name: 'Non-profit / Cause',
    description: 'Mission + donation focused',
    icon: Heart,
  },
  {
    id: 'realestate',
    name: 'Real Estate / Listings',
    description: 'Property showcase, search-driven',
    icon: Home,
  },
];
