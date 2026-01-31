import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExportHeaderProps {
  template: string;
  style: string;
}

export const ExportHeader = ({ template, style }: ExportHeaderProps) => {
  const navigate = useNavigate();
  
  const formatName = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-muted-foreground"
          onClick={() => navigate('/create/style')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="h-5 w-px bg-border" />
        
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-foreground">{formatName(template)}</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-muted-foreground">{formatName(style)}</span>
        </div>
      </div>
      
      <Link to="/dashboard" className="flex items-center gap-2">
        <div className="w-7 h-7 bg-primary rounded flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">P.</span>
        </div>
        <span className="font-semibold text-foreground">Palet</span>
      </Link>
    </header>
  );
};
