import { cn } from '@/lib/utils';
import { styles } from '@/data/styles';
import type { ExportPageState } from '@/types/export';

interface PagePreviewProps {
  template: string;
  page: 'home' | 'features' | 'pricing' | 'about' | 'contact';
  state: ExportPageState;
  darkMode: boolean;
}

export const PagePreview = ({ template, page, state, darkMode }: PagePreviewProps) => {
  const stylePreset = styles.find(s => s.id === state.style);
  const fontFamily = (stylePreset?.tokens.typography.fontFamily || 'Inter') + ', system-ui, sans-serif';
  const isBrutalist = state.style === 'brutalist';

  const bg = darkMode ? '#0f172a' : (stylePreset?.tokens.colors.background || '#ffffff');
  const surface = darkMode ? '#1e293b' : (stylePreset?.tokens.colors.surface || '#f8f9fa');
  const text = darkMode ? '#f8fafc' : (stylePreset?.tokens.colors.text || '#1a1a1a');
  const textMuted = darkMode ? '#94a3b8' : (stylePreset?.tokens.colors.textMuted || '#6b7280');
  const border = darkMode ? '#334155' : (stylePreset?.tokens.colors.border || '#e5e7eb');

  const btnRadius = state.buttonStyle === 'sharp' ? '0px'
    : state.buttonStyle === 'pill' ? '9999px' : '8px';

  const cardRadius = isBrutalist ? '0px' : (stylePreset?.tokens.radius.default || '8px');
  const cardShadow = state.cardStyle === 'elevated'
    ? (stylePreset?.tokens.shadows.default || '0 1px 3px rgba(0,0,0,0.1)')
    : 'none';
  const cardBorder = state.cardStyle === 'bordered' ? `1px solid ${border}` : 'none';

  const Nav = () => (
    <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: text }}>Logo</span>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        {['Home', 'Features', 'Pricing'].map(l => (
          <span key={l} style={{ fontSize: 12, color: textMuted }}>{l}</span>
        ))}
        <span style={{ fontSize: 11, background: state.brandColor, color: '#fff', padding: '4px 12px', borderRadius: btnRadius, fontWeight: 600 }}>Get Started</span>
      </div>
    </div>
  );

  if (page !== 'home') {
    const labels: Record<string, string> = { features: 'Features', pricing: 'Pricing', about: 'About', contact: 'Contact' };
    return (
      <div style={{ fontFamily, background: bg, minHeight: 400, color: text }}>
        <Nav />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: 28, fontWeight: stylePreset?.tokens.typography.headingWeight || 700, marginBottom: 8 }}>{labels[page]}</h2>
          <p style={{ fontSize: 14, color: textMuted }}>Preview coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily, background: bg, color: text }}>
      <Nav />

      {/* Hero */}
      <div style={{ padding: '64px 32px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, fontWeight: stylePreset?.tokens.typography.headingWeight || 700, marginBottom: 12, lineHeight: 1.2 }}>
          Build something amazing
        </h1>
        <p style={{ fontSize: 15, color: textMuted, maxWidth: 420, margin: '0 auto 24px' }}>
          The fastest way to bring your ideas to life with a professional design system.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <span style={{ fontSize: 13, background: state.brandColor, color: '#fff', padding: '8px 20px', borderRadius: btnRadius, fontWeight: 600, border: isBrutalist ? '2px solid #000' : 'none', boxShadow: isBrutalist ? '3px 3px 0 #000' : 'none' }}>
            Get Started
          </span>
          <span style={{ fontSize: 13, color: text, padding: '8px 20px', borderRadius: btnRadius, border: `1px solid ${border}`, fontWeight: 500 }}>
            Learn More
          </span>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: '48px 32px', background: surface }}>
        <h2 style={{ fontSize: 20, fontWeight: stylePreset?.tokens.typography.headingWeight || 700, textAlign: 'center', marginBottom: 24 }}>
          Everything you need
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 640, margin: '0 auto' }}>
          {['Feature One', 'Feature Two', 'Feature Three'].map(title => (
            <div key={title} style={{
              background: bg,
              borderRadius: cardRadius,
              padding: 20,
              boxShadow: cardShadow,
              border: state.cardStyle === 'bordered' ? cardBorder : (isBrutalist ? '2px solid #000' : 'none'),
            }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: state.brandColor + '22', marginBottom: 12 }} />
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{title}</h3>
              <p style={{ fontSize: 12, color: textMuted, lineHeight: 1.5 }}>A short description of this amazing feature and its benefits.</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '48px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 22, fontWeight: stylePreset?.tokens.typography.headingWeight || 700, marginBottom: 16 }}>
          Ready to get started?
        </h2>
        <span style={{ fontSize: 13, background: state.brandColor, color: '#fff', padding: '10px 24px', borderRadius: btnRadius, fontWeight: 600, display: 'inline-block', border: isBrutalist ? '2px solid #000' : 'none', boxShadow: isBrutalist ? '3px 3px 0 #000' : 'none' }}>
          Start Building
        </span>
      </div>
    </div>
  );
};
