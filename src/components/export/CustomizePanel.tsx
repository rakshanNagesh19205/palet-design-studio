import { Dices } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SegmentedControl } from '@/components/ui/segmented-control';
import { ColorPicker } from '@/components/ui/color-picker';
import { LockToggle } from '@/components/ui/lock-toggle';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  return (
    <div className="p-4 space-y-6">
      {/* Randomize Section */}
      <div className="space-y-4">
        <Button 
          onClick={onRandomize}
          variant="outline"
          className="w-full gap-2"
          size="lg"
        >
          <Dices className="h-4 w-4" />
          Randomize Unlocked
        </Button>

        <div className="grid grid-cols-3 gap-2">
          <LockToggle label="Color" locked={locks.color} onToggle={() => onToggleLock('color')} />
          <LockToggle label="Font" locked={locks.font} onToggle={() => onToggleLock('font')} />
          <LockToggle label="Density" locked={locks.density} onToggle={() => onToggleLock('density')} />
          <LockToggle label="Mood" locked={locks.mood} onToggle={() => onToggleLock('mood')} />
          <LockToggle label="Buttons" locked={locks.buttons} onToggle={() => onToggleLock('buttons')} />
          <LockToggle label="Cards" locked={locks.cards} onToggle={() => onToggleLock('cards')} />
          <LockToggle label="Inputs" locked={locks.inputs} onToggle={() => onToggleLock('inputs')} />
          <LockToggle label="Nav" locked={locks.navigation} onToggle={() => onToggleLock('navigation')} />
          <LockToggle label="Modals" locked={locks.modals} onToggle={() => onToggleLock('modals')} />
        </div>
      </div>

      {/* Brand Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Brand
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Color</span>
            <ColorPicker value={brandColor} onChange={onBrandColorChange} />
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Font</span>
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
          </div>
        </div>
      </div>

      {/* Layout Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Layout
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Density</span>
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
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Mood</span>
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
          </div>
        </div>
      </div>

      {/* Components Section */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Components
        </h4>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">Buttons</span>
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
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Cards</span>
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
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Inputs</span>
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
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Navigation</span>
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
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm">Modals</span>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'centered', label: 'Centered' },
                { value: 'slide-in', label: 'Slide-in' },
              ]}
              value={modalStyle}
              onChange={(v) => onModalStyleChange(v as ModalStyle)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
