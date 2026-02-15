export interface StyleTokens {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
  };
  typography: {
    fontFamily: string;
    headingWeight: number;
    bodyWeight: number;
  };
  radius: {
    sm: string;
    default: string;
    lg: string;
  };
  shadows: {
    sm: string;
    default: string;
    lg: string;
  };
}

export interface Style {
  id: string;
  name: string;
  description: string;
  defaultDarkMode: boolean;
  tokens: StyleTokens;
}

export const styles: Style[] = [
  {
    id: 'swiss',
    name: 'Swiss International',
    description: 'Grid-based precision with functional typography',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#ea2a33',
        background: '#ffffff',
        surface: '#f8f9fa',
        text: '#1a1a1a',
        textMuted: '#6b7280',
        border: '#e5e7eb',
      },
      typography: {
        fontFamily: 'Public Sans',
        headingWeight: 700,
        bodyWeight: 400,
      },
      radius: { sm: '2px', default: '4px', lg: '8px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        default: '0 1px 3px rgba(0,0,0,0.1)',
        lg: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    description: 'Bold, unapologetic with harsh shadows',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#000000',
        background: '#ffffff',
        surface: '#f5f5f5',
        text: '#000000',
        textMuted: '#525252',
        border: '#000000',
      },
      typography: {
        fontFamily: 'Space Grotesk',
        headingWeight: 700,
        bodyWeight: 500,
      },
      radius: { sm: '0px', default: '0px', lg: '0px' },
      shadows: {
        sm: '2px 2px 0 #000000',
        default: '4px 4px 0 #000000',
        lg: '6px 6px 0 #000000',
      },
    },
  },
  {
    id: 'minimal',
    name: 'Soft Minimal',
    description: 'Gentle curves with muted tones',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#6366f1',
        background: '#fafafa',
        surface: '#ffffff',
        text: '#18181b',
        textMuted: '#71717a',
        border: '#e4e4e7',
      },
      typography: {
        fontFamily: 'Inter',
        headingWeight: 600,
        bodyWeight: 400,
      },
      radius: { sm: '8px', default: '12px', lg: '16px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.03)',
        default: '0 2px 8px rgba(0,0,0,0.04)',
        lg: '0 4px 12px rgba(0,0,0,0.05)',
      },
    },
  },
  {
    id: 'tech',
    name: 'Tech Dark',
    description: 'Terminal aesthetic with neon accents',
    defaultDarkMode: true,
    tokens: {
      colors: {
        primary: '#22d3ee',
        background: '#0f172a',
        surface: '#1e293b',
        text: '#f8fafc',
        textMuted: '#94a3b8',
        border: '#334155',
      },
      typography: {
        fontFamily: 'JetBrains Mono',
        headingWeight: 600,
        bodyWeight: 400,
      },
      radius: { sm: '4px', default: '6px', lg: '8px' },
      shadows: {
        sm: '0 0 10px rgba(34,211,238,0.1)',
        default: '0 0 20px rgba(34,211,238,0.15)',
        lg: '0 0 30px rgba(34,211,238,0.2)',
      },
    },
  },
  {
    id: 'corporate',
    name: 'Corporate Clean',
    description: 'Professional and trustworthy presentation',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#2563eb',
        background: '#ffffff',
        surface: '#f8fafc',
        text: '#0f172a',
        textMuted: '#64748b',
        border: '#e2e8f0',
      },
      typography: {
        fontFamily: 'IBM Plex Sans',
        headingWeight: 600,
        bodyWeight: 400,
      },
      radius: { sm: '4px', default: '6px', lg: '8px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        default: '0 1px 3px rgba(0,0,0,0.1)',
        lg: '0 4px 6px rgba(0,0,0,0.1)',
      },
    },
  },
  {
    id: 'editorial',
    name: 'Editorial',
    description: 'Magazine-inspired with serif elegance',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#b91c1c',
        background: '#fffbf5',
        surface: '#ffffff',
        text: '#1c1917',
        textMuted: '#78716c',
        border: '#e7e5e4',
      },
      typography: {
        fontFamily: 'Playfair Display',
        headingWeight: 700,
        bodyWeight: 400,
      },
      radius: { sm: '0px', default: '2px', lg: '4px' },
      shadows: {
        sm: 'none',
        default: '0 1px 2px rgba(0,0,0,0.05)',
        lg: '0 2px 4px rgba(0,0,0,0.05)',
      },
    },
  },
  {
    id: 'playful',
    name: 'Playful',
    description: 'Bright colors with bouncy interactions',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#f97316',
        background: '#fffbeb',
        surface: '#ffffff',
        text: '#1c1917',
        textMuted: '#78716c',
        border: '#fed7aa',
      },
      typography: {
        fontFamily: 'DM Sans',
        headingWeight: 700,
        bodyWeight: 500,
      },
      radius: { sm: '12px', default: '16px', lg: '24px' },
      shadows: {
        sm: '0 2px 4px rgba(249,115,22,0.1)',
        default: '0 4px 8px rgba(249,115,22,0.15)',
        lg: '0 8px 16px rgba(249,115,22,0.2)',
      },
    },
  },
  {
    id: 'elegant',
    name: 'Elegant',
    description: 'Sophisticated with gold accents',
    defaultDarkMode: false,
    tokens: {
      colors: {
        primary: '#a16207',
        background: '#fefce8',
        surface: '#ffffff',
        text: '#1c1917',
        textMuted: '#78716c',
        border: '#e5e7eb',
      },
      typography: {
        fontFamily: 'Cormorant Garamond',
        headingWeight: 600,
        bodyWeight: 400,
      },
      radius: { sm: '2px', default: '4px', lg: '8px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        default: '0 2px 4px rgba(0,0,0,0.05)',
        lg: '0 4px 8px rgba(0,0,0,0.08)',
      },
    },
  },
  {
    id: 'vibrant',
    name: 'Bold Vibrant',
    description: 'Gradient mesh with neon energy',
    defaultDarkMode: true,
    tokens: {
      colors: {
        primary: '#ec4899',
        background: '#18181b',
        surface: '#27272a',
        text: '#fafafa',
        textMuted: '#a1a1aa',
        border: '#3f3f46',
      },
      typography: {
        fontFamily: 'Space Grotesk',
        headingWeight: 700,
        bodyWeight: 400,
      },
      radius: { sm: '8px', default: '12px', lg: '20px' },
      shadows: {
        sm: '0 0 15px rgba(236,72,153,0.2)',
        default: '0 0 25px rgba(236,72,153,0.3)',
        lg: '0 0 40px rgba(236,72,153,0.4)',
      },
    },
  },
];
