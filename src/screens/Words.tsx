import { useMemo, useState } from 'react';
import { CATEGORIES, CATEGORY_IDS, PICTURE_WORDS, WORDS, wordById, type CategoryId, type Word } from '../data/vocab';
import { CATEGORY_NAMES, useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { speak } from '../lib/audio';
import { toHiragana } from '../lib/romaji';
import type { Grade } from '../lib/srs';
import { Choices, Feedback, Header, KanaInput, Mascot, Progress, Quiz, SpeakButton, shuffle } from '../ui/parts';
import type { Nav } from '../App';

export function WordsScreen({ go }: { go: Nav }) {
  const { t, lang } = useT();
  const { p } = useStore();
  const [active, setActive] = useState<CategoryId | null>(null);

  if (active) return <Flashcards ids={WORDS.filter((w) => w.category === active).map((w) => w.id)} title={CATEGORY_NAMES[active][lang]} onExit={() => setActive(null)} />;
  const learned = Object.keys(p.cards).length;
  return (
    <div>
      <Header title={t('words')} />
      <div className="card wide-row">
        <div><strong>{learned} / {WORDS.length}</strong> {t('wordsLearned')}<Progress value={learned} max={WORDS.length} /></div>
        <button className="btn" onClick={() => go('picture')}>🖼️ {t('pictureQuiz')}</button>
      </div>
      <h2>{t('categories')}</h2>
      <div className="cat-grid">
        {CATEGORY_IDS.map((c) => {
          const list = WORDS.filter((w) => w.category === c);
          const done = list.filter((w) => p.cards[w.id]).length;
          return (
            <button key={c} className="cat" onClick={() => setActive(c)}>
              <span className="cat-icon">{CATEGORIES[c][0]}</span>
              <span>{CATEGORY_NAMES[c][lang]}</span>
              <small>{done}/{list.length}</small>
              <Progress value={done} max={list.length} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

const SESSION = 12;

export function ReviewScreen({ go }: { go: Nav }) {
  const { t } = useT();
  const { p } = useStore();
  const [ids] = useState(() => {
    const now = Date.now();
    return Object.entries(p.cards).filter(([, c]) => c.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
  });
  return <Flashcards ids={ids} title={t('reviewNow')} onExit={() => go('home')} due />;
}

function Flashcards({ ids, title, onExit, due }: { ids: string[]; title: string; onExit: () => void; due?: boolean }) {
  const { t } = useT();
  const { p, grade } = useStore();
  const [queue, setQueue] = useState(() => {
    if (due) return ids.slice(0, SESSION);
    const fresh = shuffle(ids.filter((id) => !p.cards[id]));
    const seen = shuffle(ids.filter((id) => p.cards[id]));
    return [...fresh, ...seen].slice(0, SESSION);
  });
  const [shown, setShown] = useState(false);
  const [done, setDone] = useState(0);
  const word = wordById(queue[0]);

  if (!word) {
    return (
      <div>
        <Header title={title} onBack={onExit} />
        <div className="result card pop"><Mascot mood="happy" size={130} /><h2>{t('niceJob')}</h2><button className="btn" onClick={onExit}>{t('finish')}</button></div>
      </div>
    );
  }
  const rate = (g: Grade) => {
    grade(word.id, g);
    setShown(false);
    setDone((d) => d + 1);
    setQueue(([head, ...rest]) => (g === 'again' ? [...rest, head] : rest));
  };
  return (
    <div>
      <Header title={title} onBack={onExit} />
      <Progress value={done} max={done + queue.length} />
      <FlashCard word={word} shown={shown} />
      {!shown
        ? <button className="btn wide" onClick={() => { setShown(true); speak(word.kana); }}>{t('showAnswer')}</button>
        : <div className="grades">{(['again', 'hard', 'good', 'easy'] as Grade[]).map((g) => <button key={g} className={`btn grade-${g}`} onClick={() => rate(g)}>{t(g)}</button>)}</div>}
    </div>
  );
}

function FlashCard({ word, shown }: { word: Word; shown: boolean }) {
  const { lang } = useT();
  return (
    <div className="card flash pop" key={word.id}>
      {word.emoji && <div className="emoji-big">{word.emoji}</div>}
      <div className="q-main" lang="ja">{word.written}</div>
      {shown && (
        <div className="flash-back">
          <div lang="ja" className="reading">{word.kana} <SpeakButton text={word.kana} /></div>
          <div className="meaning">{word.meaning[lang]}</div>
        </div>
      )}
    </div>
  );
}

export function PictureQuiz({ go }: { go: Nav }) {
  const { t } = useT();
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => shuffle(PICTURE_WORDS).slice(0, 10), [seed]);
  return (
    <div>
      <Header title={t('pictureQuiz')} onBack={() => go('words')} />
      <Quiz total={10} onExit={() => go('words')} onReset={() => setSeed((s) => s + 1)}
        render={(i, api) => <PictureQ key={`${seed}-${i}`} word={items[i]} typed={i % 3 === 2} api={api} />} />
    </div>
  );
}

function PictureQ({ word, typed, api }: { word: Word; typed: boolean; api: any }) {
  const { t, lang } = useT();
  const { score, addCard } = useStore();
  const options = useMemo(() => {
    const same = PICTURE_WORDS.filter((w) => w.category === word.category && w.kana !== word.kana && w.emoji !== word.emoji);
    const uniq = [...new Map(shuffle(same).map((w) => [w.kana, w])).values()].slice(0, 3);
    return shuffle([word, ...uniq]).map((w) => ({
      key: w.id,
      label: <span lang="ja">{w.written}{w.written !== w.kana && <small className="sub">{w.kana}</small>}</span>,
    }));
  }, [word]);
  const done = (ok: boolean) => { score('words', ok); if (ok) addCard(word.id); speak(word.kana); };
  return (
    <div className="card q">
      <p className="q-hint">{typed ? t('typeWord') : t('whichWord')}</p>
      <div className="emoji-big pop">{word.emoji}</div>
      {typed
        ? <KanaInput disabled={api.answered} placeholder={t('romajiHint')} onSubmit={(v) => {
            const ok = toHiragana(v) === toHiragana(word.kana) || v === word.written;
            api.answer(ok); done(ok);
          }} />
        : <Choices options={options} answer={word.id} api={api} onPick={done} />}
      <Feedback api={api} answer={<span lang="ja">{word.written} ({word.kana}) · {word.meaning[lang]}</span>} />
    </div>
  );
}
