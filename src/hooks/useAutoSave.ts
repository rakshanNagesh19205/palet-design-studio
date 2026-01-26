import { useEffect, useRef, useCallback, useState } from 'react';
import { useUpdateProject } from './useProjects';
import { ProjectConfig } from '@/types/database';
import { useToast } from './use-toast';

const AUTO_SAVE_DELAY = 5000; // 5 seconds

export function useAutoSave(projectId: string | undefined, config: ProjectConfig) {
  const updateProject = useUpdateProject();
  const { toast } = useToast();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSavedRef = useRef<string>(JSON.stringify(config));
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const save = useCallback(async (configToSave: ProjectConfig) => {
    if (!projectId) return;
    
    const configString = JSON.stringify(configToSave);
    if (configString === lastSavedRef.current) return;

    setIsSaving(true);
    try {
      await updateProject.mutateAsync({ id: projectId, config: configToSave });
      lastSavedRef.current = configString;
      setLastSaved(new Date());
    } catch (error) {
      toast({
        title: 'Auto-save failed',
        description: 'Changes could not be saved. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }, [projectId, updateProject, toast]);

  const debouncedSave = useCallback((configToSave: ProjectConfig) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      save(configToSave);
    }, AUTO_SAVE_DELAY);
  }, [save]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Trigger debounced save when config changes
  useEffect(() => {
    const configString = JSON.stringify(config);
    if (configString !== lastSavedRef.current) {
      debouncedSave(config);
    }
  }, [config, debouncedSave]);

  return { isSaving, lastSaved, saveNow: () => save(config) };
}
