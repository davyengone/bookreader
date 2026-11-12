# iOS MVP release

- App: Book Reader by Hackages (device name: Book Reader).
- Version: 1.0.0, build 1.
- Apple team: Hackages Nederland BV, 4QU22KV747.
- Bundle: net.hackages.bookreader; minimum iOS 16.4; iPhone and iPad.
- App Store Connect app: 6833969152.
- EAS project: hackages_group/book-reader, 512c01a0-8b68-4279-9cc5-cafc3ea15d5b.
- Built source: 1cca3525401cf2c4de0e89545676e0ddc9a4d1d7. Later changes add submission configuration and documentation only.

## Evidence

[Production build](https://expo.dev/accounts/hackages_group/projects/book-reader/builds/4c5b2bc6-ac0f-404a-9b72-dabfda8ca989) finished on 2026-11-12 at 14:17 UTC. The signed IPA was inspected: version/bundle identifier match; both illustrations, Literata, and the Hermes app bundle are present; export compliance is configured.

[Submission](https://expo.dev/accounts/hackages_group/projects/book-reader/submissions/9c244aa9-528a-4a24-98b9-53b504aac521) is queued. [TestFlight](https://appstoreconnect.apple.com/apps/6833969152/testflight/ios) processing and tester availability have not yet been verified.

The Reader MVP internal group has automatic access to all builds. Tester assignment is configured; invitation status is pending the first processed build.

## Checks performed

- Expo lint and TypeScript pass.
- Expo Doctor: 20/20.
- iOS, Android, and web production exports pass.
- Selection range checks: single sentence, forward/reverse contiguous ranges, clear, empty.
- Chrome mobile viewport (390×844): both scenes and exact selected quotes, closing the scene, page navigation clearing selection, large type, and night appearance.
- Signed iOS artifact inspection as above.

Native touch behavior, VoiceOver, and installation on a physical iPhone have not been verified by the agent. No Android store build has been requested.

## Releasing the next build

```sh
npx expo lint
npx tsc --noEmit
npx expo-doctor
npx expo export --platform all
npx eas-cli@latest build --platform ios --profile production
npx eas-cli@latest submit --platform ios --profile production --id BUILD_ID --groups 'Reader MVP' --no-auto-testflight-setup
npx eas-cli@latest submit:status --platform ios --json
```

EAS stores the signing and submission credentials remotely; the repository contains no Apple secrets. Automatic build numbering is enabled. This release targets internal TestFlight, not the public App Store.
