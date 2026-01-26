import { useState } from 'react';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProjectConfig } from '@/types/database';

type Viewport = 'desktop' | 'tablet' | 'mobile';

interface PreviewPanelProps {
  config: ProjectConfig;
  template?: string | null;
}

const viewports: { id: Viewport; icon: typeof Monitor; label: string; width: string }[] = [
  { id: 'desktop', icon: Monitor, label: 'Desktop', width: 'w-full' },
  { id: 'tablet', icon: Tablet, label: 'Tablet', width: 'w-[768px]' },
  { id: 'mobile', icon: Smartphone, label: 'Mobile', width: 'w-[375px]' },
];

export function PreviewPanel({ config, template }: PreviewPanelProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop');

  const currentViewport = viewports.find((v) => v.id === viewport)!;

  // Generate CSS custom properties from config
  const previewStyles = generatePreviewStyles(config);

  return (
    <div className="flex h-full flex-col">
      {/* Viewport controls */}
      <div className="flex items-center justify-center gap-1 border-b border-studio-border bg-chrome-background px-4 py-2">
        {viewports.map((vp) => (
          <Button
            key={vp.id}
            variant={viewport === vp.id ? 'secondary' : 'ghost'}
            size="sm"
            onClick={() => setViewport(vp.id)}
            className="gap-2"
          >
            <vp.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{vp.label}</span>
          </Button>
        ))}
      </div>

      {/* Preview container */}
      <div className="flex-1 overflow-auto bg-muted/30 p-6">
        <div
          className={cn(
            'mx-auto h-full rounded-lg border border-border bg-background shadow-soft transition-all duration-300',
            currentViewport.width
          )}
          style={previewStyles}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-border bg-chrome-background px-4 py-3 rounded-t-lg">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-chrome-dot-red" />
              <div className="h-3 w-3 rounded-full bg-chrome-dot-yellow" />
              <div className="h-3 w-3 rounded-full bg-chrome-dot-green" />
            </div>
            <div className="flex-1 mx-4">
              <div className="bg-muted rounded-md px-3 py-1.5 text-caption text-muted-foreground text-center">
                preview.example.com
              </div>
            </div>
          </div>

          {/* Preview content */}
          <div className="p-6 space-y-6">
            <PreviewContent config={config} template={template} />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewContent({ config, template }: { config: ProjectConfig; template?: string | null }) {
  const primaryColor = config.colors?.primary || 'hsl(356 81% 54%)';
  const fontFamily = config.typography?.fontFamily || 'Public Sans';
  const borderRadius = getBorderRadius(config.borders?.radius);

  return (
    <div className="space-y-8">
      {/* Hero section preview */}
      <div className="space-y-4">
        <h1 
          className="text-display-sm font-bold"
          style={{ fontFamily }}
        >
          Welcome to {template || 'Your Site'}
        </h1>
        <p className="text-body-lg text-muted-foreground max-w-lg">
          This is a live preview of your design system. Changes you make in the configuration panel will appear here instantly.
        </p>
        <div className="flex gap-3">
          <button
            className="px-6 py-2.5 font-medium text-white transition-colors"
            style={{ 
              backgroundColor: primaryColor, 
              borderRadius,
            }}
          >
            Primary Button
          </button>
          <button
            className="px-6 py-2.5 font-medium border transition-colors"
            style={{ 
              borderColor: primaryColor,
              color: primaryColor,
              borderRadius,
            }}
          >
            Secondary Button
          </button>
        </div>
      </div>

      {/* Card preview */}
      <div 
        className="border bg-card p-6 shadow-soft"
        style={{ borderRadius }}
      >
        <h3 className="text-heading-md font-semibold mb-2">Card Component</h3>
        <p className="text-body-sm text-muted-foreground mb-4">
          Preview how cards will look with your current settings.
        </p>
        <div className="flex gap-2">
          <span 
            className="inline-flex items-center px-2.5 py-0.5 text-caption font-medium text-white"
            style={{ backgroundColor: primaryColor, borderRadius }}
          >
            Badge
          </span>
          <span 
            className="inline-flex items-center px-2.5 py-0.5 text-caption font-medium bg-muted"
            style={{ borderRadius }}
          >
            Muted Badge
          </span>
        </div>
      </div>

      {/* Form preview */}
      <div className="space-y-4">
        <h3 className="text-heading-md font-semibold">Form Elements</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-body-sm font-medium">Input Field</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full border bg-background px-3 py-2 text-body-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2"
              style={{ 
                borderRadius,
                borderColor: 'hsl(var(--border))',
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-body-sm font-medium">Select Field</label>
            <select
              className="w-full border bg-background px-3 py-2 text-body-sm focus:outline-none focus:ring-2"
              style={{ 
                borderRadius,
                borderColor: 'hsl(var(--border))',
              }}
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>
        </div>
      </div>

      {/* Typography scale */}
      <div className="space-y-3">
        <h3 className="text-heading-md font-semibold">Typography Scale</h3>
        <div className="space-y-2">
          <p className="text-heading-xl">Heading XL</p>
          <p className="text-heading-lg">Heading LG</p>
          <p className="text-heading-md">Heading MD</p>
          <p className="text-body-lg">Body Large</p>
          <p className="text-body-md">Body Medium</p>
          <p className="text-body-sm text-muted-foreground">Body Small</p>
          <p className="text-caption text-muted-foreground">Caption</p>
        </div>
      </div>
    </div>
  );
}

function generatePreviewStyles(config: ProjectConfig): React.CSSProperties {
  return {
    '--preview-primary': config.colors?.primary || 'hsl(356 81% 54%)',
    fontFamily: config.typography?.fontFamily || 'Public Sans, system-ui, sans-serif',
  } as React.CSSProperties;
}

function getBorderRadius(radius?: string): string {
  const radiusMap: Record<string, string> = {
    none: '0',
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  };
  return radiusMap[radius || 'md'] || '0.5rem';
}
