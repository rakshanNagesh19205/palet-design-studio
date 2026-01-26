import { Square } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { BorderConfig } from '@/types/database';

const radiusOptions = [
  { value: 'none', label: 'None', description: 'Sharp corners' },
  { value: 'sm', label: 'Small', description: '4px radius' },
  { value: 'md', label: 'Medium', description: '8px radius' },
  { value: 'lg', label: 'Large', description: '12px radius' },
  { value: 'xl', label: 'Extra Large', description: '16px radius' },
  { value: 'full', label: 'Full', description: 'Pill shape' },
];

interface BordersSectionProps {
  borders: BorderConfig;
  onChange: (borders: BorderConfig) => void;
  style?: string | null;
}

export function BordersSection({ borders, onChange, style }: BordersSectionProps) {
  const getRadiusValue = (value: string) => {
    const map: Record<string, string> = {
      none: '0',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      full: '9999px',
    };
    return map[value] || '8px';
  };

  return (
    <ConfigSection
      value="borders"
      title="Borders & Radius"
      icon={<Square className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div>
        <p className="text-caption font-medium text-muted-foreground mb-2">Border Radius</p>
        <div className="grid grid-cols-3 gap-2">
          {radiusOptions.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              selected={borders.radius === option.value}
              onClick={() => onChange({ ...borders, radius: option.value as BorderConfig['radius'] })}
              preview={
                <div
                  className="h-8 w-full bg-primary/20 border-2 border-primary/40"
                  style={{ borderRadius: getRadiusValue(option.value) }}
                />
              }
            />
          ))}
        </div>
      </div>
    </ConfigSection>
  );
}
