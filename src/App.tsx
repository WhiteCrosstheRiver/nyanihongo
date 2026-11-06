import { useCallback, useEffect, useState } from 'react';
import { LangContext, useT, type Key } from './lib/i18n';
import { StoreProvider, useStore } from './lib/store';
import { Confetti, Mascot } from './ui/parts';
import { Home } from './screens/Home';
import { KanaScreen } from './screens/Kana';
import { PictureQuiz, ReviewScreen, WordsScreen } from './screens/Words';
import { VerbsScreen } from './screens/Verbs';
import { CameraScreen } from './screens/Camera';
import { ReadingScreen } from './screens/Reading';
import { MeScreen } from './screens/Me';

export type Nav = (to: string) => void;

const TABS: { to: string; icon: string; label: Key }[] = [
  { to: 'home', icon: '🏠', label: 'home' },
  { to: 'kana', icon: 'あ', label: 'kana' },
  { to: 'words', icon: '🍙', label: 'words' },
  { to: 'verbs', icon: '🐾', label: 'verbs' },
  { to: 'camera', icon: '📷', label: 'camera' },
  { to: 'read', icon: '📖', label: 'read' },
  { to: 'me', icon: '🎀', label: 'me' },
];

const routeOf = () => location.hash.replace(/^#\/?/, '') || 'home';

function Shell() {
  const { t } = useT();
  const { newSticker, clearSticker } = useStore();
  const [route, setRoute] = useState(routeOf);
  const go = useCallback<Nav>((to) => { location.hash = `/${to}`; }, []);

  useEffect(() => {
    const on = () => { setRoute(routeOf()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  useEffect(() => {
    if (!newSticker) return;
    const id = setTimeout(clearSticker, 3500);
    return () => clearTimeout(id);
  }, [newSticker, clearSticker]);

  const active = route === 'picture' ? 'words' : route === 'review' ? 'home' : route;
  return (
    <div className="shell">
      <nav className="nav" aria-label="Main">
        <div className="brand"><Mascot size={44} /><span>Nyanihongo</span></div>
        {TABS.map((tab) => (
          <button key={tab.to} className={active === tab.to ? 'on' : ''} aria-current={active === tab.to ? 'page' : undefined} onClick={() => go(tab.to)}>
            <span className="nav-icon" lang="ja">{tab.icon}</span>
            <span className="nav-label">{t(tab.label)}</span>
          </button>
        ))}
      </nav>
      <main className="main" key={route}>
        {route === 'home' && <Home go={go} />}
        {route === 'kana' && <KanaScreen />}
        {route === 'words' && <WordsScreen go={go} />}
        {route === 'review' && <ReviewScreen go={go} />}
        {route === 'picture' && <PictureQuiz go={go} />}
        {route === 'verbs' && <VerbsScreen />}
        {route === 'camera' && <CameraScreen />}
        {route === 'read' && <ReadingScreen />}
        {route === 'me' && <MeScreen />}
      </main>
      {newSticker && (
        <div className="toast pop" role="status" onClick={clearSticker}>
          <Confetti />
          <span className="emoji-mid">{newSticker.emoji}</span>
          <div><b>{t('stickerUnlocked')}</b><div lang="ja">{newSticker.name}</div></div>
        </div>
      )}
    </div>
  );
}

function Localized() {
  const { p } = useStore();
  return <LangContext.Provider value={p.lang}><Shell /></LangContext.Provider>;
}

export default function App() {
  return <StoreProvider><Localized /></StoreProvider>;
}
