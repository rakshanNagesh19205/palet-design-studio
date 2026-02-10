import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { DesignCanvas } from '@/components/landing/DesignCanvas';
import { WebsiteTypeScreen, StyleSelectionScreen, StudioScreen, ExportScreen } from '@/components/landing/StageScreens';

const stages = [
  { step: 1, name: 'Template', headline: 'Pick your starting point', description: "SaaS, portfolio, agency, e-commerce — choose what you're building. Spec Mode tailors everything from here.", detail: 'Each template includes smart defaults optimized for that category.' },
  { step: 2, name: 'Style', headline: 'Choose your aesthetic', description: "Swiss Precision, Soft Modern, Bold Contrast — pick a visual direction. Your spec inherits the right tokens automatically.", detail: '9 curated styles. 81 template × style combinations.' },
  { step: 3, name: 'Configure', headline: 'Fine-tune your system', description: "Colors, typography, spacing, components, motion — configure every detail visually. The preview updates live as you work.", detail: 'Every change you make becomes part of your exported spec.' },
  { step: 4, name: 'Export', headline: 'Copy. Paste. Ship.', description: "Your spec is ready. Copy it, paste it into Claude, GPT, Cursor, Lovable, Replit — any AI tool. Get exactly what you configured.", detail: 'One spec. Every platform. Consistent results.' }
];

const features = [
  { icon: '◇', title: 'Visual-First Configuration', description: 'See before you specify. Click, adjust, done.' },
  { icon: '⬡', title: 'Works with Any AI', description: 'Claude, GPT, Cursor, Lovable, Replit, v0 — one spec, every platform.' },
  { icon: '▣', title: '81 Starting Points', description: "Templates × styles = combinations. Don't start from scratch." }
];

const waitlistFeatures = ['More styles with AI', 'More templates with AI', 'AI-powered Studio', 'Generate from inspiration', 'Connections', 'Code export'];

