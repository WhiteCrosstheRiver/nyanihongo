import { useState } from 'react';
import { useT } from '../../lib/i18n';
import { useStore } from '../../lib/store';
import { Header } from '../../ui/parts';
import { tr } from '../../data/life/types';
import { VISUAL_LESSONS, type VisualLesson } from './lessons';
import './visual.css';

const S = {
  back: tr('Back', 'Retour', 'Atrás', '上一步'),
  next: tr('Next', 'Suivant', 'Siguiente', '下一步'),
  predict: tr('Your prediction', 'Ta prédiction', 'Tu predicción', '你来预测'),
  done: tr('Finish', 'Terminer', 'Terminar', '完成'),
  again: tr('Replay', 'Revoir', 'Repetir', '再看一遍'),
  step: tr('Step', 'Étape', 'Paso', '步骤'),
};

export function VisualMenu({ onOpen }: { onOpen: (l: VisualLesson) => void }) {
  const { lang } = useT();
  return (
    <div className="vg-menu">
      {VISUAL_LESSONS.map((l, i) => (
        <button key={l.id} className="card vg-card" onClick={() => onOpen(l)}>
          <span className="vg-num">{i + 1}</span>
          <span className="emoji-mid" aria-hidden="true">{l.emoji}</span>
          <span><b>{l.title[lang]}</b><small>{l.idea[lang]}</small></span>
        </button>
      ))}
    </div>
  );
}

export function VisualLessonView({ lesson, onExit }: { lesson: VisualLesson; onExit: () => void }) {
  const { lang } = useT();
  const { score } = useStore();
  const [step, setStep] = useState(0);
  const [pick, setPick] = useState<number | null>(null);
  const { Scene, steps, ask } = lesson;
  const asking = step >= steps.length;
  const choose = (i: number) => {
    if (pick !== null) return;
    setPick(i);
    score('grammar', i === ask.answer);
  };
  return (
    <div className="vg">
      <Header title={lesson.title[lang]} onBack={onExit} />
      <div className="vg-layout">
        <section className="card vg-scene"><Scene step={Math.min(step, steps.length - 1)} /></section>
        <section className="vg-side">
          <div className="vg-dots" aria-label={`${S.step[lang]} ${Math.min(step + 1, steps.length + 1)} / ${steps.length + 1}`}>
            {[...steps, ask].map((_, i) => <span key={i} className={i === step ? 'on' : i < step ? 'past' : ''} />)}
          </div>
          {asking
            ? <div className="card vg-q">
                <small>🤔 {S.predict[lang]}</small>
                <p>{ask.q[lang]}</p>
                {ask.ja && <p className="vg-q-ja" lang="ja">{ask.ja}</p>}
                <div className="vg-options">
                  {ask.options.map((o, i) => (
                    <button key={i} lang={typeof o === 'string' ? 'ja' : undefined} disabled={pick !== null}
                      className={`btn ghost ${pick !== null && i === ask.answer ? 'right' : ''} ${pick === i && i !== ask.answer ? 'wrong' : ''}`}
                      onClick={() => choose(i)}>{typeof o === 'string' ? o : o[lang]}</button>
                  ))}
                </div>
                {pick !== null && <p className="vg-why" role="status">{pick === ask.answer ? '🎉' : '💡'} {ask.why[lang]}</p>}
              </div>
            : <p className="vg-say" aria-live="polite">{steps[step][lang]}</p>}
          <div className="row between vg-nav">
            <button className="btn small ghost" disabled={step === 0} onClick={() => { setStep(step - 1); setPick(null); }}>← {S.back[lang]}</button>
            {!asking && <button className="btn small" onClick={() => setStep(step + 1)}>{S.next[lang]} →</button>}
            {asking && pick !== null && <button className="btn small" onClick={onExit}>{S.done[lang]} ✓</button>}
          </div>
        </section>
      </div>
    </div>
  );
}
