export interface Style {
  id: string;
  name: string;
  description: string;
  preview: 'swiss' | 'brutalist' | 'minimal' | 'tech' | 'corporate' | 'editorial' | 'playful' | 'elegant' | 'vibrant';
}

export const styles: Style[] = [
  {
    id: 'swiss',
    name: 'Swiss International',
    description: 'Grid-based precision with functional typography',
    preview: 'swiss',
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    description: 'Bold, unapologetic with harsh shadows',
    preview: 'brutalist',
  },
  {
    id: 'minimal',
    name: 'Soft Minimal',
    description: 'Gentle curves with muted tones',
    preview: 'minimal',
  },
  {
    id: 'tech',
    name: 'Tech Dark',
    description: 'Terminal aesthetic with neon accents',
    preview: 'tech',
  },
  {
    id: 'corporate',
    name: 'Corporate Clean',
    description: 'Professional and trustworthy presentation',
    preview: 'corporate',
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine-inspired with serif elegance',
    preview: 'editorial',
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Bright colors with bouncy interactions',
    preview: 'playful',
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated with gold accents',
    preview: 'elegant',
  },
  {
    id: 'vibrant',
    name: 'Bold Vibrant',
    description: 'Gradient mesh with neon energy',
    preview: 'vibrant',
  },
];
