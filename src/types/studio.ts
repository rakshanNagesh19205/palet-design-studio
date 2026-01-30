// Studio v2 Types - Site Structure and Design System

// Navigation configuration
export interface NavigationConfig {
  layout: 'logo-left' | 'logo-center' | 'logo-left-links-center' | 'minimal';
  position: 'sticky' | 'fixed' | 'static';
  background: 'solid' | 'transparent' | 'blur';
  mobile: 'hamburger' | 'bottom-nav' | 'drawer';
}

// Section configuration
export interface SectionLayout {
  id: string;
  name: string;
  icon: string;
}

export interface SectionToggle {
  id: string;
  label: string;
  enabled: boolean;
}

export interface RecommendedComponent {
  source: string;
  name: string;
  url: string;
}

export interface SectionConfig {
  id: string;
  name: string;
  layout: string;
  layouts: SectionLayout[];
  toggles: SectionToggle[];
  animation: 'none' | 'fade' | 'slide' | 'stagger';
  configured: boolean;
  recommendedComponents: RecommendedComponent[];
}

export interface PageConfig {
  id: string;
  name: string;
  sections: SectionConfig[];
}

// Full site structure
export interface SiteStructure {
  navigation: NavigationConfig;
  pages: PageConfig[];
}

// Active section for detailed editing
export interface ActiveSection {
  pageId: string;
  pageName: string;
  sectionId: string;
  name: string;
  layouts: SectionLayout[];
  toggles: SectionToggle[];
  animation: 'none' | 'fade' | 'slide' | 'stagger';
  recommendedComponents: RecommendedComponent[];
}

// Preview context for context-aware rendering
export type PreviewContext = 
  | 'full-site'
  | { type: 'page'; pageId: string }
  | { type: 'section'; section: ActiveSection };

// Tab types
export type StudioTab = 'design' | 'structure';
