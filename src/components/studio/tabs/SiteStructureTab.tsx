import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChevronRight, ChevronDown, ArrowLeft, ExternalLink } from 'lucide-react';
import { 
  NavigationConfig, 
  PageConfig, 
  SectionConfig, 
  ActiveSection 
} from '@/types/studio';

interface SiteStructureTabProps {
  navigation: NavigationConfig;
  pages: PageConfig[];
  onNavigationChange: (nav: NavigationConfig) => void;
  onSectionChange: (pageId: string, sectionId: string, updates: Partial<SectionConfig>) => void;
  onActiveChange: (section: ActiveSection | null) => void;
  activeSection: ActiveSection | null;
}

const navigationLayoutOptions = [
  { value: 'logo-left', label: 'Logo left, links right' },
  { value: 'logo-center', label: 'Logo center, links split' },
  { value: 'logo-left-links-center', label: 'Logo left, links center' },
  { value: 'minimal', label: 'Minimal (links only)' },
];

const navigationPositionOptions = [
  { value: 'sticky', label: 'Sticky' },
  { value: 'fixed', label: 'Fixed' },
  { value: 'static', label: 'Static' },
];

const navigationBackgroundOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'transparent', label: 'Transparent' },
  { value: 'blur', label: 'Blur' },
];

const navigationMobileOptions = [
  { value: 'hamburger', label: 'Hamburger menu' },
  { value: 'bottom-nav', label: 'Bottom navigation' },
  { value: 'drawer', label: 'Slide-out drawer' },
];

const animationOptions = [
  { value: 'none', label: 'None' },
  { value: 'fade', label: 'Fade in' },
  { value: 'slide', label: 'Slide up' },
  { value: 'stagger', label: 'Stagger' },
];

