import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function RealestatePreview({ page, config, style, navigation, pages }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const properties = [
    { name: 'Modern Apartment', price: '$450,000', beds: 2, baths: 2, sqft: '1,200' },
    { name: 'Family Home', price: '$650,000', beds: 4, baths: 3, sqft: '2,400' },
    { name: 'Luxury Condo', price: '$890,000', beds: 3, baths: 2, sqft: '1,800' },
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
        brandName="HomeFind" 
        navItems={['Buy', 'Rent', 'Sell', 'Contact']}
        navigation={navigation}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div>
            {/* Search Hero */}
            <div className="text-center mb-8">
              <h1 
                className="text-3xl font-bold mb-4"
                style={{ color: style.cssVars['--preview-fg'] }}
              >
                Find your dream home
              </h1>
              <div className="flex gap-2 max-w-md mx-auto">
                <input 
                  placeholder="City, neighborhood, or ZIP" 
                  className="flex-1 px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Search</PreviewButton>
              </div>
            </div>
            
            {/* Featured Listings */}
            <div className="grid grid-cols-2 gap-4">
              {properties.slice(0, 2).map((property, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div 
                    className="h-24 mb-3"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#43e97b'][i]} 0%, ${['#764ba2', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{property.name}</div>
                  <div className="font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{property.price}</div>
                  <div className="text-xs mt-1" style={{ color: style.cssVars['--preview-muted'] }}>
                    {property.beds} bd · {property.baths} ba · {property.sqft} sqft
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About HomeFind</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              HomeFind has been helping families find their perfect homes since 2015.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {['500+', '98%', '10'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div className="text-xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Homes Sold', 'Satisfaction', 'Years'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>Listings</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Browse available properties</p>
            <div className="space-y-4">
              {properties.map((property, i) => (
                <PreviewCard key={i} config={config} style={style} className="flex gap-4">
                  <div 
                    className="w-24 h-20 shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{property.name}</div>
                    <div className="font-bold text-sm" style={{ color: style.cssVars['--preview-accent'] }}>{property.price}</div>
                    <div className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>
                      {property.beds} bd · {property.baths} ba · {property.sqft} sqft
                    </div>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Contact an Agent</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>We're here to help</p>
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
                  placeholder="Phone number" 
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Request Callback</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="py-8">
            <div className="mb-4">
              <span className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>← Back to Listings</span>
            </div>
            <div 
              className="h-40 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold" style={{ color: style.cssVars['--preview-fg'] }}>Modern Apartment</h1>
                <p className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>123 Main Street, Downtown</p>
              </div>
              <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>$450,000</div>
            </div>
            <div className="flex gap-4 mb-6">
              {['2 Bedrooms', '2 Bathrooms', '1,200 sqft'].map(detail => (
                <span key={detail} className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>{detail}</span>
              ))}
            </div>
            <PreviewButton config={config} style={style}>Schedule Tour</PreviewButton>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="HomeFind" />
    </div>
  );
}
