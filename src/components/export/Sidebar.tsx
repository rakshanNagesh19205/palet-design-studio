import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CuratedSetsPanel } from './CuratedSetsPanel';
import { CustomizePanel } from './CustomizePanel';
import type { AccordionSection, ExportPageState, LockStates } from '@/types/export';

interface SidebarProps {
  activeAccordion: AccordionSection;
  onAccordionChange: (section: AccordionSection) => void;
  state: ExportPageState;
  onStateChange: <K extends keyof ExportPageState>(key: K, value: ExportPageState[K]) => void;
  onRandomize: () => void;
}

export const Sidebar = ({ 
  activeAccordion, 
  onAccordionChange, 
  state, 
  onStateChange,
  onRandomize 
}: SidebarProps) => {
  const handleToggleLock = (key: keyof LockStates) => {
    onStateChange('locks', { ...state.locks, [key]: !state.locks[key] });
  };

  return (
    <div className="h-full overflow-auto border-l border-border bg-background">
      <Accordion 
        type="single" 
        value={activeAccordion} 
        onValueChange={(v) => v && onAccordionChange(v as AccordionSection)}
        className="w-full"
      >
        <AccordionItem value="curated" className="border-b">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="text-sm font-semibold">Curated Sets</span>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <CuratedSetsPanel
              selectedSet={state.selectedSet}
              onSelectSet={(id) => onStateChange('selectedSet', id)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="customize" className="border-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            <span className="text-sm font-semibold">Customize</span>
          </AccordionTrigger>
          <AccordionContent className="p-0">
            <CustomizePanel
              brandColor={state.brandColor}
              font={state.font}
              density={state.density}
              mood={state.mood}
              buttonStyle={state.buttonStyle}
              cardStyle={state.cardStyle}
              inputStyle={state.inputStyle}
              navStyle={state.navStyle}
              modalStyle={state.modalStyle}
              locks={state.locks}
              onBrandColorChange={(v) => onStateChange('brandColor', v)}
              onFontChange={(v) => onStateChange('font', v)}
              onDensityChange={(v) => onStateChange('density', v)}
              onMoodChange={(v) => onStateChange('mood', v)}
              onButtonStyleChange={(v) => onStateChange('buttonStyle', v)}
              onCardStyleChange={(v) => onStateChange('cardStyle', v)}
              onInputStyleChange={(v) => onStateChange('inputStyle', v)}
              onNavStyleChange={(v) => onStateChange('navStyle', v)}
              onModalStyleChange={(v) => onStateChange('modalStyle', v)}
              onToggleLock={handleToggleLock}
              onRandomize={onRandomize}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
