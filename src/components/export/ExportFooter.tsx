import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportFooterProps {
  onExport: () => void;
}

export const ExportFooter = ({ onExport }: ExportFooterProps) => {
  return (
    <footer className="shrink-0 border-t border-border bg-background px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <span className="text-sm text-muted-foreground">Works with Claude, GPT, Cursor, Lovable, Replit, v0</span>
        <Button onClick={onExport} size="lg" className="gap-2 px-8">
          <Copy className="h-4 w-4" />
          Copy Spec to Clipboard
        </Button>
      </div>
    </footer>
  );
};
