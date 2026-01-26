import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProductHeader } from '@/components/layout/ProductHeader';
import { BottomActionBar } from '@/components/layout/BottomActionBar';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { templates } from '@/data/templates';
import { useUpdateProject } from '@/hooks/useProjects';
import { useToast } from '@/hooks/use-toast';

const TemplateSelection = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('project');
  const updateProject = useUpdateProject();
  const { toast } = useToast();

  const handleContinue = async () => {
    if (!selectedTemplate) {
      toast({
        title: 'Select a template',
        description: 'Please choose a website type to continue.',
        variant: 'destructive',
      });
      return;
    }

    if (projectId) {
      try {
        await updateProject.mutateAsync({
          id: projectId,
          template: selectedTemplate,
        });
        navigate(`/create/style?project=${projectId}`);
      } catch (err) {
        toast({
          title: 'Error',
          description: 'Failed to save template selection.',
          variant: 'destructive',
        });
      }
    } else {
      navigate(`/create/style?template=${selectedTemplate}`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <ProductHeader currentStep={1} />
      
      <main className="container py-12">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-display-sm font-bold">What are you building?</h1>
          <p className="mt-3 text-body-lg text-muted-foreground">
            Pick a website type to get started
          </p>
        </div>
        
        {/* Template grid: 4-4-3 layout */}
        <div className="mx-auto mt-12 max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* First 8 templates */}
            {templates.slice(0, 8).map((template) => (
              <TemplateCard
                key={template.id}
                {...template}
                isSelected={selectedTemplate === template.id}
                onClick={() => setSelectedTemplate(template.id)}
              />
            ))}
          </div>
          
          {/* Last 3 templates - centered */}
          <div className="mt-6 flex justify-center gap-6">
            {templates.slice(8).map((template) => (
              <div key={template.id} className="w-full max-w-[calc(25%-18px)]">
                <TemplateCard
                  {...template}
                  isSelected={selectedTemplate === template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <BottomActionBar
        onBack={() => navigate('/dashboard')}
        onContinue={handleContinue}
        continueLabel="Continue to Style"
        continueDisabled={!selectedTemplate}
      />
    </div>
  );
};

export default TemplateSelection;
