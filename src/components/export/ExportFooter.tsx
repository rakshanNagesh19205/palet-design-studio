import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportFooterProps {
  onExport: () => void;
}

export const ExportFooter = ({ onExport }: ExportFooterProps) => {
  return (
    <footer className="shrink-0 border-t border-border bg-background px-6 py-4 shadow-sm">
      <div className="flex justify-center">
        <Button onClick={onExport} size="lg" className="gap-2 px-8">
          Copy Spec to Clipboard
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </footer>
  );
};
