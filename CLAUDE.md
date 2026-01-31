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
- `@/lib/` - Core utilities and business logic:
  - `utils.ts` - Game state management (loadGameState, saveGameState, checkBingo)
  - `generateBingoGrid.ts` - Deterministic grid generation using SHA-1 hashing
  - `themes.ts` - Theme definitions with gradient and color configurations
  - `analytics.ts` - Event tracking to Supabase edge function
  - `constants.ts` - Bingo patterns and default game state
- `app/content/i18n/` - Internationalization content
- `app/items/` - Game data:
  - `items.json` - Source game items with translations
  - `items.ts` - Generated file with hyphenated text (auto-generated, do not edit manually)
- `app/scripts/` - Build-time scripts:
  - `hyphenate.ts` - Processes items.json and generates items.ts with soft hyphens for all languages

### Key Features
- **Multilingual Support** - Swedish, English, French, German, Spanish, Italian, Finnish, Norwegian, Danish
- **Theme System** - Dynamic theming with gradient backgrounds and coordinated colors
- **Game State Management** - React useReducer with localStorage persistence
- **Responsive Design** - Mobile-first with drawer components for settings
- **Hyphenation** - Build-time processing of hyphenation patterns for multiple languages

### State Management
- Game state uses React useReducer pattern in `bingo.tsx` with actions for:
  - `LOAD_STATE` - Initialize from localStorage
  - `MARK_ITEM` / `UNMARK_ITEM` - Toggle bingo cell states (stores SHA-1 hash of item)
  - `CLEAR_ITEMS` - Reset game board
  - `SET_THEME` - Change visual theme
- Persistent storage via localStorage key `game_state` with cleanup of legacy formats
- State shape: `{ theme: ThemeName, markeditems: (string | 0)[] }` where strings are SHA-1 hashes
- Bingo detection checks rows, columns, and diagonals using patterns from `@/lib/constants.ts`

### Component Patterns
- Uses `@/` path alias configured via `vite-tsconfig-paths` for clean imports
- Functional components with hooks
- Theme classes passed down via props for consistent styling (avoids prop drilling via explicit theme prop)
- Error boundaries at route and component levels for graceful failure handling
- Drawer components (from `vaul`) used for mobile-friendly settings panels

### Grid Generation Algorithm
- Uses deterministic SHA-1 hash of seed string to generate consistent bingo grids
- Hash is converted to byte array, each byte mod item count selects an item
- Ensures uniqueness by tracking used indices with a Set
- Falls back to sequential selection if hash doesn't provide enough unique items
- Grid is generated server-side in loader and passed to client

### Analytics
- Custom analytics system sending events to Supabase edge function at `/functions/v1/analytics`
- Tracks: page views, game start/complete, theme changes, user interactions
- Session ID stored in sessionStorage, anonymous user ID in localStorage
- Event payload includes app name, session ID, user ID, pathname, search params, referrer
- Environment variables: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (defaults provided in code)

## Key Libraries
- `@radix-ui/*` - Accessible UI primitives (dialog, select, tabs, scroll-area)
- `lucide-react` - Icon library
- `react-rewards` - Confetti animation for bingo wins
- `qrcode.react` - QR code generation
- `hypher` + language packs (hyphenation.{en-us,sv,de,fr,es,it,fi,nb-no,da}) - Text hyphenation
- `js-sha1` - SHA-1 hashing for deterministic grid generation
- `vaul` - Drawer component for mobile UI
- `class-variance-authority`, `clsx`, `tailwind-merge` - Styling utilities