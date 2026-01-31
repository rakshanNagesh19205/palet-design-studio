import { cn } from '@/lib/utils';
import { Zap } from 'lucide-react';
import type { PageTab } from '@/types/export';

interface PageTabsProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
}

const TABS: { id: PageTab; label: string; icon?: boolean }[] = [
  { id: 'home', label: 'Home' },
  { id: 'features', label: 'Features' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
  { id: 'components', label: 'Components', icon: true },
];

export const PageTabs = ({ activeTab, onTabChange }: PageTabsProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-border bg-background px-6">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {tab.icon && <Zap className="h-3.5 w-3.5" />}
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};
