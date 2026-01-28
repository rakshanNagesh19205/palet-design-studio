import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProjectConfig } from '@/types/database';
import { Check, Copy, Download, FileJson, FileText, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  config: ProjectConfig;
  projectName?: string;
  template?: string;
  style?: string;
}

type ExportFormat = 'json' | 'markdown' | 'css';

export const ExportModal = ({
  open,
  onOpenChange,
  config,
  projectName = 'Untitled',
  template,
  style,
}: ExportModalProps) => {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('json');
  const [copied, setCopied] = useState(false);

  const formats: { id: ExportFormat; name: string; icon: React.ReactNode; description: string }[] = [
    { id: 'json', name: 'JSON', icon: <FileJson className="h-5 w-5" />, description: 'Machine-readable format' },
    { id: 'markdown', name: 'Markdown', icon: <FileText className="h-5 w-5" />, description: 'AI-ready documentation' },
    { id: 'css', name: 'CSS Variables', icon: <Code className="h-5 w-5" />, description: 'Ready to use in code' },
  ];

  const generateJSON = () => {
    return JSON.stringify(
      {
        name: projectName,
        template,
        style,
        config,
      },
      null,
      2
    );
  };

  const generateMarkdown = () => {
    return `# ${projectName} Design System

## Overview
- **Template**: ${template || 'Not specified'}
- **Style**: ${style || 'Not specified'}

## Colors
- **Primary**: \`${config.colors?.primary || 'Not set'}\`
- **Accent**: \`${config.colors?.accent || 'Not set'}\`

## Typography
- **Font Family**: ${config.typography?.fontFamily || 'Not set'}
- **Scale**: ${config.typography?.scale || 'default'}

## Spacing
- **Scale**: ${config.spacing?.scale || 'default'}

## Borders
- **Border Radius**: ${config.borders?.radius || 'md'}

## Shadows
- **Intensity**: ${config.shadows?.intensity || 'medium'}

## Layout
- **Container Width**: ${config.layout?.containerWidth || 'default'}

## Components
- **Button Style**: ${config.components?.buttonStyle || 'solid'}
- **Card Style**: ${config.components?.cardStyle || 'elevated'}

## Icons
- **Style**: ${config.icons?.style || 'outline'}
- **Size**: ${config.icons?.size || 'md'}

## Motion
- **Enabled**: ${config.motion?.enabled !== false ? 'Yes' : 'No'}
- **Duration**: ${config.motion?.duration || 'normal'}
- **Easing**: ${config.motion?.easing || 'ease'}
`;
  };

  const generateCSS = () => {
    const radiusMap: Record<string, string> = {
      none: '0px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      full: '9999px',
    };

    return `:root {
  /* Colors */
  --color-primary: ${config.colors?.primary || 'hsl(356, 81%, 54%)'};
  --color-accent: ${config.colors?.accent || 'hsl(173, 80%, 40%)'};

  /* Typography */
  --font-family: '${config.typography?.fontFamily || 'Inter'}', sans-serif;

  /* Border Radius */
  --radius: ${radiusMap[config.borders?.radius || 'md']};

  /* Shadows */
  --shadow-intensity: ${config.shadows?.intensity || 'medium'};

  /* Motion */
  --motion-duration: ${config.motion?.duration === 'fast' ? '150ms' : config.motion?.duration === 'slow' ? '400ms' : '200ms'};
  --motion-easing: ${config.motion?.easing || 'ease'};
}
`;
  };

  const getExportContent = () => {
    switch (selectedFormat) {
      case 'json':
        return generateJSON();
      case 'markdown':
        return generateMarkdown();
      case 'css':
        return generateCSS();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(getExportContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = getExportContent();
    const extensions: Record<ExportFormat, string> = {
      json: 'json',
      markdown: 'md',
      css: 'css',
    };
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}-design-system.${extensions[selectedFormat]}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Export Design System</DialogTitle>
          <DialogDescription>
            Choose a format to export your design specifications
          </DialogDescription>
        </DialogHeader>

        {/* Format Selection */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {formats.map((format) => (
            <button
              key={format.id}
              onClick={() => setSelectedFormat(format.id)}
              className={cn(
                'p-4 rounded-lg border-2 text-left transition-all',
                selectedFormat === format.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="flex items-center gap-2 mb-1 text-foreground">
                {format.icon}
                <span className="font-medium">{format.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{format.description}</p>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Preview</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="gap-2 h-8"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted rounded-lg p-4 max-h-[200px] overflow-auto">
            <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
              {getExportContent()}
            </pre>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
