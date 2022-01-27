# Monogreggo

> Nx + Expo + Next.js experiment

![image](https://user-images.githubusercontent.com/2213636/151307126-7ecaf457-a149-4361-9b87-e4fde725d115.png)


## Setup

#### Installation

```
yarn install
```

Follow the [Expo doc's](https://docs.expo.dev/get-started/installation/) for Requirements and setting up the mobile app simulators.

#### Start the App

```
yarn nx run expoapp:run-web
yarn nx run expoapp:run-ios
yarn nx run expoapp:run-android
```

## Next Steps

#### Setup CI + EAS Build

Part of this would also be validating that the internal package imports are working. React Native's module system is fussy. The Nx Cloud services are pretty good, so maybe that. Probably GH Actions to start with. Oh and Changesets.

#### Docs

This is actually my main motivation for doing this -- Storybook isn't cutting it for me. Technically Storybook has RN support, but the APIs have too many comaptibility issues. Whereas with a cross-platform NextJS+Expo JAM-stack solution? Sky's the limit.

#### Navigation

Cross platform navigation is still maturing, in general. React Navigation is how it's usually done, and so in order to get Next.js magical nav API to jive, there's this project:
[nandorojo/expo-next-react-navigation](https://github.com/nandorojo/expo-next-react-navigation)

So establishing that workflow would probably be good.

#### Testing

Cross-platform testing is the least established part of the ecosystem. Most people use cypress, and only test web. Nx supports detox, but detox has issues. Would be nice to have a single shared testing workflow, though. Technically that can be done through Appium / Codecepts I think -- but it's still a bit iffy.

I think there are worthy alternatives to Jest at this point, for unit tests. But hard to justify the potential friction. On the other hand, cross-platform jest isn't a picnic.

#### Misc.

- SSR/SSG
- Module Federation
- Dev config (ESLint etc)
- Styling Workflow/Utils
- Fix TS snags
- Nx Generator?
- Expo dev client

---

## Implementation Notes

**Process**

- I started with a working Nx + Expo
- Then I installed the Nx + Next.js plugin, and generated a basic Next.js app.
- Then I adapted it into the Expo app, while referencing the Expo + Next.js docs

Most of the complexity was getting the `next.config.js` file to behave with all the build adapters.

Here are the most relevant libraries to this framework thruple:

- `nx-react-native-expo`
- `@expo/webpack-config`
- `@expo/next-adapter`
- `next-compose-plugins`
- `next-transpile-modules`

#### Note: Nx Plugin

`nx-react-native-expo` is no longer active and will be replaced by an [Nx version](https://github.com/nrwl/nx-expo) sometime this year.

#### Note: Nx updates

When updating Nx, ya gotta pin @nrwl/jest@12.3.6:

```
yarn nx migrate @nrwl/workspace --to="@nrwl/jest@12.3.6"
yarn nx migrate --run-migrations
```

Reason: RN has an annoying dependency on `jest 26` + `@nrwl/jest@12.3.6` is the last version before the plugin moved to the later version of jest.
