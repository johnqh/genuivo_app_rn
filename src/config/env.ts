/**
 * Environment configuration
 *
 * Uses direct process.env.EXPO_PUBLIC_* access so Expo's babel plugin
 * can inline/reference the values at bundle time. Do NOT use a helper
 * function with dynamic keys — the babel plugin only matches the
 * static pattern `process.env.EXPO_PUBLIC_*`.
 */

export const env = {
  // API URL
  API_URL: process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:8022',

  // App identity
  APP_NAME: process.env.VITE_APP_NAME ?? 'Starter App',
  APP_DOMAIN: process.env.VITE_APP_DOMAIN ?? 'example.com',
  COMPANY_NAME: process.env.VITE_COMPANY_NAME ?? 'My Company',

  // Firebase
  FIREBASE_API_KEY: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
  FIREBASE_AUTH_DOMAIN: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  FIREBASE_PROJECT_ID: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  FIREBASE_STORAGE_BUCKET:
    process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  FIREBASE_MESSAGING_SENDER_ID:
    process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  FIREBASE_APP_ID: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',

  // Development
  DEV_MODE: (process.env.EXPO_PUBLIC_DEV_MODE ?? 'false') === 'true',
};

/** Firebase config object for the JS SDK (used on desktop) */
export const FIREBASE_CONFIG = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
};

/** Google OAuth config for desktop PKCE flow */
export const GOOGLE_OAUTH_CONFIG = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID ?? '',
  iosClientId: process.env.GOOGLE_OAUTH_IOS_CLIENT_ID ?? '',
  reversedClientId: process.env.GOOGLE_OAUTH_REVERSED_CLIENT_ID ?? '',
};
