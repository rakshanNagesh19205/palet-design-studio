const DesignCanvas = () => (
  <div className="relative w-full h-full bg-[#f8f9fa] overflow-hidden" style={{
    backgroundImage: 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)',
    backgroundSize: '24px 24px'
  }}>
    {/* Left Sidebar Panel */}
    <div className="absolute top-4 left-4 bottom-4 w-[120px] bg-white rounded-lg shadow-lg p-3 flex flex-col gap-2">
      {/* Color swatches */}
      <div className="w-6 h-6 bg-primary rounded" />
      <div className="w-6 h-6 bg-red-200 rounded" />
      <div className="w-6 h-6 bg-gray-200 rounded" />
      
      {/* Spacer */}
      <div className="flex-1" />
      
      {/* Coordinates */}
      <div className="text-[10px] font-mono text-muted-foreground">
        <div>X: 120</div>
        <div>Y: 450</div>
      </div>
    </div>

    {/* Drag handle cursor */}
    <div className="absolute top-10 right-[60px] w-6 h-6 bg-slate-700 rounded-full border-[3px] border-white shadow-lg cursor-grab" />

    {/* Center Card with Red Guide Lines */}
    <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2">
      {/* Left Guide Line */}
      <div className="absolute -left-10 top-0 bottom-0 w-px bg-primary flex items-center">
        <span className="absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] font-mono text-primary bg-white px-1 whitespace-nowrap">
          32px
        </span>
      </div>

      {/* Right Guide Line */}
      <div className="absolute -right-10 top-0 bottom-0 w-px bg-primary flex items-center">
        <span className="absolute -right-1 top-1/2 -translate-y-1/2 rotate-90 text-[9px] font-mono text-primary bg-white px-1 whitespace-nowrap">
          32px
        </span>
      </div>

      {/* The Card */}
      <div className="w-[200px] bg-white rounded-[10px] shadow-xl p-5 border border-gray-200">
        {/* Icon */}
        <div className="w-9 h-9 bg-primary rounded-md flex items-center justify-center mb-3">
          <span className="text-white text-base">◇</span>
        </div>
        
        {/* Title skeleton */}
        <div className="h-3 bg-slate-900 rounded w-[70%] mb-2" />
        
        {/* Text skeletons */}
        <div className="h-2 bg-gray-200 rounded w-full mb-1.5" />
        <div className="h-2 bg-gray-200 rounded w-[85%] mb-4" />
        
        {/* Button skeleton */}
        <div className="h-7 bg-gray-100 rounded w-20" />
      </div>
    </div>

    {/* Top label */}
    <div className="absolute top-[60px] left-1/2 -translate-x-1/2 text-[10px] font-mono text-muted-foreground tracking-widest">
      AUTO · FILL
    </div>
  </div>
);

export { DesignCanvas };
