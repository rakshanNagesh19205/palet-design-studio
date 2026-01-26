import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function NonprofitPreview({ page, config, style }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const programs = [
    { name: 'Education Access', impact: '5,000 students', icon: '📚' },
    { name: 'Clean Water', impact: '20 communities', icon: '💧' },
    { name: 'Healthcare', impact: '10,000 patients', icon: '❤️' },
  ];
  
  return (
    <div 
      className="min-h-full flex flex-col"
      style={{ 
        backgroundColor: style.cssVars['--preview-bg'],
        fontFamily: font,
      }}
    >
      <PreviewHeader 
        config={config} 
        style={style} 
        brandName="Hope Foundation" 
        navItems={['Mission', 'Programs', 'Impact', 'Donate']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="text-center py-8">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              Building a better world, together
            </h1>
            <p 
              className="text-lg mb-8 max-w-lg mx-auto"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              We're dedicated to creating lasting change through education, healthcare, and community development.
            </p>
            <div className="flex gap-4 justify-center">
              <PreviewButton config={config} style={style}>Donate Now</PreviewButton>
              <PreviewButton config={config} style={style} variant="secondary">Learn More</PreviewButton>
            </div>
            
            {/* Impact Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {['$2.5M', '15K+', '12'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Raised', 'Lives Changed', 'Countries'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Our Mission</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              Hope Foundation was founded in 2010 with a simple belief: everyone deserves access to education, healthcare, and opportunity.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Today, we work in 12 countries with local partners to create sustainable, community-led solutions.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Our Programs</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Making a difference where it matters</p>
            <div className="space-y-4 max-w-xl mx-auto">
              {programs.map((program, i) => (
                <PreviewCard key={i} config={config} style={style} className="flex items-center gap-4">
                  <div className="text-3xl">{program.icon}</div>
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{program.name}</div>
                    <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>{program.impact} reached</div>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Contact Us</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Get involved or ask questions</p>
            <PreviewCard config={config} style={style}>
              <div className="space-y-4">
                <input 
                  placeholder="Your name" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <input 
                  placeholder="Your email" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Send Message</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="max-w-md mx-auto py-8 text-center">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Make a Donation</h1>
            <p className="mb-8" style={{ color: style.cssVars['--preview-muted'] }}>100% of your donation goes to programs</p>
            <PreviewCard config={config} style={style}>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {['$25', '$50', '$100'].map(amount => (
                  <button
                    key={amount}
                    className="py-2 text-sm font-medium"
                    style={{ 
                      border: `2px solid ${style.cssVars['--preview-accent']}`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                      color: style.cssVars['--preview-accent'],
                      backgroundColor: 'transparent',
                    }}
                  >
                    {amount}
                  </button>
                ))}
              </div>
              <PreviewButton config={config} style={style}>Donate Now</PreviewButton>
            </PreviewCard>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="Hope Foundation" />
    </div>
  );
}
