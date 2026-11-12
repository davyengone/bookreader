# Book Reader MVP

Tracked in GitHub issues #1 (reader), #2 (context), and #3 (TestFlight), on the book reader project.

Open directly into an original two-page short story, The Light Between Tides. There is no account, server, database, analytics, or network requirement. Each page is a short scene and can scroll at larger text sizes.

Tap a sentence to select it. Tap another sentence on the same page to extend the contiguous context; tap the sole selected sentence again to clear. See scene opens the page's bundled illustration and the exact selected passage in a routed modal. Returning preserves the reading position. Changing pages clears selection. This is sentence-level selection, not native arbitrary word-range selection. Illustrations are prepared in advance, one per scene, rather than generated for each selection.

Reading controls: previous/next page, three type sizes, paper/night appearance, selection clear, and end-of-book restart. System font scaling and safe areas remain supported.

## Design

Paper #F7F9F6, ink #203739, sea #245C64, selection #D9E9DF, brass #D9B56A, night #14282D. Literata is the bundled reading face; system sans-serif serves controls. Left-aligned prose, maximum 640-point reading column, generous line spacing, and minimal chrome. The one memorable feature is the story's full-width painted scene revealed on demand. Avoid a decorative cover/library screen: this MVP opens at the text.

Layout: book title and reading controls → page heading → sentence-selectable paragraphs → contextual scene action → page controls. Selection adds a quiet green highlight, not a card around every paragraph.

## Acceptance

- Both pages can be read at every text size, on a narrow phone and tablet.
- Single and extended sentence selection produce the exact quote in scene view.
- Scene modal can close without losing scroll position; no selection carries to another page.
- Images and font are bundled; no auth or runtime service calls.
- Lint, TypeScript, dependency doctor, and platform exports pass.
- TestFlight is reported separately as built, submitted, processed, and tester-access verified.
