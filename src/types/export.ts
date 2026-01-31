// Export page state types

export type PageTab = 'home' | 'features' | 'pricing' | 'about' | 'contact' | 'components';
export type AccordionSection = 'curated' | 'customize';
export type DeviceSize = 'mobile' | 'tablet' | 'desktop';
export type Density = 'compact' | 'balanced' | 'spacious';
export type Mood = 'serious' | 'neutral' | 'friendly';
export type ButtonStyle = 'sharp' | 'rounded' | 'pill';
export type CardStyle = 'bordered' | 'elevated' | 'flat';
export type InputStyle = 'outlined' | 'filled' | 'underlined';
export type NavStyle = 'solid' | 'transparent' | 'bordered';
export type ModalStyle = 'centered' | 'slide-in';

export interface LockStates {
  color: boolean;
  font: boolean;
  density: boolean;
  mood: boolean;
  buttons: boolean;
  cards: boolean;
  inputs: boolean;
  navigation: boolean;
  modals: boolean;
}

export interface ExportPageState {
  // From URL params
  template: string;
  style: string;
  
  // Generated
  projectName: string;
  
  // Active UI state
  activeTab: PageTab;
  activeAccordion: AccordionSection;
  
  // Preview settings
  deviceSize: DeviceSize;
  zoom: number;
  darkMode: boolean;
  
  // Customization values
  selectedSet: string | null;
  brandColor: string;
  font: string;
  density: Density;
  mood: Mood;
  buttonStyle: ButtonStyle;
  cardStyle: CardStyle;
  inputStyle: InputStyle;
  navStyle: NavStyle;
  modalStyle: ModalStyle;
  
  // Lock states for randomizer
  locks: LockStates;
}

export interface CuratedSet {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

// Adjective and noun pools for random domain generation
export const ADJECTIVE_POOL = ['swift', 'bright', 'nova', 'stellar', 'calm', 'bold', 'crisp', 'fresh', 'pure', 'vivid'];
export const NOUN_POOL = ['landing', 'studio', 'folio', 'dash', 'hub', 'base', 'space', 'flow', 'craft', 'works'];

// Font options
export const FONT_OPTIONS = ['Inter', 'IBM Plex Sans', 'DM Sans', 'Space Grotesk'];

// Styles that support dark mode toggle
export const DARK_MODE_STYLES = ['swiss', 'brutalist', 'minimal', 'elegant'];
export const LIGHT_ONLY_STYLES = ['corporate', 'editorial', 'playful', 'vibrant'];
export const DARK_DEFAULT_STYLES = ['tech-dark'];
