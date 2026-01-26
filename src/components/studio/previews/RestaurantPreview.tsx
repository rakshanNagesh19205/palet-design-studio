import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function RestaurantPreview({ page, config, style }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Playfair Display';
  
  const menuItems = [
    { name: 'Wagyu Beef Tartare', price: '$32', desc: 'Quail egg, capers, herb oil' },
    { name: 'Pan-Seared Scallops', price: '$38', desc: 'Cauliflower puree, brown butter' },
    { name: 'Duck Confit', price: '$42', desc: 'Cherry reduction, roasted vegetables' },
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
        brandName="La Maison" 
        navItems={['Home', 'Menu', 'Reservations', 'Contact']}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="text-center py-12">
            <p 
              className="text-xs uppercase tracking-[0.3em] mb-2"
              style={{ color: style.cssVars['--preview-accent'] }}
            >
              Est. 2024
            </p>
            <h1 
              className="text-4xl font-serif font-semibold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              La Maison
            </h1>
            <p 
              className="mb-8 max-w-md mx-auto"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              French fine dining in the heart of the city. Experience culinary artistry in an intimate setting.
            </p>
            <div className="flex gap-4 justify-center">
              <PreviewButton config={config} style={style}>Reserve a Table</PreviewButton>
              <PreviewButton config={config} style={style} variant="secondary">View Menu</PreviewButton>
            </div>
            
            {/* Ambiance Image */}
            <div 
              className="h-40 mt-12"
              style={{ 
                background: 'linear-gradient(135deg, #1a1a1a 0%, #333 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl mx-auto py-8 text-center">
            <h1 className="text-3xl font-serif font-semibold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Our Story</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              La Maison was born from a passion for exceptional cuisine and a belief that every meal should be a celebration.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Our chef, trained in the finest kitchens of Paris and Tokyo, brings a unique perspective to classical French techniques.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-serif font-semibold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>The Menu</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Seasonal tasting menu</p>
            <div className="space-y-4">
              {menuItems.map((item, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-serif font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{item.name}</div>
                      <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>{item.desc}</div>
                    </div>
                    <div style={{ color: style.cssVars['--preview-accent'] }}>{item.price}</div>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8 text-center">
            <h1 className="text-3xl font-serif font-semibold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Visit Us</h1>
            <PreviewCard config={config} style={style}>
              <p className="mb-2" style={{ color: style.cssVars['--preview-fg'] }}>123 Gourmet Street</p>
              <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>New York, NY 10001</p>
              <p className="text-sm mb-1" style={{ color: style.cssVars['--preview-muted'] }}>Tuesday - Sunday</p>
              <p className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>6:00 PM - 11:00 PM</p>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-serif font-semibold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Reservations</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Book your experience</p>
            <PreviewCard config={config} style={style}>
              <div className="space-y-4">
                <input 
                  placeholder="Name" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    placeholder="Date" 
                    className="px-4 py-2 text-sm"
                    style={{ 
                      borderRadius: getBorderRadius(config.borders?.radius),
                      border: `1px solid ${style.cssVars['--preview-border']}`,
                      backgroundColor: style.cssVars['--preview-bg'],
                      color: style.cssVars['--preview-fg'],
                    }}
                  />
                  <input 
                    placeholder="Guests" 
                    className="px-4 py-2 text-sm"
                    style={{ 
                      borderRadius: getBorderRadius(config.borders?.radius),
                      border: `1px solid ${style.cssVars['--preview-border']}`,
                      backgroundColor: style.cssVars['--preview-bg'],
                      color: style.cssVars['--preview-fg'],
                    }}
                  />
                </div>
                <PreviewButton config={config} style={style}>Reserve</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="La Maison" />
    </div>
  );
}
