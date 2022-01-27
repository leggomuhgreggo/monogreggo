// @generated: @expo/next-adapter@3.1.2
// Learn more: https://github.com/expo/expo/blob/master/docs/pages/versions/unversioned/guides/using-nextjs.md#withexpo

const { withExpo } = require('@expo/next-adapter');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['react-native-web']);
const { WebpackConfigNxExpo } = require('nx-react-native-expo');

const nextConfig = {
  webpack: (config) => {
    return WebpackConfigNxExpo(config);
  },
}

module.exports = withPlugins(
  [
    withTM,
    [withExpo, { projectRoot: __dirname }]
  ],
  nextConfig
);