import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface SegmentedControlOption {
  value: string;
  label: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
}

export const SegmentedControl = ({ 
  options, 
  value, 
  onChange,
  size = 'md'
}: SegmentedControlProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeIndex = options.findIndex(opt => opt.value === value);
    const buttons = container.querySelectorAll('button');
    const activeButton = buttons[activeIndex];

    if (activeButton) {
      setIndicatorStyle({
        left: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
      });
    }
  }, [value, options]);

  return (
    <div ref={containerRef} className="relative inline-flex rounded-full bg-muted p-0.5">
      {/* Sliding indicator */}
      <div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-background shadow-sm transition-all duration-200 ease-out"
        style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
      />
      
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 rounded-full font-medium transition-colors duration-200',
            size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
            value === option.value
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
