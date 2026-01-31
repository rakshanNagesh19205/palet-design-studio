import { Monitor, Tablet, Smartphone, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { DeviceSize } from '@/types/export';
import { DARK_MODE_STYLES, DARK_DEFAULT_STYLES } from '@/types/export';

interface PreviewControlsProps {
  deviceSize: DeviceSize;
  zoom: number;
  darkMode: boolean;
  style: string;
  onDeviceChange: (device: DeviceSize) => void;
  onZoomChange: (zoom: number) => void;
  onDarkModeToggle: () => void;
}

export const PreviewControls = ({
  deviceSize,
  zoom,
  darkMode,
  style,
  onDeviceChange,
  onZoomChange,
  onDarkModeToggle,
}: PreviewControlsProps) => {
  const showDarkModeToggle = DARK_MODE_STYLES.includes(style) || DARK_DEFAULT_STYLES.includes(style);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onDeviceChange('mobile')}
          className={cn(
            'p-2 rounded-md transition-colors',
            deviceSize === 'mobile'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
          title="Mobile (375px)"
        >
          <Smartphone className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDeviceChange('tablet')}
          className={cn(
            'p-2 rounded-md transition-colors',
            deviceSize === 'tablet'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
          title="Tablet (768px)"
        >
          <Tablet className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDeviceChange('desktop')}
          className={cn(
            'p-2 rounded-md transition-colors',
            deviceSize === 'desktop'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
          title="Desktop (1280px)"
        >
          <Monitor className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <Select value={String(zoom)} onValueChange={(v) => onZoomChange(Number(v))}>
          <SelectTrigger className="w-20 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50">50%</SelectItem>
            <SelectItem value="75">75%</SelectItem>
            <SelectItem value="100">100%</SelectItem>
          </SelectContent>
        </Select>

        {showDarkModeToggle && (
          <button
            onClick={onDarkModeToggle}
            className="p-2 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
};
