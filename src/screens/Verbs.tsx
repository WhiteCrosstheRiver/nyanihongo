import { useEffect, useMemo, useState } from 'react';
import { FORM_GROUPS, FORM_INFO, FRAMES, FRAME_VERBS } from '../data/forms';
import { VERBS, type VerbEntry } from '../data/verbs';
import { FORMS, accepted, conjugate, isAvailable, type Form, type VerbClass } from '../lib/conjugate';
import { GROUP_NAMES, useT, type Key } from '../lib/i18n';
import { useStore } from '../lib/store';
import { speak } from '../lib/audio';
import { toHiragana } from '../lib/romaji';
import { Choices, Feedback, Header, KanaInput, Quiz, Ruby, SpeakButton, pick, shuffle, type QuizApi } from '../ui/parts';

type Ex = 'type' | 'identify' | 'dictionary' | 'listen' | 'sentence';
const EXERCISES: [Ex, Key][] = [['type', 'exType'], ['identify', 'exIdentify'], ['dictionary', 'exDictionary'], ['listen', 'exListen'], ['sentence', 'exSentence']];
const CLASSES: [VerbClass, Key][] = [['ichidan', 'ichidan'], ['godan', 'godan'], ['suru', 'suru'], ['kuru', 'kuru']];
const EXAMPLES = ['書く', '食べる', 'する', '来る'];
const TOTAL = 10;

interface Setup { forms: Form[]; classes: VerbClass[]; exercises: Ex[] }
interface Item { ex: Ex; verb: VerbEntry; form: Form }

function makeItems(s: Setup): Item[] {
  const verbs = VERBS.filter((v) => s.classes.includes(v.cls));
  const framed = s.forms.filter((f) => FRAMES[f]);
  const frameVerbs = verbs.filter((v) => FRAME_VERBS.includes(v.word));
  return Array.from({ length: TOTAL }, () => {
    let ex = pick(s.exercises);
    if (ex === 'sentence' && (!framed.length || !frameVerbs.length)) ex = 'type';
    const form = pick(ex === 'sentence' ? framed : s.forms);
    const pool = (ex === 'sentence' ? frameVerbs : verbs).filter((v) => isAvailable(v, form));
    return { ex, form, verb: pick(pool.length ? pool : verbs.filter((v) => !v.stative)) };
  });
}

