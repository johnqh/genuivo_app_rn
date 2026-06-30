module.exports = function (api) {
  // NativeWind's JSX transform (jsxImportSource + nativewind/babel) must NOT run
  // under jest: it hoists a `nativewind/jsx-runtime` import to module scope, which
  // trips babel-plugin-jest-hoist's "no out-of-scope variables in jest.mock()"
  // rule and breaks every test transform. Apply it only when Metro is the caller.
  const isMetro = api.caller(
    caller =>
      !!caller && (caller.name === 'metro' || caller.bundler === 'metro')
  );
  api.cache.using(() => isMetro);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          unstable_transformImportMeta: true,
          ...(isMetro ? { jsxImportSource: 'nativewind' } : {}),
        },
      ],
      ...(isMetro ? ['nativewind/babel'] : []),
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          // babel-plugin-module-resolver uses the FIRST alias that prefixes the
          // import, so specific aliases (notably '@/assets' -> ./assets) MUST be
          // listed before the general '@' -> ./src, otherwise '@/assets/x' would
          // resolve to ./src/assets/x.
          alias: {
            '@/assets': './assets',
            '@/components': './src/components',
            '@/screens': './src/screens',
            '@/hooks': './src/hooks',
            '@/stores': './src/stores',
            '@/navigation': './src/navigation',
            '@/i18n': './src/i18n',
            '@/config': './src/config',
            '@/context': './src/context',
            '@/polyfills': './src/polyfills',
            '@/services': './src/services',
            '@/native': './src/native',
            '@/di': './src/di',
            '@': './src',
          },
        },
      ],
    ],
  };
};
