import { Component } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { ComponentConfig } from '@/types/database';

const buttonStyles = [
  { value: 'solid', label: 'Solid', description: 'Filled background' },
  { value: 'outline', label: 'Outline', description: 'Border only' },
  { value: 'ghost', label: 'Ghost', description: 'Text only' },
  { value: 'soft', label: 'Soft', description: 'Subtle fill' },
];

const cardStyles = [
  { value: 'elevated', label: 'Elevated', description: 'With shadow' },
  { value: 'outlined', label: 'Outlined', description: 'Border only' },
  { value: 'filled', label: 'Filled', description: 'Background fill' },
];

interface ComponentsSectionProps {
  components: ComponentConfig;
  onChange: (components: ComponentConfig) => void;
  style?: string | null;
}

export function ComponentsSection({ components, onChange, style }: ComponentsSectionProps) {
  return (
    <ConfigSection
      value="components"
      title="Components"
      icon={<Component className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div className="space-y-4">
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Button Style</p>
          <div className="grid grid-cols-2 gap-2">
            {buttonStyles.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                description={option.description}
                selected={components.buttonStyle === option.value}
                onClick={() => onChange({ ...components, buttonStyle: option.value as ComponentConfig['buttonStyle'] })}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="text-caption font-medium text-muted-foreground mb-2">Card Style</p>
          <div className="grid grid-cols-3 gap-2">
            {cardStyles.map((option) => (
              <OptionCard
                key={option.value}
                label={option.label}
                selected={components.cardStyle === option.value}
                onClick={() => onChange({ ...components, cardStyle: option.value as ComponentConfig['cardStyle'] })}
              />
            ))}
          </div>
        </div>
      </div>
    </ConfigSection>
  );
}
