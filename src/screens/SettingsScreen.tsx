/**
 * SettingsScreen - App settings and preferences
 *
 * Displays appearance settings (theme), account info with sign-in/sign-out,
 * and about section. Uses the shared AuthModal for authentication flows.
 */

import React, { useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTabBarHeight } from '@/hooks/useTabBarHeight';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';
import { useAuth } from '@/context/AuthContext';
import { useSettingsStore, type ThemeMode } from '@/stores/settingsStore';
import { useAppColors } from '@/hooks/useAppColors';
import { changeLanguage } from '@/i18n';
import { SUPPORTED_LANGUAGES, COMPANY_NAME } from '@/config/constants';
import AuthModal from '@/components/AuthModal';
import type { SettingsScreenProps } from '@/navigation/types';
import { trackScreenView, trackButtonClick, trackEvent } from '@/analytics';

/** Display names for supported languages (in their native script). */
const LANGUAGE_LABELS: Record<string, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  ja: '日本語',
  ko: '한국어',
  pt: 'Português',
  ru: 'Русский',
  sv: 'Svenska',
  th: 'ไทย',
  uk: 'Українська',
  vi: 'Tiếng Việt',
  zh: '中文(简体)',
  'zh-Hant': '中文(繁體)',
};

/** Available theme options for the theme picker. */
const themes: { value: ThemeMode; label: string }[] = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export default function SettingsScreen(_props: SettingsScreenProps) {
  const { t } = useTranslation();
  const appColors = useAppColors();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const { theme, setTheme } = useSettingsStore();

  const tabBarHeight = useTabBarHeight();

  useEffect(() => {
    trackScreenView('Settings');
  }, []);

  // Auth modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  /** Show an alert to pick a theme mode. */
  const handleThemeChange = useCallback(() => {
    trackButtonClick('theme_change');
    const currentIndex = themes.findIndex(th => th.value === theme);

    Alert.alert(t('settings.selectTheme'), undefined, [
      ...themes.map((th, index) => ({
        text: `${t(`settings.theme.${th.value}`, th.label)}${
          index === currentIndex ? ' \u2713' : ''
        }`,
        onPress: () => setTheme(th.value),
      })),
      { text: t('common.cancel'), style: 'cancel' as const },
    ]);
  }, [theme, setTheme, t]);

  /** Show an alert to pick a language. */
  const handleLanguageChange = useCallback(() => {
    trackButtonClick('language_change');
    const activeLang = i18n.language;
    Alert.alert(t('settings.language'), undefined, [
      ...SUPPORTED_LANGUAGES.map(lang => ({
        text: `${LANGUAGE_LABELS[lang] ?? lang}${
          lang === activeLang ? ' \u2713' : ''
        }`,
        onPress: () => changeLanguage(lang),
      })),
      { text: t('common.cancel'), style: 'cancel' as const },
    ]);
  }, [t]);

  /** Confirm and execute sign-out. */
  const handleSignOut = useCallback(async () => {
    trackButtonClick('sign_out');
    Alert.alert(t('auth.signOut'), t('auth.signOutConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('auth.signOut'),
        style: 'destructive',
        onPress: async () => {
          try {
            await signOut();
            trackEvent('signed_out');
          } catch (error) {
            console.error('Sign out error:', error);
          }
        },
      },
    ]);
  }, [signOut, t]);

  const currentTheme = themes.find(th => th.value === theme)?.label ?? 'System';

  return (
    <SafeAreaView
      className='flex-1 bg-background'
      edges={['left', 'right']}
    >
      <ScrollView
        contentContainerClassName='p-4'
        contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}
      >
        {/* Appearance Section */}
        <View className='mb-7'>
          <Text className='mb-2 px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('settings.appearance')}
          </Text>
          <View className='overflow-hidden rounded-lg bg-card'>
            <Pressable
              className='flex-row items-center justify-between px-4 py-3'
              onPress={handleThemeChange}
              accessibilityRole='button'
              accessibilityLabel={`${t('settings.theme.label')}: ${t(
                `settings.theme.${theme}`,
                currentTheme
              )}`}
            >
              <View className='mr-3 flex-1'>
                <Text className='text-base text-foreground'>
                  {t('settings.theme.label')}
                </Text>
                <Text className='mt-0.5 text-[13px] text-muted-foreground'>
                  {t('settings.themeDescription')}
                </Text>
              </View>
              <Text className='text-base text-muted-foreground'>
                {t(`settings.theme.${theme}`, currentTheme)}
              </Text>
            </Pressable>
            <View className='ml-4 h-px bg-border' />
            <Pressable
              className='flex-row items-center justify-between px-4 py-3'
              onPress={handleLanguageChange}
              accessibilityRole='button'
              accessibilityLabel={`${t('settings.language')}: ${
                LANGUAGE_LABELS[i18n.language] ?? i18n.language
              }`}
            >
              <View className='mr-3 flex-1'>
                <Text className='text-base text-foreground'>
                  {t('settings.language')}
                </Text>
                <Text className='mt-0.5 text-[13px] text-muted-foreground'>
                  {t('settings.languageDescription')}
                </Text>
              </View>
              <Text className='text-base text-muted-foreground'>
                {LANGUAGE_LABELS[i18n.language] ?? i18n.language}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Account Section */}
        <View className='mb-7'>
          <Text className='mb-2 px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('settings.account')}
          </Text>
          <View className='overflow-hidden rounded-lg bg-card'>
            {authLoading ? (
              <View className='flex-row items-center justify-between px-4 py-3'>
                <ActivityIndicator size='small' color={appColors.primary} />
              </View>
            ) : user ? (
              <View className='flex-row items-center justify-between px-4 py-3'>
                <View className='mr-3 flex-1'>
                  <Text className='text-base text-foreground'>
                    {user.email || t('auth.signedIn')}
                  </Text>
                  <Text className='mt-0.5 text-[13px] text-muted-foreground'>
                    {user.displayName || user.uid.substring(0, 8)}
                  </Text>
                </View>
                <Pressable
                  onPress={handleSignOut}
                  accessibilityRole='button'
                  accessibilityLabel={t('auth.signOut')}
                >
                  <Text className='text-base text-primary'>
                    {t('auth.signOut')}
                  </Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                className='flex-row items-center justify-between px-4 py-3'
                onPress={() => {
                  trackButtonClick('sign_in');
                  setShowAuthModal(true);
                }}
                accessibilityRole='button'
                accessibilityLabel={t('auth.signIn')}
              >
                <View className='mr-3 flex-1'>
                  <Text className='text-base text-foreground'>
                    {t('auth.signIn')}
                  </Text>
                  <Text className='mt-0.5 text-[13px] text-muted-foreground'>
                    {t('settings.signInDescription')}
                  </Text>
                </View>
                <Text className='text-xl text-muted-foreground'>
                  {'\u203A'}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {/* About Section */}
        <View className='mb-7'>
          <Text className='mb-2 px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground'>
            {t('settings.about')}
          </Text>
          <Text className='px-1 text-sm text-muted-foreground'>
            {t('settings.version')}
          </Text>
          <Text className='mt-1 px-1 text-xs text-muted-foreground'>
            {t('settings.copyright', { companyName: COMPANY_NAME })}
          </Text>
        </View>
      </ScrollView>

      <AuthModal
        visible={showAuthModal}
        onDismiss={() => setShowAuthModal(false)}
        initialMode='signin'
      />
    </SafeAreaView>
  );
}
