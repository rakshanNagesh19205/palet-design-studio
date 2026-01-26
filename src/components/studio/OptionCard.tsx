import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface OptionCardProps {
  label: string;
  description?: string;
  preview?: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}

export function OptionCard({
  label,
  description,
  preview,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-all',
        'hover:border-primary/50 hover:bg-accent/50',
        selected
          ? 'border-primary bg-primary/5 ring-1 ring-primary'
          : 'border-border bg-card'
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 rounded-full bg-primary p-0.5">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
      {preview && (
        <div className="w-full rounded-md bg-muted p-2">{preview}</div>
      )}
      <div>
        <p className="text-body-sm font-medium">{label}</p>
        {description && (
          <p className="text-caption text-muted-foreground">{description}</p>
        )}
      </div>
    </button>
  );
}
