
# Palet UI Redesign Implementation Plan

## Overview

You've provided 6 detailed HTML/JS starter files that represent your desired UI designs. This plan outlines how to rebuild each major screen to match these specifications while preserving the existing TypeScript types, Supabase hooks, authentication, and routing logic.

## What We're Keeping

- TypeScript types (`src/types/database.ts`)
- Supabase client and hooks (`useProjects`, `useProject`, `useCreateProject`, `useUpdateProject`, `useDeleteProject`, `useAutoSave`, `useVersions`)
- Authentication context and guards (`AuthContext`, `ProtectedRoute`, `PublicOnlyRoute`)
- Routing structure (`App.tsx`)
- UI component library (`src/components/ui/`)
- Design tokens in `src/index.css` (HSL color system)

## What We're Replacing

Each screen will be rebuilt from scratch using the provided starter code as the design specification.

---

## Implementation Phases

### Phase 1: Global Styles and Fonts

**File: `src/index.css`**

Add new CSS utilities and animations from the starter files:
- Material Symbols font integration (outlined variant with proper font-variation-settings)
- Card hover effects (`.project-card`, `.template-card`, `.style-card`)
- Dropdown animation (`.dropdown-menu`)
- Accordion animation with grid-template-rows
- Grid patterns (`.bg-grid-pattern`, `.bg-grid-dark`)
- Brutalist shadow (`.brutalist-shadow`)
- Editorial lines pattern
- Playful blob shape
- Elegant gradient
- Bold mesh gradient
- Staggered entrance animation (`.card-animate`)

**File: `index.html`**

Add Google Material Symbols Outlined font link.

---

### Phase 2: Landing Page

**File: `src/pages/Landing.tsx`**

Based on `Landing_Page.js` - A complete React component with:
- Dark theme (`#1a1215` background)
- Header with logo, nav links (Features, Docs, About), Sign In button, and conditional "Get Started" CTA
- Hero section with left-aligned text and right-side browser mockup showing a design canvas
- 4-stage "How It Works" carousel with step indicators
- Features section (3-column grid)
- CTA section with red glow effects
- Footer with newsletter signup and feature preference chips

Key implementation details:
- IntersectionObserver to hide/show header CTA when footer CTA is visible
- Stage screens as sub-components: WebsiteTypeScreen, StyleSelectionScreen, StudioScreen, ExportScreen
- DesignCanvas component showing color swatches, grid, card with measurement lines

---

### Phase 3: Authentication Pages

**Files: `src/pages/auth/SignIn.tsx` and `src/pages/auth/SignUp.tsx`**

Based on `Log_In_and_Sign_Up.html` - Split-screen layout:

**Left Side (480px, light theme `#f8f6f6`):**
- Logo with back link
- Toggle tabs (Sign up / Sign in)
- Contextual heading and subtext
- Google and GitHub OAuth buttons
- Divider with "OR"
- Form fields (Name for signup, Email, Password with visibility toggle)
- Forgot password link (sign in only)
- Submit button
- Terms text (sign up only)
- Footer copyright

**Right Side (flex-1, dark theme `#1a1215`):**
- Hidden on mobile (`lg:flex`)
- Grid background pattern
- Gradient orbs
- 2x3 grid of animated style preview cards with:
  - Color gradients (Warm/Blue/Green/Coral/Purple/Monochrome)
  - Staggered entrance animation
  - Hover effects (scale, translate)
  - Slight rotation for visual interest

Wire up existing Supabase auth methods from `useAuth`.

---

### Phase 4: Dashboard

**File: `src/pages/Dashboard.tsx`**

Based on `Saved_Dashboard_Starter.html`:

**Header:**
- Logo, "New Project" button, user avatar with dropdown menu
- Sticky with backdrop blur

**Main Content:**
- Page heading ("Your Projects") with subtext
- Search input and grid/list view toggle
- 3-column grid of project cards

**Project Card:**
- Gradient thumbnail with mini preview mockup
- Style badge overlay
- Project name and metadata (template type, last edited)
- 3-dot menu dropdown (Edit, Duplicate, Export, Delete)
- Hover effects (translateY, shadow)

**Empty State:**
- Illustrated placeholder with CTA to create first project

---

### Phase 5: Template Selection

**File: `src/pages/create/TemplateSelection.tsx`**

Based on `Template_page_starter_code.html`:

**Layout:**
- Header with logo and user menu
- Breadcrumb: **Template** / Style / Studio
- Centered headline and subtext
- 4-4-3 grid layout (11 template cards)

**Template Cards (11 total):**
Each with unique preview wireframe:
1. SaaS / Software - Dark dashboard mockup
2. Portfolio - 2x2 gradient grid
3. E-commerce - Product cards
4. Agency / Studio - Bold typography
5. Blog / Publication - Article layout
6. Restaurant / Local - Elegant serif styling
7. Event / Conference - Date + location
8. Course / Education - Video player + progress
9. Personal Brand - Avatar + social links
10. Non-profit / Cause - Mission statement
11. Real Estate - Property listing card

**Selection State:**
- Border changes to primary
- Checkmark badge appears
- Toast notification shows selection

**Bottom Action Bar:**
- Back button (disabled on first step)
- Continue button (disabled until selection)

---

### Phase 6: Style Selection

**File: `src/pages/create/StyleSelection.tsx`**

Based on `Style_Selection_Starter_Code.html`:

**Layout:**
- Header with logo and user menu
- Breadcrumb: Restaurant / **Style** / Studio (shows selected template icon)
- Centered headline and subtext
- 3x3 grid of style cards

