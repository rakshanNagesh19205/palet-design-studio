import { cn } from '@/lib/utils';
import type { CuratedSet } from '@/types/export';

interface CuratedSetCardProps {
  set: CuratedSet;
  selected: boolean;
  onClick: () => void;
}

export const CuratedSetCard = ({ set, selected, onClick }: CuratedSetCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col rounded-lg border-2 overflow-hidden transition-all hover:shadow-md',
        selected ? 'border-primary shadow-md' : 'border-border hover:border-muted-foreground/30'
      )}
    >
      {/* Abstract color preview */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: set.colors.secondary }}
        />
        <div 
          className="absolute top-2 left-2 right-2 h-8 rounded"
          style={{ backgroundColor: set.colors.primary }}
        />
        <div 
          className="absolute bottom-2 left-2 w-16 h-6 rounded"
          style={{ backgroundColor: set.colors.accent }}
        />
        <div 
          className="absolute bottom-2 right-2 w-8 h-6 rounded"
          style={{ backgroundColor: set.colors.primary, opacity: 0.7 }}
        />
      </div>
      
      {/* Name */}
      <div className="px-2 py-2 bg-background">
        <span className="text-xs font-medium text-foreground">{set.name}</span>
      </div>
    </button>
  );
};
