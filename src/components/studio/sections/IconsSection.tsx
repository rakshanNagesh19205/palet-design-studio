import { Smile } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { IconConfig } from '@/types/database';

const styleOptions = [
  { value: 'outline', label: 'Outline', description: 'Thin strokes' },
  { value: 'solid', label: 'Solid', description: 'Filled shapes' },
  { value: 'duotone', label: 'Duotone', description: 'Two-tone fill' },
];

const sizeOptions = [
  { value: 'sm', label: 'Small', description: '16px' },
  { value: 'md', label: 'Medium', description: '20px' },
  { value: 'lg', label: 'Large', description: '24px' },
];

interface IconsSectionProps {
  icons: IconConfig;
  onChange: (icons: IconConfig) => void;
  style?: string | null;
}

export function IconsSection({ icons, onChange, style }: IconsSectionProps) {
  return (
    <ConfigSection
      value="icons"
      title="Icons"
      icon={<Smile className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div className="space-y-4">
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Icon Style</p>
          <div className="grid grid-cols-3 gap-2">
            {styleOptions.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                selected={icons.style === option.value}
                onClick={() => onChange({ ...icons, style: option.value as IconConfig['style'] })}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Default Size</p>
          <div className="grid grid-cols-3 gap-2">
            {sizeOptions.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={icons.size === option.value}
                onClick={() => onChange({ ...icons, size: option.value as IconConfig['size'] })}
              />
            ))}
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
