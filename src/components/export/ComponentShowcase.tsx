import { cn } from '@/lib/utils';
import { styles } from '@/data/styles';
import type { ExportPageState } from '@/types/export';

interface ComponentShowcaseProps {
  state: ExportPageState;
  darkMode: boolean;
}

const DENSITY_SCALE = { compact: 0.7, balanced: 1, spacious: 1.4 };
const MOOD_RADIUS_BOOST = { serious: -2, neutral: 0, friendly: 4 };

export const ComponentShowcase = ({ state, darkMode }: ComponentShowcaseProps) => {
  const { buttonStyle, cardStyle, inputStyle, navStyle, modalStyle, brandColor, density, mood } = state;

  const stylePreset = styles.find(s => s.id === state.style);
  const baseShadow = stylePreset?.tokens.shadows.default || '0 1px 3px rgba(0,0,0,0.1)';
  const isBrutalist = state.style === 'brutalist';
  const isPlayful = state.style === 'playful';

  // Density: scale spacing
  const d = DENSITY_SCALE[density];
  const sp = (base: number) => Math.round(base * d);

  // Mood: adjust radii
  const moodBoost = MOOD_RADIUS_BOOST[mood];

  const formatLabel = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const getButtonRadius = () => {
    if (isBrutalist) return '0px';
    const base = buttonStyle === 'sharp' ? 0 : buttonStyle === 'pill' ? 9999 : (isPlayful ? 12 : 8);
    return `${Math.max(0, base + moodBoost)}px`;
  };

  const getButtonClasses = () => {
    const base = `font-medium transition-colors`;
    if (isBrutalist) return cn(base, 'border-2 border-black');
    return base;
  };

  const getCardRadius = () => {
    if (isBrutalist) return '0px';
    const base = isPlayful ? 16 : parseInt(stylePreset?.tokens.radius.default || '8');
    return `${Math.max(0, base + moodBoost)}px`;
  };

  const getCardStyle = (): React.CSSProperties => {
    const style: React.CSSProperties = { borderRadius: getCardRadius() };
    if (isBrutalist) {
      style.border = '2px solid #000';
      style.boxShadow = stylePreset?.tokens.shadows.default;
      return style;
    }
    switch (cardStyle) {
      case 'elevated':
        style.boxShadow = baseShadow;
        break;
      case 'bordered':
        style.border = `1px solid ${stylePreset?.tokens.colors.border || '#e5e7eb'}`;
        break;
      case 'flat':
        break;
    }
    return style;
  };

  const getInputClasses = () => {
    const base = 'w-full text-sm';
    switch (inputStyle) {
      case 'outlined': return cn(base, 'border border-border bg-transparent', `rounded-[${getCardRadius()}]`);
      case 'filled': return cn(base, 'border-0 bg-muted', `rounded-[${getCardRadius()}]`);
      case 'underlined': return cn(base, 'border-0 border-b border-border bg-transparent rounded-none');
    }
  };

  const btnRadius = getButtonRadius();
  const btnPadding = `${sp(8)}px ${sp(16)}px`;

  return (
    <div
      className={cn('space-y-8', darkMode ? 'bg-slate-900 text-slate-100' : 'bg-background text-foreground')}
      style={{
        fontFamily: stylePreset?.tokens.typography.fontFamily + ', system-ui, sans-serif',
        padding: `${sp(24)}px`,
      }}
    >
      {/* Style indicator */}
      <div className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
        <span className="text-sm font-medium">Style: {stylePreset?.name}</span>
        <span className="text-xs text-muted-foreground">
          {density} · {mood} · {stylePreset?.tokens.typography.fontFamily}
        </span>
      </div>

      {/* Buttons Section */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: sp(16) }}>
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>Buttons</h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            {formatLabel(buttonStyle)}
          </span>
        </div>
        <div className="flex flex-wrap" style={{ gap: sp(12) }}>
          <button
            className={getButtonClasses()}
            style={{ backgroundColor: brandColor, color: 'white', borderRadius: btnRadius, padding: btnPadding }}
          >
            Primary
          </button>
          <button
            className={cn(getButtonClasses(), 'border border-current')}
            style={{ color: brandColor, borderRadius: btnRadius, padding: btnPadding }}
          >
            Secondary
          </button>
          <button
            className={cn(getButtonClasses(), darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-foreground hover:bg-muted')}
            style={{ borderRadius: btnRadius, padding: btnPadding }}
          >
            Ghost
          </button>
          <button
            className="font-medium underline"
            style={{ color: brandColor, padding: btnPadding }}
          >
            Link →
          </button>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Cards Section */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: sp(16) }}>
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>Cards</h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            {formatLabel(cardStyle)}
          </span>
        </div>
        <div className="grid grid-cols-2" style={{ gap: sp(16) }}>
          <div className={cn(darkMode ? 'bg-slate-800' : 'bg-background')} style={{ ...getCardStyle(), padding: sp(16) }}>
            <div className="flex items-center gap-2" style={{ marginBottom: sp(8) }}>
              <span>⚡</span>
              <span className="font-medium">Feature Title</span>
            </div>
            <p className={cn('text-sm', darkMode ? 'text-slate-400' : 'text-muted-foreground')} style={{ marginBottom: sp(12) }}>
              A short description of this feature.
            </p>
            <button className="text-sm font-medium" style={{ color: brandColor }}>Learn More</button>
          </div>
          <div className={cn(darkMode ? 'bg-slate-800' : 'bg-background')} style={{ ...getCardStyle(), padding: sp(16) }}>
            <div className="flex items-center gap-2" style={{ marginBottom: sp(8) }}>
              <span>💰</span>
              <span className="font-medium">Pro Plan</span>
            </div>
            <p className={cn('text-lg font-bold', darkMode ? 'text-slate-100' : 'text-foreground')} style={{ marginBottom: sp(4) }}>$99/month</p>
            <p className={cn('text-sm', darkMode ? 'text-slate-400' : 'text-muted-foreground')} style={{ marginBottom: sp(12) }}>Everything you need</p>
            <button
              className={cn(getButtonClasses(), 'w-full text-center')}
              style={{ backgroundColor: brandColor, color: 'white', borderRadius: btnRadius, padding: btnPadding }}
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Inputs Section */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: sp(16) }}>
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>Inputs</h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            {formatLabel(inputStyle)}
          </span>
        </div>
        <div className="grid grid-cols-2" style={{ gap: sp(16), marginBottom: sp(16) }}>
          <input
            className={cn(getInputClasses(), darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')}
            style={{ padding: `${sp(8)}px ${sp(12)}px` }}
            placeholder="Full name"
          />
          <input
            className={cn(getInputClasses(), darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')}
            style={{ padding: `${sp(8)}px ${sp(12)}px` }}
            placeholder="Email address"
          />
        </div>
        <textarea
          className={cn(getInputClasses(), 'resize-none', darkMode && 'bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500')}
          style={{ padding: `${sp(8)}px ${sp(12)}px`, height: sp(80) }}
          placeholder="Your message"
        />
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Navigation Section */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: sp(16) }}>
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>Navigation</h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            {formatLabel(navStyle)}
          </span>
        </div>
        <div
          className={cn(
            'flex items-center justify-between',
            navStyle === 'solid' && (darkMode ? 'bg-slate-800' : 'bg-muted'),
            navStyle === 'transparent' && 'bg-transparent',
            navStyle === 'bordered' && (darkMode ? 'border border-slate-600' : 'border border-border')
          )}
          style={{ padding: `${sp(12)}px ${sp(16)}px`, borderRadius: getCardRadius() }}
        >
          <span className="font-semibold">Logo</span>
          <div className={cn('flex items-center text-sm', darkMode ? 'text-slate-300' : 'text-muted-foreground')} style={{ gap: sp(16) }}>
            <span>Home</span>
            <span>Features</span>
            <span>Pricing</span>
            <span>About</span>
          </div>
          <button
            className={cn(getButtonClasses(), 'text-sm')}
            style={{ backgroundColor: brandColor, color: 'white', borderRadius: btnRadius, padding: `${sp(6)}px ${sp(14)}px` }}
          >
            Get Started
          </button>
        </div>
      </section>

      <hr className={cn(darkMode ? 'border-slate-700' : 'border-border')} />

      {/* Modals Section */}
      <section>
        <div className="flex items-center justify-between" style={{ marginBottom: sp(16) }}>
          <h3 className={cn('font-semibold', darkMode ? 'text-slate-100' : 'text-foreground')}>Modals</h3>
          <span className={cn('text-xs', darkMode ? 'text-slate-400' : 'text-muted-foreground')}>
            {formatLabel(modalStyle)}
          </span>
        </div>
        <div className="flex" style={{ gap: sp(12) }}>
          <button
            className={cn(getButtonClasses(), 'border')}
            style={{ borderColor: brandColor, color: brandColor, borderRadius: btnRadius, padding: btnPadding }}
          >
            Open Modal
          </button>
          <button
            className={cn(getButtonClasses(), 'border')}
            style={{ borderColor: brandColor, color: brandColor, borderRadius: btnRadius, padding: btnPadding }}
          >
            Open Sheet
          </button>
        </div>
      </section>
    </div>
  );
};
