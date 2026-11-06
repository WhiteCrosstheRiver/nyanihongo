import type { AdjForm } from '../lib/adjectives';
import type { Lang } from '../lib/i18n';

type Tr = Record<Lang, string>;
const tr = (en: string, fr: string, es: string, zh: string): Tr => ({ en, fr, es, zh });

export const ADJ_FORM_NAMES: Record<AdjForm, Tr> = {
  present: tr('Polite present', 'Présent poli', 'Presente cortés', '礼貌现在式'),
  negative: tr('Plain negative', 'Négatif neutre', 'Negativo informal', '简体否定'),
  past: tr('Plain past', 'Passé neutre', 'Pasado informal', '简体过去式'),
  pastNegative: tr('Plain past negative', 'Passé négatif neutre', 'Pasado negativo informal', '简体过去否定'),
  politeNegative: tr('Polite negative', 'Négatif poli', 'Negativo cortés', '礼貌否定'),
  politePast: tr('Polite past', 'Passé poli', 'Pasado cortés', '礼貌过去式'),
  politePastNegative: tr('Polite past negative', 'Passé négatif poli', 'Pasado negativo cortés', '礼貌过去否定'),
  te: tr('Te-form (linking)', 'Forme en te (liaison)', 'Forma te (unión)', 'て形(连接)'),
  adverb: tr('Adverb', 'Adverbe', 'Adverbio', '副词'),
};

export const PARTICLE_RULES: Record<string, Tr> = {
  'は': tr('Marks the topic: what the sentence is about. Pronounced "wa".', 'Marque le thème : ce dont parle la phrase. Se prononce « wa ».', 'Marca el tema: de qué trata la frase. Se pronuncia «wa».', '提示主题,即句子谈论的对象。读作 wa。'),
  'が': tr('Marks the subject, new information, and the object of 好き or ある-type sentences.', 'Marque le sujet, une information nouvelle et l\'objet de 好き ou ある.', 'Marca el sujeto, la información nueva y el objeto de 好き o ある.', '标记主语、新信息,以及「好き」「ある」类句子的对象。'),
  'を': tr('Marks the direct object: what the action is done to. Pronounced "o".', 'Marque le complément d\'objet direct. Se prononce « o ».', 'Marca el objeto directo. Se pronuncia «o».', '标记动作的直接宾语。读作 o。'),
  'に': tr('Marks a time, a destination, where something exists, or who receives something.', 'Marque un moment, une destination, un lieu d\'existence ou un destinataire.', 'Marca un momento, un destino, dónde existe algo o quién lo recibe.', '标记时间、目的地、存在的地点或接受者。'),
  'で': tr('Marks where an action happens, or the means used to do it.', 'Marque le lieu d\'une action ou le moyen utilisé.', 'Marca dónde ocurre una acción o el medio usado.', '标记动作发生的地点或使用的手段。'),
  'へ': tr('Marks a direction: "toward". Pronounced "e".', 'Marque une direction : « vers ». Se prononce « e ».', 'Marca una dirección: «hacia». Se pronuncia «e».', '标记方向:"向、往"。读作 e。'),
  'と': tr('Means "and" in a complete list, or "with" someone.', 'Signifie « et » dans une liste complète, ou « avec » quelqu\'un.', 'Significa «y» en una lista completa, o «con» alguien.', '表示完整列举的"和",或"与某人一起"。'),
  'も': tr('Means "also" or "too". It replaces は, が and を.', 'Signifie « aussi ». Remplace は, が et を.', 'Significa «también». Sustituye a は, が y を.', '表示"也"。替代「は」「が」「を」。'),
  'の': tr('Links two nouns: possession or description, like "my book".', 'Relie deux noms : possession ou description.', 'Une dos sustantivos: posesión o descripción.', '连接两个名词,表示所属或说明,相当于"的"。'),
  'から': tr('Means "from": a starting point in place or time.', 'Signifie « de, depuis » : point de départ dans l\'espace ou le temps.', 'Significa «desde»: punto de partida en lugar o tiempo.', '表示"从":地点或时间的起点。'),
  'まで': tr('Means "until" or "as far as": an end point.', 'Signifie « jusqu\'à » : point d\'arrivée.', 'Significa «hasta»: punto final.', '表示"到":终点或截止时间。'),
  'や': tr('Means "and so on": gives examples from a longer list.', 'Signifie « et, entre autres » : donne des exemples.', 'Significa «y cosas así»: da ejemplos de una lista.', '表示列举部分例子,"…和…等"。'),
  'か': tr('At the end, makes a question. Between nouns, means "or".', 'En fin de phrase, forme une question. Entre deux noms, signifie « ou ».', 'Al final, forma una pregunta. Entre sustantivos, significa «o».', '句末表示疑问;名词之间表示"或者"。'),
};
export const PARTICLES = Object.keys(PARTICLE_RULES);

