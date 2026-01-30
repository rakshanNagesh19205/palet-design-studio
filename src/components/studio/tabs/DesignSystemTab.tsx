import { ProjectConfig } from '@/types/database';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface DesignSystemTabProps {
  config: ProjectConfig;
  updateConfig: <K extends keyof ProjectConfig>(section: K, value: ProjectConfig[K]) => void;
  openSection: string;
  toggleSection: (sectionId: string) => void;
  projectStyle?: string | null;
}

const sections = [
  { id: 'colors', name: 'Colors', icon: 'palette' },
  { id: 'typography', name: 'Typography', icon: 'text_fields' },
  { id: 'spacing', name: 'Spacing', icon: 'space_bar' },
  { id: 'borders', name: 'Border Radius', icon: 'rounded_corner' },
  { id: 'shadows', name: 'Shadows', icon: 'blur_on' },
  { id: 'buttons', name: 'Buttons', icon: 'smart_button' },
  { id: 'forms', name: 'Forms', icon: 'input' },
  { id: 'cards', name: 'Cards', icon: 'dashboard' },
  { id: 'motion', name: 'Motion', icon: 'animation' },
];

const colorOptions = [
  { name: 'Teal', value: 'hsl(173, 80%, 40%)', micro: 'Fresh & modern', category: 'Calm' },
  { name: 'Peach', value: 'hsl(24, 95%, 53%)', micro: 'Warm & inviting', category: 'Energetic' },
  { name: 'Mint', value: 'hsl(158, 64%, 52%)', micro: 'Clean & natural', category: 'Calm' },
  { name: 'Slate', value: 'hsl(215, 20%, 65%)', micro: 'Calm & neutral', category: 'Sophisticated' },
  { name: 'Rose', value: 'hsl(350, 89%, 60%)', micro: 'Bold & expressive', category: 'Energetic' },
  { name: 'Amber', value: 'hsl(38, 92%, 50%)', micro: 'Warm & friendly', category: 'Friendly' },
];

const typographyOptions = [
  { name: 'DM Sans', value: 'DM Sans', micro: 'Geometric & modern' },
  { name: 'Inter', value: 'Inter', micro: 'Clean & versatile' },
  { name: 'Quicksand', value: 'Quicksand', micro: 'Friendly & rounded' },
  { name: 'Public Sans', value: 'Public Sans', micro: 'Strong & neutral' },
];

const spacingOptions = [
  { name: 'Tight', value: 'tight', micro: 'Compact density' },
  { name: 'Balanced', value: 'default', micro: 'Standard spacing' },
  { name: 'Generous', value: 'relaxed', micro: 'Breathing room' },
  { name: 'Airy', value: 'spacious', micro: 'Maximum whitespace' },
];

const radiusOptions = [
  { name: 'Sharp', value: 'none', micro: '0px corners' },
  { name: 'Subtle', value: 'sm', micro: '4px corners' },
  { name: 'Moderate', value: 'md', micro: '8px corners' },
  { name: 'Rounded', value: 'lg', micro: '12px corners' },
  { name: 'Pill', value: 'full', micro: 'Fully rounded' },
];

const shadowOptions = [
  { name: 'None', value: 'none', micro: 'Flat design' },
  { name: 'Subtle', value: 'subtle', micro: 'Soft depth' },
  { name: 'Medium', value: 'medium', micro: 'Balanced' },
  { name: 'Dramatic', value: 'dramatic', micro: 'Bold elevation' },
  { name: 'Diffused', value: 'layered', micro: 'Soft glow' },
];

const buttonOptions = [
  { name: 'Solid', value: 'solid', micro: 'Filled background' },
  { name: 'Outline', value: 'outline', micro: 'Border only' },
  { name: 'Ghost', value: 'ghost', micro: 'No background' },
  { name: 'Soft', value: 'soft', micro: 'Muted fill' },
];

const formOptions = [
  { name: 'Outlined', value: 'outline', micro: 'Border around input' },
  { name: 'Filled', value: 'filled', micro: 'Background fill' },
  { name: 'Underlined', value: 'underline', micro: 'Bottom border only' },
];

const cardOptions = [
  { name: 'Elevated', value: 'elevated', micro: 'Shadow depth' },
  { name: 'Bordered', value: 'outlined', micro: 'Border outline' },
  { name: 'Flat', value: 'filled', micro: 'Background only' },
];

const motionDurationOptions = [
  { name: 'Fast', value: 'fast', micro: '150ms' },
  { name: 'Default', value: 'normal', micro: '200ms' },
  { name: 'Slow', value: 'slow', micro: '400ms' },
];

const motionEasingOptions = [
  { name: 'Linear', value: 'linear', micro: 'Constant speed' },
  { name: 'Ease Out', value: 'ease', micro: 'Decelerate' },
  { name: 'Ease In Out', value: 'spring', micro: 'Smooth' },
  { name: 'Spring', value: 'bounce', micro: 'Bouncy' },
];

