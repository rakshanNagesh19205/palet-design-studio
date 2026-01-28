import { ProjectConfig } from '@/types/database';
import { PageType } from '@/lib/templatePages';
import { StylePreset, getStylePreset } from '@/lib/stylePresets';

// Import all template previews
import { SaasPreview } from './SaasPreview';
import { PortfolioPreview } from './PortfolioPreview';
import { EcommercePreview } from './EcommercePreview';
import { AgencyPreview } from './AgencyPreview';
import { BlogPreview } from './BlogPreview';
import { RestaurantPreview } from './RestaurantPreview';
import { EventPreview } from './EventPreview';
import { EducationPreview } from './EducationPreview';
import { PersonalPreview } from './PersonalPreview';
import { NonprofitPreview } from './NonprofitPreview';
import { RealestatePreview } from './RealestatePreview';

interface TemplatePreviewProps {
  templateId: string | null | undefined;
  styleId: string | null | undefined;
  page: PageType;
  config: ProjectConfig;
  darkMode?: boolean;
}

// Map template IDs to preview components
const templateComponents: Record<string, React.ComponentType<{
  page: PageType;
  config: ProjectConfig;
  style: StylePreset;
  darkMode?: boolean;
}>> = {
  saas: SaasPreview,
  portfolio: PortfolioPreview,
  ecommerce: EcommercePreview,
  agency: AgencyPreview,
  blog: BlogPreview,
  restaurant: RestaurantPreview,
  event: EventPreview,
  education: EducationPreview,
  personal: PersonalPreview,
  nonprofit: NonprofitPreview,
  realestate: RealestatePreview,
};

// Helper to convert HSL string to hex for preview
function hslToHex(hsl: string): string {
  // Parse HSL string like "hsl(173, 80%, 40%)"
  const match = hsl.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
  if (!match) return hsl; // Return as-is if not valid HSL
  
  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;
  
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function TemplatePreview({ 
  templateId, 
  styleId, 
  page, 
  config,
  darkMode = false,
}: TemplatePreviewProps) {
  // Get the base style preset
  const baseStylePreset = getStylePreset(styleId);
  
  // Override cssVars with user-selected colors from config
  const userAccent = config.colors?.accent || config.colors?.primary;
  const stylePreset: StylePreset = {
    ...baseStylePreset,
    cssVars: {
      ...baseStylePreset.cssVars,
      // Override accent color if user has selected one
      ...(userAccent && { '--preview-accent': hslToHex(userAccent) }),
    },
  };
  
  // Get the template component
  const PreviewComponent = templateId ? templateComponents[templateId] : null;
  
  if (!PreviewComponent) {
    // Fallback to SaaS if no template selected
    return (
      <SaasPreview 
        page={page} 
        config={config} 
        style={stylePreset} 
        darkMode={darkMode}
      />
    );
  }
  
  return (
    <PreviewComponent 
      page={page} 
      config={config} 
      style={stylePreset}
      darkMode={darkMode}
    />
  );
}
