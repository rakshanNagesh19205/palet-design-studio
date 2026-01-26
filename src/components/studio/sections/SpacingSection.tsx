import { Space } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { SpacingConfig } from '@/types/database';

const scaleOptions = [
  { value: 'tight', label: 'Tight', description: '3px base unit' },
  { value: 'default', label: 'Default', description: '4px base unit' },
  { value: 'relaxed', label: 'Relaxed', description: '5px base unit' },
  { value: 'spacious', label: 'Spacious', description: '6px base unit' },
];

interface SpacingSectionProps {
  spacing: SpacingConfig;
  onChange: (spacing: SpacingConfig) => void;
  style?: string | null;
}

export function SpacingSection({ spacing, onChange, style }: SpacingSectionProps) {
  return (
    <ConfigSection
      value="spacing"
      title="Spacing"
      icon={<Space className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div>
        <p className="text-caption font-medium text-muted-foreground mb-2">Spacing Scale</p>
        <div className="grid grid-cols-2 gap-2">
          {scaleOptions.map((scale) => (
            <OptionCard
              key={scale.value}
              label={scale.label}
              description={scale.description}
              selected={spacing.scale === scale.value}
              onClick={() => onChange({ ...spacing, scale: scale.value as SpacingConfig['scale'] })}
              preview={
                <div className="flex items-end gap-0.5 h-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-primary/60 rounded-sm"
                      style={{
                        width: `${i * (scale.value === 'tight' ? 3 : scale.value === 'spacious' ? 6 : scale.value === 'relaxed' ? 5 : 4)}px`,
                        height: `${i * 5}px`,
                      }}
                    />
                  ))}
                </div>
              }
            />
          ))}
        </div>
      </div>
    </ConfigSection>
  );
}
