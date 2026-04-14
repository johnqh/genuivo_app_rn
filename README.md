# starter_app_rn

React Native mobile application for the Starter project. Built with React Native 0.81, Expo ~54, and React Navigation 7.

## Setup

```bash
bun install
cp .env.example .env   # Configure environment variables
```

### Environment Variables

Environment variables (`EXPO_PUBLIC_*` prefix):

| Variable                           | Description          | Default          |
| ---------------------------------- | -------------------- | ---------------- |
| `EXPO_PUBLIC_API_URL`              | Backend API URL      | `localhost:8022` |
| `EXPO_PUBLIC_FIREBASE_API_KEY`     | Firebase API key     | required         |
| `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | required         |
| `EXPO_PUBLIC_FIREBASE_PROJECT_ID`  | Firebase project ID  | required         |

## Running

```bash
bun run start          # Start Metro bundler (port 8084)
bun run android        # Run on Android device/emulator
bun run ios            # Run on iOS device/simulator
```

Note: A prestart script merges `.env` files automatically. Environment changes require restarting Metro.

## Features

- **Navigation**: Bottom tabs (Histories, Settings) with native stack navigators.
- **Auth**: Firebase Auth with AsyncStorage persistence + Google Sign-In.
- **State**: Zustand 5 with AsyncStorage-backed persistence (via localStorage polyfill).
- **i18n**: i18next with `react-native-localize`.
- **Path alias**: `@/*` resolves to `src/*`.

## Screens

- Splash (auth check), Histories list, History detail, Settings

## Development

```bash
bun run start          # Metro bundler (port 8084)
bun run android        # Android
bun run ios            # iOS
bun run typecheck      # TypeScript check
bun run lint           # ESLint
bun run test           # Jest tests
bun run verify         # typecheck + lint + test
```

## Related Packages

- **starter_types** -- Shared type definitions
- **starter_client** -- API client SDK
- **starter_lib** -- Business logic library (`useHistoriesManager`)
- **starter_api** -- Backend server
- **starter_app** -- Web counterpart of this mobile app

## License

See package.json (private, not published).
