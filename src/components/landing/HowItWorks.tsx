import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const stages = [
  {
    step: 1,
    name: 'Template',
    headline: 'Pick your starting point',
    description: "SaaS, portfolio, agency, e-commerce — choose what you're building. Spec Mode tailors everything from here.",
    detail: 'Each template includes smart defaults optimized for that category.',
  },
  {
    step: 2,
    name: 'Style',
    headline: 'Choose your aesthetic',
    description: "Swiss Precision, Soft Modern, Bold Contrast — pick a visual direction. Your spec inherits the right tokens automatically.",
    detail: '9 curated styles. 81 template × style combinations.',
  },
  {
    step: 3,
    name: 'Configure',
    headline: 'Fine-tune your system',
    description: "Colors, typography, spacing, components, motion — configure every detail visually. The preview updates live as you work.",
    detail: 'Every change you make becomes part of your exported spec.',
  },
  {
    step: 4,
    name: 'Export',
    headline: 'Copy. Paste. Ship.',
    description: "Your spec is ready. Copy it, paste it into Claude, GPT, Cursor, Lovable, Replit — any AI tool. Get exactly what you configured.",
    detail: 'One spec. Every platform. Consistent results.',
  },
];

export const HowItWorks = () => {
  const [currentStage, setCurrentStage] = useState(0);
  
  const goToPrev = () => setCurrentStage((prev) => Math.max(0, prev - 1));
  const goToNext = () => setCurrentStage((prev) => Math.min(stages.length - 1, prev + 1));
  
  const stage = stages[currentStage];
  
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-display-sm font-bold text-white">How it works</h2>
          <p className="mt-4 text-body-lg text-white/60">
            From concept to code-ready specs in four simple steps
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Stage info */}
          <div className="flex flex-col justify-center">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {stage.step}
                </span>
                <span className="text-sm font-medium uppercase tracking-wide text-white/50">
                  {stage.name}
                </span>
              </div>
              
              <h3 className="text-heading-xl font-semibold text-white">
                {stage.headline}
              </h3>
              
              <p className="text-body-lg text-white/70">
                {stage.description}
              </p>
              
              <p className="text-body-md text-white/50">
                {stage.detail}
              </p>
              
              {/* Navigation */}
              <div className="flex items-center gap-4 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPrev}
                  disabled={currentStage === 0}
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToNext}
                  disabled={currentStage === stages.length - 1}
                  className="border-white/20 bg-transparent text-white hover:bg-white/10 disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                {/* Dots */}
                <div className="ml-4 flex gap-2">
                  {stages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStage(idx)}
                      className={cn(
                        'h-2 w-2 rounded-full transition-colors',
                        idx === currentStage ? 'bg-primary' : 'bg-white/20'
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right: Browser mockup */}
          <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0a0b]">
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
            </div>
            
            <div className="aspect-[4/3] bg-gradient-to-br from-[#1a1215] to-[#0d0a0b] p-6">
              {/* Stage-specific mockup content */}
              {currentStage === 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-[4/3] rounded-lg bg-white/5 p-3">
                      <div className="h-2 w-12 rounded bg-white/20" />
                      <div className="mt-2 h-1.5 w-8 rounded bg-white/10" />
                    </div>
                  ))}
                </div>
              )}
              
              {currentStage === 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {['bg-primary', 'bg-amber-500', 'bg-emerald-500', 'bg-violet-500', 'bg-white/20', 'bg-cyan-500'].map((color, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-white/5 p-3">
                      <div className={`h-full w-full rounded ${color} opacity-80`} />
                    </div>
                  ))}
                </div>
              )}
              
              {currentStage === 2 && (
                <div className="flex h-full gap-4">
                  <div className="w-32 space-y-3 rounded-lg bg-white/5 p-3">
                    <div className="h-2 w-12 rounded bg-white/20" />
                    <div className="h-6 rounded bg-white/10" />
                    <div className="h-2 w-10 rounded bg-white/20" />
                    <div className="h-6 rounded bg-white/10" />
                  </div>
                  <div className="flex-1 flex items-center justify-center rounded-lg border border-white/10">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="h-3 w-16 rounded bg-white/30" />
                      <div className="mt-2 h-2 w-24 rounded bg-white/15" />
                    </div>
                  </div>
                </div>
              )}
              
              {currentStage === 3 && (
                <div className="rounded-lg bg-white/5 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-3 w-3 rounded bg-primary" />
                    <div className="h-2 w-16 rounded bg-white/30" />
                  </div>
                  <div className="space-y-1 font-mono text-xs text-white/50">
                    <div>{"{"}</div>
                    <div className="pl-4">"colors": {"{"}</div>
                    <div className="pl-8">"primary": "<span className="text-primary">#ea2a33</span>"</div>
                    <div className="pl-4">{"},"}</div>
                    <div className="pl-4">...</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
