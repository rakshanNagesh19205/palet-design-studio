import { FC } from 'react';

const WebsiteTypeScreen: FC = () => (
  <div className="p-5 bg-[#f9fafb] h-full flex flex-col">
    <div className="text-center mb-3">
      <p className="text-[11px] text-muted-foreground tracking-wider mb-1.5">TYPE / STYLE / STUDIO</p>
      <h3 className="text-base font-semibold text-slate-900">What are you building?</h3>
    </div>
    <div className="grid grid-cols-3 gap-1.5 flex-1">
      {['SaaS', 'Portfolio', 'Agency', 'E-commerce', 'Blog', 'Landing'].map((type, i) => (
        <div 
          key={type} 
          className={`p-2.5 rounded-md border-2 text-[11px] font-medium flex items-center justify-center ${
            i === 0 
              ? 'border-primary bg-red-50 text-primary' 
              : 'border-gray-200 bg-white text-gray-600'
          }`}
        >
          {type}
        </div>
      ))}
    </div>
    <button className="mt-3 w-full py-2.5 bg-primary text-white rounded-md text-[13px] font-medium">
      Continue →
    </button>
  </div>
);

const StyleSelectionScreen: FC = () => (
  <div className="p-5 bg-[#f9fafb] h-full flex flex-col">
    <div className="text-center mb-3">
      <p className="text-[11px] tracking-wider mb-1.5">
        <span className="text-muted-foreground">TYPE / </span>
        <span className="text-primary">STYLE</span>
        <span className="text-muted-foreground"> / STUDIO</span>
      </p>
      <h3 className="text-base font-semibold text-slate-900">Define your visual intent</h3>
    </div>
    <div className="grid grid-cols-2 gap-2 flex-1">
      {[
        { name: 'Swiss International', color: '#ef4444', selected: true }, 
        { name: 'Neo-Brutalist', color: '#fde047' }, 
        { name: 'Soft Minimal', color: '#f3f4f6' }, 
        { name: 'Tech Dark', color: '#111827' }
      ].map((style) => (
        <div 
          key={style.name} 
          className={`rounded-md border-2 overflow-hidden ${
            style.selected ? 'border-primary' : 'border-gray-200'
          }`}
        >
          <div className="h-10" style={{ backgroundColor: style.color }} />
          <div className="p-1.5 bg-white">
            <p className="text-[10px] font-medium text-slate-900">{style.name}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="mt-3 w-full py-2.5 bg-primary text-white rounded-md text-[13px] font-medium">
      Continue to Studio →
    </button>
  </div>
);

const StudioScreen: FC = () => (
  <div className="h-full flex">
    <div className="w-[40%] bg-[#f9fafb] border-r border-gray-200 p-3 flex flex-col">
      <div className="text-[10px] font-semibold text-muted-foreground tracking-wider mb-2.5">SPEC CONFIGURATION</div>
      {['Colors', 'Typography', 'Spacing', 'Shadows'].map((item, i) => (
        <div 
          key={item} 
          className={`p-1.5 rounded-md text-[11px] flex items-center gap-1.5 mb-1 ${
            i === 0 
              ? 'bg-white border-2 border-primary text-slate-900' 
              : 'bg-transparent border-2 border-transparent text-gray-500'
          }`}
        >
          <span 
            className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] ${
              i === 0 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}
          >
            {i + 1}
          </span>
          {item}
        </div>
      ))}
    </div>
    <div className="flex-1 bg-slate-900 p-3 flex items-center justify-center">
      <div className="bg-slate-800 rounded-xl p-3.5 w-full text-center">
        <div className="text-white text-[13px] font-bold">Build with AI-Ready</div>
        <div className="text-blue-400 text-[13px] font-bold mb-2.5">Specs</div>
        <button className="bg-primary text-white px-3.5 py-1.5 rounded-md text-[11px]">
          Start Configuring
        </button>
      </div>
    </div>
  </div>
);

const ExportScreen: FC = () => (
  <div className="p-5 bg-[#f9fafb] h-full flex flex-col">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-base font-semibold text-slate-900">Export Specification</h3>
      <span className="text-[11px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">
        Ready
      </span>
    </div>
    <div className="flex-1 bg-slate-900 rounded-xl p-3.5 font-mono text-[10px]">
      <div className="text-green-400">/* Design System Specification */</div>
      <div className="text-gray-500 mt-1.5">colors: {'{'}</div>
      <div className="ml-3">
        <span className="text-gray-300">primary:</span>{' '}
        <span className="text-red-400">"hsl(355, 83%, 54%)"</span>
      </div>
      <div className="text-gray-500">{'}'}</div>
    </div>
    <div className="flex gap-2 mt-3">
      <button className="flex-1 py-2.5 bg-primary text-white rounded-md text-xs font-medium">
        Copy to Clipboard
      </button>
      <button className="px-3.5 py-2.5 bg-white text-gray-600 border border-gray-200 rounded-md text-xs font-medium">
        JSON
      </button>
    </div>
  </div>
);

export { WebsiteTypeScreen, StyleSelectionScreen, StudioScreen, ExportScreen };