**Style Cards (9 total):**
Each with unique visual preview:
1. **Swiss International** - Red bg, grid pattern, "Helv." text, code badge
2. **Neo-Brutalist** - Yellow bg, "BOLD" box with harsh shadow
3. **Soft Minimal** - White/pink, soft rounded card, blur gradients
4. **Tech Dark** - Dark terminal UI, green status dots, progress bars
5. **Corporate Clean** - Blue accent bar, business card mockup
6. **Editorial** - Serif text, magazine layout, line pattern
7. **Playful** - Gradient bg, bouncing shapes, emoji button
8. **Elegant** - Dark gradient, gold accents, serif text, corner decorations
9. **Bold Vibrant** - Mesh gradient, "MAKE WAVES" text

**"None of these?" Section:**
- Two text inputs: "Look of..." and "Feel of..."
- For custom style generation

**Bottom Action Bar:**
- Back button
- "Continue to Studio" button

---

### Phase 7: Studio Page

**File: `src/pages/Studio.tsx`**

Based on `Studio_Mockup.html`:

**Header:**
- Logo with project context (Template · Style)
- Step progress (3 of 3) with dots
- History, Checkpoint, Export buttons
- Autosave indicator
- User avatar

**Left Panel (480px, scrollable):**
10 accordion sections with single-open behavior:
1. **Colors** - 4 recommended + expandable "More options"
2. **Typography** - Font options (DM Sans, Inter, Quicksand, Public Sans)
3. **Spacing** - Density presets
4. **Border Radius** - Shape options (Rounded, Moderate, Pill, Sharp)
5. **Shadows** - Intensity presets
6. **Buttons** - Style variants
7. **Forms** - Input styles
8. **Cards** - Card styles
9. **Navigation** - Nav patterns
10. **Motion** - Animation timing

Each section shows:
- Collapsed: Current selection summary
- Expanded: "Recommended for [Style]" header + option grid

**Right Panel (flex-1):**
- Preview controls (device toggle, page selector, zoom, theme toggle)
- Browser chrome with URL
- Live preview showing a restaurant website that updates based on config

---

## Data Flow Integration

### Template Selection
```
User selects template → Update project.template via useUpdateProject → Navigate to /create/style
```

### Style Selection
```
User selects style → Update project.style via useUpdateProject → Navigate to /studio/:id
```

### Studio
```
Config changes → Update local state → useAutoSave debounces and persists to Supabase
```

---

## Component Structure

```
src/
├── pages/
│   ├── Landing.tsx (complete rewrite)
│   ├── Dashboard.tsx (complete rewrite)
│   ├── auth/
│   │   ├── SignIn.tsx (complete rewrite)
│   │   └── SignUp.tsx (complete rewrite)
│   ├── create/
│   │   ├── TemplateSelection.tsx (complete rewrite)
│   │   └── StyleSelection.tsx (complete rewrite)
│   └── Studio.tsx (complete rewrite)
├── components/
│   ├── landing/
│   │   ├── DesignCanvas.tsx (new - hero mockup)
│   │   ├── StageScreens.tsx (new - how it works)
│   │   └── Footer.tsx (update with newsletter)
│   ├── auth/
│   │   └── StyleShowcase.tsx (complete rewrite - 2x3 card grid)
│   ├── dashboard/
│   │   └── ProjectCard.tsx (complete rewrite)
│   ├── templates/
│   │   └── TemplateCard.tsx (complete rewrite with unique previews)
│   ├── styles/
│   │   └── StyleCard.tsx (complete rewrite with unique previews)
│   └── studio/
│       ├── StudioHeader.tsx (new)
│       ├── ConfigPanel.tsx (rewrite - accordion sections)
│       ├── PreviewPanel.tsx (rewrite - browser chrome + live preview)
│       └── sections/ (update each section's UI)
└── data/
    ├── templates.ts (update with icon mappings)
    └── styles.ts (keep as-is)
```

---

## Technical Considerations

1. **Material Symbols**: The starter code uses Material Symbols Outlined font. We'll add the font link and create a simple Icon component or use the class directly.

2. **Color Values**: Starter code uses hex colors. We'll map these to our HSL system where appropriate but can use hex directly for specific branded colors.

3. **Animations**: The starter code has smooth transitions and staggered animations. We'll implement these using CSS classes and Tailwind.

4. **Responsive Design**: 
   - Auth right panel hidden below `lg` breakpoint
   - Dashboard grid: 3 columns on desktop, 2 on tablet, 1 on mobile
   - Template grid: 4-4-3 layout with centered last row

5. **State Management**: All UI state (selected template, selected style, accordion state) managed with React useState, persisted via existing Supabase hooks.

---

## Estimated Effort

| Phase | Components | Complexity |
|-------|------------|------------|
| Phase 1: Global Styles | 2 files | Low |
| Phase 2: Landing Page | 5+ components | High |
| Phase 3: Auth Pages | 3 components | Medium |
| Phase 4: Dashboard | 2 components | Medium |
| Phase 5: Template Selection | 2 components | Medium |
| Phase 6: Style Selection | 2 components | Medium |
| Phase 7: Studio | 5+ components | High |

---

## Summary

This plan rebuilds all major UI screens to match your provided starter code specifications while maintaining the existing backend integration, authentication flow, and data management. The result will be a polished, cohesive design system that matches the Swiss-inspired minimalism with red accent color as specified.
