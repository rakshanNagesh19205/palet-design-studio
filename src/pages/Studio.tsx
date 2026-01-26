import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProject } from '@/hooks/useProjects';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ProjectConfig } from '@/types/database';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { History, Bookmark, Download, Check, Loader2, ChevronDown, Monitor, Tablet, Smartphone, ZoomIn, Moon, Sun } from 'lucide-react';
import { TemplatePreview } from '@/components/studio/previews/TemplatePreview';
import { getTemplatePages, PageType } from '@/lib/templatePages';
import { getStylePreset, applyStyleToConfig } from '@/lib/stylePresets';

const defaultConfig: ProjectConfig = {
  colors: { primary: 'hsl(356, 81%, 54%)', accent: 'hsl(173, 80%, 40%)' },
  typography: { fontFamily: 'Inter', scale: 'default' },
  spacing: { scale: 'default' },
  borders: { radius: 'md' },
  shadows: { intensity: 'medium' },
  layout: { containerWidth: 'default' },
  components: { buttonStyle: 'solid', cardStyle: 'elevated' },
  icons: { style: 'outline', size: 'md' },
  motion: { enabled: true, duration: 'normal', easing: 'ease' },
};

const sections = [
  { id: 'colors', name: 'Colors', icon: 'palette' },
  { id: 'typography', name: 'Typography', icon: 'text_fields' },
  { id: 'spacing', name: 'Spacing', icon: 'space_bar' },
  { id: 'borders', name: 'Border Radius', icon: 'rounded_corner' },
  { id: 'shadows', name: 'Shadows', icon: 'blur_on' },
  { id: 'buttons', name: 'Buttons', icon: 'smart_button' },
  { id: 'forms', name: 'Forms', icon: 'input' },
  { id: 'cards', name: 'Cards', icon: 'dashboard' },
  { id: 'navigation', name: 'Navigation', icon: 'menu' },
  { id: 'motion', name: 'Motion', icon: 'animation' },
];

const colorOptions = [
  { name: 'Teal', value: 'hsl(173, 80%, 40%)', micro: 'Fresh & modern' },
  { name: 'Peach', value: 'hsl(24, 95%, 53%)', micro: 'Warm & inviting' },
  { name: 'Mint', value: 'hsl(158, 64%, 52%)', micro: 'Clean & natural' },
  { name: 'Slate', value: 'hsl(215, 20%, 65%)', micro: 'Calm & neutral' },
];

const typographyOptions = [
  { name: 'DM Sans', value: 'DM Sans', micro: 'Geometric & modern' },
  { name: 'Inter', value: 'Inter', micro: 'Clean & versatile' },
  { name: 'Quicksand', value: 'Quicksand', micro: 'Friendly & rounded' },
  { name: 'Public Sans', value: 'Public Sans', micro: 'Strong & neutral' },
];

const radiusOptions = [
  { name: 'Rounded', value: 'lg', micro: '12px corners' },
  { name: 'Moderate', value: 'md', micro: '8px corners' },
  { name: 'Pill', value: 'full', micro: 'Fully rounded' },
  { name: 'Sharp', value: 'none', micro: '0px corners' },
];

const shadowOptions = [
  { name: 'None', value: 'none', micro: 'Flat design' },
  { name: 'Subtle', value: 'subtle', micro: 'Soft depth' },
  { name: 'Medium', value: 'medium', micro: 'Balanced' },
  { name: 'Dramatic', value: 'dramatic', micro: 'Bold elevation' },
];

