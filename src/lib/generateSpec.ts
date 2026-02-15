import type { ExportPageState } from '@/types/export';

// Helper: darken a hex color by a percentage
const darkenColor = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) - Math.round(255 * percent / 100)));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) - Math.round(255 * percent / 100)));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) - Math.round(255 * percent / 100)));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

// Helper: map template ID to display name
const formatTemplate = (template: string): string => {
  const map: Record<string, string> = {
    saas: 'SaaS Landing Page',
    portfolio: 'Creative Portfolio',
    ecommerce: 'E-commerce Store',
    agency: 'Agency Website',
    blog: 'Blog / Publication',
    restaurant: 'Restaurant Website',
    event: 'Event / Conference',
    education: 'Course Platform',
    personal: 'Personal Brand',
    nonprofit: 'Non-profit Website',
    realestate: 'Real Estate Listings',
  };
  return map[template] || template.charAt(0).toUpperCase() + template.slice(1);
};

// Helper: map style ID to display name
const formatStyle = (style: string): string => {
  const map: Record<string, string> = {
    swiss: 'Swiss International',
    brutalist: 'Neo-Brutalist',
    minimal: 'Soft Minimal',
    tech: 'Tech Dark',
    corporate: 'Corporate Clean',
    editorial: 'Editorial',
    playful: 'Playful',
    elegant: 'Elegant',
    vibrant: 'Bold Vibrant',
  };
  return map[style] || style.charAt(0).toUpperCase() + style.slice(1);
};

// Helper: get border-radius CSS value
const getRadius = (buttonStyle: string, _style: string): string => {
  const map: Record<string, string> = {
    sharp: '0px',
    rounded: '8px',
    pill: '9999px',
  };
  return map[buttonStyle] || '8px';
};

// Helper: get box-shadow CSS value for cards
const getShadow = (cardStyle: string, _style: string): string => {
  switch (cardStyle) {
    case 'elevated':
      return '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)';
    case 'bordered':
      return 'none';
    case 'flat':
      return 'none';
    default:
      return 'none';
  }
};

// Helper: get spacing base unit
const getSpacingBase = (density: string): number => {
  const map: Record<string, number> = {
    compact: 4,
    balanced: 8,
    spacious: 12,
  };
  return map[density] || 8;
};

// Animation duration from mood
const getMoodTiming = (mood: string): string => {
  const map: Record<string, string> = {
    serious: '150ms',
    neutral: '200ms',
    friendly: '300ms',
  };
  return map[mood] || '200ms';
};

