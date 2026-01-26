import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProject } from '@/hooks/useProjects';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ProjectConfig } from '@/types/database';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Logo } from '@/components/layout/Logo';
import { PreviewPanel } from '@/components/studio/PreviewPanel';
import { ColorsSection } from '@/components/studio/sections/ColorsSection';
import { TypographySection } from '@/components/studio/sections/TypographySection';
import { SpacingSection } from '@/components/studio/sections/SpacingSection';
import { BordersSection } from '@/components/studio/sections/BordersSection';
import { ShadowsSection } from '@/components/studio/sections/ShadowsSection';
import { LayoutSection } from '@/components/studio/sections/LayoutSection';
import { ComponentsSection } from '@/components/studio/sections/ComponentsSection';
import { IconsSection } from '@/components/studio/sections/IconsSection';
import { MotionSection } from '@/components/studio/sections/MotionSection';
import { History, Bookmark, Download, Check, Loader2, Settings } from 'lucide-react';

const defaultConfig: ProjectConfig = {
  colors: { primary: 'hsl(356, 81%, 54%)' },
  typography: { fontFamily: 'Public Sans', scale: 'default' },
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
  
  const [config, setConfig] = useState<ProjectConfig>(defaultConfig);
  const [openSection, setOpenSection] = useState<string>('colors');
  
  const { isSaving, lastSaved, saveNow } = useAutoSave(projectId, config);

  // Initialize config from project data
  useEffect(() => {
    if (project?.config) {
      setConfig({
        ...defaultConfig,
        ...project.config,
        colors: { ...defaultConfig.colors, ...project.config.colors },
        typography: { ...defaultConfig.typography, ...project.config.typography },
        spacing: { ...defaultConfig.spacing, ...project.config.spacing },
        borders: { ...defaultConfig.borders, ...project.config.borders },
        shadows: { ...defaultConfig.shadows, ...project.config.shadows },
        layout: { ...defaultConfig.layout, ...project.config.layout },
        components: { ...defaultConfig.components, ...project.config.components },
        icons: { ...defaultConfig.icons, ...project.config.icons },
        motion: { ...defaultConfig.motion, ...project.config.motion },
      });
    }
  }, [project]);

  const updateConfig = <K extends keyof ProjectConfig>(
    section: K,
    value: ProjectConfig[K]
  ) => {
    setConfig((prev) => ({ ...prev, [section]: value }));
  };

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
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        {/* Left: Logo + Context */}
        <div className="flex items-center gap-4">
          <Logo />
          <div className="h-5 w-px bg-border" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {project.template && (
              <>
                <span className="capitalize">{project.template}</span>
                <span>·</span>
              </>
            )}
            {project.style && (
              <span className="capitalize">{project.style}</span>
            )}
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
                <Check className="h-3.5 w-3.5 text-success" />
                Saved
              </>
            )}
          </div>
          
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Configuration */}
        <aside className="flex w-[480px] flex-col border-r border-border bg-card">
          <ScrollArea className="flex-1">
            <Accordion
              type="single"
              collapsible
              value={openSection}
              onValueChange={setOpenSection}
            >
              <ColorsSection
                colors={config.colors || {}}
                onChange={(colors) => updateConfig('colors', colors)}
                style={project.style}
              />
              <TypographySection
                typography={config.typography || {}}
                onChange={(typography) => updateConfig('typography', typography)}
                style={project.style}
              />
              <SpacingSection
                spacing={config.spacing || {}}
                onChange={(spacing) => updateConfig('spacing', spacing)}
                style={project.style}
              />
              <BordersSection
                borders={config.borders || {}}
                onChange={(borders) => updateConfig('borders', borders)}
                style={project.style}
              />
              <ShadowsSection
                shadows={config.shadows || {}}
                onChange={(shadows) => updateConfig('shadows', shadows)}
                style={project.style}
              />
              <LayoutSection
                layout={config.layout || {}}
                onChange={(layout) => updateConfig('layout', layout)}
                style={project.style}
              />
              <ComponentsSection
                components={config.components || {}}
                onChange={(components) => updateConfig('components', components)}
                style={project.style}
              />
              <IconsSection
                icons={config.icons || {}}
                onChange={(icons) => updateConfig('icons', icons)}
                style={project.style}
              />
              <MotionSection
                motion={config.motion || {}}
                onChange={(motion) => updateConfig('motion', motion)}
                style={project.style}
              />
            </Accordion>
          </ScrollArea>
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex-1 flex flex-col bg-[#1a1215]">
          <PreviewPanel config={config} template={project.template} />
          
          {/* Footer hint */}
          <div className="shrink-0 border-t border-white/10 bg-black/20 px-4 py-2 text-center text-xs text-white/40">
            Use arrow keys to navigate preview · Space to toggle grid
          </div>
        </main>
      </div>
    </div>
  );
};

export default Studio;
