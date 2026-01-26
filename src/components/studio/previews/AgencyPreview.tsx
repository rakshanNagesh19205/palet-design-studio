import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function AgencyPreview({ page, config, style }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
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
        brandName="STUDIO" 
        navItems={['Work', 'Services', 'About', 'Contact']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="py-8">
            <h1 
              className="text-5xl font-bold mb-4 leading-tight"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              We Build<br />
              <span style={{ color: style.cssVars['--preview-accent'] }}>Digital</span><br />
              Experiences
            </h1>
            <p 
              className="text-lg mb-8 max-w-md"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              A creative agency focused on brand, design, and technology.
            </p>
            <PreviewButton config={config} style={style}>Start a Project</PreviewButton>
            
            {/* Featured Work */}
            <div className="mt-12">
              <div className="text-xs uppercase tracking-widest mb-4" style={{ color: style.cssVars['--preview-muted'] }}>Featured Work</div>
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="h-32"
                  style={{ 
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                    borderRadius: getBorderRadius(config.borders?.radius),
                  }}
                />
                <div 
                  className="h-32"
                  style={{ 
                    background: `linear-gradient(135deg, ${style.cssVars['--preview-accent']} 0%, ${style.cssVars['--preview-accent']}88 100%)`,
                    borderRadius: getBorderRadius(config.borders?.radius),
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About Studio</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              We're a team of designers, developers, and strategists who believe in the power of great design.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {['15+', '200+'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Years Experience', 'Projects Completed'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-8" style={{ color: style.cssVars['--preview-fg'] }}>Our Work</h1>
            <div className="space-y-4">
              {['TechCorp Rebrand', 'FinanceApp UI', 'E-commerce Platform'].map((project, i) => (
                <PreviewCard key={i} config={config} style={style} className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div>
                    <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{project}</div>
                    <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>Brand · Web · Strategy</div>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Let's Talk</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Ready to start your next project?</p>
            <PreviewCard config={config} style={style}>
              <div className="space-y-4">
                <input 
                  placeholder="Company name" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <input 
                  placeholder="Email" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Get in Touch</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="py-8">
            <div className="mb-4">
              <span className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>← Back to Work</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>TechCorp Rebrand</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Brand identity, web design, marketing</p>
            <div 
              className="h-48 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              A complete brand transformation for a leading technology company, including visual identity, web presence, and marketing materials.
            </p>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="STUDIO" />
    </div>
  );
}
