// Template page definitions for the 11 templates
// Each template has 5 pages: Home, About, Services/Products, Contact, Detail

export type PageType = 'home' | 'about' | 'services' | 'contact' | 'detail';

export interface TemplatePage {
  id: PageType;
  name: string;
  icon: string;
}

export const templatePages: TemplatePage[] = [
  { id: 'home', name: 'Home', icon: 'home' },
  { id: 'about', name: 'About', icon: 'info' },
  { id: 'services', name: 'Services', icon: 'work' },
  { id: 'contact', name: 'Contact', icon: 'mail' },
  { id: 'detail', name: 'Detail', icon: 'article' },
];

// Template-specific page name overrides
export const templatePageNames: Record<string, Partial<Record<PageType, string>>> = {
  saas: {
    services: 'Features',
    detail: 'Pricing',
  },
  portfolio: {
    services: 'Work',
    detail: 'Project',
  },
  ecommerce: {
    services: 'Products',
    detail: 'Product',
  },
  agency: {
    services: 'Work',
    detail: 'Case Study',
  },
  blog: {
    services: 'Articles',
    detail: 'Article',
  },
  restaurant: {
    services: 'Menu',
    detail: 'Reservation',
  },
  event: {
    services: 'Schedule',
    detail: 'Speaker',
  },
  education: {
    services: 'Courses',
    detail: 'Course',
  },
  personal: {
    services: 'Portfolio',
    detail: 'Project',
  },
  nonprofit: {
    services: 'Programs',
    detail: 'Donate',
  },
  realestate: {
    services: 'Listings',
    detail: 'Property',
  },
};

export function getPageName(templateId: string | null | undefined, pageType: PageType): string {
  const basePage = templatePages.find(p => p.id === pageType);
  if (!basePage) return pageType;
  
  if (!templateId) return basePage.name;
  
  const overrides = templatePageNames[templateId];
  if (overrides && overrides[pageType]) {
    return overrides[pageType]!;
  }
  
  return basePage.name;
}

export function getTemplatePages(templateId: string | null | undefined): TemplatePage[] {
  return templatePages.map(page => ({
    ...page,
    name: getPageName(templateId, page.id),
  }));
}
