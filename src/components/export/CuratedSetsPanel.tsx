import { CuratedSetCard } from '@/components/ui/curated-set-card';
import type { CuratedSet } from '@/types/export';

interface CuratedSetsPanelProps {
  selectedSet: string | null;
  onSelectSet: (id: string, colors: CuratedSet['colors']) => void;
}

const CURATED_SETS: CuratedSet[] = [
  {
    id: 'startup-energy',
    name: 'Startup Energy',
    colors: { primary: '#ea2a33', secondary: '#fef2f2', accent: '#f97316' },
  },
  {
    id: 'enterprise-serious',
    name: 'Enterprise Serious',
    colors: { primary: '#1e3a5f', secondary: '#f1f5f9', accent: '#0ea5e9' },
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    colors: { primary: '#8b5cf6', secondary: '#faf5ff', accent: '#ec4899' },
  },
  {
    id: 'minimal-calm',
    name: 'Minimal Calm',
    colors: { primary: '#18181b', secondary: '#fafafa', accent: '#a1a1aa' },
  },
  {
    id: 'bold-statement',
    name: 'Bold Statement',
    colors: { primary: '#000000', secondary: '#fde047', accent: '#ef4444' },
  },
  {
    id: 'warm-approach',
    name: 'Warm Approach',
    colors: { primary: '#c2410c', secondary: '#fff7ed', accent: '#84cc16' },
  },
];

export const CuratedSetsPanel = ({ selectedSet, onSelectSet }: CuratedSetsPanelProps) => {
  return (
    <div className="grid grid-cols-3 gap-3 p-4">
      {CURATED_SETS.map((set) => (
        <CuratedSetCard
          key={set.id}
          set={set}
          selected={selectedSet === set.id}
          onClick={() => onSelectSet(set.id, set.colors)}
        />
      ))}
    </div>
  );
};
