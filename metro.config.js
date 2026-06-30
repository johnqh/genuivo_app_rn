const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const fs = require('fs');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

// React Native Windows support (graceful — may not be installed on mobile-only dev)
let rnwPath;
try {
  rnwPath = fs.realpathSync(
    path.resolve(require.resolve('react-native-windows/package.json'), '..')
  );
} catch {
  rnwPath = null;
}

const blockList = [
  // Prevent Windows build artifacts from crashing Metro
  new RegExp(`${path.resolve(__dirname, 'windows').replace(/[/\\]/g, '/')}.*`),
  /.*\.ProjectImports\.zip/,
];
if (rnwPath) {
  blockList.push(new RegExp(`${rnwPath}/build/.*`));
  blockList.push(new RegExp(`${rnwPath}/target/.*`));
}

// Some @sudobility packages may be dev-linked to sibling repos under ~/projects
// (their files are symlinks pointing outside this project root). Metro only
// follows a symlink whose realpath sits inside a watched folder, so collect the
// real roots of any outside-linked @sudobility package and watch exactly those —
// never the parent ~/projects root, which would make Metro's crawler choke
// (RangeError: Invalid string length). See nativewind.md §2.3.
const sudobilityDir = path.resolve(__dirname, 'node_modules/@sudobility');
const externalWatchFolders = [];
try {
  for (const pkg of fs.readdirSync(sudobilityDir)) {
    const pkgJson = path.join(sudobilityDir, pkg, 'package.json');
    if (!fs.existsSync(pkgJson)) continue;
    const realRoot = path.dirname(fs.realpathSync(pkgJson));
    if (!realRoot.startsWith(__dirname) && !externalWatchFolders.includes(realRoot)) {
      externalWatchFolders.push(realRoot);
    }
  }
} catch {
  // @sudobility dir absent — nothing to watch.
}

const config = {
  watchFolders: externalWatchFolders,
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'cjs'],
    resolverMainFields: ['react-native', 'browser', 'main'],
    blockList,
  },
};

module.exports = withNativeWind(mergeConfig(defaultConfig, config), {
  input: './global.css',
});
