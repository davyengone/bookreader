# Book Reader

An offline Expo SDK 58 reader with an original two-page story and illustrated scenes. No login, backend, database, or image-generation service.

## Try it

```sh
npm ci
npx expo start
```

Tap a sentence, tap another to extend the passage, then tap **See scene**. Close the scene to return to the same reading position. **Aa** changes text size and paper/night appearance. **Next** moves to page two. The story, font, and both illustrations are bundled.

Selections are sentence ranges. Each page has one prepared illustration; selecting different text on that page changes the quoted context, not the image. Reading position and preferences last for the current app session only.

## Validation

```sh
npx expo lint
npx tsc --noEmit
npx expo-doctor
npx expo export --platform all
```

## iOS release

```sh
npx eas-cli@latest build --platform ios --profile production
npx eas-cli@latest submit --platform ios --profile production
```

EAS project: [hackages_group/book-reader](https://expo.dev/accounts/hackages_group/projects/book-reader). Bundle ID: `net.hackages.bookreader`.

[Scope and acceptance](docs/SPEC.md) · [Assets](docs/ASSETS.md) · [GitHub project](https://github.com/users/davyengone/projects/2)
