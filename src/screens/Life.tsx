import { useMemo, useState } from 'react';
import { LIFE_GROUPS, LIFE_TOPICS } from '../data/life';
import type { LifeLink, LifeTopic } from '../data/life/types';
import { WORDS, type Word } from '../data/vocab';
import { useT, type Key } from '../lib/i18n';
import { meaningOptions } from '../lib/listening';
import { useStore } from '../lib/store';
import { Header, Mascot, Progress, Quiz, Ruby, SpeakButton, plainWritten, shuffle } from '../ui/parts';
import type { Nav } from '../App';
import { ReviewQ } from './Daily';
import { FestivalWheel } from './FestivalWheel';
import { FolkShelf, LifeStages } from './Figurines';
import { JapanMap } from './JapanMap';

const KIND: Record<LifeLink['kind'], [string, Key]> = {
  photo: ['📷', 'linkPhoto'],
  video: ['🎬', 'linkVideo'],
  guide: ['🧭', 'linkGuide'],
};
const QUIZ_SIZE = 10;

export function LifeScreen({ go }: { go: Nav }) {
  const { t, lang } = useT();
  const { p } = useStore();
  const [open, setOpen] = useState<LifeTopic | null>(null);
  if (open) return <Topic topic={open} onExit={() => setOpen(null)} />;
  return (
    <div>
      <Header title={t('life')} onBack={() => go('home')} />
      <section className="hero card life-hero">
        <Mascot mood="happy" size={84} />
        <p>{t('lifeDesc')}</p>
      </section>
      {LIFE_GROUPS.map((g) => (
        <section key={g.title}>
          <h2>{t(g.title)}</h2>
          <div className="cat-grid">
            {g.ids.map((id) => {
              const topic = LIFE_TOPICS.find((x) => x.id === id)!;
              const list = WORDS.filter((w) => w.category === id);
              const done = list.filter((w) => p.cards[w.id]).length;
              return (
                <button key={id} className="cat" onClick={() => setOpen(topic)}>
                  <span className="cat-icon">{topic.emoji}</span>
                  <span>{topic.title[lang]}</span>
                  <small lang="ja">{topic.jp}</small>
                  <Progress value={done} max={list.length} />
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function Topic({ topic, onExit }: { topic: LifeTopic; onExit: () => void }) {
  const { t, lang } = useT();
  const { p, addCard } = useStore();
  const [quiz, setQuiz] = useState(false);
  const [seed, setSeed] = useState(0);
  const words = useMemo(() => WORDS.filter((w) => w.category === topic.id), [topic]);
  const items = useMemo(() => shuffle(words).slice(0, QUIZ_SIZE), [words, seed]);
  const unadded = words.filter((w) => !p.cards[w.id]);

  if (quiz) {
    return (
      <div>
        <Header title={topic.title[lang]} onBack={() => setQuiz(false)} />
        <Quiz total={items.length} onExit={() => setQuiz(false)} onReset={() => setSeed((s) => s + 1)}
          render={(i, api) => <TopicQ key={`${seed}-${i}`} word={items[i]} api={api} />} />
      </div>
    );
  }
  return (
    <div>
      <Header title={topic.title[lang]} onBack={onExit} />
      <div className="card life-intro">
        <span className="emoji-big">{topic.emoji}</span>
        <p>{topic.intro[lang]}</p>
      </div>
      {topic.id === 'regions' && <JapanMap />}
      {topic.id === 'festivals' && <FestivalWheel />}
      {topic.id === 'folk' && <><FolkShelf /><LifeStages /></>}
      {topic.sections.map((s) => (
        <section className="card life-section" key={s.title.en}>
          <h3><span>{s.emoji}</span> {s.title[lang]}</h3>
          <p>{s.body[lang]}</p>
        </section>
      ))}
      {topic.phrases.length > 0 && <>
        <h2>{t('lifePhrases')}</h2>
        <div className="card table">
          {topic.phrases.map((l) => (
            <div className="life-phrase" key={l.ja}>
              <div>
                <Ruby text={l.ja} />
                <small>{l.tr[lang]}</small>
              </div>
              <SpeakButton text={plainWritten(l.ja)} />
            </div>
          ))}
        </div>
      </>}
      {words.length > 0 && <>
        <div className="row between life-words-head">
          <h2>{t('lifeWords')}</h2>
          <div className="row">
            <button className="btn small" onClick={() => setQuiz(true)}>{t('lifeQuiz')}</button>
            <button className="btn small ghost" disabled={!unadded.length} onClick={() => unadded.forEach((w) => addCard(w.id))}>
              {unadded.length ? t('addAll') : t('added')}
            </button>
          </div>
        </div>
        <div className="life-words">
          {words.map((w) => (
            <div className="life-word card" key={w.id}>
              {w.emoji && <span className="emoji-mid">{w.emoji}</span>}
              <span className="life-word-text">
                <ruby lang="ja">{w.written}{w.written !== w.kana && <rt>{w.kana}</rt>}</ruby>
                <small>{w.meaning[lang]}</small>
              </span>
              <SpeakButton text={w.kana} />
            </div>
          ))}
        </div>
      </>}
      {topic.links.length > 0 && <>
        <h2>🌐 {t('lifeLinks')}</h2>
        <p className="note">{t('lifeLinksNote')}</p>
        <div className="life-links">
          {topic.links.map((l) => (
            <a key={l.url} className="card life-link" href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="emoji-mid">{KIND[l.kind][0]}</span>
              <span>
                <b>{l.title[lang]}</b>
                <small>{t(KIND[l.kind][1])} · {l.source} ↗</small>
              </span>
            </a>
          ))}
        </div>
      </>}
    </div>
  );
}

function TopicQ({ word, api }: { word: Word; api: Parameters<typeof ReviewQ>[0]['api'] }) {
  const options = useMemo(() => meaningOptions(word), [word]);
  return <ReviewQ word={word} options={options} api={api} />;
}
