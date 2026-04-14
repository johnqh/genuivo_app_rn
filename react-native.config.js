module.exports = {
  dependencies: {
    // Disable native Firebase packages on macOS — desktop uses Firebase JS SDK
    '@react-native-firebase/app': {
      platforms: {
        macos: null,
        android: {
          packageImportPath:
            'import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;',
        },
      },
    },
    '@react-native-firebase/auth': {
      platforms: { macos: null },
    },
    '@react-native-firebase/analytics': {
      platforms: { macos: null },
    },
    '@react-native-firebase/crashlytics': {
      platforms: { macos: null },
    },
    '@react-native-firebase/messaging': {
      platforms: { macos: null },
    },
    '@react-native-firebase/perf': {
      platforms: { macos: null },
    },
    '@react-native-firebase/remote-config': {
      platforms: { macos: null },
    },
    // Google Sign-In native module doesn't support macOS — desktop uses WebAuth PKCE flow
    '@react-native-google-signin/google-signin': {
      platforms: { macos: null },
    },
  },
  project: {
    macos: {
      sourceDir: 'macos',
    },
  },
};
