# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm start` - Start production server via Netlify

## Build Process

The project has a custom pre-build process:
1. `npm run compile:hyphenate` - Compiles TypeScript hyphenation script
2. `npm run rename:hyphenate` - Renames output to .cjs format
3. `node dist/scripts/hyphenate.cjs` - Processes hyphenation data
4. `remix vite:build` - Main Remix build

## Architecture

This is a Remix application with Vite that builds a roadtrip bingo game. Key architectural elements:

### Framework Stack
- **Remix** - Full-stack React framework with file-based routing
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling with @tailwindcss/vite plugin
- **Netlify** - Deployment platform with @netlify/remix-adapter

### Project Structure
- `app/routes/` - Remix file-based routes (`_index.tsx`, `bingo.tsx`)
- `@/components/` - React components organized by feature:
  - `bingo/` - Core game components (BingoGrid, BingoCell, BingoHeader, etc.)
  - `landing/` - Landing page components (IntroCarousel, LanguageSwitcher, forms)
  - `shared/` - Reusable components (Header, ErrorFallback, NeonText, QRCodeSVG)
  - `ui/` - Base UI components (button, drawer, dialog, tabs, etc.)
- `app/lib/` - Utility functions
- `app/content/i18n/` - Internationalization content
- `app/items/` - Game data (items.ts, items.json)
- `app/scripts/` - Build-time scripts (hyphenation processing)

### Key Features
- **Multilingual Support** - Swedish, English, French, German, Spanish, Italian, Finnish, Norwegian, Danish
- **Theme System** - Dynamic theming with gradient backgrounds and coordinated colors
- **Game State Management** - React useReducer with localStorage persistence
- **Responsive Design** - Mobile-first with drawer components for settings
- **Hyphenation** - Build-time processing of hyphenation patterns for multiple languages

### State Management
- Game state uses React useReducer pattern with actions for:
  - `LOAD_STATE` - Initialize from localStorage
  - `MARK_ITEM` / `UNMARK_ITEM` - Toggle bingo cell states
  - `CLEAR_ITEMS` - Reset game board
  - `SET_THEME` - Change visual theme
- Persistent storage via localStorage with cleanup of legacy formats

### Component Patterns
- Uses `@/` path alias for clean imports
- Functional components with hooks
- Theme classes passed down via props for consistent styling
- Error boundaries for graceful failure handling

## Key Libraries
- `@radix-ui/*` - Accessible UI primitives (dialog, select, tabs, scroll-area)
- `lucide-react` - Icon library
- `react-rewards` - Confetti animation for bingo wins
- `qrcode.react` - QR code generation
- `hypher` + language packs - Text hyphenation
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utilities