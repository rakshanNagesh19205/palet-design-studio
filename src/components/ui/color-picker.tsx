import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

const PRESET_COLORS = [
  '#ea2a33', '#e91e63', '#9c27b0', '#673ab7',
  '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4',
  '#009688', '#4caf50', '#8bc34a', '#cddc39',
  '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
];

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-8">
          <div 
            className="w-4 h-4 rounded border border-border"
            style={{ backgroundColor: value }}
          />
          <span className="text-xs font-mono">{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div className="grid grid-cols-8 gap-1">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => {
                  onChange(color);
                  setInputValue(color);
                }}
                className="w-6 h-6 rounded border border-border hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="h-8 text-xs font-mono"
              placeholder="#000000"
            />
            <input
              type="color"
              value={value}
              onChange={(e) => {
                onChange(e.target.value);
                setInputValue(e.target.value);
              }}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