const Studio = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(projectId);
  
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [openSection, setOpenSection] = useState<string>('colors');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewDark, setPreviewDark] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  
  const { isSaving, lastSaved, saveNow } = useAutoSave(projectId, config);

  // Apply style preset when project loads
  useEffect(() => {
    if (project) {
      // Get the style preset and apply it to the config
      const stylePreset = getStylePreset(project.style);
      const baseConfig = project.config || {};
      
      // Merge: default -> style preset -> saved config
      const mergedConfig: ProjectConfig = {
        ...defaultConfig,
        ...stylePreset.config,
        ...baseConfig,
        colors: { ...defaultConfig.colors, ...stylePreset.config?.colors, ...baseConfig.colors },
        typography: { ...defaultConfig.typography, ...stylePreset.config?.typography, ...baseConfig.typography },
        spacing: { ...defaultConfig.spacing, ...stylePreset.config?.spacing, ...baseConfig.spacing },
        borders: { ...defaultConfig.borders, ...stylePreset.config?.borders, ...baseConfig.borders },
        shadows: { ...defaultConfig.shadows, ...stylePreset.config?.shadows, ...baseConfig.shadows },
        layout: { ...defaultConfig.layout, ...stylePreset.config?.layout, ...baseConfig.layout },
        components: { ...defaultConfig.components, ...baseConfig.components },
        icons: { ...defaultConfig.icons, ...baseConfig.icons },
        motion: { ...defaultConfig.motion, ...baseConfig.motion },
      };
      
      setConfig(mergedConfig);
    }
  }, [project]);

  const updateConfig = <K extends keyof ProjectConfig>(section: K, value: ProjectConfig[K]) => {
    setConfig((prev) => ({ ...prev, [section]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? '' : sectionId);
  };

  // Get pages for the current template
  const pages = getTemplatePages(project?.template);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background gap-4">
        <p className="text-muted-foreground">Project not found</p>
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const getSelectedOption = (sectionId: string) => {
    switch (sectionId) {
      case 'colors':
        const colorOpt = colorOptions.find(o => o.value === config.colors?.accent);
        return colorOpt ? { name: colorOpt.name, micro: colorOpt.micro, color: colorOpt.value } : null;
      case 'typography':
        const typoOpt = typographyOptions.find(o => o.value === config.typography?.fontFamily);
        return typoOpt ? { name: typoOpt.name, micro: typoOpt.micro } : null;
      case 'borders':
        const radiusOpt = radiusOptions.find(o => o.value === config.borders?.radius);
        return radiusOpt ? { name: radiusOpt.name, micro: radiusOpt.micro } : null;
      case 'shadows':
        const shadowOpt = shadowOptions.find(o => o.value === config.shadows?.intensity);
        return shadowOpt ? { name: shadowOpt.name, micro: shadowOpt.micro } : null;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-white px-4">
        {/* Left: Logo + Context */}
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">P.</span>
            </div>
            <span className="font-semibold text-slate-900">Palet</span>
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {project.template && <span className="capitalize">{project.template}</span>}
            {project.template && project.style && <span>·</span>}
            {project.style && <span className="capitalize">{project.style}</span>}
          </div>
        </div>
        
        {/* Center: Progress */}
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Step 3 of 3</span>
          <div className="flex gap-1">
            <div className="h-1.5 w-6 rounded-full bg-primary" />
            <div className="h-1.5 w-6 rounded-full bg-primary" />
            <div className="h-1.5 w-6 rounded-full bg-primary" />
          </div>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <History className="h-4 w-4" />
            History
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={saveNow}>
            <Bookmark className="h-4 w-4" />
            Checkpoint
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <Download className="h-4 w-4" />
            Export
          </Button>
          
          <div className="mx-2 h-5 w-px bg-border" />
          
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="h-3.5 w-3.5 text-green-600" />
                Saved
              </>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Configuration */}
        <aside className="w-[480px] border-r border-border bg-white flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-0">
              {sections.map((section) => {
                const isOpen = openSection === section.id;
                const selected = getSelectedOption(section.id);
                
                return (
                  <div key={section.id} className="border-b border-border">
                    {/* Section Header */}
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-xl text-muted-foreground">{section.icon}</span>
                        <span className="font-medium text-slate-900">{section.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {!isOpen && selected && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            {selected.color && (
                              <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: selected.color }} />
                            )}
                            <span>{selected.name}</span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-400">{selected.micro}</span>
                          </div>
                        )}
                        <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                      </div>
                    </button>
                    
                    {/* Section Content */}
                    <div className={cn('accordion-content-animated', isOpen && 'expanded')}>
                      <div>
                        <div className="px-5 pb-5">
                          {/* Recommended label */}
                          <div className="text-xs text-muted-foreground mb-3">
                            Recommended for <span className="capitalize">{project.style || 'your style'}</span>
                          </div>
                          
                          {/* Options Grid */}
                          {section.id === 'colors' && (
                            <div className="grid grid-cols-2 gap-3">
                              {colorOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => updateConfig('colors', { ...config.colors, accent: option.value })}
                                  className={cn(
                                    'p-3 rounded-lg border-2 text-left transition-all',
                                    config.colors?.accent === option.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-gray-200 hover:border-gray-300'
                                  )}
                                >
                                  <div className="flex items-center gap-2 mb-1">
                                    <div className="w-5 h-5 rounded-full" style={{ backgroundColor: option.value }} />
                                    <span className="font-medium text-sm text-slate-900">{option.name}</span>
                                  </div>
                                  <p className="text-xs text-muted-foreground">{option.micro}</p>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {section.id === 'typography' && (
                            <div className="grid grid-cols-2 gap-3">
                              {typographyOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => updateConfig('typography', { ...config.typography, fontFamily: option.value })}
                                  className={cn(
                                    'p-3 rounded-lg border-2 text-left transition-all',
                                    config.typography?.fontFamily === option.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-gray-200 hover:border-gray-300'
                                  )}
                                >
                                  <span className="font-medium text-sm text-slate-900" style={{ fontFamily: option.value }}>{option.name}</span>
                                  <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {section.id === 'borders' && (
                            <div className="grid grid-cols-2 gap-3">
                              {radiusOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => updateConfig('borders', { radius: option.value as 'lg' | 'md' | 'full' | 'none' })}
                                  className={cn(
                                    'p-3 rounded-lg border-2 text-left transition-all',
                                    config.borders?.radius === option.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-gray-200 hover:border-gray-300'
                                  )}
                                >
                                  <span className="font-medium text-sm text-slate-900">{option.name}</span>
                                  <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {section.id === 'shadows' && (
                            <div className="grid grid-cols-2 gap-3">
                              {shadowOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() => updateConfig('shadows', { intensity: option.value as 'none' | 'subtle' | 'medium' | 'dramatic' })}
                                  className={cn(
                                    'p-3 rounded-lg border-2 text-left transition-all',
                                    config.shadows?.intensity === option.value
                                      ? 'border-primary bg-primary/5'
                                      : 'border-gray-200 hover:border-gray-300'
                                  )}
                                >
                                  <span className="font-medium text-sm text-slate-900">{option.name}</span>
                                  <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
                                </button>
                              ))}
                            </div>
                          )}
                          
                          {!['colors', 'typography', 'borders', 'shadows'].includes(section.id) && (
                            <div className="text-sm text-muted-foreground">
                              Configuration options coming soon...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex-1 flex flex-col bg-[#1a1215]">
          {/* Preview Controls */}
          <div className="shrink-0 border-b border-white/10 bg-black/20 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Device toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={cn('p-1.5 rounded', previewDevice === 'desktop' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white')}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('tablet')}
                  className={cn('p-1.5 rounded', previewDevice === 'tablet' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white')}
                >
                  <Tablet className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={cn('p-1.5 rounded', previewDevice === 'mobile' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white')}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>
              
              {/* Page navigation */}
              <div className="flex items-center gap-1 border-l border-white/10 pl-4">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={cn(
                      'px-3 py-1 text-xs rounded transition-colors',
                      currentPage === page.id 
                        ? 'bg-white/10 text-white' 
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {page.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-1.5 rounded text-white/50 hover:text-white">
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                onClick={() => setPreviewDark(!previewDark)}
                className="p-1.5 rounded text-white/50 hover:text-white"
              >
                {previewDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
          </div>
          
          {/* Preview Area */}
          <div className="flex-1 p-8 flex items-center justify-center overflow-hidden">
            <div className={cn(
              'bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 flex flex-col',
              previewDevice === 'desktop' && 'w-full max-w-4xl h-full',
              previewDevice === 'tablet' && 'w-[768px] h-full',
              previewDevice === 'mobile' && 'w-[375px] h-full'
            )}>
              {/* Browser Chrome */}
              <div className="shrink-0 bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border border-gray-200 rounded px-3 py-1 text-xs text-muted-foreground">
                    localhost:3000/{currentPage}
                  </div>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="flex-1 overflow-auto">
                <TemplatePreview
                  templateId={project.template}
                  styleId={project.style}
                  page={currentPage}
                  config={config}
                  darkMode={previewDark}
                />
              </div>
            </div>
          </div>
          
          {/* Footer hint */}
          <div className="shrink-0 border-t border-white/10 bg-black/20 px-4 py-2 text-center text-xs text-white/40">
            Click page tabs above to navigate · Changes auto-save
          </div>
        </main>
      </div>
    </div>
  );
};

export default Studio;
