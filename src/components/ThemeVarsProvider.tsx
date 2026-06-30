import React from 'react';
import { View, useColorScheme } from 'react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import { lightThemeVars, darkThemeVars } from '@/config/themeVars';

/**
 * Applies the design-system theme CSS variables at runtime and swaps them by
 * color scheme. Wrap the app so all descendants resolve semantic classes
 * (bg-background, text-foreground, border-border, ...) and flip light/dark.
 *
 * The scheme is resolved from the app's own source (settings + RN
 * `useColorScheme`) — the same logic AppNavigator uses for the navigation theme
 * and NativeWind's `colorScheme` — so chrome and content stay in agreement.
 */
export function ThemeVarsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useSettingsStore();
  const systemColorScheme = useColorScheme();
  const isDark =
    theme === 'dark' || (theme === 'system' && systemColorScheme === 'dark');
  return (
    <View style={[{ flex: 1 }, isDark ? darkThemeVars : lightThemeVars]}>
      {children}
    </View>
  );
}
