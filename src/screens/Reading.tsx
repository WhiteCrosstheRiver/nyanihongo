import { useMemo, useState } from 'react';
import { SENTENCES, STORIES, type Line, type Story } from '../data/reading';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { speak } from '../lib/audio';
import { Choices, Feedback, Header, Quiz, Ruby, SpeakButton, plainKana, shuffle, type QuizApi } from '../ui/parts';

export function ReadingScreen() {
  const { t, lang } = useT();
  const { p, update } = useStore();
  const [story, setStory] = useState<Story | null>(null);
  const [quiz, setQuiz] = useState(false);

  if (story) return <StoryView story={story} onExit={() => setStory(null)} />;
  if (quiz) return <SentenceQuiz onExit={() => setQuiz(false)} />;
  return (
    <div>
      <Header title={t('read')} />
      <button className="lesson-row card" onClick={() => setQuiz(true)}>
        <span className="emoji-mid">💬</span>
        <span><b>{t('sentenceQuiz')}</b><small>{t('sentenceDesc')}</small></span>
      </button>
      <label className="switch"><input type="checkbox" checked={p.furigana} onChange={(e) => update((q) => ({ ...q, furigana: e.target.checked }))} /> {t('furigana')}</label>
      <h2>{t('stories')}</h2>
      <div className="story-grid">
        {STORIES.map((s) => (
          <button key={s.id} className="story" onClick={() => setStory(s)}>
            <span className="emoji-mid">{s.emoji}</span>
            <b>{s.title[lang]}</b>
            <span className="tag">{s.level}{p.stories.includes(s.id) ? ' ✓' : ''}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function StoryView({ story, onExit }: { story: Story; onExit: () => void }) {
  const { t, lang } = useT();
  const { score, finishStory } = useStore();
  const [showTr, setShowTr] = useState(false);
  const [questions, setQuestions] = useState(false);
  const all = story.lines.map((l) => plainKana(l.ja)).join('');
  return (
    <div>
      <Header title={`${story.emoji} ${story.title[lang]}`} onBack={onExit} />
      {!questions ? (
        <>
          <div className="card story-text">
            <div className="row between">
              <SpeakButton text={all} />
              <button className="link" onClick={() => setShowTr(!showTr)}>{showTr ? t('hideTranslation') : t('showTranslation')}</button>
            </div>
            {story.lines.map((l, i) => (
              <p key={i} onClick={() => speak(plainKana(l.ja))}>
                <Ruby text={l.ja} />
                {showTr && <small className="tr">{l.tr[lang]}</small>}
              </p>
            ))}
          </div>
          <button className="btn wide" onClick={() => setQuestions(true)}>{t('questions')} 🐾</button>
        </>
      ) : (
        <Quiz total={story.questions.length} onExit={onExit} render={(i, api) => {
          const q = story.questions[i];
          return (
            <div className="card q" key={i}>
              <div className="sentence"><Ruby text={q.q} /></div>
              <Choices options={q.options.map((o, n) => ({ key: String(n), label: <Ruby text={o} /> }))} answer={String(q.answer)} api={api}
                onPick={(ok) => { score('reading', ok); if (i === story.questions.length - 1) finishStory(story.id); }} />
              <Feedback api={api} answer={api.correct ? undefined : <Ruby text={q.options[q.answer]} />} />
            </div>
          );
        }} />
      )}
    </div>
  );
}

function SentenceQuiz({ onExit }: { onExit: () => void }) {
  const { t } = useT();
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => shuffle(SENTENCES).slice(0, 10), [seed]);
  return (
    <div>
      <Header title={t('sentenceQuiz')} onBack={onExit} />
      <Quiz total={10} onExit={onExit} onReset={() => setSeed((s) => s + 1)}
        render={(i, api) => <SentenceQ key={`${seed}-${i}`} line={items[i]} api={api} />} />
    </div>
  );
}

function SentenceQ({ line, api }: { line: Line; api: QuizApi }) {
  const { t, lang } = useT();
  const { score } = useStore();
  const options = useMemo(() => {
    const wrong = shuffle(SENTENCES.filter((s) => s !== line)).slice(0, 3);
    return shuffle([line, ...wrong]).map((s) => ({ key: s.ja, label: s.tr[lang] }));
  }, [line, lang]);
  return (
    <div className="card q">
      <p className="q-hint">{t('whatMeans')}</p>
      <div className="sentence"><Ruby text={line.ja} /> <SpeakButton text={plainKana(line.ja)} /></div>
      <Choices options={options} answer={line.ja} api={api} onPick={(ok) => score('reading', ok)} />
      <Feedback api={api} answer={api.correct ? undefined : line.tr[lang]} />
    </div>
  );
}
