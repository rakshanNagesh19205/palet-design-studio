import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  isSelected?: boolean;
  onClick?: () => void;
}

export const TemplateCard = ({
  name,
  description,
  icon: Icon,
  isSelected,
  onClick,
}: TemplateCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-all duration-200',
        isSelected
          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
          : 'border-border hover:border-primary/50 hover:shadow-md'
      )}
    >
      {/* Thumbnail area */}
      <div className="flex h-[140px] items-center justify-center bg-muted">
        {/* Wireframe preview */}
        <div className="w-3/4 space-y-2">
          <div className="h-2 w-1/2 rounded bg-foreground/10" />
          <div className="h-1.5 w-full rounded bg-foreground/5" />
          <div className="h-1.5 w-3/4 rounded bg-foreground/5" />
          <div className="mt-3 flex gap-2">
            <div className="h-4 w-12 rounded bg-primary/20" />
            <div className="h-4 w-8 rounded bg-foreground/10" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-muted-foreground" />
          <h3 className="font-medium text-foreground">{name}</h3>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
