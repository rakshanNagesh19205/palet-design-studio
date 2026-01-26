// Project configuration stored as JSONB
export interface ProjectConfig {
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
    [key: string]: string | undefined;
  };
  typography?: {
    fontFamily?: string;
    headingFont?: string;
    scale?: number;
    [key: string]: string | number | undefined;
  };
  spacing?: {
    base?: number;
    scale?: number;
    [key: string]: number | undefined;
  };
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
