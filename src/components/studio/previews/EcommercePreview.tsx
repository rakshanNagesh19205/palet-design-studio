import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius, getShadow } from './shared';

export function EcommercePreview({ page, config, style, navigation, pages }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const products = [
    { name: 'Minimal Watch', price: '$199', color: '#1a1a1a' },
    { name: 'Leather Bag', price: '$149', color: '#8b6f47' },
    { name: 'Sunglasses', price: '$89', color: '#2d3748' },
    { name: 'Sneakers', price: '$129', color: '#e2e2e2' },
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
        brandName="MINIMAL" 
        navItems={['Shop', 'Collections', 'About', 'Cart (2)']}
        navigation={navigation}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div>
            {/* Hero */}
            <div 
              className="h-48 mb-8 flex items-center justify-center"
              style={{ 
                backgroundColor: style.cssVars['--preview-card-bg'],
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>New Arrivals</h1>
                <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>Discover our latest collection</p>
                <PreviewButton config={config} style={style}>Shop Now</PreviewButton>
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="grid grid-cols-2 gap-4">
              {products.map((product, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div 
                    className="h-24 mb-3"
                    style={{ 
                      backgroundColor: product.color,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{product.name}</div>
                  <div style={{ color: style.cssVars['--preview-accent'] }}>{product.price}</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>Our Story</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              Founded in 2020, MINIMAL is dedicated to creating timeless, sustainable products that blend form and function.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Every piece is thoughtfully designed and ethically made, because we believe luxury should be responsible.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>All Products</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Browse our collection</p>
            <div className="grid grid-cols-2 gap-4">
              {[...products, ...products].slice(0, 6).map((product, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <div 
                    className="h-20 mb-3"
                    style={{ 
                      backgroundColor: product.color,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div className="font-medium text-sm" style={{ color: style.cssVars['--preview-fg'] }}>{product.name}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-accent'] }}>{product.price}</div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Contact Us</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Questions? We're here to help.</p>
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
                  placeholder="How can we help?" 
                  rows={3}
                  className="w-full px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Send</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="py-8">
            <div className="grid grid-cols-2 gap-8">
              <div 
                className="h-64"
                style={{ 
                  backgroundColor: '#1a1a1a',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
              <div>
                <h1 className="text-2xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>Minimal Watch</h1>
                <div className="text-xl mb-4" style={{ color: style.cssVars['--preview-accent'] }}>$199</div>
                <p className="mb-6 text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                  A timeless piece featuring a Japanese movement, sapphire crystal glass, and genuine leather strap.
                </p>
                <div className="flex gap-3">
                  <PreviewButton config={config} style={style}>Add to Cart</PreviewButton>
                  <PreviewButton config={config} style={style} variant="secondary">Wishlist</PreviewButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="MINIMAL" />
    </div>
  );
}
