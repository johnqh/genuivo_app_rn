/**
 * Configure the @sudobility design-system theme for React Native.
 *
 * This is a side-effect module: importing it activates the theme before any
 * component renders. With a theme active, the design system's `variants.*`
 * return theme-aware semantic classes (e.g. `bg-primary`, `text-destructive`)
 * instead of hardcoded legacy classes (`bg-blue-600`). NativeWind resolves those
 * tokens to concrete colors via the tailwind preset (tailwind.config.js).
 *
 * The `native: true` option makes class overrides resolve to each theme's
 * `nativeClassOverrides` (RN-safe; e.g. dropping web-only `backdrop-blur`).
 *
 * IMPORTANT: this theme MUST match `activeTheme` in tailwind.config.js,
 * themeVars.ts, and scripts/generate-theme-css.js.
 */
import { configureTheme } from '@sudobility/design';
import { defaultTheme } from '@sudobility/design/themes';
import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

// Theme-aware mode: `variants.*` return semantic classes (bg-primary,
// border-input, ...) that reflect the active design style and flip light/dark.
// The token VALUES are applied at runtime by ThemeVarsProvider via vars()
// (NativeWind can't switch CSS-variable blocks on native).
configureTheme(defaultTheme, { native: true });

// Let react-native-svg (and the heroicons that render it) honor `className`
// color utilities: map the resolved text color to the svg's `color` prop so
// `<Icon className="text-primary" />` tints correctly (and flips light/dark).
cssInterop(Svg, {
  className: { target: 'style', nativeStyleToProp: { color: true } },
});
