import { cn } from '@/lib/utils';
import type { ExportPageState } from '@/types/export';

interface ComponentShowcaseProps {
  state: ExportPageState;
  darkMode: boolean;
}

export const ComponentShowcase = ({ state, darkMode }: ComponentShowcaseProps) => {
  const { buttonStyle, cardStyle, inputStyle, navStyle, modalStyle, brandColor } = state;

  const formatLabel = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getButtonClasses = () => {
    const base = 'px-4 py-2 font-medium transition-colors';
    switch (buttonStyle) {
      case 'sharp': return cn(base, 'rounded-none');
      case 'rounded': return cn(base, 'rounded-md');
      case 'pill': return cn(base, 'rounded-full');
    }
  };

  const getCardClasses = () => {
    const base = 'p-4 bg-background';
    switch (cardStyle) {
      case 'bordered': return cn(base, 'border border-border rounded-lg');
      case 'elevated': return cn(base, 'shadow-lg rounded-lg');
      case 'flat': return cn(base, 'rounded-lg');
    }
  };

  const getInputClasses = () => {
    const base = 'w-full px-3 py-2 text-sm';
    switch (inputStyle) {
      case 'outlined': return cn(base, 'border border-border rounded-md bg-transparent');
      case 'filled': return cn(base, 'border-0 bg-muted rounded-md');
      case 'underlined': return cn(base, 'border-0 border-b border-border bg-transparent rounded-none');
    }
  };

  return (
    <div className={cn(
      'p-6 space-y-8',
      darkMode ? 'bg-slate-900 text-slate-100' : 'bg-background text-foreground'
    )}>
      {/* Buttons Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>
            Buttons
          </h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            Selected: {formatLabel(buttonStyle)}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            className={getButtonClasses()} 
            style={{ backgroundColor: brandColor, color: 'white' }}
          >
            Primary
          </button>
          <button 
            className={cn(getButtonClasses(), 'border border-current')}
            style={{ color: brandColor }}
          >
            Secondary
          </button>
          <button 
            className={cn(getButtonClasses(), darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-foreground hover:bg-muted')}
          >
            Ghost
          </button>
          <button 
            className={cn('px-4 py-2 font-medium underline')}
            style={{ color: brandColor }}
          >
            Link →
          </button>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Cards Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>
            Cards
          </h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            Selected: {formatLabel(cardStyle)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className={cn(getCardClasses(), darkMode && 'bg-slate-800')}>
            <div className="flex items-center gap-2 mb-2">
              <span>⚡</span>
              <span className="font-medium">Feature Title</span>
            </div>
            <p className={cn('text-sm mb-3', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
              A short description of this feature.
            </p>
            <button className="text-sm font-medium" style={{ color: brandColor }}>
              Learn More
            </button>
          </div>
          <div className={cn(getCardClasses(), darkMode && 'bg-slate-800')}>
            <div className="flex items-center gap-2 mb-2">
              <span>💰</span>
              <span className="font-medium">Pro Plan</span>
            </div>
            <p className={cn('text-lg font-bold mb-1', darkMode ? 'text-slate-100' : 'text-foreground')}>
              $99/month
            </p>
            <p className={cn('text-sm mb-3', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
              Everything you need
            </p>
            <button 
              className={cn(getButtonClasses(), 'w-full text-center')}
              style={{ backgroundColor: brandColor, color: 'white' }}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Inputs Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>
            Inputs
          </h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            Selected: {formatLabel(inputStyle)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            className={cn(getInputClasses(), darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')} 
            placeholder="Full name" 
          />
          <input 
            className={cn(getInputClasses(), darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')} 
            placeholder="Email address" 
          />
        </div>
        <textarea 
          className={cn(getInputClasses(), 'h-20 resize-none', darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')} 
          placeholder="Your message" 
        />
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Navigation Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>
            Navigation
          </h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            Selected: {formatLabel(navStyle)}
          </span>
        </div>
        <div className={cn(
          'flex items-center justify-between px-4 py-3 rounded-lg',
          navStyle === 'solid' && (darkMode ? 'bg-slate-800' : 'bg-muted'),
          navStyle === 'transparent' && 'bg-transparent',
          navStyle === 'bordered' && (darkMode ? 'border border-slate-600' : 'border border-border')
        )}>
          <span className="font-semibold">Logo</span>
          <div className={cn('flex items-center gap-4 text-sm', darkMode ? 'text-slate-300' : 'text-muted-foreground')}>
            <span>Home</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
          <button 
            className={cn(getButtonClasses(), 'text-sm')}
            style={{ backgroundColor: brandColor, color: 'white' }}
          >
            Get Started
          </button>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Modals Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>
            Modals
          </h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            Selected: {formatLabel(modalStyle)}
          </span>
        </div>
        <div className="flex gap-3">
          <button 
            className={cn(getButtonClasses(), 'border')}
            style={{ borderColor: brandColor, color: brandColor }}
          >
            Open Modal
          </button>
          <button 
            className={cn(getButtonClasses(), 'border')}
            style={{ borderColor: brandColor, color: brandColor }}
          >
            Open Sheet
          </button>
        </div>
      </section>
    </div>
  );
};
