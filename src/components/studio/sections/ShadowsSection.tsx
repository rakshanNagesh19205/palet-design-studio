import { Layers } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { ShadowConfig } from '@/types/database';

const intensityOptions = [
  { value: 'none', label: 'None', shadow: 'none' },
  { value: 'subtle', label: 'Subtle', shadow: '0 1px 2px 0 rgba(0,0,0,0.05)' },
  { value: 'medium', label: 'Medium', shadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  { value: 'dramatic', label: 'Dramatic', shadow: '0 25px 50px -12px rgba(0,0,0,0.25)' },
];

interface ShadowsSectionProps {
  shadows: ShadowConfig;
  onChange: (shadows: ShadowConfig) => void;
  style?: string | null;
}

export function ShadowsSection({ shadows, onChange, style }: ShadowsSectionProps) {
  return (
    <ConfigSection
      value="shadows"
      title="Shadows"
      icon={<Layers className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div>
        <p className="text-caption font-medium text-muted-foreground mb-2">Shadow Intensity</p>
        <div className="grid grid-cols-2 gap-2">
          {intensityOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={shadows.intensity === option.value}
              onClick={() => onChange({ ...shadows, intensity: option.value as ShadowConfig['intensity'] })}
              preview={
                <div
                  className="h-8 w-full bg-background rounded-md border"
                  style={{ boxShadow: option.shadow }}
                />
              }
            />
          ))}
        </div>
      </div>
    </ConfigSection>
  );
}
