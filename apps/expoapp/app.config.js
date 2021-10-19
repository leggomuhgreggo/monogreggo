module.exports = {
  expo: {
    name: 'monogreggo',
    slug: 'monogreggo',
    owner: 'gwestneat',
    scheme: 'sweetgreen.order',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    jsEngine: 'hermes',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.monogreggo',
    },
    android: {
      package: 'com.monogreggo',
    },
    web: {
      favicon: './assets/favicon.png'
    }
  }
}
