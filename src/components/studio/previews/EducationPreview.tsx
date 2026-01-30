import { TemplatePreviewProps, PreviewHeader, PreviewFooter, PreviewButton, PreviewCard, getBorderRadius } from './shared';

export function EducationPreview({ page, config, style, navigation, pages }: TemplatePreviewProps) {
  const font = config.typography?.fontFamily || 'Inter';
  
  const courses = [
    { name: 'Design Fundamentals', level: 'Beginner', duration: '6 weeks', students: '2.4k' },
    { name: 'Advanced UI Patterns', level: 'Advanced', duration: '8 weeks', students: '1.2k' },
    { name: 'Design Systems', level: 'Intermediate', duration: '4 weeks', students: '890' },
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
        brandName="LearnHub" 
        navItems={['Courses', 'Paths', 'About', 'Sign In']}
        navigation={navigation}
      />
      
      <main className="flex-1 p-8">
        {page === 'home' && (
          <div className="py-8">
            <div className="max-w-xl">
              <h1 
                className="text-4xl font-bold mb-4"
                style={{ color: style.cssVars['--preview-fg'] }}
              >
                Learn design from industry experts
              </h1>
              <p 
                className="text-lg mb-8"
                style={{ color: style.cssVars['--preview-muted'] }}
              >
                Practical courses taught by designers at top companies.
              </p>
              <PreviewButton config={config} style={style}>Browse Courses</PreviewButton>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {['50+', '10k+', '4.9'].map((stat, i) => (
                <PreviewCard key={i} config={config} style={style} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: style.cssVars['--preview-accent'] }}>{stat}</div>
                  <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>
                    {['Courses', 'Students', 'Rating'][i]}
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'about' && (
          <div className="max-w-xl py-8">
            <h1 className="text-3xl font-bold mb-4" style={{ color: style.cssVars['--preview-fg'] }}>About LearnHub</h1>
            <p className="mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
              LearnHub was founded with a simple mission: make world-class design education accessible to everyone.
            </p>
            <p style={{ color: style.cssVars['--preview-muted'] }}>
              Our instructors are practicing designers at companies like Google, Apple, and Figma.
            </p>
          </div>
        )}
        
        {page === 'services' && (
          <div className="py-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: style.cssVars['--preview-fg'] }}>All Courses</h1>
            <p className="mb-6" style={{ color: style.cssVars['--preview-muted'] }}>Choose your learning path</p>
            <div className="space-y-4">
              {courses.map((course, i) => (
                <PreviewCard key={i} config={config} style={style} className="flex gap-4">
                  <div 
                    className="w-20 h-20 shrink-0 flex items-center justify-center"
                    style={{ 
                      background: `linear-gradient(135deg, ${['#667eea', '#f093fb', '#43e97b'][i]} 0%, ${['#764ba2', '#f5576c', '#38f9d7'][i]} 100%)`,
                      borderRadius: getBorderRadius(config.borders?.radius),
                    }}
                  >
                    <span className="text-white text-2xl">▶</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium" style={{ color: style.cssVars['--preview-fg'] }}>{course.name}</div>
                    <div className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>{course.level} · {course.duration}</div>
                    <div className="text-xs mt-1" style={{ color: style.cssVars['--preview-accent'] }}>{course.students} students</div>
                  </div>
                </PreviewCard>
              ))}
            </div>
          </div>
        )}
        
        {page === 'contact' && (
          <div className="max-w-md mx-auto py-8">
            <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: style.cssVars['--preview-fg'] }}>Contact Us</h1>
            <p className="text-center mb-8" style={{ color: style.cssVars['--preview-muted'] }}>Questions about courses?</p>
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
                  placeholder="Your question" 
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
            <div className="mb-4">
              <span className="text-sm" style={{ color: style.cssVars['--preview-muted'] }}>← Back to Courses</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div 
                className="h-48 flex items-center justify-center"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: getBorderRadius(config.borders?.radius),
                }}
              >
                <span className="text-white text-4xl">▶</span>
              </div>
              <div>
                <span className="text-xs" style={{ color: style.cssVars['--preview-accent'] }}>Beginner · 6 weeks</span>
                <h1 className="text-2xl font-bold mt-1 mb-2" style={{ color: style.cssVars['--preview-fg'] }}>Design Fundamentals</h1>
                <p className="text-sm mb-4" style={{ color: style.cssVars['--preview-muted'] }}>
                  Master the core principles of visual design, from typography to color theory.
                </p>
                <PreviewButton config={config} style={style}>Enroll Now - $99</PreviewButton>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <PreviewFooter config={config} style={style} brandName="LearnHub" />
    </div>
  );
}
