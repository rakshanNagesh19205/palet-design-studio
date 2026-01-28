const styleCards = [
  {
    name: 'Warm Minimal',
    accent: '#F97316', // orange
    bg: 'bg-white',
    border: 'border-orange-400',
  },
  {
    name: 'Cool Professional',
    accent: '#3B82F6', // blue
    bg: 'bg-white',
    border: 'border-blue-500',
  },
  {
    name: 'Forest Natural',
    accent: '#22C55E', // green
    bg: 'bg-white',
    border: 'border-green-500',
  },
  {
    name: 'Sunset Coral',
    accent: '#F43F5E', // rose/coral
    bg: 'bg-white',
    border: 'border-rose-500',
  },
  {
    name: 'Royal Purple',
    accent: '#8B5CF6', // purple
    bg: 'bg-purple-900',
    border: 'border-purple-500',
    dark: true,
  },
  {
    name: 'Monochrome',
    accent: '#374151', // gray
    bg: 'bg-gray-100',
    border: 'border-gray-400',
  },
];

const StyleCard = ({ name, accent, bg, border, dark }: {
  name: string;
  accent: string;
  bg: string;
  border: string;
  dark?: boolean;
}) => {
  const textColor = dark ? 'text-white' : 'text-gray-800';
  const subTextColor = dark ? 'text-white/60' : 'text-gray-400';
  const lineBg = dark ? 'bg-white/20' : 'bg-gray-200';
  const secondaryBtnBg = dark ? 'bg-white/20' : 'bg-gray-100';
  
  return (
    <div className={`rounded-lg ${bg} ${border} border-t-4 p-4 shadow-lg`}>
      {/* Mini header */}
      <div className="mb-3 flex items-center gap-2">
        <div 
          className="h-4 w-4 rounded" 
          style={{ backgroundColor: accent }}
        />
        <div 
          className="h-2 w-12 rounded-full" 
          style={{ backgroundColor: accent, opacity: 0.6 }}
        />
      </div>
      
      {/* Content lines */}
      <div className="mb-4 space-y-2">
        <div className={`h-2 w-full rounded ${lineBg}`} />
        <div className={`h-2 w-3/4 rounded ${lineBg}`} />
      </div>
      
      {/* Buttons */}
      <div className="flex items-center gap-2">
        <button 
          className="rounded px-3 py-1.5 text-xs font-medium text-white"
          style={{ backgroundColor: accent }}
        >
          Button
        </button>
        <button className={`rounded ${secondaryBtnBg} px-3 py-1.5 text-xs font-medium ${subTextColor}`}>
          Button
        </button>
      </div>
      
      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className={`text-xs font-medium ${textColor}`}>{name}</span>
        <div 
          className="h-2.5 w-2.5 rounded-full" 
          style={{ backgroundColor: accent }}
        />
      </div>
    </div>
  );
};

export const StyleShowcase = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#1a1215] p-8 relative overflow-hidden">
      {/* Grid background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />
      
      <div className="relative z-10 max-w-xl text-center">
        {/* Headline */}
        <h2 className="text-3xl font-bold text-white md:text-4xl">
          One config. <span className="text-primary">Every style.</span>
        </h2>
        
        <p className="mt-3 text-sm text-white/50">
          See what Palet can generate
        </p>
        
        {/* Style cards grid */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          {styleCards.map((style) => (
            <StyleCard key={style.name} {...style} />
          ))}
        </div>
        
        {/* Tagline */}
        <p className="mt-8 text-sm text-white/40">
          Configure once → Generate anywhere
        </p>
      </div>
    </div>
  );
};
