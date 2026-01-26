import { Palette } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { ColorSwatch } from '../ColorSwatch';
import { ColorConfig } from '@/types/database';

const primaryColors = [
  { color: 'hsl(356, 81%, 54%)', label: 'Red' },
  { color: 'hsl(221, 83%, 53%)', label: 'Blue' },
  { color: 'hsl(142, 71%, 45%)', label: 'Green' },
  { color: 'hsl(262, 83%, 58%)', label: 'Purple' },
  { color: 'hsl(24, 95%, 53%)', label: 'Orange' },
  { color: 'hsl(339, 90%, 51%)', label: 'Pink' },
];

const accentColors = [
  { color: 'hsl(38, 92%, 50%)', label: 'Amber' },
  { color: 'hsl(173, 80%, 40%)', label: 'Teal' },
  { color: 'hsl(280, 65%, 60%)', label: 'Violet' },
  { color: 'hsl(198, 93%, 60%)', label: 'Cyan' },
];

interface ColorsSectionProps {
  colors: ColorConfig;
  onChange: (colors: ColorConfig) => void;
  style?: string | null;
}

export function ColorsSection({ colors, onChange, style }: ColorsSectionProps) {
  return (
    <ConfigSection
      value="colors"
      title="Colors"
      icon={<Palette className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div className="space-y-4">
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Primary Color</p>
          <div className="flex flex-wrap gap-1">
            {primaryColors.map((c) => (
              <ColorSwatch
                key={c.color}
                color={c.color}
                label={c.label}
                selected={colors.primary === c.color}
                onClick={() => onChange({ ...colors, primary: c.color })}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Accent Color</p>
          <div className="flex flex-wrap gap-1">
            {accentColors.map((c) => (
              <ColorSwatch
                key={c.color}
                color={c.color}
                label={c.label}
                selected={colors.accent === c.color}
                onClick={() => onChange({ ...colors, accent: c.color })}
              />
            ))}
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
