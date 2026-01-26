import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Version, CreateVersionInput, ProjectConfig } from '@/types/database';

export function useVersions(projectId: string | undefined) {
  return useQuery({
    queryKey: ['versions', projectId],
    queryFn: async (): Promise<Version[]> => {
      if (!projectId) return [];

      const { data, error } = await supabase
        .from('versions')
        .select('*')
        .eq('project_id', projectId)
        .order('version_number', { ascending: false });

      if (error) throw error;
      
      // Cast config_snapshot from Json to ProjectConfig
      return (data || []).map(version => ({
        ...version,
        config_snapshot: (version.config_snapshot as ProjectConfig) || {},
      }));
    },
    enabled: !!projectId,
  });
}

export function useLatestVersion(projectId: string | undefined) {
  return useQuery({
    queryKey: ['latestVersion', projectId],
    queryFn: async (): Promise<Version | null> => {
      if (!projectId) return null;

      const { data, error } = await supabase
        .from('versions')
        .select('*')
        .eq('project_id', projectId)
        .order('version_number', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;
      
      return {
        ...data,
        config_snapshot: (data.config_snapshot as ProjectConfig) || {},
      };
    },
    enabled: !!projectId,
  });
}

export function useCreateVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateVersionInput): Promise<Version> => {
      // Get the current highest version number
      const { data: latestVersion } = await supabase
        .from('versions')
        .select('version_number')
        .eq('project_id', input.project_id)
        .order('version_number', { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextVersionNumber = (latestVersion?.version_number || 0) + 1;

      const { data, error } = await supabase
        .from('versions')
        .insert({
          project_id: input.project_id,
          version_number: nextVersionNumber,
          commit_message: input.commit_message || null,
          config_snapshot: input.config_snapshot,
        })
        .select()
        .single();

      if (error) throw error;
      
      return {
        ...data,
        config_snapshot: (data.config_snapshot as ProjectConfig) || {},
      };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['versions', data.project_id] });
      queryClient.invalidateQueries({ queryKey: ['latestVersion', data.project_id] });
    },
  });
}

export function useRestoreVersion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      projectId, 
      versionId 
    }: { 
      projectId: string; 
      versionId: string;
    }): Promise<void> => {
      // Get the version to restore
      const { data: version, error: versionError } = await supabase
        .from('versions')
        .select('config_snapshot')
        .eq('id', versionId)
        .single();

      if (versionError) throw versionError;

      // Update the project with the restored config
      const { error: updateError } = await supabase
        .from('projects')
        .update({
          config: version.config_snapshot,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId);

      if (updateError) throw updateError;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['project', variables.projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
