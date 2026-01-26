import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius, getShadow } from './shared';

export function SaasPreview({ page, config, style }: TemplatePreviewProps) {
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
        brandName="LaunchPad" 
        navItems={['Home', 'Features', 'Pricing', 'Contact']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div 
              className="inline-block px-3 py-1 text-xs font-medium mb-4 rounded-full"
              style={{ 
                backgroundColor: `${style.cssVars['--preview-accent']}20`,
                color: style.cssVars['--preview-accent'],
              }}
            >
              🚀 Now in Beta
            </div>
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              Ship Products Faster
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              The all-in-one platform for modern teams to build, deploy, and scale applications.
            </p>
            <div className="flex gap-4 justify-center">
              <PreviewButton config={config} style={style}>Get Started Free</PreviewButton>
              <PreviewButton config={config} style={style} variant="secondary">Watch Demo</PreviewButton>
            </div>
            
            {/* Dashboard mockup */}
            <PreviewCard config={config} style={style} className="mt-12">
              <div className="flex gap-3 mb-4">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-3">
                <div className="h-4 rounded w-1/3" style={{ backgroundColor: style.cssVars['--preview-border'] }} />
                <div className="h-20 rounded" style={{ backgroundColor: style.cssVars['--preview-border'] }} />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 rounded" style={{ backgroundColor: style.cssVars['--preview-border'] }} />
                  <div className="h-16 rounded" style={{ backgroundColor: style.cssVars['--preview-border'] }} />
                  <div className="h-16 rounded" style={{ backgroundColor: style.cssVars['--preview-border'] }} />
                </div>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About Us</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>
              We're on a mission to empower developers and teams to build better software, faster.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {['10K+', '50+', '99.9%'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Customers', 'Countries', 'Uptime'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'services' && (
          <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Features</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Everything you need to ship faster</p>
            <div className="grid grid-cols-2 gap-4">
              {['⚡ Fast Deploys', '🔒 Security First', '📊 Analytics', '🔄 Auto-Scaling'].map((feature, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div className="text-lg font-medium mb-2" style={{ color: style.cssVars['--preview-fg'] }}>{feature}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Get in Touch</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>We'd love to hear from you</p>
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
                  rows={4}
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
          <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Pricing</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Simple, transparent pricing</p>
            <div className="grid grid-cols-2 gap-6">
              {[{ name: 'Starter', price: '$29' }, { name: 'Pro', price: '$99' }].map((plan, i) => (
                <PreviewCard key={i} config={config} style={style} className={i === 1 ? 'ring-2' : ''}>
                  <div className="text-lg font-bold mb-1" style={{ color: style.cssVars['--preview-fg'] }}>{plan.name}</div>
                  <div className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-accent'] }}>{plan.price}<span className="text-sm font-normal">/mo</span></div>
                  <ul className="space-y-2 mb-6 text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    <li>✓ Unlimited projects</li>
                    <li>✓ 24/7 support</li>
                    <li>✓ Advanced analytics</li>
                  </ul>
                  <PreviewButton config={config} style={style} variant={i === 1 ? 'primary' : 'secondary'}>
                    Choose {plan.name}
                  </PreviewButton>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="LaunchPad" />
    </div>
  );
}