export function SiteStructureTab({
  navigation,
  pages,
  onNavigationChange,
  onSectionChange,
  onActiveChange,
  activeSection,
}: SiteStructureTabProps) {
  const [navExpanded, setNavExpanded] = useState(false);
  const [expandedPage, setExpandedPage] = useState<string | null>(null);

  const togglePage = (pageId: string) => {
    setExpandedPage(expandedPage === pageId ? null : pageId);
  };

  const openSectionConfig = (page: PageConfig, section: SectionConfig) => {
    onActiveChange({
      pageId: page.id,
      pageName: page.name,
      sectionId: section.id,
      name: section.name,
      layouts: section.layouts,
      toggles: section.toggles,
      animation: section.animation,
      recommendedComponents: section.recommendedComponents,
    });
  };

  const getNavSummary = () => {
    const layoutLabel = navigationLayoutOptions.find(o => o.value === navigation.layout)?.label.split(',')[0] || 'Logo left';
    const positionLabel = navigationPositionOptions.find(o => o.value === navigation.position)?.label || 'Sticky';
    return `${layoutLabel} · ${positionLabel}`;
  };

  const getPageProgress = (page: PageConfig) => {
    const configured = page.sections.filter(s => s.configured).length;
    return `${configured}/${page.sections.length}`;
  };

  // Section configuration view
  if (activeSection) {
    const page = pages.find(p => p.id === activeSection.pageId);
    const section = page?.sections.find(s => s.id === activeSection.sectionId);
    
    return (
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onActiveChange(null)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-xs text-muted-foreground">{activeSection.pageName}</div>
            <div className="font-semibold text-slate-900">{activeSection.name}</div>
          </div>
        </div>
        
        {/* Configuration */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Layout Variants */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-3 block">Layout</label>
              <div className="grid grid-cols-4 gap-2">
                {activeSection.layouts.map((layout) => (
                  <button
                    key={layout.id}
                    className={cn(
                      'aspect-[4/3] rounded-lg border-2 p-2 flex flex-col items-center justify-center gap-1 transition-all',
                      section?.layout === layout.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-muted-foreground/30'
                    )}
                    onClick={() => onSectionChange(activeSection.pageId, activeSection.sectionId, { layout: layout.id })}
                  >
                    <div className="w-full h-8 bg-muted rounded flex items-center justify-center">
                      <span className="material-symbols-outlined text-base text-muted-foreground">{layout.icon}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{layout.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Toggles */}
            {activeSection.toggles.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-medium text-muted-foreground block">Options</label>
                
                {activeSection.toggles.map((toggle) => (
                  <label key={toggle.id} className="flex items-center gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={section?.toggles.find(t => t.id === toggle.id)?.enabled || false}
                      onChange={() => {
                        const newToggles = section?.toggles.map(t => 
                          t.id === toggle.id ? { ...t, enabled: !t.enabled } : t
                        ) || [];
                        onSectionChange(activeSection.pageId, activeSection.sectionId, { toggles: newToggles });
                      }}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-slate-700">{toggle.label}</span>
                  </label>
                ))}
              </div>
            )}
            
            {/* Animation */}
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Animation</label>
              <select 
                value={section?.animation || 'none'}
                onChange={(e) => onSectionChange(activeSection.pageId, activeSection.sectionId, { animation: e.target.value as any })}
                className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
              >
                {animationOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            {/* Recommended Components */}
            {activeSection.recommendedComponents.length > 0 && (
              <div className="pt-4 border-t border-border">
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Recommended Components</label>
                <div className="space-y-2">
                  {activeSection.recommendedComponents.map((comp, i) => (
                    <a 
                      key={i}
                      href={comp.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {comp.source} — {comp.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4">
        {/* Navigation Section */}
        <div className="border border-border rounded-lg overflow-hidden bg-background">
          <button 
            className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
            onClick={() => setNavExpanded(!navExpanded)}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-lg text-muted-foreground">menu</span>
              <span className="font-semibold text-slate-900">Navigation</span>
            </div>
            <div className="flex items-center gap-2">
              {!navExpanded && (
                <span className="text-sm text-muted-foreground">{getNavSummary()}</span>
              )}
              <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', navExpanded && 'rotate-180')} />
            </div>
          </button>
          
          {navExpanded && (
            <div className="px-4 pb-4 space-y-4 border-t border-border">
              <div className="pt-4">
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Layout</label>
                <select 
                  value={navigation.layout}
                  onChange={(e) => onNavigationChange({ ...navigation, layout: e.target.value as any })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
                >
                  {navigationLayoutOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Position</label>
                <select 
                  value={navigation.position}
                  onChange={(e) => onNavigationChange({ ...navigation, position: e.target.value as any })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
                >
                  {navigationPositionOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Background</label>
                <select 
                  value={navigation.background}
                  onChange={(e) => onNavigationChange({ ...navigation, background: e.target.value as any })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
                >
                  {navigationBackgroundOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">Mobile</label>
                <select 
                  value={navigation.mobile}
                  onChange={(e) => onNavigationChange({ ...navigation, mobile: e.target.value as any })}
                  className="w-full border border-border rounded-lg px-3 py-2 text-sm bg-background"
                >
                  {navigationMobileOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Pages List */}
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide px-1">Pages</h3>
          
          {pages.map((page) => (
            <div key={page.id} className="border border-border rounded-lg overflow-hidden bg-background">
              <button 
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => togglePage(page.id)}
              >
                <div className="flex items-center gap-2">
                  {expandedPage === page.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium text-slate-900">{page.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {getPageProgress(page)}
                </span>
              </button>
              
              {expandedPage === page.id && (
                <div className="border-t border-border bg-muted/30">
                  {page.sections.map((section) => (
                    <button
                      key={section.id}
                      className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-muted/50 border-b border-border/50 last:border-0 transition-colors"
                      onClick={() => openSectionConfig(page, section)}
                    >
                      <span className="text-sm text-slate-700 pl-6">{section.name}</span>
                      <span className={cn(
                        'material-symbols-outlined text-base',
                        section.configured ? 'text-green-500' : 'text-muted-foreground/30'
                      )}>
                        {section.configured ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
