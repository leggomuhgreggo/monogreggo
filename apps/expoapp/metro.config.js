const path = require('path');
const { withNxMetro } = require('nx-react-native-expo');
const { getDefaultConfig } = require('@expo/metro-config');
const { mergeConfig } = require('metro-config');
const { assetExts, sourceExts } = require('metro-config/src/defaults/defaults');

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
/**
 * This file is currently a little incoherent -- it combines two approaches to
 * adapting to a monorepo (nx-react-native-expo + yarn workspaces).
 * 
 * ## STEPS
 * - Define standard options, with debug extras
 * - Mod #1 | Merge config with default + `withNxMetro` (not totally sure what this does)
 * - Mod #2 | Update with node_modules resolver paths + watch folders
 * - Little CI optimization
 * - Export config
 * 
 * ## REFERENCES
 * https://docs.expo.dev/guides/monorepos/#modify-the-metro-config
 * https://docs.expo.dev/build-reference/how-tos/#how-to-set-up-eas-build-with
 * https://github.com/JacopoPatroclo/nx-react-native-expo
 * https://github.com/nrwl/nx-expo (future)
 * 
 */
////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


// Base Metro Config + Extra Options
////////////////////////////////////////////////////////////////////////////

const METRO_OPTIONS = {
  transformer: {
    minifierPath: 'metro-minify-esbuild', // optimization
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


// Merge default metro config with `withNxMetro` from nx-react-native-expo 
////////////////////////////////////////////////////////////////////////////

const METRO_DEFAULT_CONFIG = getDefaultConfig(__dirname);
const nxMetroConfig = withNxMetro(METRO_DEFAULT_CONFIG, EXTRA_OPTIONS);
const config = mergeConfig(nxMetroConfig, METRO_OPTIONS);


// Additional Monorepo Configurations
////////////////////////////////////////////////////////////////////////////

const WORKSPACE_ROOT = path.resolve(__dirname, '../..');
const PROJECT_ROOT = __dirname;

// Watch all files within the monorepo
config.watchFolders = [WORKSPACE_ROOT];
// Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPath = [
  path.resolve(PROJECT_ROOT, 'node_modules'),
  path.resolve(WORKSPACE_ROOT, 'node_modules'),
];


// Optimize + Export Config
////////////////////////////////////////////////////////////////////////////

if (process.env.CI) {
  config.watchFolders = [];
}

module.exports = config;

