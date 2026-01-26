import { Zap } from 'lucide-react';
import { ConfigSection } from '../ConfigSection';
import { OptionCard } from '../OptionCard';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MotionConfig } from '@/types/database';

const durationOptions = [
  { value: 'instant', label: 'Instant', description: '0ms' },
  { value: 'fast', label: 'Fast', description: '150ms' },
  { value: 'normal', label: 'Normal', description: '300ms' },
  { value: 'slow', label: 'Slow', description: '500ms' },
];

const easingOptions = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'spring', label: 'Spring' },
  { value: 'bounce', label: 'Bounce' },
];

interface MotionSectionProps {
  motion: MotionConfig;
  onChange: (motion: MotionConfig) => void;
  style?: string | null;
}

export function MotionSection({ motion, onChange, style }: MotionSectionProps) {
  return (
    <ConfigSection
      value="motion"
      title="Motion"
      icon={<Zap className="h-4 w-4" />}
      recommendation={style || 'your style'}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="motion-enabled" className="text-body-sm">
            Enable animations
          </Label>
          <Switch
            id="motion-enabled"
            checked={motion.enabled !== false}
            onCheckedChange={(checked) => onChange({ ...motion, enabled: checked })}
          />
        </div>
        
        {motion.enabled !== false && (
          <>
            <div>
              <p className="text-caption font-medium text-muted-foreground mb-2">Duration</p>
              <div className="grid grid-cols-2 gap-2">
                {durationOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={motion.duration === option.value}
                    onClick={() => onChange({ ...motion, duration: option.value as MotionConfig['duration'] })}
                  />
                ))}
              </div>
            </div>
            <div>
              <p className="text-caption font-medium text-muted-foreground mb-2">Easing</p>
              <div className="grid grid-cols-2 gap-2">
                {easingOptions.map((option) => (
                  <OptionCard
                    key={option.value}
                    label={option.label}
                    selected={motion.easing === option.value}
                    onClick={() => onChange({ ...motion, easing: option.value as MotionConfig['easing'] })}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </ConfigSection>
  );
}