export interface ParticleItem { answer: string; wrong: string[]; ja: string; tr: Tr }

// Wrong options are chosen by hand: each one must be ungrammatical here, not just a
// different meaning, so a correct guess never gets marked wrong.
const s = (answer: string, wrong: string, ja: string, en: string, fr: string, es: string, zh: string): ParticleItem =>
  ({ answer, wrong: wrong.split(' '), ja, tr: tr(en, fr, es, zh) });

export const PARTICLE_ITEMS: ParticleItem[] = [
  s('は', 'を に で', '{私|わたし}___{学生|がくせい}です。', 'I am a student.', 'Je suis étudiant.', 'Soy estudiante.', '我是学生。'),
  s('は', 'を に へ', 'この{本|ほん}___{面白|おもしろ}いです。', 'This book is interesting.', 'Ce livre est intéressant.', 'Este libro es interesante.', '这本书很有趣。'),
  s('は', 'を で へ', '{兄|あに}___{医者|いしゃ}です。', 'My older brother is a doctor.', 'Mon grand frère est médecin.', 'Mi hermano mayor es médico.', '我哥哥是医生。'),
  s('が', 'を で へ', '{猫|ねこ}___います。', 'There is a cat.', 'Il y a un chat.', 'Hay un gato.', '有一只猫。'),
  s('が', 'を で と', '{雨|あめ}___{降|ふ}っています。', 'It is raining.', 'Il pleut.', 'Está lloviendo.', '正在下雨。'),
  s('が', 'を で へ', '{私|わたし}は{犬|いぬ}___{好|す}きです。', 'I like dogs.', 'J\'aime les chiens.', 'Me gustan los perros.', '我喜欢狗。'),
  s('が', 'は を で', '{誰|だれ}___{来|き}ましたか。', 'Who came?', 'Qui est venu ?', '¿Quién vino?', '谁来了?'),
  s('を', 'で へ に', 'パン___{食|た}べます。', 'I eat bread.', 'Je mange du pain.', 'Como pan.', '我吃面包。'),
  s('を', 'で へ に', '{音楽|おんがく}___{聞|き}きます。', 'I listen to music.', 'J\'écoute de la musique.', 'Escucho música.', '我听音乐。'),
  s('を', 'へ の が', '{手紙|てがみ}___{書|か}きました。', 'I wrote a letter.', 'J\'ai écrit une lettre.', 'Escribí una carta.', '我写了一封信。'),
  s('を', 'へ に と', '{部屋|へや}___{掃除|そうじ}します。', 'I clean the room.', 'Je nettoie la chambre.', 'Limpio la habitación.', '我打扫房间。'),
  s('に', 'で を が', '{七時|しちじ}___{起|お}きます。', 'I get up at seven.', 'Je me lève à sept heures.', 'Me levanto a las siete.', '我七点起床。'),
  s('に', 'で を が', '{学校|がっこう}___{行|い}きます。', 'I go to school.', 'Je vais à l\'école.', 'Voy a la escuela.', '我去学校。'),
  s('に', 'を へ と', '{机|つくえ}の{上|うえ}___{本|ほん}があります。', 'There is a book on the desk.', 'Il y a un livre sur le bureau.', 'Hay un libro sobre el escritorio.', '桌子上有一本书。'),
  s('に', 'で を まで', '{友達|ともだち}___{手紙|てがみ}を{送|おく}ります。', 'I send a letter to a friend.', 'J\'envoie une lettre à un ami.', 'Envío una carta a un amigo.', '我给朋友寄信。'),
  s('で', 'を が へ', '{図書館|としょかん}___{勉強|べんきょう}します。', 'I study at the library.', 'J\'étudie à la bibliothèque.', 'Estudio en la biblioteca.', '我在图书馆学习。'),
  s('で', 'を の や', 'バス___{行|い}きます。', 'I go by bus.', 'J\'y vais en bus.', 'Voy en autobús.', '我坐公交车去。'),
  s('で', 'へ の に', '{日本語|にほんご}___{話|はな}してください。', 'Please speak in Japanese.', 'Parlez en japonais, s\'il vous plaît.', 'Habla en japonés, por favor.', '请用日语说。'),
  s('で', 'へ の に', '{箸|はし}___{食|た}べます。', 'I eat with chopsticks.', 'Je mange avec des baguettes.', 'Como con palillos.', '我用筷子吃饭。'),
  s('へ', 'を で の', '{日本|にほん}___{行|い}きたいです。', 'I want to go to Japan.', 'Je veux aller au Japon.', 'Quiero ir a Japón.', '我想去日本。'),
  s('へ', 'を で が', '{家|うち}___{帰|かえ}ります。', 'I go back home.', 'Je rentre à la maison.', 'Vuelvo a casa.', '我回家。'),
  s('へ', 'で が の', '{東|ひがし}___{進|すす}みます。', 'I head east.', 'Je vais vers l\'est.', 'Avanzo hacia el este.', '我向东前进。'),
  s('と', 'を へ で', '{友達|ともだち}___{映画|えいが}を{見|み}ます。', 'I watch a film with a friend.', 'Je regarde un film avec un ami.', 'Veo una película con un amigo.', '我和朋友看电影。'),
  s('と', 'を へ で', 'パン___{卵|たまご}を{買|か}いました。', 'I bought bread and eggs.', 'J\'ai acheté du pain et des œufs.', 'Compré pan y huevos.', '我买了面包和鸡蛋。'),
  s('と', 'を の で', '{母|はは}___{話|はな}しました。', 'I talked with my mother.', 'J\'ai parlé avec ma mère.', 'Hablé con mi madre.', '我和妈妈谈了话。'),
  s('も', 'を に で', '{私|わたし}___{学生|がくせい}です。', 'I am a student too.', 'Je suis étudiant aussi.', 'Yo también soy estudiante.', '我也是学生。'),
  s('も', 'を に へ', '{今日|きょう}___{雨|あめ}です。', 'It is rainy today too.', 'Il pleut aussi aujourd\'hui.', 'Hoy también llueve.', '今天也下雨。'),
  s('も', 'を で へ', '{猫|ねこ}___{好|す}きです。', 'I like cats too.', 'J\'aime aussi les chats.', 'También me gustan los gatos.', '我也喜欢猫。'),
  s('の', 'を に で', '{私|わたし}___{本|ほん}です。', 'It is my book.', 'C\'est mon livre.', 'Es mi libro.', '这是我的书。'),
  s('の', 'を に が', '{日本語|にほんご}___{先生|せんせい}です。', 'This is the Japanese teacher.', 'C\'est le professeur de japonais.', 'Es el profesor de japonés.', '这是日语老师。'),
  s('の', 'を へ で', '{友達|ともだち}___{車|くるま}です。', 'It is my friend\'s car.', 'C\'est la voiture de mon ami.', 'Es el coche de mi amigo.', '这是朋友的车。'),
  s('から', 'を で の', '{九時|くじ}___{始|はじ}まります。', 'It starts from nine o\'clock.', 'Cela commence à partir de neuf heures.', 'Empieza desde las nueve.', '从九点开始。'),
  s('から', 'を の が', '{東京|とうきょう}___{来|き}ました。', 'I came from Tokyo.', 'Je viens de Tokyo.', 'Vine de Tokio.', '我从东京来。'),
  s('まで', 'を が へ', '{五時|ごじ}___{働|はたら}きます。', 'I work until five.', 'Je travaille jusqu\'à cinq heures.', 'Trabajo hasta las cinco.', '我工作到五点。'),
  s('まで', 'が の や', '{駅|えき}___{歩|ある}きます。', 'I walk as far as the station.', 'Je marche jusqu\'à la gare.', 'Camino hasta la estación.', '我走到车站。'),
  s('や', 'を へ で', '{犬|いぬ}___{猫|ねこ}がいます。', 'There are dogs, cats and so on.', 'Il y a des chiens, des chats, etc.', 'Hay perros, gatos y otros.', '有狗、猫等。'),
  s('や', 'で へ に', 'りんご___みかんを{買|か}いました。', 'I bought apples, oranges and such.', 'J\'ai acheté des pommes, des mandarines, etc.', 'Compré manzanas, mandarinas y más.', '我买了苹果、橘子等。'),
  s('か', 'を に で', 'これは{何|なん}です___。', 'What is this?', 'Qu\'est-ce que c\'est ?', '¿Qué es esto?', '这是什么?'),
  s('か', 'で へ が', 'コーヒー___{紅茶|こうちゃ}を{飲|の}みます。', 'I will drink coffee or tea.', 'Je bois du café ou du thé.', 'Bebo café o té.', '我喝咖啡或红茶。'),
];

// Sound pairs that beginners mix up: long vowels and small っ change the word.
export const SOUND_PAIRS: [string, string][] = [
  ['おばさん', 'おばあさん'], ['おじさん', 'おじいさん'], ['きて', 'きって'], ['いえ', 'いいえ'], ['ゆき', 'ゆうき'],
  ['ここ', 'こうこう'], ['とり', 'とおり'], ['おと', 'おっと'], ['さか', 'さっか'], ['かこ', 'かこう'],
  ['ビル', 'ビール'], ['びよういん', 'びょういん'], ['じゆう', 'じゅう'], ['きよう', 'きょう'], ['りよう', 'りょう'],
  ['しゅじん', 'しゅうじん'], ['へや', 'へいや'], ['まて', 'まって'],
];
