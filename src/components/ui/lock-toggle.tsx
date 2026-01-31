import { Lock, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LockToggleProps {
  label: string;
  locked: boolean;
  onToggle: () => void;
}

export const LockToggle = ({ label, locked, onToggle }: LockToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-colors',
        locked
          ? 'border-primary/30 bg-primary/5 text-primary'
          : 'border-border bg-background text-muted-foreground hover:bg-muted'
      )}
    >
      {locked ? (
        <Lock className="h-3.5 w-3.5" />
      ) : (
        <Unlock className="h-3.5 w-3.5" />
      )}
      <span className="capitalize">{label}</span>
    </button>
  );
};
