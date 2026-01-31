import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExportHeader, PageTabs, PreviewPane, Sidebar, ExportFooter } from '@/components/export';
import type { 
  ExportPageState, 
  PageTab, 
  AccordionSection, 
  DeviceSize,
  LockStates,
  Density,
  Mood,
  ButtonStyle,
  CardStyle,
  InputStyle,
  NavStyle,
  ModalStyle
} from '@/types/export';
import { 
  ADJECTIVE_POOL, 
  NOUN_POOL, 
  FONT_OPTIONS,
  DARK_DEFAULT_STYLES 
} from '@/types/export';

// Generate a random project name
const generateProjectName = (): string => {
  const adj = ADJECTIVE_POOL[Math.floor(Math.random() * ADJECTIVE_POOL.length)];
  const noun = NOUN_POOL[Math.floor(Math.random() * NOUN_POOL.length)];
  return `${adj}-${noun}`;
};

// Random value helpers
const randomFrom = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomColor = (): string => {
  const colors = ['#ea2a33', '#e91e63', '#9c27b0', '#3f51b5', '#2196f3', '#009688', '#4caf50', '#ff9800', '#ff5722'];
  return randomFrom(colors);
};

const ExportPage = () => {
  const [searchParams] = useSearchParams();
  const template = searchParams.get('template') || 'saas';
  const style = searchParams.get('style') || 'swiss';

  // Generate project name once on mount
  const projectName = useMemo(() => generateProjectName(), []);

  // Initialize state
  const [state, setState] = useState<ExportPageState>({
    template,
    style,
    projectName,
    activeTab: 'home',
    activeAccordion: 'curated',
    deviceSize: 'desktop',
    zoom: 100,
    darkMode: DARK_DEFAULT_STYLES.includes(style),
    selectedSet: null,
    brandColor: '#ea2a33',
    font: 'Inter',
    density: 'balanced',
    mood: 'neutral',
    buttonStyle: 'rounded',
    cardStyle: 'elevated',
    inputStyle: 'outlined',
    navStyle: 'solid',
    modalStyle: 'centered',
    locks: {
      color: false,
      font: false,
      density: false,
      mood: false,
      buttons: false,
      cards: false,
      inputs: false,
      navigation: false,
      modals: false,
    },
  });

  const updateState = <K extends keyof ExportPageState>(key: K, value: ExportPageState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  };

  const handleRandomize = () => {
    setState(prev => {
      const newState = { ...prev };
      
      if (!prev.locks.color) newState.brandColor = randomColor();
      if (!prev.locks.font) newState.font = randomFrom(FONT_OPTIONS);
      if (!prev.locks.density) newState.density = randomFrom<Density>(['compact', 'balanced', 'spacious']);
      if (!prev.locks.mood) newState.mood = randomFrom<Mood>(['serious', 'neutral', 'friendly']);
      if (!prev.locks.buttons) newState.buttonStyle = randomFrom<ButtonStyle>(['sharp', 'rounded', 'pill']);
      if (!prev.locks.cards) newState.cardStyle = randomFrom<CardStyle>(['bordered', 'elevated', 'flat']);
      if (!prev.locks.inputs) newState.inputStyle = randomFrom<InputStyle>(['outlined', 'filled', 'underlined']);
      if (!prev.locks.navigation) newState.navStyle = randomFrom<NavStyle>(['solid', 'transparent', 'bordered']);
      if (!prev.locks.modals) newState.modalStyle = randomFrom<ModalStyle>(['centered', 'slide-in']);
      
      // Clear selected set when randomizing
      newState.selectedSet = null;
      
      return newState;
    });
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Exporting spec:', state);
  };

  return (
    <div className="flex flex-col h-screen bg-muted/30">
      {/* Header */}
      <ExportHeader template={template} style={style} />

      {/* Page Tabs */}
      <PageTabs 
        activeTab={state.activeTab} 
        onTabChange={(tab) => updateState('activeTab', tab)} 
      />

      {/* Main Content - 60/40 split */}
      <div className="flex flex-1 overflow-hidden">
        {/* Preview Pane - 60% */}
        <div className="w-[60%] flex flex-col">
          <PreviewPane
            projectName={state.projectName}
            activeTab={state.activeTab}
            deviceSize={state.deviceSize}
            zoom={state.zoom}
            darkMode={state.darkMode}
            style={style}
            template={template}
            state={state}
            onDeviceChange={(d) => updateState('deviceSize', d)}
            onZoomChange={(z) => updateState('zoom', z)}
            onDarkModeToggle={() => updateState('darkMode', !state.darkMode)}
          />
        </div>

        {/* Sidebar - 40% */}
        <div className="w-[40%]">
          <Sidebar
            activeAccordion={state.activeAccordion}
            onAccordionChange={(s) => updateState('activeAccordion', s)}
            state={state}
            onStateChange={updateState}
            onRandomize={handleRandomize}
          />
        </div>
      </div>

      {/* Footer */}
      <ExportFooter onExport={handleExport} />
    </div>
  );
};

export default ExportPage;
