import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProject } from '@/hooks/useProjects';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ProjectConfig } from '@/types/database';
import { NavigationConfig, PageConfig, SectionConfig, ActiveSection, StudioTab } from '@/types/studio';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { History, Bookmark, Download, Check, Loader2, Monitor, Tablet, Smartphone, ZoomIn, Moon, Sun } from 'lucide-react';
import { TemplatePreview } from '@/components/studio/previews/TemplatePreview';
import { ExportModal } from '@/components/studio/ExportModal';
import { DesignSystemTab, SiteStructureTab } from '@/components/studio/tabs';
import { getTemplatePages, PageType } from '@/lib/templatePages';
import { getStylePreset } from '@/lib/stylePresets';
import { getDefaultSiteStructure } from '@/lib/sectionDefinitions';

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

const Studio = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { data: project, isLoading, error } = useProject(projectId);
  
  // Design System state
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [openSection, setOpenSection] = useState<string>('colors');
  
  // Site Structure state
  const [navigation, setNavigation] = useState<NavigationConfig>({
    layout: 'logo-left',
    position: 'sticky',
    background: 'solid',
    mobile: 'hamburger',
  });
  const [pages, setPages] = useState<PageConfig[]>([]);
  const [activeSection, setActiveSection] = useState<ActiveSection | null>(null);
  
  // Tab state
  const [activeTab, setActiveTab] = useState<StudioTab>('design');
  
  // Preview state
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [previewDark, setPreviewDark] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [exportModalOpen, setExportModalOpen] = useState(false);
  
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
      
      // Initialize site structure
      const siteStructure = getDefaultSiteStructure(project.template);
      setNavigation(siteStructure.navigation);
      setPages(siteStructure.pages);
    }
  }, [project]);

  const updateConfig = <K extends keyof ProjectConfig>(section: K, value: ProjectConfig[K]) => {
    setConfig((prev) => ({ ...prev, [section]: value }));
  };

  const toggleSection = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? '' : sectionId);
  };

  const handleSectionChange = (pageId: string, sectionId: string, updates: Partial<SectionConfig>) => {
    setPages(prevPages => 
      prevPages.map(page => 
        page.id === pageId 
          ? {
              ...page,
              sections: page.sections.map(section =>
                section.id === sectionId
                  ? { ...section, ...updates, configured: true }
                  : section
              ),
            }
          : page
      )
    );
  };

  // Get pages for the current template (for preview navigation)
  const templatePages = getTemplatePages(project?.template);

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
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 text-sm leading-tight">Spec Mode</span>
              <span className="text-xs text-muted-foreground leading-tight">
                {project.template && <span className="capitalize">{project.template}</span>}
                {project.template && project.style && ' · '}
                {project.style && <span className="capitalize">{project.style}</span>}
              </span>
            </div>
          </Link>
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
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => setExportModalOpen(true)}>
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
        {/* LEFT Panel - Preview (now on the left) */}
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
                {templatePages.map((page) => (
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
                  navigation={navigation}
                  pages={pages}
                />
              </div>
            </div>
          </div>
          
          {/* Footer hint */}
          <div className="shrink-0 border-t border-white/10 bg-black/20 px-4 py-2 text-center text-xs text-white/40">
            Click page tabs above to navigate · Changes auto-save
          </div>
        </main>

        {/* RIGHT Panel - Configuration (now on the right, 480px) */}
        <aside className="w-[520px] border-l border-border bg-white flex flex-col">
          {/* Tab Switcher */}
          <div className="flex border-b border-border shrink-0">
            <button 
              className={cn(
                'flex-1 py-3 text-sm font-semibold transition-colors',
                activeTab === 'design' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setActiveTab('design')}
            >
              Design System
            </button>
            <button 
              className={cn(
                'flex-1 py-3 text-sm font-semibold transition-colors',
                activeTab === 'structure' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={() => setActiveTab('structure')}
            >
              Site Structure
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'design' ? (
            <DesignSystemTab
              config={config}
              updateConfig={updateConfig}
              openSection={openSection}
              toggleSection={toggleSection}
              projectStyle={project.style}
            />
          ) : (
            <SiteStructureTab
              navigation={navigation}
              pages={pages}
              onNavigationChange={setNavigation}
              onSectionChange={handleSectionChange}
              onActiveChange={setActiveSection}
              activeSection={activeSection}
              onPageSelect={(pageId) => setCurrentPage(pageId)}
            />
          )}
        </aside>
      </div>

      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        config={config}
        projectName={project.name}
        template={project.template}
        style={project.style}
        navigation={navigation}
        pages={pages}
      />
    </div>
  );
};

export default Studio;
