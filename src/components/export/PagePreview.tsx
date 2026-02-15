import { styles } from '@/data/styles';
import { getTemplateContent } from '@/data/templateContent';
import type { ExportPageState } from '@/types/export';

interface PagePreviewProps {
  template: string;
  page: 'home' | 'features' | 'pricing' | 'about' | 'contact';
  state: ExportPageState;
  darkMode: boolean;
}

const DENSITY_SCALE = { compact: 0.7, balanced: 1, spacious: 1.4 };
const MOOD_RADIUS_BOOST = { serious: -2, neutral: 0, friendly: 4 };

export const PagePreview = ({ template, page, state, darkMode }: PagePreviewProps) => {
  const stylePreset = styles.find(s => s.id === state.style);
  const content = getTemplateContent(template);
  const fontFamily = (state.font || stylePreset?.tokens.typography.fontFamily || 'Inter') + ', system-ui, sans-serif';
  const isBrutalist = state.style === 'brutalist';
  const headingWeight = stylePreset?.tokens.typography.headingWeight || 700;

  // Density: scale all spacing
  const d = DENSITY_SCALE[state.density];
  const sp = (base: number) => Math.round(base * d);

  // Mood: adjust radii
  const moodBoost = MOOD_RADIUS_BOOST[state.mood];

  const bg = darkMode ? '#0f172a' : (stylePreset?.tokens.colors.background || '#ffffff');
  const surface = darkMode ? '#1e293b' : (stylePreset?.tokens.colors.surface || '#f8f9fa');
  const text = darkMode ? '#f8fafc' : (stylePreset?.tokens.colors.text || '#1a1a1a');
  const textMuted = darkMode ? '#94a3b8' : (stylePreset?.tokens.colors.textMuted || '#6b7280');
  const border = darkMode ? '#334155' : (stylePreset?.tokens.colors.border || '#e5e7eb');

  const baseBtnRadius = state.buttonStyle === 'sharp' ? 0
    : state.buttonStyle === 'pill' ? 9999 : 8;
  const btnRadius = isBrutalist ? '0px' : `${Math.max(0, baseBtnRadius + moodBoost)}px`;

  const baseCardRadius = isBrutalist ? 0 : parseInt(stylePreset?.tokens.radius.default || '8');
  const cardRadius = `${Math.max(0, baseCardRadius + moodBoost)}px`;

  const cardShadow = state.cardStyle === 'elevated'
    ? (stylePreset?.tokens.shadows.default || '0 1px 3px rgba(0,0,0,0.1)') : 'none';
  const cardBorderStyle = state.cardStyle === 'bordered'
    ? `1px solid ${border}` : (isBrutalist ? '2px solid #000' : 'none');

  const brutalistBtn = isBrutalist ? { border: '2px solid #000', boxShadow: '3px 3px 0 #000' } : {};

  const PrimaryBtn = ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontSize: 13, background: state.brandColor, color: '#fff', padding: `${sp(8)}px ${sp(20)}px`, borderRadius: btnRadius, fontWeight: 600, display: 'inline-block', ...brutalistBtn }}>
      {children}
    </span>
  );

  const SecondaryBtn = ({ children }: { children: React.ReactNode }) => (
    <span style={{ fontSize: 13, color: text, padding: `${sp(8)}px ${sp(20)}px`, borderRadius: btnRadius, border: `1px solid ${border}`, fontWeight: 500, display: 'inline-block' }}>
      {children}
    </span>
  );

  const Card = ({ children }: { children: React.ReactNode }) => (
    <div style={{ background: bg, borderRadius: cardRadius, padding: sp(20), boxShadow: cardShadow, border: cardBorderStyle }}>
      {children}
    </div>
  );

  const Nav = () => (
    <div style={{ background: surface, borderBottom: `1px solid ${border}`, padding: `${sp(12)}px ${sp(24)}px`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <span style={{ fontWeight: 700, fontSize: 14, color: text }}>{content.logo}</span>
      <div style={{ display: 'flex', gap: sp(16), alignItems: 'center' }}>
        {content.navLinks.map(l => (
          <span key={l} style={{ fontSize: 12, color: textMuted }}>{l}</span>
        ))}
        <span style={{ fontSize: 11, background: state.brandColor, color: '#fff', padding: `${sp(4)}px ${sp(12)}px`, borderRadius: btnRadius, fontWeight: 600, ...brutalistBtn }}>{content.cta}</span>
      </div>
    </div>
  );

  const Dot = () => (
    <div style={{ width: 32, height: 32, borderRadius: state.mood === 'serious' ? '4px' : '50%', background: state.brandColor + '22', flexShrink: 0 }} />
  );

  // ── HOME ──
  if (page === 'home') {
    const h = content.home;
    return (
      <div style={{ fontFamily, background: bg, color: text }}>
        <Nav />
        <div style={{ padding: `${sp(64)}px ${sp(32)}px`, textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: headingWeight, marginBottom: sp(12), lineHeight: 1.2 }}>{h.headline}</h1>
          <p style={{ fontSize: 15, color: textMuted, maxWidth: 420, margin: `0 auto ${sp(24)}px` }}>{h.subheadline}</p>
          <div style={{ display: 'flex', gap: sp(12), justifyContent: 'center' }}>
            <PrimaryBtn>{h.primaryCta}</PrimaryBtn>
            <SecondaryBtn>{h.secondaryCta}</SecondaryBtn>
          </div>
        </div>
        <div style={{ padding: `${sp(48)}px ${sp(32)}px`, background: surface }}>
          <h2 style={{ fontSize: 20, fontWeight: headingWeight, textAlign: 'center', marginBottom: sp(24) }}>{h.sectionTitle}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp(16), maxWidth: 640, margin: '0 auto' }}>
            {h.features.map(f => (
              <Card key={f.title}>
                <Dot />
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: sp(4), marginTop: sp(12) }}>{f.title}</h3>
                <p style={{ fontSize: 12, color: textMuted, lineHeight: 1.5 }}>{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
        <div style={{ padding: `${sp(48)}px ${sp(32)}px`, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: headingWeight, marginBottom: sp(16) }}>{h.closingHeadline}</h2>
          <PrimaryBtn>{h.closingCta}</PrimaryBtn>
        </div>
      </div>
    );
  }

  // ── FEATURES ──
  if (page === 'features') {
    const f = content.features;
    return (
      <div style={{ fontFamily, background: bg, color: text }}>
        <Nav />
        <div style={{ padding: `${sp(48)}px ${sp(32)}px`, textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: headingWeight, marginBottom: sp(8) }}>{f.headline}</h1>
          <p style={{ fontSize: 14, color: textMuted, marginBottom: sp(32) }}>{f.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp(16), maxWidth: 640, margin: '0 auto' }}>
            {f.items.map(item => (
              <Card key={item.title}>
                <Dot />
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: sp(4), marginTop: sp(12) }}>{item.title}</h3>
                <p style={{ fontSize: 12, color: textMuted, lineHeight: 1.5 }}>{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── PRICING ──
  if (page === 'pricing') {
    const p = content.pricing;
    return (
      <div style={{ fontFamily, background: bg, color: text }}>
        <Nav />
        <div style={{ padding: `${sp(48)}px ${sp(32)}px`, textAlign: 'center' }}>
          <h1 style={{ fontSize: 28, fontWeight: headingWeight, marginBottom: sp(8) }}>{p.headline}</h1>
          <p style={{ fontSize: 14, color: textMuted, marginBottom: sp(32) }}>{p.subtitle}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: sp(16), maxWidth: 640, margin: '0 auto', alignItems: 'start' }}>
            {p.plans.map((plan, i) => (
              <Card key={plan.name}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: sp(4) }}>{plan.name}</h3>
                <div style={{ fontSize: 24, fontWeight: headingWeight, color: state.brandColor, marginBottom: sp(12) }}>{plan.price}</div>
                <div style={{ textAlign: 'left' }}>
                  {plan.features.map(feat => (
                    <div key={feat} style={{ fontSize: 12, color: textMuted, padding: `${sp(4)}px 0`, borderBottom: `1px solid ${border}` }}>✓ {feat}</div>
                  ))}
                </div>
                <div style={{ marginTop: sp(16) }}>
                  {i === 1 ? <PrimaryBtn>{content.cta}</PrimaryBtn> : <SecondaryBtn>Choose</SecondaryBtn>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── ABOUT ──
  if (page === 'about') {
    const a = content.about;
    return (
      <div style={{ fontFamily, background: bg, color: text }}>
        <Nav />
        <div style={{ padding: `${sp(48)}px ${sp(32)}px`, textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: headingWeight, marginBottom: sp(16) }}>{a.headline}</h1>
          <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.7, marginBottom: sp(32) }}>{a.body}</p>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${a.stats.length}, 1fr)`, gap: sp(16) }}>
            {a.stats.map(stat => (
              <Card key={stat.label}>
                <div style={{ fontSize: 24, fontWeight: headingWeight, color: state.brandColor }}>{stat.value}</div>
                <div style={{ fontSize: 12, color: textMuted, marginTop: sp(4) }}>{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── CONTACT ──
  const c = content.contact;
  const inputRadius = state.inputStyle === 'underlined' ? '0' : cardRadius;
  return (
    <div style={{ fontFamily, background: bg, color: text }}>
      <Nav />
      <div style={{ padding: `${sp(48)}px ${sp(32)}px`, maxWidth: 480, margin: '0 auto' }}>
        <h1 style={{ fontSize: 28, fontWeight: headingWeight, marginBottom: sp(8), textAlign: 'center' }}>{c.headline}</h1>
        <p style={{ fontSize: 14, color: textMuted, marginBottom: sp(32), textAlign: 'center' }}>{c.subtitle}</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: sp(12) }}>
          {c.fields.map(field => (
            <div key={field}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: sp(4) }}>{field}</div>
              <div style={{
                height: field === 'Message' ? 80 : 36,
                borderRadius: inputRadius,
                border: state.inputStyle === 'underlined' ? 'none' : `1px solid ${border}`,
                borderBottom: state.inputStyle === 'underlined' ? `2px solid ${border}` : undefined,
                background: state.inputStyle === 'filled' ? surface : 'transparent',
              }} />
            </div>
          ))}
          <div style={{ marginTop: sp(8) }}>
            <PrimaryBtn>Send Message</PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};
