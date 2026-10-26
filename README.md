# TrueSheet: the sheet navigator bundles react-native-reanimated in every app

Expo SDK 58 (Expo Router 58.0.26, React Native 0.88, react-native-web 0.21.4),
`@lodev09/react-native-true-sheet@4.0.0-beta.31`.

The app uses the Expo Router `Sheet` navigator, and no screen sets `reanimated: true`. It doesn't use
`react-native-reanimated` (Bun and npm install it anyway, as a peer of `react-native-drawer-layout`, a dependency of
`expo-router`).

```sh
bun install
npx expo export --platform web
bun run check
```

**Expected:** no bundle has reanimated. The docs say the navigator's reanimated integration "is lazy-loaded, so
screens without `reanimated: true` don't require reanimated".

**Actual:**

```
reanimated in _layout-….js (860 KB)
total JS: 1968 KB
```

`TrueSheetNavigatorContent` only calls `require('./screen/ReanimatedTrueSheetScreen')` for a `reanimated: true`
screen, but bundlers include every `require()` they find: reanimated and worklets end up in every app using the
navigator. Native too: `npx expo export --platform ios --no-bytecode` gives a 2360 KB bundle with reanimated in it.

## With the fix

`vendor/react-native-true-sheet-fix-navigator-reanimated.tgz` is `npm pack` of the branch
`fix/navigation-reanimated-entry` of react-native-true-sheet: the reanimated screen is registered by a new
`@lodev09/react-native-true-sheet/navigation/reanimated` entry, which apps using `reanimated: true` import once.

```sh
bun run fix           # installs the tgz (bun run unfix goes back to 4.0.0-beta.31)
rm -rf dist
npx expo export --platform web
bun run check
```

```
total JS: 1264 KB
```

No bundle has reanimated (the iOS bundle: 1588 KB, without reanimated). `npx expo start --web`, then **Open the
sheet**: the sheet opens as before.
