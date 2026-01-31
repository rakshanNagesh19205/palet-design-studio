import { useState } from 'react';
import { Dices, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { ColorPicker } from '@/components/ui/color-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { 
  FONT_OPTIONS, 
  type Density, 
  type Mood, 
  type ButtonStyle, 
  type CardStyle, 
  type InputStyle, 
  type NavStyle, 
  type ModalStyle,
  type LockStates 
} from '@/types/export';

interface CustomizePanelProps {
  brandColor: string;
  font: string;
  density: Density;
  mood: Mood;
  buttonStyle: ButtonStyle;
  cardStyle: CardStyle;
  inputStyle: InputStyle;
  navStyle: NavStyle;
  modalStyle: ModalStyle;
  locks: LockStates;
  onBrandColorChange: (color: string) => void;
  onFontChange: (font: string) => void;
  onDensityChange: (density: Density) => void;
  onMoodChange: (mood: Mood) => void;
  onButtonStyleChange: (style: ButtonStyle) => void;
  onCardStyleChange: (style: CardStyle) => void;
  onInputStyleChange: (style: InputStyle) => void;
  onNavStyleChange: (style: NavStyle) => void;
  onModalStyleChange: (style: ModalStyle) => void;
  onToggleLock: (key: keyof LockStates) => void;
  onRandomize: () => void;
}

interface SettingRowProps {
  label: string;
  lockKey: keyof LockStates;
  locked: boolean;
  onToggleLock: (key: keyof LockStates) => void;
  children: React.ReactNode;
}

const SettingRow = ({ label, lockKey, locked, onToggleLock, children }: SettingRowProps) => (
  <div className={cn(
    'flex items-center gap-3 transition-opacity duration-200',
    locked && 'opacity-40'
  )}>
    <button
      onClick={() => onToggleLock(lockKey)}
      className={cn(
        'p-1.5 rounded-md transition-colors shrink-0',
        locked 
          ? 'text-primary bg-primary/10' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      )}
      title={locked ? 'Unlock to randomize' : 'Lock to keep value'}
    >
      {locked ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
    </button>
    <span className="text-sm min-w-[70px]">{label}</span>
    <div className={cn('flex-1 flex justify-end', locked && 'pointer-events-none')}>
      {children}
    </div>
  </div>
);

export const CustomizePanel = ({
  brandColor,
  font,
  density,
  mood,
  buttonStyle,
  cardStyle,
  inputStyle,
  navStyle,
  modalStyle,
  locks,
  onBrandColorChange,
  onFontChange,
  onDensityChange,
  onMoodChange,
  onButtonStyleChange,
  onCardStyleChange,
  onInputStyleChange,
  onNavStyleChange,
  onModalStyleChange,
  onToggleLock,
  onRandomize,
}: CustomizePanelProps) => {
  const [isRandomizing, setIsRandomizing] = useState(false);

  const handleRandomize = () => {
    setIsRandomizing(true);
    onRandomize();
    // Reset animation after it completes
    setTimeout(() => setIsRandomizing(false), 600);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Randomize Button */}
      <Button 
        onClick={handleRandomize}
        variant="outline"
        className="w-full gap-2"
        size="lg"
        disabled={isRandomizing}
      >
        <Dices className={cn(
          'h-4 w-4 transition-transform',
          isRandomizing && 'animate-[spin_0.6s_ease-in-out]'
        )} />
        {isRandomizing ? 'Randomizing...' : 'Randomize Unlocked'}
      </Button>

      {/* Brand Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Brand
        </h4>
        
        <div className="space-y-3">
          <SettingRow label="Color" lockKey="color" locked={locks.color} onToggleLock={onToggleLock}>
            <ColorPicker value={brandColor} onChange={onBrandColorChange} />
          </SettingRow>
          
          <SettingRow label="Font" lockKey="font" locked={locks.font} onToggleLock={onToggleLock}>
            <Select value={font} onValueChange={onFontChange}>
              <SelectTrigger className="w-40 h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((f) => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SettingRow>
        </div>
      </div>

      {/* Layout Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Layout
        </h4>
        
        <div className="space-y-3">
          <SettingRow label="Density" lockKey="density" locked={locks.density} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'compact', label: 'Compact' },
                { value: 'balanced', label: 'Balanced' },
                { value: 'spacious', label: 'Spacious' },
              ]}
              value={density}
              onChange={(v) => onDensityChange(v as Density)}
            />
          </SettingRow>
          
          <SettingRow label="Mood" lockKey="mood" locked={locks.mood} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'serious', label: 'Serious' },
                { value: 'neutral', label: 'Neutral' },
                { value: 'friendly', label: 'Friendly' },
              ]}
              value={mood}
              onChange={(v) => onMoodChange(v as Mood)}
            />
          </SettingRow>
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Components
        </h4>
        
        <div className="space-y-3">
          <SettingRow label="Buttons" lockKey="buttons" locked={locks.buttons} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'sharp', label: 'Sharp' },
                { value: 'rounded', label: 'Rounded' },
                { value: 'pill', label: 'Pill' },
              ]}
              value={buttonStyle}
              onChange={(v) => onButtonStyleChange(v as ButtonStyle)}
            />
          </SettingRow>
          
          <SettingRow label="Cards" lockKey="cards" locked={locks.cards} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'bordered', label: 'Bordered' },
                { value: 'elevated', label: 'Elevated' },
                { value: 'flat', label: 'Flat' },
              ]}
              value={cardStyle}
              onChange={(v) => onCardStyleChange(v as CardStyle)}
            />
          </SettingRow>
          
          <SettingRow label="Inputs" lockKey="inputs" locked={locks.inputs} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'outlined', label: 'Outlined' },
                { value: 'filled', label: 'Filled' },
                { value: 'underlined', label: 'Underlined' },
              ]}
              value={inputStyle}
              onChange={(v) => onInputStyleChange(v as InputStyle)}
            />
          </SettingRow>
          
          <SettingRow label="Navigation" lockKey="navigation" locked={locks.navigation} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'solid', label: 'Solid' },
                { value: 'transparent', label: 'Transparent' },
                { value: 'bordered', label: 'Bordered' },
              ]}
              value={navStyle}
              onChange={(v) => onNavStyleChange(v as NavStyle)}
            />
          </SettingRow>
          
          <SettingRow label="Modals" lockKey="modals" locked={locks.modals} onToggleLock={onToggleLock}>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'centered', label: 'Centered' },
                { value: 'slide-in', label: 'Slide-in' },
              ]}
              value={modalStyle}
              onChange={(v) => onModalStyleChange(v as ModalStyle)}
            />
          </SettingRow>
        </div>
      </div>
    </div>
  );
};
