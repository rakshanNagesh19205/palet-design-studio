import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function BlogPreview({ page, config, style, navigation, pages }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const articles = [
    { title: 'The Future of Design Systems', date: 'Jan 15, 2024', category: 'Design' },
    { title: 'Building Accessible Interfaces', date: 'Jan 10, 2024', category: 'Development' },
    { title: 'Color Theory in Practice', date: 'Jan 5, 2024', category: 'Design' },
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
        brandName="The Journal" 
        navItems={['Articles', 'Topics', 'About', 'Subscribe']}
        navigation={navigation}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="max-w-2xl mx-auto py-8">
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ color: style.cssVars['--preview-fg'] }}
            >
              Ideas, insights, and stories
            </h1>
            <p 
              className="text-lg mb-8"
              style={{ color: style.cssVars['--preview-muted'] }}
            >
              Exploring design, development, and creativity.
            </p>
            
            {/* Featured Article */}
            <PreviewCard config={config} style={style} className="mb-8">
              <div 
                className="h-32 mb-4"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              />
              <span className="text-xs uppercase tracking-wider" style={{ color: style.cssVars['--preview-accent'] }}>Featured</span>
              <h2 className="text-xl font-bold mt-1 mb-2" style={{ color: style.cssVars['--preview-fg'] }}>The Future of Design Systems</h2>
              <p className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>A deep dive into how design systems are evolving...</p>
            </PreviewCard>
            
            {/* Article List */}
            <div className="space-y-4">
              {articles.slice(1).map((article, i) => (
                <PreviewCard key={i} config={config} style={style} className="flex gap-4">
                  <div 
                    className="w-20 h-20 shrink-0"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#f093fb', '#43e97b'][i]} 0%, ${['#f5576c', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  />
                  <div>
                    <span className="text-xs" style={{ color: style.cssVars['--preview-accent'] }}>{article.category}</span>
                    <h3 className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{article.title}</h3>
                    <span className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>{article.date}</span>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About The Journal</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              The Journal is a publication dedicated to exploring the intersection of design, technology, and human experience.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Our writers are practitioners and thinkers who share insights from their work and research.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="max-w-2xl mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>All Articles</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Browse our latest posts</p>
            <div className="space-y-4">
              {[...articles, ...articles].map((article, i) => (
                <PreviewCard key={i} config={config} style={style}>
                  <span className="text-xs" style={{ color: style.cssVars['--preview-accent'] }}>{article.category}</span>
                  <h3 className="font-medium mb-1" style={{ color: style.cssVars['--preview-fg'] }}>{article.title}</h3>
                  <span className="text-xs" style={{ color: style.cssVars['--preview-muted'] }}>{article.date}</span>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Subscribe</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Get new articles in your inbox</p>
            <PreviewCard config={config} style={style}>
              <div className="flex gap-2">
                <input 
                  placeholder="Your email" 
                  className="flex-1 px-4 py-2 text-sm"
                  style={{ 
                    borderRadius: getBorderRadius(config.borders?.radius),
                    border: `1px solid ${style.cssVars['--preview-border']}`,
                    backgroundColor: style.cssVars['--preview-bg'],
                    color: style.cssVars['--preview-fg'],
                  }}
                />
                <PreviewButton config={config} style={style}>Subscribe</PreviewButton>
              </div>
            </PreviewCard>
          </div>
        )}
        
        {page === 'detail' && (
          <div className="max-w-2xl mx-auto py-8">
            <span className="text-xs uppercase tracking-wider" style={{ color: style.cssVars['--preview-accent'] }}>Design</span>
            <h1 className="text-3xl font-bold mt-2 mb-4" style={{ color: style.cssVars['--preview-fg'] }}>The Future of Design Systems</h1>
            <p className="text-sm mb-6" style={{ color: style.cssVars['--preview-muted'] }}>January 15, 2024 · 5 min read</p>
            <div 
              className="h-40 mb-6"
              style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: getBorderRadius(config.borders?.radius),
              }}
            />
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Design systems have evolved from simple style guides to comprehensive frameworks that power entire product ecosystems. In this article, we explore what's next...
            </p>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="The Journal" />
    </div>
  );
}
