import { cn } from '@/lib/utils';
import { PreviewControls } from './PreviewControls';
import { ComponentShowcase } from './ComponentShowcase';
import { PagePreview } from './PagePreview';
import type { PageTab, DeviceSize, ExportPageState } from '@/types/export';

interface PreviewPaneProps {
  projectName: string;
  activeTab: PageTab;
  deviceSize: DeviceSize;
  zoom: number;
  darkMode: boolean;
  style: string;
  template: string;
  state: ExportPageState;
  onDeviceChange: (device: DeviceSize) => void;
  onZoomChange: (zoom: number) => void;
  onDarkModeToggle: () => void;
}

const PAGE_LABELS: Record<Exclude<PageTab, 'components'>, string> = {
  home: 'Home Page',
  features: 'Features Page',
  pricing: 'Pricing Page',
  about: 'About Page',
  contact: 'Contact Page',
};

export const PreviewPane = ({
  projectName,
  activeTab,
  deviceSize,
  zoom,
  darkMode,
  style,
  template,
  state,
  onDeviceChange,
  onZoomChange,
  onDarkModeToggle,
}: PreviewPaneProps) => {
  const formatName = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getPreviewWidth = () => {
    switch (deviceSize) {
      case 'mobile': return 375;
      case 'tablet': return 768;
      case 'desktop': return 1280;
    }
  };

  const scaledWidth = getPreviewWidth() * (zoom / 100);

  return (
    <div className="flex flex-col h-full">
      {/* Browser Mockup */}
      <div className="flex-1 p-6 overflow-auto bg-muted/20">
        <div 
          className="mx-auto bg-background rounded-xl shadow-xl overflow-hidden border border-border transition-all duration-300"
          style={{ 
            width: `${Math.min(scaledWidth, 100)}%`,
            maxWidth: `${scaledWidth}px`,
          }}
        >
          {/* Browser Chrome */}
          <div className="bg-muted px-4 py-2.5 border-b border-border flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="bg-background border border-border rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
                {projectName}.palet.io
              </div>
            </div>
            <div className="w-[52px]" /> {/* Spacer for balance */}
          </div>
          
          {/* Preview Content */}
          <div 
            className={cn(
              'min-h-[400px] overflow-auto transition-colors',
              darkMode ? 'bg-slate-900' : 'bg-background'
            )}
          >
            {activeTab === 'components' ? (
              <ComponentShowcase state={state} darkMode={darkMode} />
            ) : (
              <PagePreview
                template={template}
                page={activeTab as Exclude<PageTab, 'components'>}
                state={state}
                darkMode={darkMode}
              />
            )}
          </div>
        </div>
      </div>

      {/* Preview Controls */}
      <PreviewControls
        deviceSize={deviceSize}
        zoom={zoom}
        darkMode={darkMode}
        style={style}
        onDeviceChange={onDeviceChange}
        onZoomChange={onZoomChange}
        onDarkModeToggle={onDarkModeToggle}
      />
    </div>
  );
};
