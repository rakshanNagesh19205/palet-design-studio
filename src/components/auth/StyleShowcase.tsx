export const StyleShowcase = () => {
  return (
    <div className="hidden h-full flex-col items-center justify-center bg-[#1a1215] p-12 lg:flex">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="relative max-w-md text-center">
        {/* Floating design elements */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <div className="h-16 w-16 rounded-lg bg-primary shadow-lg shadow-primary/30" />
          <div className="h-12 w-12 rounded-full border-2 border-white/20" />
          <div className="h-16 w-24 rounded-lg bg-white/10" />
        </div>
        
        <h2 className="text-heading-xl font-bold text-white">
          Design systems,
          <br />
          <span className="text-primary">made precise.</span>
        </h2>
        
        <p className="mt-4 text-body-md text-white/60">
          Configure visually. Export AI-ready specs. Ship faster.
        </p>
        
        {/* Stats or features */}
        <div className="mt-8 flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">11</div>
            <div className="text-xs text-white/50">Templates</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">9</div>
            <div className="text-xs text-white/50">Styles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">∞</div>
            <div className="text-xs text-white/50">Possibilities</div>
          </div>
        </div>
      </div>
    </div>
  );
};
