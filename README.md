# SlideMaker — AI-Powered Handwriting & Presentation Platform

Create stunning handwritten documents, assignments, and presentations with realistic handwriting fonts, customizable paper styles, and AI-powered tools.

## Features

### Handwriting Wizard
- **47+ Handwriting Fonts** — Neat print, messy scrawls, cursive elegance, marker bold, and more (including Arabic, Urdu, Bengali, Chinese, Japanese, Korean, Thai, Devanagari scripts)
- **6 Ink Colors** — Blue, black, red, green, purple, orange with optional smudge effects
- **21 Paper Layouts** — Ruled, dotted, grid, Cornell, music staff, blueprint, parchment, blackboard, legal pad, and custom paper image uploads
- **Real-Time Preview** — See every change instantly with smooth zoom and page-by-page navigation
- **Multi-Format Export** — Export as PDF, PNG (single or ZIP batch), or JPG with page selection
- **Undo/Redo & Auto-Save** — 50-level undo/redo with localStorage auto-save

### Slide Maker
- **7+ Presentation Layouts** — Hero, content, two-column, timeline, feature grid, closing, and more
- **AI Integration** — Gemini 2.0 Flash for smart content generation and formatting
- **Image & Diagram Embedding** — Upload images with positionable diagrams

### Platform
- **Dark/Light Theme** — System-preference-aware with manual toggle
- **Responsive Design** — Works on desktop, tablet, and mobile (collapsible sidebar, adaptive panels)
- **Privacy First** — API key stays local; all processing is browser-based
- **Developer Profile** — GitHub integration showing repos, stats, and live activity feed

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS 3.4
- **Animation:** Framer Motion
- **State Management:** Zustand (`src/lib/handwriting/store.ts`)
- **Routing:** React Router v6
- **Diagrams:** Recharts (pie charts on Developer page)
- **Export:** html2canvas, jsPDF, JSZip
- **AI:** Google Gemini 2.0 Flash API

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build
```

## Project Structure

```
src/
├── assets/              # Static assets (images, etc.)
├── components/          # Shared UI components
│   ├── handwriting/     # Handwriting-specific components
│   │   ├── EditorPage.tsx
│   │   ├── SectionEditor.tsx
│   │   ├── PagePreview.tsx
│   │   ├── HandwritingStyleTab.tsx
│   │   ├── PaperStyleTab.tsx
│   │   └── ThemeToggle.tsx
│   └── ui/              # shadcn/ui components
├── lib/
│   ├── handwriting/     # Handwriting engine
│   │   ├── store.ts     # Zustand state management
│   │   ├── types.ts     # Types, styles, layouts, sizes
│   │   └── HandwritingRenderer.tsx
│   └── utils.ts         # Utility functions
├── pages/               # Route pages
│   ├── Index.tsx        # Home/dashboard
│   ├── Editor.tsx       # Slide maker editor
│   ├── Create.tsx       # New presentation
│   ├── About.tsx        # About page
│   ├── Developer.tsx    # Developer profile
│   ├── Templates.tsx    # Template gallery
│   ├── Analytics.tsx    # Analytics dashboard
│   └── handwriting/     # Handwriting flow
│       ├── LandingPage.tsx
│       ├── StylesPage.tsx
│       ├── LayoutPage.tsx
│       ├── PreviewPage.tsx
│       ├── ExportPage.tsx
│       ├── SlideMakerPage.tsx
│       └── EditorPage.tsx  # Main handwriting editor
├── App.tsx              # Root with routing
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Handwriting Styles

All fonts are loaded via Google Fonts and mapped in `src/lib/handwriting/types.ts` as `HANDWRITING_STYLES`. Each style has:
- **id** — Unique identifier
- **name** — Display name
- **fontClass** — CSS utility class
- **category** — neat, casual, messy, cursive, artistic, or typed
- **charWidthFactor** — Character width multiplier for page fitting

## Configuration

- **Tailwind:** `tailwind.config.ts` — custom colors, breakpoints (xs: 475px added), fonts
- **CSS Variables:** `src/index.css` — HSL-based theming for light/dark mode
- **Theme Toggle:** `src/components/handwriting/ThemeToggle.tsx` — localStorage + system preference detection

## License

MIT
