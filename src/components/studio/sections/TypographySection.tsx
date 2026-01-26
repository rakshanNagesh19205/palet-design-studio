import { Type } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { TypographyConfig } from '@/types/database';

const fontFamilies = [
  { value: 'Public Sans', label: 'Public Sans', description: 'Clean & modern' },
  { value: 'Inter', label: 'Inter', description: 'Versatile & readable' },
  { value: 'Playfair Display', label: 'Playfair Display', description: 'Elegant & editorial' },
  { value: 'Space Grotesk', label: 'Space Grotesk', description: 'Geometric & bold' },
];

const scaleOptions = [
  { value: 'compact', label: 'Compact', description: 'Dense information' },
  { value: 'default', label: 'Default', description: 'Balanced readability' },
  { value: 'relaxed', label: 'Relaxed', description: 'More breathing room' },
  { value: 'spacious', label: 'Spacious', description: 'Maximum clarity' },
];

interface TypographySectionProps {
  typography: TypographyConfig;
  onChange: (typography: TypographyConfig) => void;
  style?: string | null;
}

export function TypographySection({ typography, onChange, style }: TypographySectionProps) {
  return (
    <ConfigSection
      value="typography"
      title="Typography"
      icon={<Type className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div className="space-y-4">
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Font Family</p>
          <div className="grid grid-cols-2 gap-2">
            {fontFamilies.map((font) => (
              <OptionCard
                key={font.value}
                label={font.label}
                description={font.description}
                selected={typography.fontFamily === font.value}
                onClick={() => onChange({ ...typography, fontFamily: font.value })}
                preview={
                  <span style={{ fontFamily: font.value }} className="text-lg">
                    Aa
                  </span>
                }
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Type Scale</p>
          <div className="grid grid-cols-2 gap-2">
            {scaleOptions.map((scale) => (
              <OptionCard
                key={scale.value}
                label={scale.label}
                description={scale.description}
                selected={typography.scale === scale.value}
                onClick={() => onChange({ ...typography, scale: scale.value as TypographyConfig['scale'] })}
              />
            ))}
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
