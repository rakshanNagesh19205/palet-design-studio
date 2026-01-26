// Style presets that define the visual characteristics for each style
import { ProjectConfig } from '@/types/database';

export interface StylePreset {
  id: string;
  name: string;
  config: Partial<ProjectConfig>;
  cssVars: Record<string, string>;
}

export const stylePresets: Record<string, StylePreset> = {
  swiss: {
    id: 'swiss',
    name: 'Swiss International',
    config: {
      colors: { 
        primary: 'hsl(356, 81%, 54%)', 
        accent: 'hsl(356, 81%, 54%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(0, 0%, 0%)',
      },
      typography: { fontFamily: 'Inter', scale: 'default' },
      borders: { radius: 'none' },
      shadows: { intensity: 'none' },
      spacing: { scale: 'relaxed' },
    },
    cssVars: {
      '--preview-bg': '#ffffff',
      '--preview-fg': '#000000',
      '--preview-accent': '#ea2a33',
      '--preview-muted': '#666666',
      '--preview-border': '#000000',
      '--preview-card-bg': '#f5f5f5',
    },
  },
  brutalist: {
    id: 'brutalist',
    name: 'Neo-Brutalist',
    config: {
      colors: { 
        primary: 'hsl(48, 100%, 50%)', 
        accent: 'hsl(48, 100%, 50%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(0, 0%, 0%)',
      },
      typography: { fontFamily: 'DM Sans', scale: 'spacious' },
      borders: { radius: 'none' },
      shadows: { intensity: 'dramatic' },
      spacing: { scale: 'relaxed' },
    },
    cssVars: {
      '--preview-bg': '#ffffff',
      '--preview-fg': '#000000',
      '--preview-accent': '#ffd700',
      '--preview-muted': '#333333',
      '--preview-border': '#000000',
      '--preview-card-bg': '#ffd700',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Soft Minimal',
    config: {
      colors: { 
        primary: 'hsl(350, 80%, 72%)', 
        accent: 'hsl(350, 80%, 72%)',
        background: 'hsl(0, 0%, 98%)',
        foreground: 'hsl(220, 10%, 20%)',
      },
      typography: { fontFamily: 'Quicksand', scale: 'relaxed' },
      borders: { radius: 'xl' },
      shadows: { intensity: 'subtle' },
      spacing: { scale: 'spacious' },
    },
    cssVars: {
      '--preview-bg': '#faf9f9',
      '--preview-fg': '#2d3142',
      '--preview-accent': '#f2a5b3',
      '--preview-muted': '#8d93ab',
      '--preview-border': '#e8e6e6',
      '--preview-card-bg': '#ffffff',
    },
  },
  tech: {
    id: 'tech',
    name: 'Tech Dark',
    config: {
      colors: { 
        primary: 'hsl(142, 76%, 45%)', 
        accent: 'hsl(142, 76%, 45%)',
        background: 'hsl(220, 20%, 10%)',
        foreground: 'hsl(0, 0%, 100%)',
      },
      typography: { fontFamily: 'JetBrains Mono', scale: 'compact' },
      borders: { radius: 'sm' },
      shadows: { intensity: 'medium' },
      spacing: { scale: 'tight' },
    },
    cssVars: {
      '--preview-bg': '#0d1117',
      '--preview-fg': '#e6edf3',
      '--preview-accent': '#2ea043',
      '--preview-muted': '#7d8590',
      '--preview-border': '#30363d',
      '--preview-card-bg': '#161b22',
    },
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Clean',
    config: {
      colors: { 
        primary: 'hsl(217, 91%, 50%)', 
        accent: 'hsl(217, 91%, 50%)',
        background: 'hsl(0, 0%, 100%)',
        foreground: 'hsl(220, 15%, 20%)',
      },
      typography: { fontFamily: 'Inter', scale: 'default' },
      borders: { radius: 'md' },
      shadows: { intensity: 'subtle' },
      spacing: { scale: 'default' },
    },
    cssVars: {
      '--preview-bg': '#ffffff',
      '--preview-fg': '#1e293b',
      '--preview-accent': '#2563eb',
      '--preview-muted': '#64748b',
      '--preview-border': '#e2e8f0',
      '--preview-card-bg': '#f8fafc',
    },
  },
  editorial: {
    id: 'editorial',
    name: 'Editorial',
    config: {
      colors: { 
        primary: 'hsl(0, 0%, 15%)', 
        accent: 'hsl(0, 0%, 15%)',
        background: 'hsl(40, 30%, 96%)',
        foreground: 'hsl(0, 0%, 10%)',
      },
      typography: { fontFamily: 'Playfair Display', scale: 'relaxed' },
      borders: { radius: 'none' },
      shadows: { intensity: 'none' },
      spacing: { scale: 'spacious' },
    },
    cssVars: {
      '--preview-bg': '#faf8f5',
      '--preview-fg': '#1a1a1a',
      '--preview-accent': '#262626',
      '--preview-muted': '#6b6b6b',
      '--preview-border': '#d4d0c8',
      '--preview-card-bg': '#ffffff',
    },
  },
  playful: {
    id: 'playful',
    name: 'Playful',
    config: {
      colors: { 
        primary: 'hsl(280, 85%, 60%)', 
        accent: 'hsl(45, 100%, 55%)',
        background: 'hsl(270, 100%, 98%)',
        foreground: 'hsl(280, 40%, 20%)',
      },
      typography: { fontFamily: 'Quicksand', scale: 'relaxed' },
      borders: { radius: 'full' },
      shadows: { intensity: 'medium' },
      spacing: { scale: 'relaxed' },
    },
    cssVars: {
      '--preview-bg': '#faf5ff',
      '--preview-fg': '#3b1e54',
      '--preview-accent': '#a855f7',
      '--preview-muted': '#9f7aea',
      '--preview-border': '#e9d5ff',
      '--preview-card-bg': '#ffffff',
    },
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant',
    config: {
      colors: { 
        primary: 'hsl(43, 74%, 49%)', 
        accent: 'hsl(43, 74%, 49%)',
        background: 'hsl(220, 20%, 10%)',
        foreground: 'hsl(40, 20%, 95%)',
      },
      typography: { fontFamily: 'Playfair Display', scale: 'relaxed' },
      borders: { radius: 'sm' },
      shadows: { intensity: 'subtle' },
      spacing: { scale: 'spacious' },
    },
    cssVars: {
      '--preview-bg': '#141218',
      '--preview-fg': '#f5f0e8',
      '--preview-accent': '#d4a843',
      '--preview-muted': '#9a9590',
      '--preview-border': '#2a2630',
      '--preview-card-bg': '#1c1a20',
    },
  },
  vibrant: {
    id: 'vibrant',
    name: 'Bold Vibrant',
    config: {
      colors: { 
        primary: 'hsl(320, 85%, 55%)', 
        accent: 'hsl(180, 85%, 50%)',
        background: 'hsl(260, 30%, 15%)',
        foreground: 'hsl(0, 0%, 100%)',
      },
      typography: { fontFamily: 'DM Sans', scale: 'default' },
      borders: { radius: 'lg' },
      shadows: { intensity: 'dramatic' },
      spacing: { scale: 'default' },
    },
    cssVars: {
      '--preview-bg': '#1a1625',
      '--preview-fg': '#ffffff',
      '--preview-accent': '#e839b7',
      '--preview-muted': '#b8b0c4',
      '--preview-border': '#3d3654',
      '--preview-card-bg': '#251f33',
    },
  },
};

export function getStylePreset(styleId: string | null | undefined): StylePreset {
  if (!styleId || !stylePresets[styleId]) {
    return stylePresets.swiss; // Default fallback
  }
  return stylePresets[styleId];
}

export function applyStyleToConfig(baseConfig: ProjectConfig, styleId: string | null | undefined): ProjectConfig {
  const preset = getStylePreset(styleId);
  return {
    ...baseConfig,
    colors: { ...baseConfig.colors, ...preset.config.colors },
    typography: { ...baseConfig.typography, ...preset.config.typography },
    borders: { ...baseConfig.borders, ...preset.config.borders },
    shadows: { ...baseConfig.shadows, ...preset.config.shadows },
    spacing: { ...baseConfig.spacing, ...preset.config.spacing },
  };
}
