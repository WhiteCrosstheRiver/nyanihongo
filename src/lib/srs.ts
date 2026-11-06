// Spaced repetition based on SM-2.
export interface Card { ease: number; interval: number; due: number; reps: number }
export type Grade = 'again' | 'hard' | 'good' | 'easy';

const DAY = 86_400_000;
export const newCard = (now: number): Card => ({ ease: 2.5, interval: 0, due: now, reps: 0 });

export function review(c: Card, grade: Grade, now: number): Card {
  if (grade === 'again') {
    return { ease: Math.max(1.3, c.ease - 0.2), interval: 0, due: now + 10 * 60_000, reps: 0 };
  }
  const ease = Math.max(1.3, c.ease + { hard: -0.15, good: 0, easy: 0.15 }[grade]);
  let interval: number;
  if (c.reps === 0) interval = { hard: 1, good: 1, easy: 3 }[grade];
  else if (c.reps === 1) interval = { hard: 3, good: 4, easy: 6 }[grade];
  else interval = Math.round(c.interval * { hard: 1.2, good: ease, easy: ease * 1.3 }[grade]);
  interval = Math.max(interval, c.interval + (c.reps ? 1 : 0));
  return { ease, interval, due: now + interval * DAY, reps: c.reps + 1 };
}
