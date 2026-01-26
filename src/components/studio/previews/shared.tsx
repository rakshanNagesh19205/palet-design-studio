import { ProjectConfig } from '@/types/database';
import { PageType } from '@/lib/templatePages';
import { StylePreset } from '@/lib/stylePresets';

export interface TemplatePreviewProps {
  page: PageType;
  config: ProjectConfig;
  style: StylePreset;
  darkMode?: boolean;
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
}: { 
  config: ProjectConfig; 
  style: StylePreset;
  brandName: string;
  navItems?: string[];
}) {
  return (
    <header 
      className="flex items-center justify-between px-6 py-4 border-b"
      style={{ 
        borderColor: style.cssVars['--preview-border'],
        backgroundColor: style.cssVars['--preview-bg'],
      }}
    >
      <div className="flex items-center gap-2">
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
      <nav className="flex items-center gap-6">
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
