import { Dices } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LockToggle } from '@/components/ui/lock-toggle';
import type { LockStates } from '@/types/export';

interface DiscoverPanelProps {
  locks: LockStates;
  onToggleLock: (key: keyof LockStates) => void;
  onRandomize: () => void;
}

const LOCK_ITEMS: { key: keyof LockStates; label: string }[] = [
  { key: 'color', label: 'Color' },
  { key: 'font', label: 'Font' },
  { key: 'density', label: 'Density' },
  { key: 'mood', label: 'Mood' },
  { key: 'buttons', label: 'Buttons' },
  { key: 'cards', label: 'Cards' },
  { key: 'inputs', label: 'Inputs' },
  { key: 'navigation', label: 'Navigation' },
  { key: 'modals', label: 'Modals' },
];

export const DiscoverPanel = ({ locks, onToggleLock, onRandomize }: DiscoverPanelProps) => {
  return (
    <div className="p-4 space-y-4">
      <Button 
        onClick={onRandomize}
        className="w-full gap-2"
        size="lg"
      >
        <Dices className="h-4 w-4" />
        Randomize Unlocked
      </Button>

      <p className="text-xs text-muted-foreground">
        Lock what you like, randomize the rest:
      </p>

      <div className="grid grid-cols-3 gap-2">
        {LOCK_ITEMS.map((item) => (
          <LockToggle
            key={item.key}
            label={item.label}
            locked={locks[item.key]}
            onToggle={() => onToggleLock(item.key)}
          />
        ))}
      </div>

      <p className="text-xs text-muted-foreground/70">
        Click a lock to keep that value when randomizing.
      </p>
    </div>
  );
};
