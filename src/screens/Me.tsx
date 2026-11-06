import { useState } from 'react';
import { LANGS, LANG_NAMES, useT, type Lang } from '../lib/i18n';
import { STICKERS, useStore } from '../lib/store';
import { Header, Progress } from '../ui/parts';

export function MeScreen() {
  const { t } = useT();
  const { p, update, reset } = useStore();
  const [confirming, setConfirming] = useState(false);
  return (
    <div>
      <Header title={t('me')} />
      <div className="me-layout">
        <section>
          <h2>{t('stickers')}</h2>
          <div className="sticker-grid">
            {STICKERS.map((s) => {
              const got = p.stickers.includes(s.id);
              const v = Math.min(s.value(p), s.goal);
              return (
                <div key={s.id} className={`sticker ${got ? 'got' : ''}`} title={got ? s.name : t('locked')}>
                  <span className="sticker-emoji">{s.emoji}</span>
                  <small lang="ja">{s.name}</small>
                  {!got && <Progress value={v} max={s.goal} />}
                </div>
              );
            })}
          </div>
        </section>
        <section>
          <h2>{t('settings')}</h2>
          <div className="card settings">
            <label>{t('language')}
              <select value={p.lang} onChange={(e) => update((q) => ({ ...q, lang: e.target.value as Lang }))}>
                {LANGS.map((l) => <option key={l} value={l}>{LANG_NAMES[l]}</option>)}
              </select>
            </label>
            <label>{t('theme')}
              <select value={p.theme} onChange={(e) => update((q) => ({ ...q, theme: e.target.value as typeof p.theme }))}>
                <option value="auto">{t('themeAuto')}</option>
                <option value="light">{t('themeLight')}</option>
                <option value="dark">{t('themeDark')}</option>
              </select>
            </label>
            <label>{t('dailyTarget')}
              <select value={p.dailyGoal} onChange={(e) => update((q) => ({ ...q, dailyGoal: Number(e.target.value) }))}>
                {[10, 20, 30, 50].map((n) => <option key={n}>{n}</option>)}
              </select>
            </label>
            <label>{t('sound')}
              <input type="checkbox" checked={p.sound} onChange={(e) => update((q) => ({ ...q, sound: e.target.checked }))} />
            </label>
            <label>{t('furigana')}
              <input type="checkbox" checked={p.furigana} onChange={(e) => update((q) => ({ ...q, furigana: e.target.checked }))} />
            </label>
            <button className={`btn ghost ${confirming ? 'danger' : ''}`} onClick={() => {
              if (confirming) { reset(); setConfirming(false); } else setConfirming(true);
            }}>{confirming ? t('resetConfirm') : t('reset')}</button>
          </div>
          <h2>{t('credits')}</h2>
          <div className="card credits">
            <p>Kana stroke data: KanjiVG, © Ulrich Apel and contributors, CC BY-SA 3.0.</p>
            <p>Image recognition: MobileNet V2, TensorFlow, Apache 2.0.</p>
            <p>Fonts: Zen Maru Gothic, SIL OFL 1.1. Emoji: Twemoji, © Twitter and contributors, CC BY 4.0.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
