import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function EventPreview({ page, config, style }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const speakers = [
    { name: 'Sarah Chen', role: 'CEO, TechCorp', topic: 'Future of AI' },
    { name: 'James Miller', role: 'Designer, Studio', topic: 'Design Systems' },
    { name: 'Maria Garcia', role: 'CTO, Startup', topic: 'Scaling Teams' },
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
        brandName="SUMMIT 2024" 
        navItems={['Schedule', 'Speakers', 'Tickets', 'Location']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="text-center py-8">
            <div 
              className="inline-block px-4 py-1 text-xs font-medium mb-4"
              style={{ 
                backgroundColor: style.cssVars['--preview-accent'],
                color: '#ffffff',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            >
              March 15-17, 2024
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              SUMMIT 2024
            </h1>
            <p 
              className="mb-8 max-w-md mx-auto"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              The premier conference for design and technology leaders. San Francisco, CA.
            </p>
            <PreviewButton config={config} style={style}>Get Tickets</PreviewButton>
            
            {/* Countdown */}
            <div className="flex justify-center gap-4 mt-12">
              {['45', '12', '08', '32'].map((num, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center w-16">
                  <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{num}</div>
                  <div className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Days', 'Hours', 'Mins', 'Secs'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About Summit</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              Summit brings together the world's leading designers, developers, and product leaders for three days of learning, networking, and inspiration.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {['50+', '2000+', '3 Days'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div className="text-xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Speakers', 'Attendees', 'Duration'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'services' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Schedule</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Day 1 · March 15</p>
            <div className="space-y-3">
              {['9:00 AM - Keynote', '11:00 AM - Workshop A', '2:00 PM - Panel', '4:00 PM - Networking'].map((item, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div style={{ color: style.cssVars['--preview-fg'] }}>{item}</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Location</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Moscone Center, San Francisco</p>
            <PreviewCard config={config} style={style}>
              <div 
                className="h-32 mb-4"
                style={{ 
                  backgroundColor: style.cssVars['--preview-border'],
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
              <p className="text-sm text-center" style={{ color: style.cssVars['--preview-muted'] }}>
                747 Howard Street, San Francisco, CA 94103
              </p>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Speakers</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Learn from the best</p>
            <div className="grid grid-cols-3 gap-4">
              {speakers.map((speaker, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#38f9d7'][i]} 100%)`,
                      borderRadius: '50%',
                    }}
                  />
                  <div className="font-medium text-sm" style={{ color: style.cssVars['--preview-fg'] }}>{speaker.name}</div>
                  <div className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>{speaker.role}</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="SUMMIT 2024" />
    </div>
  );
}