export function VerbsScreen() {
  const { t, lang } = useT();
  const [mode, setMode] = useState<'setup' | 'quiz' | 'tables'>('setup');
  const [forms, setForms] = useState<Form[]>(['polite', 'politeNegative', 'politePast', 'te']);
  const [classes, setClasses] = useState<VerbClass[]>(['ichidan', 'godan', 'suru', 'kuru']);
  const [exercises, setExercises] = useState<Ex[]>(['type', 'identify', 'dictionary', 'sentence']);
  const toggle = <T,>(list: T[], set: (x: T[]) => void, v: T) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const ready = forms.length > 0 && classes.length > 0 && exercises.length > 0;

  if (mode === 'quiz') return <Practice setup={{ forms, classes, exercises }} onExit={() => setMode('setup')} />;
  if (mode === 'tables') return <Tables onExit={() => setMode('setup')} />;
  return (
    <div>
      <Header title={t('verbPractice')} />
      <div className="verb-setup">
        <div className="card">
          <div className="row between">
            <h3>{t('forms')}</h3>
            <div className="row">
              <button className="link" onClick={() => setForms([...FORMS])}>{t('selectAll')}</button>
              <button className="link" onClick={() => setForms([])}>{t('selectNone')}</button>
            </div>
          </div>
          {FORM_GROUPS.map((g) => (
            <div key={g}>
              <h4>{GROUP_NAMES[g][lang]}</h4>
              <div className="chips">
                {FORMS.filter((f) => FORM_INFO[f].group === g).map((f) => (
                  <button key={f} className={`chip ${forms.includes(f) ? 'on' : ''}`} aria-pressed={forms.includes(f)} title={FORM_INFO[f].use[lang]} onClick={() => toggle(forms, setForms, f)}>
                    {FORM_INFO[f].name[lang]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="side-col">
          <div className="card">
            <h3>{t('verbTypes')}</h3>
            <div className="chips">
              {CLASSES.map(([c, k]) => <button key={c} className={`chip ${classes.includes(c) ? 'on' : ''}`} aria-pressed={classes.includes(c)} onClick={() => toggle(classes, setClasses, c)}>{t(k)}</button>)}
            </div>
            <h3>{t('exerciseTypes')}</h3>
            <div className="chips">
              {EXERCISES.map(([e, k]) => <button key={e} className={`chip ${exercises.includes(e) ? 'on' : ''}`} aria-pressed={exercises.includes(e)} onClick={() => toggle(exercises, setExercises, e)}>{t(k)}</button>)}
            </div>
          </div>
          <button className="btn wide" disabled={!ready} onClick={() => setMode('quiz')}>{t('start')} 🐾</button>
          <button className="btn ghost wide" onClick={() => setMode('tables')}>📋 {t('verbTable')}</button>
        </div>
      </div>
    </div>
  );
}

function Practice({ setup, onExit }: { setup: Setup; onExit: () => void }) {
  const { t } = useT();
  const [seed, setSeed] = useState(0);
  const items = useMemo(() => makeItems(setup), [seed, setup.forms, setup.classes, setup.exercises]);
  return (
    <div>
      <Header title={t('verbPractice')} onBack={onExit} />
      <Quiz total={TOTAL} onExit={onExit} onReset={() => setSeed((s) => s + 1)}
        render={(i, api) => <VerbQ key={`${seed}-${i}`} item={items[i]} setup={setup} api={api} />} />
    </div>
  );
}

function VerbBadge({ verb }: { verb: VerbEntry }) {
  const { lang } = useT();
  return (
    <div className="verb-badge">
      <ruby lang="ja">{verb.word}<rt>{verb.kana}</rt></ruby>
      <span>{verb.meaning[lang]}</span>
    </div>
  );
}

function VerbQ({ item, setup, api }: { item: Item; setup: Setup; api: QuizApi }) {
  const { t, lang } = useT();
  const { score } = useStore();
  const { ex, verb, form } = item;
  const c = conjugate(verb, form)!;
  const info = FORM_INFO[form];
  const done = (ok: boolean) => { score('verbs', ok, form); speak(c.kana); };
  const others = useMemo(() => shuffle(FORMS.filter((f) => f !== form)).map((f) => conjugate(verb, f)).filter(Boolean) as NonNullable<typeof c>[], [verb, form]);

  const options = useMemo(() => {
    if (ex === 'identify') {
      const fs = shuffle(FORMS.filter((f) => f !== form && conjugate(verb, f) && conjugate(verb, f)!.word !== c.word)).slice(0, 3);
      return shuffle([form, ...fs]).map((f) => ({ key: f, label: FORM_INFO[f].name[lang] }));
    }
    if (ex === 'dictionary') {
      const wrong = shuffle(VERBS.filter((v) => v.cls === verb.cls && v.word !== verb.word)).slice(0, 3);
      return shuffle([verb, ...wrong]).map((v) => ({ key: v.word, label: <span lang="ja">{v.word}<small className="sub">{v.kana}</small></span> }));
    }
    const words = [...new Set(others.map((o) => o.word))].filter((w) => w !== c.word).slice(0, 3);
    return shuffle([c.word, ...words]).map((w) => ({ key: w, label: <span lang="ja">{w}</span> }));
  }, [ex, verb, form, lang]);

  useEffect(() => { if (ex === 'listen') speak(c.kana); }, []);

  const answerKey = ex === 'identify' ? form : ex === 'dictionary' ? verb.word : c.word;
  const answerText = ex === 'identify' ? info.name[lang] : ex === 'dictionary' ? `${verb.word} (${verb.kana})` : `${c.word} (${c.kana})`;

  return (
    <div className="card q">
      {ex === 'type' && <>
        <p className="q-hint">{t('qType')}</p>
        <VerbBadge verb={verb} />
        <div className="form-tag"><b>{info.name[lang]}</b><span>{info.use[lang]}</span></div>
        <KanaInput disabled={api.answered} placeholder={t('romajiHint')} onSubmit={(v) => {
          const ok = accepted(c).some((a) => toHiragana(a) === toHiragana(v));
          api.answer(ok); done(ok);
        }} />
      </>}
      {ex === 'identify' && <>
        <p className="q-hint">{t('qIdentify')}</p>
        <div className="q-main"><ruby lang="ja">{c.word}<rt>{c.kana}</rt></ruby></div>
        <p className="q-sub" lang="ja">{verb.word} · {verb.meaning[lang]}</p>
        <Choices options={options} answer={answerKey} api={api} onPick={done} />
      </>}
      {ex === 'dictionary' && <>
        <p className="q-hint">{t('qDictionary')}</p>
        <div className="q-main"><ruby lang="ja">{c.word}<rt>{c.kana}</rt></ruby></div>
        <Choices options={options} answer={answerKey} api={api} onPick={done} />
      </>}
      {ex === 'listen' && <>
        <p className="q-hint">{t('qListen')}</p>
        <SpeakButton text={c.kana} />
        <Choices options={options} answer={answerKey} api={api} onPick={done} />
      </>}
      {ex === 'sentence' && <>
        <p className="q-hint">{t('qSentence')}</p>
        <VerbBadge verb={verb} />
        <div className="sentence"><Ruby text={FRAMES[form]!.replace('___', api.answered ? c.word : ' ______ ')} /></div>
        <Choices options={options} answer={answerKey} api={api} onPick={done} />
      </>}
      <Feedback api={api} answer={api.correct ? <span lang="ja">{ex === 'identify' ? info.use[lang] : c.word}</span> : <span lang="ja">{answerText}</span>} />
    </div>
  );
}

function Tables({ onExit }: { onExit: () => void }) {
  const { t, lang } = useT();
  const [q, setQ] = useState('');
  const [verb, setVerb] = useState<VerbEntry | null>(null);
  const found = useMemo(() => {
    const s = q.trim().toLowerCase();
    return VERBS.filter((v) => !s || v.word.includes(s) || v.kana.includes(s) || v.meaning[lang].toLowerCase().includes(s));
  }, [q, lang]);

  if (verb) {
    return (
      <div>
        <Header title={verb.word} onBack={() => setVerb(null)} />
        <div className="card wide-row">
          <VerbBadge verb={verb} />
          <SpeakButton text={verb.kana} />
        </div>
        {FORM_GROUPS.map((g) => (
          <section key={g} className="table-group">
            <h3>{GROUP_NAMES[g][lang]}</h3>
            <div className="card table">
              {FORMS.filter((f) => FORM_INFO[f].group === g).map((f) => {
                const c = conjugate(verb, f);
                return (
                  <div className="table-row" key={f}>
                    <div><b>{FORM_INFO[f].name[lang]}</b><small>{FORM_INFO[f].use[lang]}</small></div>
                    {c
                      ? <button className="conj" lang="ja" onClick={() => speak(c.kana)}><ruby>{c.word}<rt>{c.kana}</rt></ruby></button>
                      : <span className="muted">{t('notAvailable')}</span>}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
        <p className="note">{EXAMPLES.join(' · ')}</p>
      </div>
    );
  }
  return (
    <div>
      <Header title={t('verbTable')} onBack={onExit} />
      <input className="search" placeholder={t('searchVerb')} aria-label={t('searchVerb')} value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="verb-list">
        {found.map((v) => (
          <button key={v.word} className="verb-item" onClick={() => setVerb(v)}>
            <b lang="ja">{v.word}</b><small lang="ja">{v.kana}</small><span>{v.meaning[lang]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
