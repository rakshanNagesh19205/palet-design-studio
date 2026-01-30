import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function PersonalPreview({ page, config, style, navigation, pages }: TemplatePreviewProps) {
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
        brandName="Jordan Lee" 
        navItems={['About', 'Portfolio', 'Blog', 'Contact']}
        navigation={navigation}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="py-8">
            <div className="flex gap-8 items-center">
              <div 
                className="w-24 h-24 shrink-0"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '50%',
                }}
              />
              <div>
                <h1 
                  className="text-3xl font-bold mb-2"
                  style={{ color: style.cssVars['--preview-fg'] }}
                >
                  Hey, I'm Jordan 👋
                </h1>
                <p 
                  style={{ color: style.cssVars['--preview-muted'] }}
                >
                  Designer, writer, and maker. Building things on the internet.
                </p>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-8">
              {['Twitter', 'GitHub', 'LinkedIn', 'Dribbble'].map(social => (
                <span 
                  key={social}
                  className="px-3 py-1 text-sm"
                  style={{ 
                    backgroundColor: style.cssVars['--preview-card-bg'],
                    color: style.cssVars['--preview-muted'],
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                  }}
                >
                  {social}
                </span>
              ))}
            </div>
            
            {/* Recent Work */}
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Recent Work</h2>
              <div className="grid grid-cols-2 gap-4">
                {['App Design', 'Brand Identity'].map((work, i) => (
                  <PreviewCard key={i} config={config} style={style}>
                    <div 
                      className="h-24 mb-3"
                      style={{ 
                        background: `linear-gradient(135deg, ${['#667eea', '#f093fb'][i]} 0%, ${['#764ba2', '#f5576c'][i]} 100%)`,
                        borderRadius: getBorderRadius(config.borders?.radius),
                      }}
                    />
                    <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{work}</div>
                  </PreviewCard>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About Me</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              I'm a designer and developer with 10+ years of experience building digital products.
            </p>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              Currently, I'm focused on creating tools that help other creators do their best work.
            </p>
            <PreviewButton config={config} style={style}>Download Resume</PreviewButton>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-6" style={{ color: style.cssVars['--preview-fg'] }}>Portfolio</h1>
            <div className="grid grid-cols-2 gap-4">
              {['App Design', 'Brand Identity', 'Web Design', 'Illustration'].map((work, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div 
                    className="h-24 mb-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#4facfe', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#00f2fe', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{work}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>2024</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Get in Touch</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Let's work together</p>
            <PreviewCard config={config} style={style}>
              <div className="space-y-4">
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
                <textarea 
                  placeholder="Your message" 
                  rows={3}
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
              <span className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>← Back to Portfolio</span>
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>App Design</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Mobile app UI for a fintech startup</p>
            <div 
              className="h-48 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Designed a complete mobile banking experience focusing on simplicity and trust.
            </p>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="Jordan Lee" />
    </div>
  );
}
