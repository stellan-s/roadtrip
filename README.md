# Roadtrip Bingo

## Overview

Roadtrip Bingo is a web application designed to make road trips more fun and engaging. It features interactive bingo grids, customizable themes, and a user-friendly interface. The app is built using modern web technologies including React, TypeScript, Tailwind CSS, and Vite.

## Features

- **Interactive Bingo Grids**: Play bingo with dynamically generated grids.
- **Customizable Themes**: Personalize the look and feel of the app.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Multilingual Support**: Switch between languages easily.

## Project Structure

The project is organized as follows:

```
@/
  components/
    bingo/
      ActionButtons.tsx
      BingoCell.tsx
      BingoGrid.tsx
      BingoHeader.tsx
      BingoOverlay.tsx
    landing/
      IntroCarousel.tsx
      LanguageSwitcher.tsx
      StartForm.tsx
    shared/
      ErrorFallback.tsx
      NeonText.tsx
    ui/
      button.tsx
      drawer.tsx
      input.tsx
      scroll-area.tsx
      select.tsx
  constants/
    iconMap.tsx
    items.ts
  lib/
    generateBingoGrid.ts
    utils.ts
  app/
    root.tsx
    tailwind.css
    themes.txt
  routes/
    _index.tsx
    bingo.tsx
  styles/
    fontface.css
    spin.css
```

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd roadtrip
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Development

To start the development server:

```bash
npm run dev
```

## Build

To create a production build:

```bash
npm run build
```

## Deployment

The project is configured for deployment on Netlify. Ensure the `netlify.toml` file is correctly set up for your environment.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe JavaScript.
- **Tailwind CSS**: For styling.
- **Vite**: For fast builds and development.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact

For any inquiries or support, please contact [your-email@example.com].
