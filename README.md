# Nyanihongo

A kawaii Japanese-learning app for Android, Windows and the web, with the UI in English, French, Spanish and Simplified Chinese. All data stays on the device.

## Commands

The tools live in `%LOCALAPPDATA%\DevTools` (`node`, `jdk`, `android-sdk`). Node is on the user PATH; set `JAVA_HOME` and `ANDROID_HOME` to the other two for Android builds.

| Task | Command | Output |
|---|---|---|
| Run in a browser | `npm run dev` | http://localhost:5173 |
| Run tests | `npm test` | |
| Run desktop app | `npm run desktop` | |
| Build Windows installer | `npm run dist:win` | `release/Nyanihongo-Setup-*.exe` |
| Build Android APK | `npm run dist:android` | `android/app/build/outputs/apk/debug/app-debug.apk` |

## Layout

- `src/lib/conjugate.ts`: verb conjugation engine, covered by `conjugate.test.ts`
- `src/lib/i18n.ts`: interface text; add a language here and to the data files
- `src/data/`: vocabulary, verbs, forms, stories and the ImageNet-to-word map (`recognition.ts`)
- `src/screens/`: one file per section
- `electron/main.cjs`: desktop shell
- `android/`: Capacitor project
- `public/models/mobilenet/`: offline image model

Regenerate icons with `npm i --no-save @resvg/resvg-js && node scripts/make-icons.cjs`.

## Licences of bundled data

- KanjiVG stroke data: CC BY-SA 3.0, © Ulrich Apel and contributors. Share-alike applies to `src/data/strokes.json`.
- MobileNet V2 model: Apache 2.0
- Zen Maru Gothic font: SIL OFL 1.1
- Twemoji font: SIL OFL 1.1 (font), CC BY 4.0 (graphics)

The credits are shown in the app under Me.
