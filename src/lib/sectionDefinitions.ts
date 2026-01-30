// Section definitions for each template type
import { PageConfig, SectionConfig, NavigationConfig } from '@/types/studio';

// Default navigation config
export const defaultNavigation: NavigationConfig = {
  layout: 'logo-left',
  position: 'sticky',
  background: 'solid',
  mobile: 'hamburger',
};

// SaaS Template Sections
const saasHomeSections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'left-image', name: 'Left + Image', icon: 'view_sidebar' },
      { id: 'right-image', name: 'Right + Image', icon: 'flip' },
      { id: 'minimal', name: 'Minimal', icon: 'minimize' },
    ],
    toggles: [
      { id: 'cta', label: 'Show CTA button', enabled: true },
      { id: 'image', label: 'Show hero image', enabled: true },
      { id: 'badge', label: 'Show announcement badge', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [
      { source: 'shadcn/ui', name: 'Hero sections', url: 'https://ui.shadcn.com/blocks#hero' },
      { source: 'Tailwind UI', name: 'Hero sections', url: 'https://tailwindui.com/components/marketing/sections/heroes' },
    ],
  },
  {
    id: 'features',
    name: 'Features Grid',
    layout: '3-column',
    layouts: [
      { id: '3-column', name: '3 Column', icon: 'grid_view' },
      { id: '2-column', name: '2 Column', icon: 'view_module' },
      { id: 'alternating', name: 'Alternating', icon: 'view_day' },
      { id: 'bento', name: 'Bento Grid', icon: 'dashboard' },
    ],
    toggles: [
      { id: 'icons', label: 'Show feature icons', enabled: true },
      { id: 'descriptions', label: 'Show descriptions', enabled: true },
    ],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [
      { source: 'shadcn/ui', name: 'Feature sections', url: 'https://ui.shadcn.com/blocks#features' },
    ],
  },
  {
    id: 'social-proof',
    name: 'Social Proof',
    layout: 'logo-bar',
    layouts: [
      { id: 'logo-bar', name: 'Logo Bar', icon: 'view_column' },
      { id: 'testimonials', name: 'Testimonials', icon: 'format_quote' },
      { id: 'stats', name: 'Stats', icon: 'bar_chart' },
    ],
    toggles: [
      { id: 'logos', label: 'Show company logos', enabled: true },
      { id: 'quotes', label: 'Show testimonial quotes', enabled: false },
      { id: 'numbers', label: 'Show key numbers', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [
      { source: 'Aceternity', name: 'Infinite Moving Cards', url: 'https://ui.aceternity.com/components/infinite-moving-cards' },
    ],
  },
  {
    id: 'pricing-teaser',
    name: 'Pricing Teaser',
    layout: '3-tier',
    layouts: [
      { id: '3-tier', name: '3 Tier', icon: 'view_column' },
      { id: '2-tier', name: '2 Tier', icon: 'view_module' },
      { id: 'highlight', name: 'Single Highlight', icon: 'star' },
    ],
    toggles: [
      { id: 'toggle', label: 'Monthly/Annual toggle', enabled: true },
      { id: 'features', label: 'Show feature list', enabled: true },
    ],
    animation: 'slide',
    configured: false,
    recommendedComponents: [
      { source: 'shadcn/ui', name: 'Pricing sections', url: 'https://ui.shadcn.com/blocks#pricing' },
    ],
  },
  {
    id: 'final-cta',
    name: 'Final CTA',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'split', name: 'Split', icon: 'view_sidebar' },
      { id: 'full-width', name: 'Full Width', icon: 'crop_16_9' },
    ],
    toggles: [
      { id: 'secondary', label: 'Show secondary action', enabled: true },
      { id: 'image', label: 'Show image', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [
      { source: 'Tailwind UI', name: 'CTA sections', url: 'https://tailwindui.com/components/marketing/sections/cta-sections' },
    ],
  },
];

const saasFeaturesSections: SectionConfig[] = [
  {
    id: 'feature-deepdives',
    name: 'Feature Deep-dives',
    layout: 'alternating',
    layouts: [
      { id: 'alternating', name: 'Alternating', icon: 'view_day' },
      { id: 'cards', name: 'Cards', icon: 'grid_view' },
      { id: 'list', name: 'List', icon: 'list' },
    ],
    toggles: [
      { id: 'images', label: 'Show images', enabled: true },
      { id: 'videos', label: 'Show videos', enabled: false },
    ],
    animation: 'slide',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'comparison',
    name: 'Comparison Table',
    layout: 'full-table',
    layouts: [
      { id: 'full-table', name: 'Full Table', icon: 'table_chart' },
      { id: 'simplified', name: 'Simplified', icon: 'view_list' },
    ],
    toggles: [
      { id: 'competitors', label: 'Show competitor columns', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'use-cases',
    name: 'Use Cases',
    layout: 'cards',
    layouts: [
      { id: 'cards', name: 'Cards', icon: 'grid_view' },
      { id: 'tabs', name: 'Tabs', icon: 'tab' },
      { id: 'accordion', name: 'Accordion', icon: 'expand_more' },
    ],
    toggles: [
      { id: 'icons', label: 'Show icons', enabled: true },
      { id: 'ctas', label: 'Show CTAs', enabled: true },
    ],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [],
  },
];

const saasPricingSections: SectionConfig[] = [
  {
    id: 'pricing-tiers',
    name: 'Pricing Tiers',
    layout: '3-column',
    layouts: [
      { id: '3-column', name: '3 Column', icon: 'view_column' },
      { id: '2-column', name: '2 Column', icon: 'view_module' },
      { id: 'comparison', name: 'Comparison', icon: 'table_chart' },
    ],
    toggles: [
      { id: 'annual', label: 'Annual discount badge', enabled: true },
      { id: 'enterprise', label: 'Enterprise option', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'feature-matrix',
    name: 'Feature Matrix',
    layout: 'full',
    layouts: [
      { id: 'full', name: 'Full', icon: 'table_chart' },
      { id: 'simplified', name: 'Simplified', icon: 'view_list' },
    ],
    toggles: [
      { id: 'tooltips', label: 'Show tooltips', enabled: true },
    ],
    animation: 'none',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'faq',
    name: 'FAQ',
    layout: '2-column',
    layouts: [
      { id: '2-column', name: '2 Column', icon: 'view_module' },
      { id: 'single', name: 'Single Column', icon: 'view_list' },
      { id: 'accordion', name: 'Accordion', icon: 'expand_more' },
    ],
    toggles: [
      { id: 'categories', label: 'Show categories', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'pricing-cta',
    name: 'CTA',
    layout: 'simple',
    layouts: [
      { id: 'simple', name: 'Simple', icon: 'short_text' },
      { id: 'testimonial', name: 'With Testimonial', icon: 'format_quote' },
    ],
    toggles: [
      { id: 'trial', label: 'Trial option', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
];

const saasAboutSections: SectionConfig[] = [
  {
    id: 'hero-mission',
    name: 'Hero / Mission',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'with-image', name: 'With Image', icon: 'image' },
    ],
    toggles: [
      { id: 'video', label: 'Show video', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'team',
    name: 'Team',
    layout: 'grid',
    layouts: [
      { id: 'grid', name: 'Grid', icon: 'grid_view' },
      { id: 'list', name: 'List', icon: 'list' },
      { id: 'featured', name: 'Featured', icon: 'star' },
    ],
    toggles: [
      { id: 'social', label: 'Show social links', enabled: true },
      { id: 'bios', label: 'Show bios', enabled: true },
    ],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'values',
    name: 'Values',
    layout: 'icons',
    layouts: [
      { id: 'icons', name: 'Icons', icon: 'category' },
      { id: 'cards', name: 'Cards', icon: 'grid_view' },
      { id: 'list', name: 'List', icon: 'list' },
    ],
    toggles: [
      { id: 'descriptions', label: 'Show descriptions', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'timeline',
    name: 'Timeline',
    layout: 'vertical',
    layouts: [
      { id: 'vertical', name: 'Vertical', icon: 'timeline' },
      { id: 'horizontal', name: 'Horizontal', icon: 'view_timeline' },
    ],
    toggles: [
      { id: 'images', label: 'Show images', enabled: true },
    ],
    animation: 'slide',
    configured: false,
    recommendedComponents: [],
  },
];

const saasContactSections: SectionConfig[] = [
  {
    id: 'contact-form',
    name: 'Contact Form',
    layout: 'simple',
    layouts: [
      { id: 'simple', name: 'Simple', icon: 'short_text' },
      { id: 'sidebar', name: 'With Info Sidebar', icon: 'view_sidebar' },
    ],
    toggles: [
      { id: 'phone', label: 'Show phone field', enabled: true },
      { id: 'map', label: 'Show map', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'office-locations',
    name: 'Office Locations',
    layout: 'cards',
    layouts: [
      { id: 'cards', name: 'Cards', icon: 'grid_view' },
      { id: 'map', name: 'Map', icon: 'map' },
    ],
    toggles: [
      { id: 'hours', label: 'Show hours', enabled: true },
      { id: 'directions', label: 'Show directions', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
];

// SaaS pages definition
const saasPages: PageConfig[] = [
  { id: 'home', name: 'Home', sections: saasHomeSections },
  { id: 'features', name: 'Features', sections: saasFeaturesSections },
  { id: 'pricing', name: 'Pricing', sections: saasPricingSections },
  { id: 'about', name: 'About', sections: saasAboutSections },
  { id: 'contact', name: 'Contact', sections: saasContactSections },
];

// Generic pages for other templates (simplified)
const genericHomeSections: SectionConfig[] = [
  {
    id: 'hero',
    name: 'Hero',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'split', name: 'Split', icon: 'view_sidebar' },
      { id: 'fullscreen', name: 'Fullscreen', icon: 'fullscreen' },
    ],
    toggles: [
      { id: 'cta', label: 'Show CTA', enabled: true },
      { id: 'image', label: 'Show image', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'content',
    name: 'Main Content',
    layout: 'grid',
    layouts: [
      { id: 'grid', name: 'Grid', icon: 'grid_view' },
      { id: 'list', name: 'List', icon: 'list' },
      { id: 'masonry', name: 'Masonry', icon: 'dashboard' },
    ],
    toggles: [
      { id: 'filters', label: 'Show filters', enabled: false },
    ],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'cta',
    name: 'Call to Action',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'banner', name: 'Banner', icon: 'crop_16_9' },
    ],
    toggles: [
      { id: 'secondary', label: 'Secondary action', enabled: true },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
];

const genericAboutSections: SectionConfig[] = [
  {
    id: 'intro',
    name: 'Introduction',
    layout: 'centered',
    layouts: [
      { id: 'centered', name: 'Centered', icon: 'align_horizontal_center' },
      { id: 'split', name: 'With Image', icon: 'view_sidebar' },
    ],
    toggles: [],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'details',
    name: 'Details',
    layout: 'grid',
    layouts: [
      { id: 'grid', name: 'Grid', icon: 'grid_view' },
      { id: 'timeline', name: 'Timeline', icon: 'timeline' },
    ],
    toggles: [],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [],
  },
];

const genericServicesSections: SectionConfig[] = [
  {
    id: 'overview',
    name: 'Overview',
    layout: 'grid',
    layouts: [
      { id: 'grid', name: 'Grid', icon: 'grid_view' },
      { id: 'list', name: 'List', icon: 'list' },
      { id: 'carousel', name: 'Carousel', icon: 'view_carousel' },
    ],
    toggles: [
      { id: 'filters', label: 'Show filters', enabled: true },
    ],
    animation: 'stagger',
    configured: false,
    recommendedComponents: [],
  },
];

const genericContactSections: SectionConfig[] = [
  {
    id: 'form',
    name: 'Contact Form',
    layout: 'simple',
    layouts: [
      { id: 'simple', name: 'Simple', icon: 'short_text' },
      { id: 'detailed', name: 'Detailed', icon: 'notes' },
    ],
    toggles: [
      { id: 'map', label: 'Show map', enabled: false },
    ],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
];

const genericDetailSections: SectionConfig[] = [
  {
    id: 'header',
    name: 'Detail Header',
    layout: 'full-width',
    layouts: [
      { id: 'full-width', name: 'Full Width', icon: 'crop_16_9' },
      { id: 'compact', name: 'Compact', icon: 'short_text' },
    ],
    toggles: [],
    animation: 'fade',
    configured: false,
    recommendedComponents: [],
  },
  {
    id: 'content',
    name: 'Detail Content',
    layout: 'prose',
    layouts: [
      { id: 'prose', name: 'Prose', icon: 'article' },
      { id: 'sections', name: 'Sections', icon: 'view_day' },
    ],
    toggles: [],
    animation: 'none',
    configured: false,
    recommendedComponents: [],
  },
];

const genericPages: PageConfig[] = [
  { id: 'home', name: 'Home', sections: genericHomeSections },
  { id: 'about', name: 'About', sections: genericAboutSections },
  { id: 'services', name: 'Services', sections: genericServicesSections },
  { id: 'contact', name: 'Contact', sections: genericContactSections },
  { id: 'detail', name: 'Detail', sections: genericDetailSections },
];

// Get pages for a template
export function getTemplateSections(templateId: string | null | undefined): PageConfig[] {
  switch (templateId) {
    case 'saas':
      return saasPages;
    // Add more templates as needed
    default:
      return genericPages;
  }
}

// Get default site structure
export function getDefaultSiteStructure(templateId: string | null | undefined): { navigation: NavigationConfig; pages: PageConfig[] } {
  return {
    navigation: { ...defaultNavigation },
    pages: getTemplateSections(templateId),
  };
}
