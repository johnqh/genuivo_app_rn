const { createTailwindPreset } = require('@sudobility/design');
const { defaultTheme } = require('@sudobility/design/themes');

// The design preset maps rounded-md/sm to `calc(var(--radius) - Npx)`, which
// NativeWind cannot evaluate on native (corners render square). Compute concrete
// px values from the active theme's radius — same result the web gets from calc.
const radiusPx = parseFloat(defaultTheme.light.radius) * 16; // "0.5rem" -> 8

/**
 * Semantic colors map to CSS variables (hsl(var(--primary)), ...). The variable
 * values are applied at runtime by ThemeVarsProvider via vars() (NativeWind can't
 * switch CSS-variable blocks on native), so semantic classes (bg-primary,
 * text-foreground, border-border, ...) reflect the active @sudobility/design
 * theme AND flip light/dark — matching the web design system.
 *
 * The theme must be consistent across these files:
 *   - tailwind.config.js          -> createTailwindPreset()
 *   - scripts/generate-theme-css.js -> activeTheme (global.css :root fallback)
 *   - src/config/designTheme.ts    -> configureTheme(activeTheme, { native: true })
 *   - src/config/themeVars.ts      -> activeTheme (runtime vars)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // dark: variants follow NativeWind colorScheme (set by AppNavigator)
  // The design system + components-rn (when loaded from dist) emit their variant
  // classes as literal strings; scan them so NativeWind generates the utilities.
  // The app reads components-rn from src, so src/ globs cover the rest.
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/components-rn/{src,dist}/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/design/dist/**/*.{js,jsx}',
  ],
  presets: [require('nativewind/preset'), createTailwindPreset()],
  theme: {
    extend: {
      borderRadius: {
        sm: `${Math.max(radiusPx - 4, 0)}px`,
        md: `${Math.max(radiusPx - 2, 0)}px`,
        lg: `${radiusPx}px`,
        xl: `${radiusPx + 4}px`,
      },
    },
  },
  plugins: [],
};
