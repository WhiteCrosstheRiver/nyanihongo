import { FORM_INFO } from '../data/forms';
import { PARTICLES, PARTICLE_ITEMS, type ParticleItem } from '../data/grammar';
import { VERBS } from '../data/verbs';
import { CATEGORY_IDS, WORDS, wordById, type Word } from '../data/vocab';
import type { VerbItem } from '../screens/Verbs';
import { ADJ_FORMS, makeAdjItem, type AdjForm, type AdjItem } from './adjectives';
import { FORMS, isAvailable, type Form } from './conjugate';
import { makeListenItem, meaningOptions, type ListenItem } from './listening';
import { pick } from './random';
import type { Progress } from './store';

export type Step =
  | { t: 'new'; word: Word }
  | { t: 'review'; word: Word; options: Word[] }
  | { t: 'verb'; item: VerbItem }
  | { t: 'adj'; item: AdjItem }
  | { t: 'particle'; item: ParticleItem }
  | { t: 'listen'; item: ListenItem };

const WORD_STEPS = 6;
const MAX_REVIEWS = 4;
const STARTER_FORMS: Form[] = ['polite', 'politeNegative', 'politePast', 'te'];

/** Half the time returns the learner's weakest choice; otherwise any, so nothing goes stale. */
function weakest<T extends string>(prefix: string, options: readonly T[], misses: Progress['misses']): T {
  const scored = options.map((o) => [o, misses[`${prefix}:${o}`] ?? 0] as const).filter(([, n]) => n > 0);
  if (scored.length && Math.random() < 0.5) return scored.sort((a, b) => b[1] - a[1])[0][0];
  return pick(options);
}

function verbStep(p: Progress): Step {
  // Forms already practised, plus the next new one so the lesson keeps moving forward.
  const seen = FORMS.filter((f) => p.stats.forms[f]);
  const next = FORMS.find((f) => !p.stats.forms[f]);
  const pool = [...new Set<Form>([...STARTER_FORMS, ...seen, ...(next ? [next] : [])])].filter((f) => FORM_INFO[f]);
  const form = weakest('form', pool, p.misses);
  const verb = pick(VERBS.filter((v) => isAvailable(v, form)));
  return { t: 'verb', item: { ex: pick(['type', 'identify', 'dictionary'] as const), verb, form } };
}

function newWords(p: Progress, count: number): Word[] {
  // Finish one category at a time, in list order: each list starts with its most common words.
  return CATEGORY_IDS.flatMap((c) => WORDS.filter((w) => w.category === c && !p.cards[w.id])).slice(0, count);
}

export function buildDaily(p: Progress, voice: boolean, now = Date.now()): Step[] {
  const due = Object.entries(p.cards)
    .filter(([, c]) => c.due <= now)
    .sort((a, b) => a[1].due - b[1].due)
    .slice(0, MAX_REVIEWS)
    .map(([id]) => wordById(id))
    .filter((w): w is Word => !!w);
  const fresh = newWords(p, WORD_STEPS - due.length);
  const particle = weakest('particle', PARTICLES, p.misses);
  const adjForm = weakest<AdjForm>('adj', ADJ_FORMS, p.misses);
  return [
    ...fresh.map((word): Step => ({ t: 'new', word })),
    ...due.map((word): Step => ({ t: 'review', word, options: meaningOptions(word) })),
    verbStep(p),
    verbStep(p),
    { t: 'adj', item: makeAdjItem(adjForm) },
    { t: 'particle', item: pick(PARTICLE_ITEMS.filter((s) => s.answer === particle)) },
    { t: 'listen', item: makeListenItem(p.cards, voice) },
  ];
}