export const generateMarkdownSpec = (state: ExportPageState): string => {
  const templateName = formatTemplate(state.template);
  const styleName = formatStyle(state.style);
  const isDark = state.darkMode;
  const primary = state.brandColor;
  const primaryHover = darkenColor(primary, 10);
  const bg = isDark ? '#0f172a' : '#ffffff';
  const surface = isDark ? '#1e293b' : '#f8f9fa';
  const text = isDark ? '#f8fafc' : '#1a1a1a';
  const textMuted = isDark ? '#94a3b8' : '#6b7280';
  const border = isDark ? '#334155' : '#e5e7eb';
  const radius = getRadius(state.buttonStyle, state.style);
  const shadow = getShadow(state.cardStyle, state.style);
  const base = getSpacingBase(state.density);
  const timing = getMoodTiming(state.mood);
  const font = state.font;

  const cardRadius = state.cardStyle === 'flat' ? '0px' : '12px';
  const cardBorder = state.cardStyle === 'bordered' ? `1px solid ${border}` : 'none';

  let inputCSS: string;
  switch (state.inputStyle) {
    case 'filled':
      inputCSS = `  background: ${surface};\n  border: 1px solid transparent;\n  border-radius: 8px;`;
      break;
    case 'underlined':
      inputCSS = `  background: transparent;\n  border: none;\n  border-bottom: 2px solid ${border};\n  border-radius: 0;`;
      break;
    default:
      inputCSS = `  background: transparent;\n  border: 1px solid ${border};\n  border-radius: 8px;`;
  }

  const spacingScale = [0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16].map(m => `${m * base}px`);

  return `# ${templateName} — ${styleName} Style

Paste this entire specification into your AI tool. Follow exactly.

You are building a ${templateName} in the ${styleName} style. Follow this specification precisely. Do not improvise colors, fonts, spacing, or layout. Do not omit any elements described below. Every value is intentional.

---

## CRITICAL REQUIREMENTS (DO NOT SKIP)

1. The navigation must include a primary CTA button using \`${primary}\` as its background color.
2. The hero section must have TWO buttons: a primary filled button and a secondary outlined button.
3. All buttons must use \`border-radius: ${radius}\`.
4. Cards must use \`${state.cardStyle}\` style: ${state.cardStyle === 'elevated' ? 'elevated with box-shadow' : state.cardStyle === 'bordered' ? 'bordered with a visible border' : 'flat with no border or shadow'}.
5. The primary color is \`${primary}\` — use it for all primary actions, links, and accents.
6. The font family is \`${font}\` — use it for ALL text. No other fonts.
7. All spacing must be multiples of \`${base}px\` (the base unit).
8. Transitions must use \`${timing} ease\` for all interactive elements.

---

## Design Tokens

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| --color-primary | ${primary} | Primary actions, links, accents |
| --color-primary-hover | ${primaryHover} | Hover states for primary elements |
| --color-background | ${bg} | Page background |
| --color-surface | ${surface} | Card and section backgrounds |
| --color-text | ${text} | Body text |
| --color-text-muted | ${textMuted} | Secondary text, captions |
| --color-border | ${border} | Borders, dividers |

### Typography

| Property | Value |
|----------|-------|
| Font Family | ${font}, system-ui, sans-serif |
| Base Size | 16px (1rem) |
| Scale | 0.75rem / 0.875rem / 1rem / 1.125rem / 1.25rem / 1.5rem / 1.875rem / 2.25rem / 3rem |
| Weights | 400 (body), 500 (emphasis), 600 (subheadings), 700 (headings) |

### Spacing

| Property | Value |
|----------|-------|
| Base Unit | ${base}px |
| Scale | ${spacingScale.join(' / ')} |

Use multiples of the base unit for all padding, margin, and gap values.

---

## Components

### Button — Primary

\`\`\`css
.btn-primary {
  background: ${primary};
  color: #ffffff;
  border: none;
  border-radius: ${radius};
  padding: ${base * 1.5}px ${base * 3}px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${timing} ease;
}
.btn-primary:hover {
  background: ${primaryHover};
}
\`\`\`

### Button — Secondary

\`\`\`css
.btn-secondary {
  background: transparent;
  color: ${text};
  border: 1px solid ${border};
  border-radius: ${radius};
  padding: ${base * 1.5}px ${base * 3}px;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all ${timing} ease;
}
.btn-secondary:hover {
  background: ${surface};
}
\`\`\`

### Card

\`\`\`css
.card {
  background: ${surface};
  border: ${cardBorder};
  box-shadow: ${shadow};
  border-radius: ${cardRadius};
  padding: ${base * 3}px;
}
\`\`\`

### Input

\`\`\`css
.input {
${inputCSS}
  padding: ${base * 1.5}px ${base * 2}px;
  font-size: 0.875rem;
  color: ${text};
  transition: border-color ${timing} ease;
}
.input:focus {
  outline: none;
  border-color: ${primary};
}
\`\`\`

---

## Page Structure

### Navigation
- **Position:** sticky, top: 0, z-index: 50
- **Background:** ${state.navStyle === 'transparent' ? 'transparent with backdrop-filter: blur(12px)' : bg}
- **Border Bottom:** ${state.navStyle === 'bordered' ? `1px solid ${border}` : 'none'}
- **Contains:** Logo on the left, navigation links in the center, primary CTA button on the right

### Hero Section
- **Layout:** Centered text with a headline, subheadline, and two buttons (primary + secondary)
- **Headline:** Large (2.25rem–3rem), font-weight 700
- **Subheadline:** Muted color (${textMuted}), 1.125rem–1.25rem
- **Buttons:** Side by side, centered, with ${base * 2}px gap

### Features Section
- **Layout:** 3-column grid on desktop, single column on mobile
- **Each feature:** Icon + heading + description inside a card component
- **Cards:** Use the \`.card\` styles defined above

### CTA Section
- **Layout:** Centered, full-width background using \`${primary}\` or \`${surface}\`
- **Content:** Headline, short description, single primary button
- **Text on colored background:** Use white (#ffffff) for contrast

---

## DO NOT

1. Do not use any colors outside the token table above.
2. Do not use any font other than \`${font}\`.
3. Do not use arbitrary spacing values — always use multiples of \`${base}px\`.
4. Do not skip hover states on interactive elements.
5. Do not use transitions longer than ${timing}.
6. Do not add decorative elements not described in this spec.
7. Do not change border-radius values from what is specified.
8. Do not use inline styles — use CSS classes or Tailwind utilities.

---

## Framework

Use **React** with **Tailwind CSS**. All components should be functional components with TypeScript.

---

*Generated by Palet Spec Mode*
`;
};
