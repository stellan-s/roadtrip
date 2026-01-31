# Roadtrip Bingo

Shareable roadtrip bingo — generate a unique board from any seed word, play in 9 languages across 91 themes. Built with Remix.

## How it works

Every seed word produces a deterministic bingo board via SHA-1 hashing. Type the same word on any device and you get the exact same grid — so friends on the same road trip can share a board without syncing anything.

## Features

- **Seed-based boards** — any word or phrase generates a unique, reproducible 5×5 grid
- **9 languages** — Swedish, English, French, German, Spanish, Italian, Finnish, Norwegian, Danish, with build-time hyphenation for all of them
- **91 themes** — from nature gradients to cosmic palettes, including color-blind accessible options (deuteranopia, tritanopia, achromatopsia)
- **Persistent state** — marks survive page reloads via localStorage
- **Confetti on bingo** — because why not

## Project structure

```
app/
  routes/           # Remix file-based routes
    _index.tsx      # Landing page (instant + custom start)
    bingo.tsx       # Game screen and state management
  items/
    items.json      # Source game items with translations
    items.ts        # Generated — hyphenated text (do not edit)
  scripts/
    hyphenate.ts    # Build-time hyphenation processor
  content/i18n/     # Internationalized content (FAQ, etc.)

@/
  components/
    bingo/          # Game UI (grid, cells, overlay, action buttons)
    landing/        # Start forms and language switcher
    shared/         # Header, error boundary, QR code
    ui/             # Radix UI base components
  constants/        # Languages, icons, word suggestions
  lib/
    generateBingoGrid.ts  # Deterministic grid generation
    themes.ts             # 91 theme definitions
    analytics.ts          # Event tracking (Supabase edge function)
    utils.ts              # Game state, bingo detection, localStorage helpers
    constants.ts          # Bingo patterns, default state
```

## Getting started

```bash
git clone <repository-url>
cd roadtrip
npm install
npm run dev
```

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build (includes hyphenation pre-processing) |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm start` | Serve production build via Netlify |

## Analytics

Event tracking is opt-in via environment variables. If not configured, analytics silently does nothing.

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Tech stack

- [Remix](https://remix.run/) — full-stack React framework
- [Vite](https://vitejs.dev/) — build tool
- [TypeScript](https://www.typescriptlanguage.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) — styling
- [Radix UI](https://www.radix-ui.com/) — accessible primitives
- [Netlify](https://www.netlify.com/) — deployment

## License

MIT
