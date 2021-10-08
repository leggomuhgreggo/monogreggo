const { withNxMetro } = require('nx-react-native-expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');
const { assetExts, sourceExts } = require('metro-config/src/defaults/defaults');

const METRO_DEFAULT_CONFIG = getDefaultConfig(__dirname);

const CUSTOM_CONFIG = {
  transformer: {
    minifierPath: 'metro-minify-esbuild',
    minifierConfig: {},

    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    assetExts: assetExts.filter((extension) => extension !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

const EXTRA_OPTIONS = {
  debug: false, // Change this to true to see debugging info. Useful if you have issues resolving modules
  extensions: [], // all the file extensions used for imports other than 'ts', 'tsx', 'js', 'jsx'
}

// ────────────────────────────────────────────────────────────────────────────────

// `withNxMetro` is from nx-react-native-expo
const nxMetroConfig = withNxMetro(METRO_DEFAULT_CONFIG, EXTRA_OPTIONS);
const config = mergeConfig(nxMetroConfig, CUSTOM_CONFIG);

// ────────────────────────────────────────────────────────────────────────────────

// CI optimization
if (process.env.CI) {
  config.watchFolders = [];
}

// ────────────────────────────────────────────────────────────────────────────────

module.exports = config;

