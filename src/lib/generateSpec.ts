import type { ExportPageState } from '@/types/export';

// Darken a hex color by a percentage
const darkenHex = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) - Math.round(255 * percent / 100)));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) - Math.round(255 * percent / 100)));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) - Math.round(255 * percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

export interface DerivedTokens {
  primary: string;
  primaryHover: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
}

export const deriveTokens = (state: ExportPageState): DerivedTokens => {
  const isDark = state.darkMode;
  return {
    primary: state.brandColor,
    primaryHover: darkenHex(state.brandColor, 10),
    background: isDark ? '#0f172a' : '#ffffff',
    surface: isDark ? '#1e293b' : '#f8f9fa',
    text: isDark ? '#f8fafc' : '#1a1a1a',
    textMuted: isDark ? '#94a3b8' : '#6b7280',
    border: isDark ? '#334155' : '#e5e7eb',
  };
};

// Map UI choices to CSS values
const BUTTON_RADIUS: Record<string, string> = {
  sharp: '0px',
  rounded: '8px',
  pill: '9999px',
};

const DENSITY_BASE: Record<string, number> = {
  compact: 4,
  balanced: 8,
  spacious: 12,
};

export const generateMarkdownSpec = (state: ExportPageState): string => {
  const tokens = deriveTokens(state);
  const base = DENSITY_BASE[state.density] || 8;
  const btnRadius = BUTTON_RADIUS[state.buttonStyle] || '8px';
  const templateLabel = state.template.charAt(0).toUpperCase() + state.template.slice(1);

  // Spacing scale
  const spacingScale = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16].map(
    (m) => `${m * base}px`
  );

  // Card styles
  const cardBorder = state.cardStyle === 'bordered' ? `1px solid ${tokens.border}` : 'none';
  const cardShadow =
    state.cardStyle === 'elevated'
      ? '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)'
      : 'none';

  // Input styles
  let inputCSS: string;
  switch (state.inputStyle) {
    case 'filled':
      inputCSS = `  background: ${tokens.surface};\n  border: 1px solid transparent;\n  border-radius: 8px;`;
      break;
    case 'underlined':
      inputCSS = `  background: transparent;\n  border: none;\n  border-bottom: 2px solid ${tokens.border};\n  border-radius: 0;`;
      break;
    default: // outlined
      inputCSS = `  background: transparent;\n  border: 1px solid ${tokens.border};\n  border-radius: 8px;`;
  }

  return `# Design System Specification

You are building a ${templateLabel} website. Follow this design system exactly. Do not deviate. Every value is intentional.

## Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | ${tokens.primary} | Primary actions, links |
| --color-primary-hover | ${tokens.primaryHover} | Hover states |
| --color-background | ${tokens.background} | Page background |
| --color-surface | ${tokens.surface} | Card / section backgrounds |
| --color-text | ${tokens.text} | Body text |
| --color-text-muted | ${tokens.textMuted} | Secondary text, captions |
| --color-border | ${tokens.border} | Borders, dividers |

## Typography

**Font Family:** ${state.font}, system-ui, sans-serif
**Base Size:** 16px (1rem)
**Scale:** 0.75rem / 0.875rem / 1rem / 1.125rem / 1.25rem / 1.5rem / 1.875rem / 2.25rem / 3rem
**Weights:** 400 (body), 500 (emphasis), 600 (subheadings), 700 (headings)

## Spacing

**Base Unit:** ${base}px
**Scale:** ${spacingScale.join(' / ')}

Use multiples of the base unit for all padding, margin, and gap values.

## Border Radius

| Element | Radius |
|---------|--------|
| Buttons | ${btnRadius} |
| Cards | ${state.cardStyle === 'flat' ? '0px' : '12px'} |
| Inputs | ${state.inputStyle === 'underlined' ? '0px' : '8px'} |
| Badges | 9999px |
| Modals | 16px |

## Shadows

| Level | Value |
|-------|-------|
| sm | 0 1px 2px 0 rgba(0,0,0,0.05) |
| md | 0 4px 6px -1px rgba(0,0,0,0.1) |
| lg | 0 10px 15px -3px rgba(0,0,0,0.1) |

## Button Component

\`\`\`css
.button-primary {
  background: ${tokens.primary};
  color: #ffffff;
  border: none;
  border-radius: ${btnRadius};
  padding: ${base * 1.5}px ${base * 3}px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 150ms ease;
}
.button-primary:hover {
  background: ${tokens.primaryHover};
}

.button-secondary {
  background: transparent;
  color: ${tokens.text};
  border: 1px solid ${tokens.border};
  border-radius: ${btnRadius};
  padding: ${base * 1.5}px ${base * 3}px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 150ms ease;
}
.button-secondary:hover {
  background: ${tokens.surface};
}
\`\`\`

## Card Component

\`\`\`css
.card {
  background: ${tokens.surface};
  border: ${cardBorder};
  box-shadow: ${cardShadow};
  border-radius: 12px;
  padding: ${base * 3}px;
}
\`\`\`

## Input Component

\`\`\`css
.input {
${inputCSS}
  padding: ${base * 1.5}px ${base * 2}px;
  font-size: 0.875rem;
  color: ${tokens.text};
  transition: border-color 150ms ease;
}
.input:focus {
  outline: none;
  border-color: ${tokens.primary};
}
\`\`\`

## Navigation Component

- **Style:** ${state.navStyle}
- **Background:** ${state.navStyle === 'transparent' ? 'transparent' : tokens.background}
- **Border Bottom:** ${state.navStyle === 'bordered' ? `1px solid ${tokens.border}` : 'none'}
- **Backdrop Filter:** ${state.navStyle === 'transparent' ? 'blur(12px)' : 'none'}
- **Position:** sticky, top: 0
- **Z-Index:** 50

## Important Rules

1. Use ONLY the colors specified. No other colors.
2. Use ONLY the spacing scale values. No arbitrary numbers.
3. Use ONLY ${state.font} for text. No other fonts.
4. All interactive elements need hover states.
5. Transitions are 150ms ease.
6. Dark mode: ${state.darkMode ? 'ENABLED — all tokens above reflect dark palette' : 'DISABLED — use light palette as specified'}.
7. Modal style: ${state.modalStyle} — modals ${state.modalStyle === 'slide-in' ? 'slide in from the right edge' : 'appear centered with a backdrop overlay'}.
`;
};
