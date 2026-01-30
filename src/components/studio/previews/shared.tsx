import { ProjectConfig } from '@/types/database';
import { PageType } from '@/lib/templatePages';
import { StylePreset } from '@/lib/stylePresets';
import { NavigationConfig, PageConfig, SectionConfig } from '@/types/studio';
import { cn } from '@/lib/utils';

export interface TemplatePreviewProps {
  page: PageType;
  config: ProjectConfig;
  style: StylePreset;
  darkMode?: boolean;
  navigation?: NavigationConfig;
  pages?: PageConfig[];
}

// Helper to get section config for current page
export function getSectionConfig(pages: PageConfig[] | undefined, pageId: string, sectionId: string): SectionConfig | undefined {
  if (!pages) return undefined;
  const page = pages.find(p => p.id === pageId);
  return page?.sections.find(s => s.id === sectionId);
}

// Shared helper to get border radius value
export function getBorderRadius(radius?: string): string {
  const map: Record<string, string> = {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  };
  return map[radius || 'md'] || '8px';
}

// Shared helper to get shadow value
export function getShadow(intensity?: string, darkMode?: boolean): string {
  const opacity = darkMode ? 0.4 : 0.1;
  const map: Record<string, string> = {
    none: 'none',
    subtle: `0 2px 8px rgba(0,0,0,${opacity})`,
    medium: `0 4px 16px rgba(0,0,0,${opacity * 1.5})`,
    dramatic: `0 8px 32px rgba(0,0,0,${opacity * 2})`,
  };
  return map[intensity || 'medium'] || map.medium;
}

// Shared preview header component
export function PreviewHeader({ 
  config, 
  style, 
  brandName,
  navItems = ['Home', 'About', 'Services', 'Contact'],
  navigation,
}: { 
  config: ProjectConfig; 
  style: StylePreset;
  brandName: string;
  navItems?: string[];
  navigation?: NavigationConfig;
}) {
  const layout = navigation?.layout || 'logo-left';
  const position = navigation?.position || 'sticky';
  const background = navigation?.background || 'solid';
  
  // Determine background styles based on navigation config
  const getBackgroundStyle = () => {
    switch (background) {
      case 'transparent':
        return { backgroundColor: 'transparent' };
      case 'blur':
        return { 
          backgroundColor: `${style.cssVars['--preview-bg']}cc`,
          backdropFilter: 'blur(12px)',
        };
      default:
        return { backgroundColor: style.cssVars['--preview-bg'] };
    }
  };
  
  // Determine layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'logo-center':
        return 'justify-center';
      case 'logo-left-links-center':
        return 'justify-between';
      case 'minimal':
        return 'justify-center';
      default:
        return 'justify-between';
    }
  };

  return (
    <header 
      className={cn(
        "flex items-center px-6 py-4 border-b",
        getLayoutClasses(),
        position === 'sticky' && 'sticky top-0 z-10',
        position === 'fixed' && 'fixed top-0 left-0 right-0 z-10'
      )}
      style={{ 
        borderColor: style.cssVars['--preview-border'],
        ...getBackgroundStyle(),
      }}
    >
      {layout !== 'minimal' && (
        <div className={cn(
          "flex items-center gap-2",
          layout === 'logo-center' && 'absolute left-6'
        )}>
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
            style={{ 
              backgroundColor: style.cssVars['--preview-accent'],
              borderRadius: getBorderRadius(config.borders?.radius),
            }}
          >
            {brandName.charAt(0)}
          </div>
          <span 
            className="font-semibold"
            style={{ 
              color: style.cssVars['--preview-fg'],
              fontFamily: config.typography?.fontFamily,
            }}
          >
            {brandName}
          </span>
        </div>
      )}
      <nav className={cn(
        "flex items-center gap-6",
        layout === 'logo-center' && 'mx-auto'
      )}>
        {navItems.map((item, i) => (
          <span 
            key={item}
            className="text-sm"
            style={{ 
              color: i === 0 ? style.cssVars['--preview-accent'] : style.cssVars['--preview-muted'],
              fontFamily: config.typography?.fontFamily,
            }}
          >
            {item}
          </span>
        ))}
      </nav>
      {layout === 'logo-center' && <div className="w-24" />}
    </header>
  );
}

// Shared CTA button
export function PreviewButton({
  config,
  style,
  children,
  variant = 'primary',
}: {
  config: ProjectConfig;
  style: StylePreset;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const isPrimary = variant === 'primary';
  return (
    <button
      className="px-5 py-2.5 text-sm font-medium transition-all"
      style={{
        backgroundColor: isPrimary ? style.cssVars['--preview-accent'] : 'transparent',
        color: isPrimary ? '#ffffff' : style.cssVars['--preview-accent'],
        borderRadius: getBorderRadius(config.borders?.radius),
        border: isPrimary ? 'none' : `2px solid ${style.cssVars['--preview-accent']}`,
        boxShadow: isPrimary ? getShadow(config.shadows?.intensity) : 'none',
      }}
    >
      {children}
    </button>
  );
}

// Shared card component
export function PreviewCard({
  config,
  style,
  children,
  className = '',
}: {
  config: ProjectConfig;
  style: StylePreset;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`p-6 ${className}`}
      style={{
        backgroundColor: style.cssVars['--preview-card-bg'],
        borderRadius: getBorderRadius(config.borders?.radius),
        border: `1px solid ${style.cssVars['--preview-border']}`,
        boxShadow: getShadow(config.shadows?.intensity),
      }}
    >
      {children}
    </div>
  );
}

// Footer component
export function PreviewFooter({
  config,
  style,
  brandName,
}: {
  config: ProjectConfig;
  style: StylePreset;
  brandName: string;
}) {
  return (
    <footer 
      className="px-6 py-8 border-t mt-auto"
      style={{ 
        borderColor: style.cssVars['--preview-border'],
        backgroundColor: style.cssVars['--preview-bg'],
      }}
    >
      <div className="flex items-center justify-between">
        <span 
          className="text-sm"
          style={{ 
            color: style.cssVars['--preview-muted'],
            fontFamily: config.typography?.fontFamily,
          }}
        >
          © 2024 {brandName}. All rights reserved.
        </span>
        <div className="flex gap-4">
          {['Twitter', 'LinkedIn', 'Instagram'].map(social => (
            <span 
              key={social}
              className="text-sm"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
