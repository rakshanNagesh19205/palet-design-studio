import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductHeader } from '@/components/layout/ProductHeader';
import { BottomActionBar } from '@/components/layout/BottomActionBar';
import { StyleCard } from '@/components/styles/StyleCard';
import { styles } from '@/data/styles';
import { templates } from '@/data/templates';
import { useUpdateProject } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';

const StyleSelection = () => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const templateId = searchParams.get('template');
  const updateProject = useUpdateProject();
  const { toast } = useToast();

  // Get template info for breadcrumb
  const currentTemplate = templates.find((t) => t.id === templateId);

  const handleContinue = async () => {
    if (!selectedStyle) {
      toast({
        title: 'Select a style',
        description: 'Please choose a visual direction to continue.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (projectId) {
        await updateProject.mutateAsync({
          id: projectId,
          style: selectedStyle,
        });
      }
      // Navigate to export page with template and style
      navigate(`/export?template=${templateId}&style=${selectedStyle}`);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to save style selection.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProductHeader currentStep={2} />
      
      <main className="container py-12">
        {/* Breadcrumb with template info */}
        {currentTemplate && (
          <div className="mb-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <currentTemplate.icon className="h-4 w-4" />
            <span>{currentTemplate.name}</span>
            <span>/</span>
            <span className="text-primary font-medium">Style</span>
            <span>/</span>
            <span>Configure</span>
          </div>
        )}
        
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-display-sm font-bold">Define your visual intent.</h1>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Choose a starting aesthetic for your design system.
          </p>
        </div>
        
        {/* Style grid: 3x3 */}
        <div className="mx-auto mt-12 max-w-4xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {styles.map((style) => (
              <StyleCard
                key={style.id}
                style={style}
                isSelected={selectedStyle === style.id}
                onClick={() => setSelectedStyle(style.id)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <BottomActionBar
        onBack={() => navigate(projectId ? `/create/template?project=${projectId}` : '/create/template')}
        onContinue={handleContinue}
        continueLabel="Continue to Export"
        continueDisabled={!selectedStyle}
      />
    </div>
  );
};

export default StyleSelection;
