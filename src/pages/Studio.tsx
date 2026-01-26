import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProject } from '@/hooks/useProjects';
import { useAutoSave } from '@/hooks/useAutoSave';
import { ProjectConfig } from '@/types/database';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { ArrowLeft, Save, Download, Loader2 } from 'lucide-react';

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
    <div className="flex h-screen bg-background">
      {/* Left Panel - Configuration */}
      <aside className="flex w-[400px] flex-col border-r border-studio-border bg-studio-panel">
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-studio-border px-4">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="rounded-md p-1.5 hover:bg-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex flex-col">
              <span className="font-semibold text-body-sm truncate max-w-[200px]">
                {project.name}
              </span>
              <span className="text-caption text-muted-foreground">
                {isSaving ? 'Saving...' : lastSaved ? `Saved ${formatTime(lastSaved)}` : 'Not saved yet'}
              </span>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={saveNow} disabled={isSaving}>
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          </Button>
        </div>

        {/* Accordion sections */}
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

        {/* Footer */}
        <div className="border-t border-studio-border p-4">
          <Button className="w-full gap-2">
            <Download className="h-4 w-4" />
            Export Design System
          </Button>
        </div>
      </aside>

      {/* Right Panel - Preview */}
      <main className="flex-1 flex flex-col">
        <div className="flex h-14 items-center justify-between border-b border-studio-border px-4">
          <span className="text-muted-foreground text-body-sm">Live Preview</span>
          <div className="flex items-center gap-2">
            {project.style && (
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-caption font-medium">
                {project.style}
              </span>
            )}
            <span className="text-body-sm text-muted-foreground">Step 3 of 3</span>
          </div>
        </div>
        <div className="flex-1">
          <PreviewPanel config={config} template={project.template} />
        </div>
      </main>
    </div>
  );
};

function formatTime(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 5) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ago`;
}

export default Studio;
