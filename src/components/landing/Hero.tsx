import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


export const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center">
          {/* Version badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-sm text-white/70">v2.0 is now live</span>
          </div>
          
          {/* Headline */}
          <h1 className="text-display-lg font-bold tracking-tight text-white md:text-display-xl">
            Spec Mode
            <br />
            <span className="text-primary">for AI coding.</span>
          </h1>
          
          {/* Subtext */}
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-white/60">
            Stop describing. Start configuring.
            <br />
            Enter Spec Mode. Exit with a prompt that works everywhere.
          </p>
          
          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth/signup">
              <Button size="lg" className="gap-2 px-8">
                Enter Spec Mode →
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Browser mockup */}
        <div className="mt-20 overflow-hidden rounded-xl border border-white/10 bg-[#0d0a0b] shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <div className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 text-center">
              <span className="rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                localhost:3000/studio
              </span>
            </div>
          </div>
          
          {/* Preview content */}
          <div className="relative aspect-video bg-gradient-to-br from-[#1a1215] to-[#0d0a0b] p-8">
            {/* Grid overlay */}
            <div 
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(234,42,51,0.5) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(234,42,51,0.5) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />
            
            <div className="relative flex h-full gap-6">
              {/* Left sidebar mockup */}
              <div className="w-48 space-y-4 rounded-lg bg-white/5 p-4">
                <div className="space-y-2">
                  <div className="h-2 w-16 rounded bg-white/20" />
                  <div className="flex gap-2">
                    <div className="h-6 w-6 rounded bg-primary" />
                    <div className="h-6 w-6 rounded bg-emerald-500" />
                    <div className="h-6 w-6 rounded bg-amber-500" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-20 rounded bg-white/20" />
                  <div className="h-8 w-full rounded bg-white/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-14 rounded bg-white/20" />
                  <div className="h-8 w-full rounded bg-white/10" />
                </div>
              </div>
              
              {/* Main canvas */}
              <div className="flex-1 flex items-center justify-center">
                <div className="relative rounded-lg border border-white/20 bg-white/5 p-6 backdrop-blur">
                  {/* Measurement lines */}
                  <div className="absolute -left-8 top-0 bottom-0 flex items-center">
                    <div className="h-full w-px bg-primary/50" />
                    <div className="absolute -left-6 top-0 text-xs text-primary/70">Y: 450</div>
                  </div>
                  <div className="absolute -top-6 left-0 right-0 flex justify-center">
                    <div className="w-full h-px bg-primary/50" />
                    <div className="absolute left-0 -top-4 text-xs text-primary/70">X: 120</div>
                  </div>
                  
                  {/* Card content */}
                  <div className="w-48 space-y-3">
                    <div className="h-3 w-24 rounded bg-white/30" />
                    <div className="h-2 w-full rounded bg-white/15" />
                    <div className="h-2 w-3/4 rounded bg-white/15" />
                    <div className="h-8 w-20 rounded bg-primary" />
                  </div>
                  
                  {/* Drag cursor indicator */}
                  <div className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-white bg-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
