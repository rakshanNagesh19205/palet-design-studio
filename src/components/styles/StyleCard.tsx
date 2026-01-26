import { cn } from '@/lib/utils';
import type { Style } from '@/data/styles';

interface StyleCardProps {
  style: Style;
  isSelected?: boolean;
  onClick?: () => void;
}

const StylePreview = ({ preview }: { preview: Style['preview'] }) => {
  switch (preview) {
    case 'swiss':
      return (
        <div className="h-full w-full bg-primary p-4">
          <div className="text-2xl font-bold text-white">Helv.</div>
          <div className="mt-2 inline-block rounded bg-white/20 px-2 py-0.5 font-mono text-xs text-white">
            display: grid;
          </div>
          <div className="absolute bottom-4 right-4 h-8 w-8 rounded-full border-2 border-white" />
        </div>
      );
    case 'brutalist':
      return (
        <div className="h-full w-full bg-amber-100 p-4">
          <div className="inline-block border-4 border-black bg-black px-3 py-1 text-lg font-black text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
            BOLD
          </div>
        </div>
      );
    case 'minimal':
      return (
        <div className="h-full w-full bg-gradient-to-br from-rose-50 to-white p-4">
          <div className="rounded-2xl bg-white p-3 shadow-sm">
            <div className="h-2 w-12 rounded-full bg-rose-200" />
            <div className="mt-2 h-1.5 w-16 rounded-full bg-gray-100" />
          </div>
        </div>
      );
    case 'tech':
      return (
        <div className="h-full w-full bg-slate-900 p-4 font-mono">
          <div className="text-xs text-cyan-400">&gt; SYSTEM_READY</div>
          <div className="mt-1 text-xs text-cyan-400/50">Initializing...</div>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-cyan-500 to-transparent" />
        </div>
      );
    case 'corporate':
      return (
        <div className="h-full w-full bg-slate-50 p-4">
          <div className="h-2 w-full rounded bg-blue-500" />
          <div className="mt-3 rounded bg-white p-2 shadow-sm">
            <div className="h-1.5 w-12 rounded bg-gray-200" />
            <div className="mt-1 h-1 w-20 rounded bg-gray-100" />
          </div>
        </div>
      );
    case 'editorial':
      return (
        <div className="h-full w-full bg-stone-50 p-4">
          <div className="border-b border-stone-300 pb-2 font-serif text-lg italic">
            The Story
          </div>
          <div className="mt-2 flex gap-4">
            <div className="h-12 w-px bg-stone-300" />
            <div className="space-y-1">
              <div className="h-1 w-16 rounded bg-stone-200" />
              <div className="h-1 w-12 rounded bg-stone-200" />
            </div>
          </div>
        </div>
      );
    case 'playful':
      return (
        <div className="h-full w-full bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 p-4">
          <div className="flex gap-2">
            <div className="h-6 w-6 rounded-full bg-yellow-300" />
            <div className="h-6 w-6 rounded-lg bg-white" />
            <div className="h-6 w-6 rotate-45 rounded bg-cyan-300" />
          </div>
        </div>
      );
    case 'elegant':
      return (
        <div className="h-full w-full bg-gradient-to-br from-slate-900 to-slate-800 p-4">
          <div className="font-serif text-lg text-amber-200/80">Luxury</div>
          <div className="mt-1 h-px w-12 bg-gradient-to-r from-amber-400 to-transparent" />
          <div className="absolute bottom-3 right-3 h-6 w-6 border border-amber-400/30" />
          <div className="absolute top-3 right-3 h-6 w-6 border border-amber-400/30" />
        </div>
      );
    case 'vibrant':
      return (
        <div className="h-full w-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 p-4">
          <div className="text-xl font-black text-white drop-shadow-lg">MAKE WAVES</div>
        </div>
      );
    default:
      return <div className="h-full w-full bg-muted" />;
  }
};

export const StyleCard = ({ style, isSelected, onClick }: StyleCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg border bg-card text-left transition-all duration-200',
        isSelected
          ? 'border-primary ring-2 ring-primary ring-offset-2 ring-offset-background'
          : 'border-border hover:border-primary/50 hover:shadow-md'
      )}
    >
      {/* Preview area */}
      <div className="relative h-[160px] overflow-hidden">
        <StylePreview preview={style.preview} />
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-foreground">{style.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{style.description}</p>
      </div>
      
      {/* Selected indicator */}
      {isSelected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </button>
  );
};
