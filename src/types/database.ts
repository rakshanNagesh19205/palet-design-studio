// Project configuration stored as JSONB
export interface ColorConfig {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  foreground?: string;
  muted?: string;
  destructive?: string;
  success?: string;
  warning?: string;
  [key: string]: string | undefined;
}

export interface TypographyConfig {
  fontFamily?: string;
  headingFont?: string;
  monoFont?: string;
  scale?: 'compact' | 'default' | 'relaxed' | 'spacious';
  baseSize?: number;
  [key: string]: string | number | undefined;
}

export interface SpacingConfig {
  base?: number;
  scale?: 'tight' | 'default' | 'relaxed' | 'spacious';
  [key: string]: string | number | undefined;
}

export interface BorderConfig {
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  width?: 'none' | 'thin' | 'medium' | 'thick';
  [key: string]: string | undefined;
}

export interface ShadowConfig {
  intensity?: 'none' | 'subtle' | 'medium' | 'dramatic';
  style?: 'flat' | 'soft' | 'hard' | 'layered';
  [key: string]: string | undefined;
}

export interface LayoutConfig {
  containerWidth?: 'narrow' | 'default' | 'wide' | 'full';
  gridColumns?: number;
  sidebarPosition?: 'left' | 'right' | 'none';
  [key: string]: string | number | undefined;
}

export interface ComponentConfig {
  buttonStyle?: 'solid' | 'outline' | 'ghost' | 'soft';
  inputStyle?: 'outline' | 'filled' | 'underline';
  cardStyle?: 'elevated' | 'outlined' | 'filled';
  [key: string]: string | undefined;
}

export interface IconConfig {
  style?: 'outline' | 'solid' | 'duotone';
  size?: 'sm' | 'md' | 'lg';
  library?: 'lucide' | 'heroicons' | 'phosphor';
  [key: string]: string | undefined;
}

export interface MotionConfig {
  duration?: 'instant' | 'fast' | 'normal' | 'slow';
  easing?: 'linear' | 'ease' | 'spring' | 'bounce';
  enabled?: boolean;
  [key: string]: string | boolean | undefined;
}

export interface ProjectConfig {
  colors?: ColorConfig;
  typography?: TypographyConfig;
  spacing?: SpacingConfig;
  borders?: BorderConfig;
  shadows?: ShadowConfig;
  layout?: LayoutConfig;
  components?: ComponentConfig;
  icons?: IconConfig;
  motion?: MotionConfig;
  [key: string]: unknown;
}

// Projects table
export interface Project {
  id: string;
  user_id: string;
  name: string;
  template: string | null;
  style: string | null;
  config: ProjectConfig;
  created_at: string;
  updated_at: string;
}

// For creating a new project
export interface CreateProjectInput {
  name: string;
  template?: string;
  style?: string;
  config?: ProjectConfig;
}

// For updating a project
export interface UpdateProjectInput {
  name?: string;
  template?: string;
  style?: string;
  config?: ProjectConfig;
}

// Versions table
export interface Version {
  id: string;
  project_id: string;
  version_number: number;
  commit_message: string | null;
  config_snapshot: ProjectConfig;
  created_at: string;
}

// For creating a new version
export interface CreateVersionInput {
  project_id: string;
  commit_message?: string;
  config_snapshot: ProjectConfig;
}