const Landing = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [email, setEmail] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHeaderCTA, setShowHeaderCTA] = useState(true);
  
  const ctaSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeaderCTA(!entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ctaSectionRef.current) {
      observer.observe(ctaSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(prev => prev.filter(f => f !== feature));
    } else if (selectedFeatures.length < 3) {
      setSelectedFeatures(prev => [...prev, feature]);
    }
  };

  const stageScreens = [
    <WebsiteTypeScreen key="type" />, 
    <StyleSelectionScreen key="style" />, 
    <StudioScreen key="studio" />, 
    <ExportScreen key="export" />
  ];

  return (
    <div className="min-h-screen bg-[#1a1215]" style={{ fontFamily: "'Public Sans', system-ui, sans-serif" }}>
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#1a1215]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-white font-semibold">Palet</span>
          </div>

          {/* Nav + Actions */}
          <div className="flex items-center gap-8">
            <nav 
              className="flex items-center gap-8 transition-transform duration-300"
              style={{ transform: !showHeaderCTA ? 'translateX(60px)' : 'translateX(0)' }}
            >
              {['Features', 'Docs', 'About'].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-muted-foreground text-sm hover:text-white transition-colors">
                  {link}
                </a>
              ))}
              <Link to="/auth/signin" className="text-slate-900 bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                Sign In
              </Link>
            </nav>
            
            <Link 
              to="/auth/signup"
              className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              style={{
                opacity: showHeaderCTA ? 1 : 0,
                transform: showHeaderCTA ? 'translateX(0)' : 'translateX(20px)',
                pointerEvents: showHeaderCTA ? 'auto' : 'none'
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="px-6 py-[100px] max-w-[1280px] mx-auto">
        <div className="flex items-center gap-16">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-[520px]">
            <h1 className="text-[60px] font-bold text-white leading-[1.05] tracking-tight mb-2">
              Spec Mode
            </h1>
            <h1 className="text-[60px] font-bold text-primary leading-[1.05] tracking-tight mb-7">
              for AI coding.
            </h1>

            <div className="mb-9">
              <p className="text-muted-foreground text-lg">Stop describing. Start configuring.</p>
              <p className="text-muted-foreground text-lg">Enter Spec Mode. Exit with a prompt that works everywhere.</p>
            </div>

            <Link 
              to="/auth/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-white rounded-lg text-[15px] font-semibold hover:bg-primary/90 transition-colors"
            >
              Enter Spec Mode →
            </Link>
          </div>

          {/* Right: Browser Mockup with Design Canvas */}
          <div className="flex-1">
            <div className="bg-white rounded-xl border border-gray-200 shadow-2xl overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-[#f9fafb] px-4 py-2.5 border-b border-gray-200 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>🔒</span>
                    <span className="font-mono">palet-studio.config</span>
                  </div>
                </div>
                <div className="w-12" />
              </div>

              {/* Design Canvas Content */}
              <div className="h-[340px]">
                <DesignCanvas />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 max-w-[1120px] mx-auto">
        <div className="flex justify-center gap-2 mb-12">
          {stages.map((stage, i) => (
            <button 
              key={stage.name} 
              onClick={() => setCurrentStage(i)} 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                i === currentStage 
                  ? 'border-primary/30 bg-primary/10' 
                  : 'border-transparent hover:bg-white/5'
              }`}
            >
              <div className={`w-6 h-6 rounded-full text-xs font-medium flex items-center justify-center ${
                i <= currentStage ? 'bg-primary text-white' : 'bg-white/10 text-gray-500'
              }`}>
                {stage.step}
              </div>
              <span className={`text-sm ${i === currentStage ? 'font-medium text-white' : 'text-gray-500'}`}>
                {stage.name}
              </span>
            </button>
          ))}
        </div>
        
        <div className="flex gap-12 items-center">
          <div className="flex-1 max-w-[480px]">
            <div className="text-primary text-xs font-medium tracking-wider uppercase mb-3">
              STEP {stages[currentStage].step} OF 4
            </div>
            <h2 className="text-white text-[32px] font-bold tracking-tight mb-4">
              {stages[currentStage].headline}
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {stages[currentStage].description}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              {stages[currentStage].detail}
            </p>
            <div className="flex gap-3 mt-8">
              <button 
                onClick={() => setCurrentStage(Math.max(0, currentStage - 1))} 
                disabled={currentStage === 0}
                className={`w-10 h-10 rounded-lg text-sm ${
                  currentStage === 0 
                    ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                ←
              </button>
              <button 
                onClick={() => setCurrentStage(Math.min(3, currentStage + 1))} 
                disabled={currentStage === 3}
                className={`w-10 h-10 rounded-lg text-sm ${
                  currentStage === 3 
                    ? 'bg-white/5 text-gray-600 cursor-not-allowed' 
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                →
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-[#2a1e21] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
              <div className="bg-[#1a1215] px-4 py-2.5 border-b border-white/5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/5 px-3 py-1 rounded-lg flex items-center gap-1.5">
                    <span className="text-xs">🔒</span>
                    <span className="text-gray-500 text-xs">palet.design/studio</span>
                  </div>
                </div>
              </div>
              <div className="h-[320px] relative overflow-hidden">
                {stageScreens.map((screen, i) => (
                  <div 
                    key={i} 
                    className="absolute inset-0 transition-all duration-400"
                    style={{
                      opacity: i === currentStage ? 1 : 0,
                      transform: `translateX(${(i - currentStage) * 30}px)`,
                      pointerEvents: i === currentStage ? 'auto' : 'none'
                    }}
                  >
                    {screen}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-10 max-w-[1120px] mx-auto">
        <h2 className="text-white text-[32px] font-bold mb-8">Features</h2>
        <div className="grid grid-cols-3 gap-6">
          {features.map((feature) => (
            <div key={feature.title} className="bg-white/[0.03] border border-white/5 rounded-xl p-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-red-400 text-xl">
                {feature.icon}
              </div>
              <h3 className="text-white text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{feature.description}</p>
              <a href="#" className="text-gray-500 text-[13px] hover:text-gray-400 transition-colors">
                Explore docs →
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaSectionRef} className="px-6 py-6 pb-20 max-w-[1120px] mx-auto">
        <div className="bg-gradient-to-r from-[#3a2228] to-[#2a1e21] border border-white/5 rounded-2xl p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/15 rounded-full blur-[40px]" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-primary/15 rounded-full blur-[40px]" />
          
          <h2 className="text-white text-[32px] font-bold mb-3 relative z-10">Ready to enter Spec Mode?</h2>
          <p className="text-muted-foreground text-lg mb-2 relative z-10">Configure once. Generate everywhere.</p>
          <p className="text-gray-600 text-sm mb-8 relative z-10">Your first spec takes 3 minutes.</p>
          
          <Link 
            to="/auth/signup"
            className="inline-block bg-primary text-white px-9 py-3.5 rounded-lg text-[15px] font-semibold relative z-10 transition-all duration-300"
            style={{
              opacity: !showHeaderCTA ? 1 : 0.9,
              transform: !showHeaderCTA ? 'scale(1.05)' : 'scale(1)',
              boxShadow: !showHeaderCTA ? '0 0 30px rgba(239, 68, 68, 0.4)' : 'none'
            }}
          >
            Enter Spec Mode →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-16 max-w-[1120px] mx-auto">
        <div className="grid grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-semibold">Palet</span>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <div className="flex flex-col gap-2">
              <a href="#features" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Features</a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Resources</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Docs</a>
              <a href="/about" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">About</a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Feedback</a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-gray-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-12 mb-12">
          {!isSubmitted ? (
            <>
              <h3 className="text-white text-lg font-semibold mb-2">Stay in the loop</h3>
              <p className="text-gray-500 text-sm mb-6">Be the first to know about updates.</p>
              <div className="max-w-[480px]">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-sm mb-4 focus:outline-none focus:border-primary/50 placeholder:text-gray-500"
                />
                <p className="text-muted-foreground text-[13px] mb-3">What features are you most excited about? (pick up to 3)</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {waitlistFeatures.map((feature) => { 
                    const isSelected = selectedFeatures.includes(feature); 
                    const isDisabled = !isSelected && selectedFeatures.length >= 3; 
                    return (
                      <button 
                        key={feature} 
                        onClick={() => !isDisabled && toggleFeature(feature)} 
                        disabled={isDisabled}
                        className={`px-3 py-2 rounded-md text-[13px] transition-colors ${
                          isSelected 
                            ? 'bg-primary/10 border border-primary/30 text-red-400' 
                            : 'bg-white/5 border border-white/10 text-muted-foreground'
                        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-white/20'}`}
                      >
                        {feature}
                      </button>
                    ); 
                  })}
                </div>
                <button 
                  onClick={() => email && setIsSubmitted(true)} 
                  disabled={!email}
                  className={`px-6 py-3 bg-primary text-white rounded-lg text-sm font-medium transition-opacity ${
                    email ? 'hover:bg-primary/90' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  Join Waitlist
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-400 text-2xl">
                ✓
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">You're on the list!</h3>
              <p className="text-gray-500 text-sm">We'll be in touch when something exciting happens.</p>
            </div>
          )}
        </div>
        
        <div className="border-t border-white/5 pt-6 flex justify-between items-center">
          <p className="text-gray-500 text-[13px]">© 2026 Palet Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
