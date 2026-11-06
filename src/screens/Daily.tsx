import { useEffect, useState } from 'react';
import type { Word } from '../data/vocab';
import { speak } from '../lib/audio';
import { buildDaily, type Step } from '../lib/daily';
import { useT } from '../lib/i18n';
import { useStore } from '../lib/store';
import { Choices, Feedback, Header, Mascot, Quiz, SpeakButton, useVoice, type QuizApi } from '../ui/parts';
import type { Nav } from '../App';
import { AdjQ, ParticleQ } from './Grammar';
import { ListenQ } from './Listen';
import { VerbQ } from './Verbs';

export function DailyScreen({ go }: { go: Nav }) {
  const { t } = useT();
  const voice = useVoice();
  return (
    <div>
      <Header title={t('daily')} onBack={() => go('home')} />
      {voice === null
        ? <div className="card result"><Mascot mood="think" size={96} /></div>
        : <Lesson voice={voice} onExit={() => go('home')} />}
    </div>
  );
}

function Lesson({ voice, onExit }: { voice: boolean; onExit: () => void }) {
  const { p, finishDaily } = useStore();
  const [steps] = useState(() => buildDaily(p, voice));
  return (
    <Quiz total={steps.length} once onExit={onExit} onComplete={finishDaily}
      render={(i, api) => <StepView key={i} step={steps[i]} voice={voice} api={api} />} />
  );
}

function StepView({ step, voice, api }: { step: Step; voice: boolean; api: QuizApi }) {
  switch (step.t) {
    case 'new': return <NewWord word={step.word} api={api} />;
    case 'review': return <ReviewQ word={step.word} options={step.options} api={api} />;
    case 'verb': return <VerbQ item={step.item} api={api} />;
    case 'adj': return <AdjQ item={step.item} api={api} />;
    case 'particle': return <ParticleQ item={step.item} api={api} />;
    case 'listen': return <ListenQ item={step.item} voice={voice} api={api} />;
  }
}

function NewWord({ word, api }: { word: Word; api: QuizApi }) {
  const { t, lang } = useT();
  const { addCard, score } = useStore();
  useEffect(() => { speak(word.kana); }, []);
  return (
    <div className="card flash pop">
      <p className="q-hint">✨ {t('newWord')}</p>
      {word.emoji && <div className="emoji-big">{word.emoji}</div>}
      <div className="q-main" lang="ja">{word.written}</div>
      <div className="flash-back">
        <div lang="ja" className="reading">{word.kana} <SpeakButton text={word.kana} /></div>
        <div className="meaning">{word.meaning[lang]}</div>
      </div>
      <button className="btn wide" onClick={() => {
        addCard(word.id);
        score('words', true);
        api.answer(true);
        api.next();
      }}>{t('gotIt')}</button>
    </div>
  );
}

export function ReviewQ({ word, options, api }: { word: Word; options: Word[]; api: QuizApi }) {
  const { t, lang } = useT();
  const { grade } = useStore();
  return (
    <div className="card q">
      <p className="q-hint">{t('qListenMeaning')}</p>
      {word.emoji && <div className="emoji-big pop">{word.emoji}</div>}
      <div className="q-main"><ruby lang="ja">{word.written}<rt>{word.written === word.kana ? '' : word.kana}</rt></ruby></div>
      <Choices options={options.map((w) => ({ key: w.id, label: w.meaning[lang] }))} answer={word.id} api={api} onPick={(ok) => {
        grade(word.id, ok ? 'good' : 'again');
        speak(word.kana);
      }} />
      <Feedback api={api} answer={<span lang="ja">{word.written} ({word.kana}) · {word.meaning[lang]}</span>} />
    </div>
  );
}
