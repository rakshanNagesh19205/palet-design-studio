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

export function TemplatePreview({ 
  templateId, 
  styleId, 
  page, 
  config,
  darkMode = false,
}: TemplatePreviewProps) {
  // Get the style preset to apply theming
  const stylePreset = getStylePreset(styleId);
  
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
