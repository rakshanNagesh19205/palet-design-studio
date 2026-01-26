import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function PortfolioPreview({ page, config, style }: TemplatePreviewProps) {
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
        brandName="Alex Chen" 
        navItems={['Home', 'Work', 'About', 'Contact']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="py-12">
            <h1 
              className="text-5xl font-bold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              Creative<br />Designer
            </h1>
            <p 
              className="text-xl mb-8 max-w-md"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              Crafting digital experiences that inspire and engage.
            </p>
            <PreviewButton config={config} style={style}>View Work</PreviewButton>
            
            {/* Work Grid */}
            <div className="grid grid-cols-2 gap-4 mt-12">
              {[
                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
              ].map((bg, i) => (
                <div 
                  key={i}
                  className="aspect-square"
                  style={{ 
                    background: bg,
                    borderRadius: getBorderRadius(config.borders?.radius),
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About Me</h1>
            <div 
              className="w-24 h-24 rounded-full mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius) === '0px' ? '8px' : '50%',
              }}
            />
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              I'm a creative designer with 8+ years of experience crafting digital experiences for brands worldwide.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              My work spans branding, UI/UX design, and creative direction. I believe in design that not only looks beautiful but solves real problems.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-8" style={{ color: style.cssVars['--preview-fg'] }}>Selected Work</h1>
            <div className="grid grid-cols-2 gap-6">
              {['Brand Identity', 'Web Design', 'Mobile App', 'Motion'].map((project, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div 
                    className="h-32 mb-4"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{project}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>2024</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Let's Work Together</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Have a project in mind?</p>
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
          <div className="py-8">
            <div className="mb-4">
              <span className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>← Back to Work</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>Brand Identity</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Complete brand refresh for a tech startup</p>
            <div 
              className="h-48 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
            <div className="grid grid-cols-3 gap-4">
              <div 
                className="h-24"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
              <div 
                className="h-24"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
              <div 
                className="h-24"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
            </div>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="Alex Chen" />
    </div>
  );
}
