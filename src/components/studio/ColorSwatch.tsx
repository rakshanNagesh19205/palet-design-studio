import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ColorSwatchProps {
  color: string;
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColorSwatch({ color, label, selected, onClick }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group flex flex-col items-center gap-1.5 rounded-lg p-2 transition-all',
        'hover:bg-accent',
        selected && 'bg-accent'
      )}
    >
      <div
        className={cn(
          'relative h-10 w-10 rounded-full border-2 transition-all',
          selected ? 'border-foreground scale-110' : 'border-transparent'
        )}
        style={{ backgroundColor: color }}
      >
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Check className="h-4 w-4 text-white drop-shadow-md" />
          </div>
        )}
      </div>
      <span className="text-caption text-muted-foreground group-hover:text-foreground">
        {label}
      </span>
    </button>
  );
}
