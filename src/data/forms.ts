import type { Form } from '../lib/conjugate';
import type { Lang } from '../lib/i18n';

export interface FormInfo { name: Record<Lang, string>; use: Record<Lang, string>; group: FormGroup }
export type FormGroup = 'polite' | 'plain' | 'voice' | 'mood' | 'condition' | 'desire';
export const FORM_GROUPS: FormGroup[] = ['polite', 'plain', 'voice', 'mood', 'condition', 'desire'];

// form|group|en name|en use|fr name|fr use|es name|es use|zh name|zh use
const RAW = `
polite|polite|Polite present|Polite statements|Présent poli|Phrases polies|Presente cortés|Frases corteses|礼貌现在式|礼貌的陈述
politeNegative|polite|Polite negative|Politely saying "not"|Négatif poli|Dire « ne pas » poliment|Negativo cortés|Negar con cortesía|礼貌否定|礼貌地否定
politePast|polite|Polite past|Polite "did"|Passé poli|Passé poli|Pasado cortés|Pasado cortés|礼貌过去式|礼貌地说过去
politePastNegative|polite|Polite past negative|Polite "did not"|Passé négatif poli|« n'a pas » poli|Pasado negativo cortés|«no hizo» cortés|礼貌过去否定|礼貌地说"没有"
politeVolitional|polite|Polite "let's"|Polite suggestion|« Faisons » poli|Suggestion polie|«Vamos a» cortés|Sugerencia cortés|礼貌意向|礼貌地提议
negative|plain|Plain negative|Casual "not"|Négatif neutre|« ne pas » familier|Negativo informal|«no» informal|简体否定|随意地否定
past|plain|Plain past|Casual "did"|Passé neutre|Passé familier|Pasado informal|Pasado informal|简体过去式|随意地说过去
pastNegative|plain|Plain past negative|Casual "did not"|Passé négatif neutre|« n'a pas » familier|Pasado negativo informal|«no hizo» informal|简体过去否定|随意地说"没有"
te|plain|Te-form|Linking actions|Forme en te|Relier des actions|Forma te|Unir acciones|て形|连接动作
negativeTe|plain|Negative te-form|"Without doing"|Forme en te négative|« sans faire »|Forma te negativa|«sin hacer»|否定て形|"不…而…"
teIru|plain|Ongoing (te-iru)|"Is doing", a state|En cours (te-iru)|« est en train de »|Progresivo (te-iru)|«está haciendo»|进行式|"正在做"、状态
teKudasai|polite|Request (te-kudasai)|"Please do"|Demande (te-kudasai)|« veuillez faire »|Petición (te-kudasai)|«por favor, haz»|请求|"请做"
potential|voice|Potential|"Can do"|Potentiel|« pouvoir faire »|Potencial|«poder hacer»|可能形|"能做"
passive|voice|Passive|"Is done to"|Passif|« être fait »|Pasiva|«ser hecho»|被动形|"被…"
causative|voice|Causative|"Make / let do"|Causatif|« faire faire »|Causativa|«hacer que»|使役形|"让…做"
causativePassive|voice|Causative-passive|"Is made to do"|Causatif-passif|« être forcé de »|Causativa-pasiva|«ser obligado a»|使役被动形|"被迫做"
imperative|mood|Imperative|Blunt command|Impératif|Ordre direct|Imperativo|Orden directa|命令形|直接的命令
prohibitive|mood|Prohibitive|"Don't!"|Prohibitif|« Ne fais pas ! »|Prohibitivo|«¡No lo hagas!»|禁止形|"不许做!"
volitional|mood|Volitional|"Let's", "I'll"|Volitif|« faisons »|Volitivo|«vamos a»|意向形|"…吧"
condBa|condition|Conditional ば|"If" (general)|Conditionnel ば|« si » (général)|Condicional ば|«si» (general)|ば条件形|"如果"(一般)
condBaNegative|condition|Negative conditional ば|"If not"|Conditionnel ば négatif|« si ne pas »|Condicional ば negativo|«si no»|ば否定条件|"如果不"
condTara|condition|Conditional たら|"If / when" (completed)|Conditionnel たら|« si / quand » (achevé)|Condicional たら|«si / cuando» (completado)|たら条件形|"如果…了"
condNara|condition|Conditional なら|"If that's the case"|Conditionnel なら|« si c'est le cas »|Condicional なら|«si es el caso»|なら条件形|"要是…的话"
condTo|condition|Conditional と|"Whenever" (natural result)|Conditionnel と|« chaque fois que »|Condicional と|«siempre que»|と条件形|"一…就…"
tai|desire|Want (tai)|"Want to do"|Désir (tai)|« vouloir faire »|Deseo (tai)|«querer hacer»|愿望形|"想做"
taiNegative|desire|Do not want|"Don't want to do"|Non-désir|« ne pas vouloir »|No desear|«no querer»|否定愿望|"不想做"
nagara|desire|Simultaneous (nagara)|"While doing"|Simultané (nagara)|« tout en faisant »|Simultáneo (nagara)|«mientras hace»|同时(ながら)|"一边…一边…"
`;

export const FORM_INFO = Object.fromEntries(
  RAW.trim().split('\n').map((line) => {
    const [form, group, en, enU, fr, frU, es, esU, zh, zhU] = line.split('|');
    return [form, {
      group,
      name: { en, fr, es, zh },
      use: { en: enU, fr: frU, es: esU, zh: zhU },
    }];
  }),
) as Record<Form, FormInfo>;

/** Sentence frames for the fill-in exercise. {漢字|かな} is furigana markup. */
export const FRAMES: Partial<Record<Form, string>> = {
  polite: '{毎日|まいにち}___。',
  politeNegative: '{今日|きょう}は___。',
  politePast: '{昨日|きのう}___。',
  politePastNegative: '{昨日|きのう}は___。',
  politeVolitional: 'いっしょに___。',
  negative: '{今日|きょう}は___よ。',
  past: '{昨日|きのう}___よ。',
  pastNegative: '{昨日|きのう}は___よ。',
  te: '___から、{寝|ね}ます。',
  teIru: '{今|いま}、___。',
  teKudasai: 'すみません、___。',
  potential: '{私|わたし}も___よ。',
  imperative: 'はやく___!',
  prohibitive: 'ここで___!',
  volitional: '{今日|きょう}は___と{思|おも}います。',
  condTara: '___、{電話|でんわ}してください。',
  tai: '{明日|あした}___です。',
  taiNegative: '{今日|きょう}は___です。',
  nagara: '___、{音楽|おんがく}を{聞|き}きます。',
};

/** Everyday action verbs that read naturally in every frame. */
export const FRAME_VERBS = [
  '食べる', '見る', '起きる', '寝る', '読む', '書く', '飲む', '話す', '買う', '作る', '歩く', '走る', '泳ぐ',
  '帰る', '勉強する', '料理する', '掃除する', '練習する', '来る', '行く', '待つ', '聞く', '歌う', '休む',
];
