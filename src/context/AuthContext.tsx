/**
 * AuthContext - Firebase Authentication for Desktop (macOS / Windows).
 *
 * Thin wiring over the shared `@sudobility/auth_lib` JS-SDK hook: Google via the
 * PKCE system-browser flow (WebAuth) + email/password. All logic in auth_lib.
 */

import {
  createFirebaseAuthContext,
  useFirebaseAuthJs,
} from '@sudobility/auth_lib/auth-js';
import { WebAuth } from '@sudobility/building_blocks_rn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FIREBASE_CONFIG, GOOGLE_OAUTH_CONFIG } from '@/config/env';

export type { AuthUser, AuthContextValue } from '@sudobility/auth_lib/auth-js';

export const { AuthProvider, useAuth } = createFirebaseAuthContext(
  useFirebaseAuthJs,
  {
    firebaseConfig: FIREBASE_CONFIG,
    asyncStorage: AsyncStorage,
    googleOAuth: GOOGLE_OAUTH_CONFIG,
    webAuth: WebAuth,
    providers: { google: true, emailPassword: true },
  }
);
