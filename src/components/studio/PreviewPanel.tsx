import { useState } from 'react';
import { Monitor, Tablet, Smartphone, ZoomIn, ZoomOut, Moon, Sun, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProjectConfig } from '@/types/database';

type Viewport = 'desktop' | 'tablet' | 'mobile';

interface PreviewPanelProps {
  config: ProjectConfig;
  template?: string | null;
}

const viewportSizes = {
  desktop: { width: '100%', label: 'Desktop' },
  tablet: { width: '768px', label: 'Tablet' },
  mobile: { width: '375px', label: 'Mobile' },
};

export function PreviewPanel({ config, template }: PreviewPanelProps) {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const [zoom, setZoom] = useState(100);
  const [darkMode, setDarkMode] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Preview controls */}
      <div className="flex shrink-0 items-center justify-between border-b border-white/10 bg-black/20 px-4 py-2">
        <div className="flex items-center gap-1">
          {/* Viewport buttons */}
          {(Object.keys(viewportSizes) as Viewport[]).map((size) => {
            const Icon = size === 'desktop' ? Monitor : size === 'tablet' ? Tablet : Smartphone;
            return (
              <Button
                key={size}
                variant="ghost"
                size="icon"
                className={cn(
                  'h-8 w-8',
                  viewport === size 
                    ? 'bg-white/10 text-white' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                )}
                onClick={() => setViewport(size)}
              >
                <Icon className="h-4 w-4" />
              </Button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-1">
          {/* Zoom controls */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5"
            onClick={() => setZoom(Math.max(50, zoom - 10))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center text-xs text-white/50">{zoom}%</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5"
            onClick={() => setZoom(Math.min(150, zoom + 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          
          <div className="mx-2 h-4 w-px bg-white/10" />
          
          {/* Grid toggle */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'h-8 w-8',
              showGrid 
                ? 'bg-white/10 text-white' 
                : 'text-white/50 hover:text-white hover:bg-white/5'
            )}
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid className="h-4 w-4" />
          </Button>
          
          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/5"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Preview container */}
      <div className="flex flex-1 items-center justify-center overflow-auto p-8">
        {/* Browser mockup */}
        <div 
          className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0d0a0b] shadow-2xl transition-all duration-300"
          style={{ 
            width: viewportSizes[viewport].width,
            maxWidth: '100%',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Browser chrome */}
          <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 text-center">
              <span className="rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                localhost:3000/preview
              </span>
            </div>
          </div>
          
          {/* Preview content */}
          <div 
            className={cn(
              'relative min-h-[400px] overflow-auto',
              darkMode ? 'bg-[#1a1215]' : 'bg-[#f8f6f6]'
            )}
          >
            {/* Grid overlay */}
            {showGrid && (
              <div 
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(hsl(356 81% 54% / 0.5) 1px, transparent 1px),
                    linear-gradient(90deg, hsl(356 81% 54% / 0.5) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
              />
            )}
            
            {/* Sample preview content based on config */}
            <div className="p-8">
              <PreviewContent config={config} template={template} darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview content component showing design system in action
function PreviewContent({ 
  config, 
  template, 
  darkMode 
}: { 
  config: ProjectConfig; 
  template?: string | null;
  darkMode: boolean;
}) {
  const primaryColor = config.colors?.primary || 'hsl(356, 81%, 54%)';
  const borderRadius = getBorderRadius(config.borders?.radius);
  
  const textColor = darkMode ? 'text-white' : 'text-foreground';
  const mutedColor = darkMode ? 'text-white/60' : 'text-muted-foreground';
  const cardBg = darkMode ? 'bg-white/5' : 'bg-white';
  const borderColor = darkMode ? 'border-white/10' : 'border-border';
  
  return (
    <div className="space-y-8">
      {/* Typography preview */}
      <div className="space-y-4">
        <h1 className={cn('text-display-sm font-bold', textColor)}>
          Welcome to {template || 'Your Site'}
        </h1>
        <p className={cn('text-body-lg', mutedColor)}>
          This is a live preview of your design system. Changes you make in the configuration panel will appear here instantly.
        </p>
      </div>
      
      {/* Button preview */}
      <div className="flex flex-wrap gap-3">
        <button 
          className="px-4 py-2 text-sm font-medium transition-colors text-white"
          style={{ 
            backgroundColor: primaryColor,
            borderRadius,
          }}
        >
          Primary Button
        </button>
        <button 
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors border',
            borderColor,
            textColor
          )}
          style={{ borderRadius }}
        >
          Secondary Button
        </button>
        <button 
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors',
            mutedColor,
            'hover:opacity-80'
          )}
        >
          Ghost Button
        </button>
      </div>
      
      {/* Card preview */}
      <div className={cn(
        'rounded-lg border p-6',
        cardBg,
        borderColor
      )}
      style={{ borderRadius }}
      >
        <div className="flex items-start gap-4">
          <div 
            className="h-12 w-12 rounded-lg"
            style={{ backgroundColor: primaryColor }}
          />
          <div className="flex-1 space-y-2">
            <h3 className={cn('font-semibold', textColor)}>Card Component</h3>
            <p className={cn('text-sm', mutedColor)}>
              Preview how cards will look with your current settings.
            </p>
          </div>
        </div>
      </div>
      
      {/* Input preview */}
      <div className="space-y-3">
        <label className={cn('text-sm font-medium', textColor)}>Input Field</label>
        <input
          type="text"
          placeholder="Type something..."
          className={cn(
            'w-full border bg-transparent px-3 py-2 text-sm placeholder:opacity-50',
            borderColor,
            textColor
          )}
          style={{ borderRadius }}
        />
      </div>
      
      {/* Color palette preview */}
      <div className="space-y-3">
        <h4 className={cn('text-sm font-medium', textColor)}>Color Palette</h4>
        <div className="flex gap-2">
          <div 
            className="h-10 w-10 rounded-md"
            style={{ backgroundColor: primaryColor }}
            title="Primary"
          />
          <div 
            className={cn('h-10 w-10 rounded-md border', borderColor)}
            style={{ backgroundColor: darkMode ? 'hsl(220 13% 15%)' : 'hsl(220 14% 96%)' }}
            title="Secondary"
          />
          <div 
            className={cn('h-10 w-10 rounded-md border', borderColor)}
            style={{ backgroundColor: darkMode ? 'hsl(0 0% 9%)' : 'hsl(0 0% 100%)' }}
            title="Background"
          />
        </div>
      </div>
      
      {/* Typography scale */}
      <div className="space-y-3">
        <h4 className={cn('text-sm font-medium', textColor)}>Typography Scale</h4>
        <div className="space-y-1">
          <p className={cn('text-heading-lg', textColor)}>Heading Large</p>
          <p className={cn('text-heading-md', textColor)}>Heading Medium</p>
          <p className={cn('text-body-lg', textColor)}>Body Large</p>
          <p className={cn('text-body-md', mutedColor)}>Body Medium</p>
          <p className={cn('text-body-sm', mutedColor)}>Body Small</p>
          <p className={cn('text-caption', mutedColor)}>Caption</p>
        </div>
      </div>
    </div>
  );
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
