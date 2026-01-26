import { LayoutGrid } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { LayoutConfig } from '@/types/database';

const containerOptions = [
  { value: 'narrow', label: 'Narrow', description: '960px max' },
  { value: 'default', label: 'Default', description: '1200px max' },
  { value: 'wide', label: 'Wide', description: '1400px max' },
  { value: 'full', label: 'Full Width', description: 'No max width' },
];

interface LayoutSectionProps {
  layout: LayoutConfig;
  onChange: (layout: LayoutConfig) => void;
  style?: string | null;
}

export function LayoutSection({ layout, onChange, style }: LayoutSectionProps) {
  return (
    <ConfigSection
      value="layout"
      title="Layout"
      icon={<LayoutGrid className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div>
        <p className="text-caption font-medium text-muted-foreground mb-2">Container Width</p>
        <div className="grid grid-cols-2 gap-2">
          {containerOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              description={option.description}
              selected={layout.containerWidth === option.value}
              onClick={() => onChange({ ...layout, containerWidth: option.value as LayoutConfig['containerWidth'] })}
              preview={
                <div className="h-4 bg-muted rounded flex items-center justify-center px-1">
                  <div
                    className="h-2 bg-primary/40 rounded"
                    style={{
                      width: option.value === 'narrow' ? '50%' : option.value === 'default' ? '70%' : option.value === 'wide' ? '85%' : '100%',
                    }}
                  />
                </div>
              }
            />
          ))}
        </div>
      </div>
    </ConfigSection>
  );
}
