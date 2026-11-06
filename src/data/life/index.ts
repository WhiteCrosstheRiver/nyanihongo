import { CITY } from './city';
import { ELEMENTARY } from './elementary';
import { FESTIVALS } from './festivals';
import { HIGH } from './high';
import { JPCLOTHING } from './jpclothing';
import { JPFOOD } from './jpfood';
import { JPGOODS } from './jpgoods';
import { MIDDLE } from './middle';
import { NAMES } from './names';
import { REGIONS } from './regions';
import { UNIVERSITY } from './university';
import type { LifeTopic } from './types';

export { CITY, ELEMENTARY, FESTIVALS, HIGH, JPCLOTHING, JPFOOD, JPGOODS, MIDDLE, NAMES, REGIONS, UNIVERSITY };
export const LIFE_TOPICS: LifeTopic[] = [JPFOOD, JPCLOTHING, JPGOODS, REGIONS, FESTIVALS, CITY, NAMES, ELEMENTARY, MIDDLE, HIGH, UNIVERSITY];
export const LIFE_GROUPS: { title: 'lifeDaily' | 'lifePlaces' | 'lifeSchool'; ids: LifeTopic['id'][] }[] = [
  { title: 'lifeDaily', ids: ['jpfood', 'jpclothing', 'jpgoods', 'names'] },
  { title: 'lifePlaces', ids: ['regions', 'city', 'festivals'] },
  { title: 'lifeSchool', ids: ['elementary', 'middle', 'high', 'university'] },
];
