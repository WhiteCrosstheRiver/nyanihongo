import { useT, type Key } from '../lib/i18n';
import { dayKey, streakOf, useStore } from '../lib/store';
import { Mascot, Progress } from '../ui/parts';
import type { Nav } from '../App';

const LESSONS: { to: string; icon: string; title: Key; desc?: Key; color: string; jp: string }[] = [
  { to: 'kana', icon: 'あ', title: 'kana', color: 'pink', jp: 'かな' },
  { to: 'words', icon: '🍙', title: 'words', color: 'peach', jp: 'ことば' },
  { to: 'picture', icon: '🖼️', title: 'pictureQuiz', color: 'mint', jp: 'えあわせ' },
  { to: 'verbs', icon: '🐾', title: 'verbs', color: 'lav', jp: 'どうし' },
  { to: 'camera', icon: '📷', title: 'camera', color: 'sky', jp: 'カメラ' },
  { to: 'read', icon: '📖', title: 'read', color: 'lemon', jp: 'よみもの' },
];

export function Home({ go }: { go: Nav }) {
  const { t } = useT();
  const { p } = useStore();
  const today = p.days[dayKey()] ?? 0;
  const streak = streakOf(p.days);
  const now = Date.now();
  const due = Object.values(p.cards).filter((c) => c.due <= now).length;
  return (
    <div className="home">
      <section className="hero card">
        <Mascot mood={today >= p.dailyGoal ? 'happy' : 'idle'} size={104} />
        <div className="hero-text">
          <h1>{t('greeting')}</h1>
          <p lang="ja" className="jp-sub">にゃんにほんご</p>
        </div>
      </section>
      <section className="stats">
        <div className="card stat"><span className="stat-n">🔥 {streak}</span><span>{t('streak')}</span></div>
        <div className="card stat goal">
          <span className="stat-n">⭐ {today} / {p.dailyGoal}</span>
          <span>{t('dailyGoal')}</span>
          <Progress value={today} max={p.dailyGoal} />
        </div>
        <div className="card stat review">
          <span className="stat-n">🌸 {due}</span>
          <span>{t('reviewDue')}</span>
          {due > 0 && <button className="btn small" onClick={() => go('review')}>{t('reviewNow')}</button>}
        </div>
      </section>
      <h2>{t('continueLearning')}</h2>
      <section className="lessons">
        {LESSONS.map((l) => (
          <button key={l.to} className={`lesson ${l.color}`} onClick={() => go(l.to)}>
            <span className="lesson-icon" lang="ja">{l.icon}</span>
            <span className="lesson-title">{t(l.title)}</span>
            <span className="lesson-jp" lang="ja">{l.jp}</span>
          </button>
        ))}
      </section>
    </div>
  );
}
