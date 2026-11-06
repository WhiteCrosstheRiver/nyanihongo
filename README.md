# Nyanihongo

A kawaii Japanese-learning app for Android, Windows and the web, with the UI in English, French, Spanish and Simplified Chinese. All data stays on the device, and every feature works with no connection.

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
- `src/lib/adjectives.ts`: adjective forms
- `src/lib/daily.ts`: builds the daily lesson from reviews and recent mistakes
- `src/lib/backup.ts`: progress export and import
- `scripts/sw.template.js`: offline cache for the web version; `vite.config.ts` fills in its file list
- `src/lib/i18n.ts`: interface text; add a language here and to the data files
- `src/data/`: vocabulary, verbs, forms, stories and the ImageNet-to-word map (`recognition.ts`)
- `src/screens/`: one file per section
- `src/data/life/`: Life in Japan topics; each is a `LifeTopic`, and its words join the review system. `LIFE_TOPIC=<id> npx vitest run src/lib/life.test.ts` checks one topic
- `electron/main.cjs`: desktop shell
- `android/`: Capacitor project
- `public/models/mobilenet/`: offline image model

Regenerate icons with `npm i --no-save @resvg/resvg-js && node scripts/make-icons.cjs`.

## Offline

Windows and Android carry all data inside the app. The web version (`dist`, served over HTTPS) can be installed from the browser: it saves the app shell first, then downloads the fonts and image model in the background and resumes after a dropped connection. Audio always uses the device's own Japanese voice. Life in Japan photo and video links are the one online extra: they open in the browser, and nothing from them ships in the app.

## Licences of bundled data

- KanjiVG stroke data: CC BY-SA 3.0, © Ulrich Apel and contributors. Share-alike applies to `src/data/strokes.json`.
- MobileNet V2 model: Apache 2.0
- Map of Japan: Natural Earth, public domain
- Zen Maru Gothic font: SIL OFL 1.1
- Twemoji font: SIL OFL 1.1 (font), CC BY 4.0 (graphics)

The credits are shown in the app under Me.