export function DesignSystemTab({
  config,
  updateConfig,
  openSection,
  toggleSection,
  projectStyle,
}: DesignSystemTabProps) {
  const getSelectedOption = (sectionId: string) => {
    switch (sectionId) {
      case 'colors':
        const colorOpt = colorOptions.find(o => o.value === config.colors?.accent);
        return colorOpt ? { name: colorOpt.name, micro: colorOpt.micro, color: colorOpt.value } : null;
      case 'typography':
        const typoOpt = typographyOptions.find(o => o.value === config.typography?.fontFamily);
        return typoOpt ? { name: typoOpt.name, micro: typoOpt.micro } : null;
      case 'spacing':
        const spaceOpt = spacingOptions.find(o => o.value === config.spacing?.scale);
        return spaceOpt ? { name: spaceOpt.name, micro: spaceOpt.micro } : null;
      case 'borders':
        const radiusOpt = radiusOptions.find(o => o.value === config.borders?.radius);
        return radiusOpt ? { name: radiusOpt.name, micro: radiusOpt.micro } : null;
      case 'shadows':
        const shadowOpt = shadowOptions.find(o => o.value === config.shadows?.intensity);
        return shadowOpt ? { name: shadowOpt.name, micro: shadowOpt.micro } : null;
      case 'buttons':
        const buttonOpt = buttonOptions.find(o => o.value === config.components?.buttonStyle);
        return buttonOpt ? { name: buttonOpt.name, micro: buttonOpt.micro } : null;
      case 'forms':
        const formOpt = formOptions.find(o => o.value === config.components?.inputStyle);
        return formOpt ? { name: formOpt.name, micro: formOpt.micro } : null;
      case 'cards':
        const cardOpt = cardOptions.find(o => o.value === config.components?.cardStyle);
        return cardOpt ? { name: cardOpt.name, micro: cardOpt.micro } : null;
      case 'motion':
        const motionDur = motionDurationOptions.find(o => o.value === config.motion?.duration);
        return motionDur ? { name: motionDur.name, micro: motionDur.micro } : null;
      default:
        return null;
    }
  };

  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'colors':
        return (
          <div className="grid grid-cols-2 gap-3">
            {colorOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('colors', { ...config.colors, accent: option.value })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.colors?.accent === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: option.value }} />
                  <span className="font-medium text-sm text-slate-900">{option.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{option.micro}</p>
              </button>
            ))}
          </div>
        );
      
      case 'typography':
        return (
          <div className="grid grid-cols-2 gap-3">
            {typographyOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('typography', { ...config.typography, fontFamily: option.value })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.typography?.fontFamily === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900" style={{ fontFamily: option.value }}>{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );

      case 'spacing':
        return (
          <div className="grid grid-cols-2 gap-3">
            {spacingOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('spacing', { ...config.spacing, scale: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.spacing?.scale === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );
      
      case 'borders':
        return (
          <div className="grid grid-cols-2 gap-3">
            {radiusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('borders', { radius: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.borders?.radius === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );
      
      case 'shadows':
        return (
          <div className="grid grid-cols-2 gap-3">
            {shadowOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('shadows', { intensity: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.shadows?.intensity === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );

      case 'buttons':
        return (
          <div className="grid grid-cols-2 gap-3">
            {buttonOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('components', { ...config.components, buttonStyle: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.components?.buttonStyle === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );

      case 'forms':
        return (
          <div className="grid grid-cols-2 gap-3">
            {formOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('components', { ...config.components, inputStyle: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.components?.inputStyle === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );

      case 'cards':
        return (
          <div className="grid grid-cols-2 gap-3">
            {cardOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConfig('components', { ...config.components, cardStyle: option.value as any })}
                className={cn(
                  'p-3 rounded-lg border-2 text-left transition-all',
                  config.components?.cardStyle === option.value
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <span className="font-medium text-sm text-slate-900">{option.name}</span>
                <p className="text-xs text-muted-foreground mt-1">{option.micro}</p>
              </button>
            ))}
          </div>
        );

      case 'motion':
        return (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Duration</label>
              <div className="grid grid-cols-3 gap-2">
                {motionDurationOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateConfig('motion', { ...config.motion, duration: option.value as any })}
                    className={cn(
                      'p-2 rounded-lg border-2 text-center transition-all',
                      config.motion?.duration === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span className="font-medium text-sm text-slate-900">{option.name}</span>
                    <p className="text-xs text-muted-foreground">{option.micro}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-2 block">Easing</label>
              <div className="grid grid-cols-2 gap-2">
                {motionEasingOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => updateConfig('motion', { ...config.motion, easing: option.value as any })}
                    className={cn(
                      'p-2 rounded-lg border-2 text-center transition-all',
                      config.motion?.easing === option.value
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    )}
                  >
                    <span className="font-medium text-sm text-slate-900">{option.name}</span>
                    <p className="text-xs text-muted-foreground">{option.micro}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Configuration options coming soon...
          </div>
        );
    }
  };

  return (
    <ScrollArea className="flex-1">
      <div className="p-0">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          const selected = getSelectedOption(section.id);
          
          return (
            <div key={section.id} className="border-b border-border">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-muted-foreground">{section.icon}</span>
                  <span className="font-medium text-slate-900">{section.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {!isOpen && selected && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {selected.color && (
                        <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: selected.color }} />
                      )}
                      <span>{selected.name}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-gray-400">{selected.micro}</span>
                    </div>
                  )}
                  <ChevronDown className={cn('h-4 w-4 text-muted-foreground transition-transform', isOpen && 'rotate-180')} />
                </div>
              </button>
              
              {/* Section Content */}
              <div className={cn('accordion-content-animated', isOpen && 'expanded')}>
                <div>
                  <div className="px-5 pb-5">
                    {/* Recommended label */}
                    <div className="text-xs text-muted-foreground mb-3">
                      Recommended for <span className="capitalize">{projectStyle || 'your style'}</span>
                    </div>
                    
                    {renderSectionContent(section.id)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
