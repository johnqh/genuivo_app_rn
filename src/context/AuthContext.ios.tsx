/**
 * AuthContext - Firebase Authentication for iOS.
 *
 * Thin wiring over the shared `@sudobility/auth_lib` native hook
 * (`@react-native-firebase/auth`): native Google Sign-In + email/password.
 */

import {
  createFirebaseAuthContext,
  useFirebaseAuthNative,
} from '@sudobility/auth_lib/auth-native';

export type { AuthUser, AuthContextValue } from '@sudobility/auth_lib/auth-native';

export const { AuthProvider, useAuth } = createFirebaseAuthContext(
  useFirebaseAuthNative,
  {
    googleNative: {
      iosClientId:
        '1008456982478-34s3dd4ndeveq56rt1n774q85pda5v3f.apps.googleusercontent.com',
      webClientId:
        '1008456982478-l6ai87gui758k3e0op384pfnp0ia6gi3.apps.googleusercontent.com',
    },
    getGoogleSignin: async () =>
      (await import('@react-native-google-signin/google-signin')).GoogleSignin,
    providers: { google: true, emailPassword: true },
  }
);
