import type { ComponentType } from 'react';
import type { Tr } from '../../data/reading';
import { tr } from '../../data/life/types';
import { FunnelScene, KeigoScene, LadderScene, NestScene, SpaceScene, SpotScene, TagsScene, TimeScene, type SceneProps } from './scenes';

export interface Ask { q: Tr; ja?: string; options: (string | Tr)[]; answer: number; why: Tr }
export interface VisualLesson { id: string; emoji: string; title: Tr; idea: Tr; Scene: ComponentType<SceneProps>; steps: Tr[]; ask: Ask }

/* One idea per lesson. Each step changes one thing in the picture, and the closing question asks the
   learner to predict something the lesson never showed directly. */
export const VISUAL_LESSONS: VisualLesson[] = [
  {
    id: 'tags', emoji: '🏷️', Scene: TagsScene,
    title: tr('Particles are name tags', 'Les particules sont des étiquettes', 'Las partículas son etiquetas', '助词是名牌'),
    idea: tr('Why Japanese word order can move', 'Pourquoi l’ordre des mots peut bouger', 'Por qué el orden puede cambiar', '为什么日语语序可以变'),
    steps: [
      tr('In English, position decides who does what. Japanese pins a tag on each word instead.', 'En français, la position indique qui fait quoi. Le japonais épingle plutôt une étiquette sur chaque mot.', 'En español, la posición ayuda a saber quién hace qué. El japonés pone una etiqueta a cada palabra.', '在中文里，位置决定谁做什么。日语则给每个词别上一个“名牌”。'),
      tr('Watch: the blocks changed places, but the tags went with them. The picture did not change.', 'Regarde : les blocs ont changé de place, mais les étiquettes ont suivi. L’image n’a pas changé.', 'Mira: los bloques cambiaron de sitio, pero las etiquetas fueron con ellos. La imagen no cambió.', '看：词块换了位置，名牌也跟着走，画面却没有变。'),
      tr('Now the words stay still and only the tags swap. Same order, opposite meaning.', 'Maintenant les mots restent et seules les étiquettes s’échangent. Même ordre, sens opposé.', 'Ahora las palabras se quedan y solo cambian las etiquetas. Mismo orden, sentido opuesto.', '现在词不动，只交换名牌。语序相同，意思却相反。'),
      tr('Your turn. Try both buttons. Notice what never moves: the verb stays at the end.', 'À toi. Essaie les deux boutons. Remarque ce qui ne bouge jamais : le verbe reste à la fin.', 'Te toca. Prueba los dos botones. Fíjate en lo que nunca se mueve: el verbo queda al final.', '轮到你了。试试两个按钮，注意一直不动的是：动词留在句尾。'),
    ],
    ask: {
      q: tr('Who bites whom?', 'Qui mord qui ?', '¿Quién muerde a quién?', '谁咬了谁？'), ja: '犬を猫が噛んだ。',
      options: ['🐱 ➜ 🐶', '🐶 ➜ 🐱'], answer: 0,
      why: tr('が marks the cat as the doer, even though the dog comes first.', 'が désigne le chat comme celui qui agit, même si le chien vient en premier.', 'が marca al gato como quien actúa, aunque el perro vaya primero.', 'が 标明猫是动作发出者，即使狗排在前面。'),
    },
  },
  {
    id: 'space', emoji: '🧭', Scene: SpaceScene,
    title: tr('Particles draw pictures in space', 'Les particules dessinent l’espace', 'Las partículas dibujan el espacio', '助词在空间里画图'),
    idea: tr('に, へ, で, を, から, まで as shapes', 'に, へ, で, を, から, まで comme des formes', 'に, へ, で, を, から, まで como formas', '把 に、へ、で、を、から、まで 看成图形'),
    steps: [
      tr('に is a point. The arrow lands exactly on the destination.', 'に est un point. La flèche atterrit pile sur la destination.', 'に es un punto. La flecha cae justo en el destino.', 'に 是一个点，箭头正好落在目的地上。'),
      tr('へ is a direction. We care about the heading, not the landing.', 'へ est une direction. On regarde le cap, pas l’arrivée.', 'へ es una dirección. Importa el rumbo, no la llegada.', 'へ 是方向，重要的是朝向而不是落点。'),
      tr('で is an area. The action happens anywhere inside it.', 'で est une zone. L’action se passe n’importe où dedans.', 'で es una zona. La acción ocurre en cualquier punto dentro.', 'で 是一块区域，动作发生在里面。'),
      tr('を with a moving verb is a line: the place is the route you pass along.', 'を avec un verbe de mouvement est une ligne : le lieu est le chemin parcouru.', 'を con un verbo de movimiento es una línea: el lugar es la ruta que recorres.', 'を 配移动动词时是一条线：地点就是经过的路线。'),
      tr('から marks the start and まで marks the limit. Try every chip and drag the slider yourself.', 'から marque le début et まで la limite. Essaie chaque bouton et fais glisser le curseur.', 'から marca el inicio y まで el límite. Prueba cada botón y mueve el control.', 'から 标起点，まで 标终点。试试每个按钮，亲手拖动滑块。'),
    ],
    ask: {
      q: tr('You swim across the river. Which shape, and which particle?', 'Tu traverses la rivière à la nage. Quelle forme, quelle particule ?', 'Cruzas el río a nado. ¿Qué forma y qué partícula?', '游过这条河。是哪种图形，用哪个助词？'), ja: '川 ___ 泳いで渡る。',
      options: ['を', 'で', 'に'], answer: 0,
      why: tr('The river is the line you travel along, so を. で would mean splashing around inside it.', 'La rivière est la ligne que tu parcours, donc を. で voudrait dire barboter dedans.', 'El río es la línea que recorres, así que を. で sería chapotear dentro de él.', '河是你经过的线，所以用 を。用 で 是在河里游来游去。'),
    },
  },
  {
    id: 'ladder', emoji: '🪜', Scene: LadderScene,
    title: tr('The vowel ladder', 'L’échelle des voyelles', 'La escalera de vocales', '元音梯子'),
    idea: tr('One move explains five verb forms', 'Un seul geste explique cinq formes', 'Un movimiento explica cinco formas', '一个动作解释五种变形'),
    steps: [
      tr('The last kana of 書く sits on a ladder: か, き, く, け, こ. The dictionary form stands on the u step.', 'Le dernier kana de 書く est sur une échelle : か, き, く, け, こ. La forme du dictionnaire est sur la marche u.', 'El último kana de 書く está en una escalera: か, き, く, け, こ. La forma de diccionario está en el peldaño u.', '書く 的最后一个假名站在梯子上：か、き、く、け、こ。词典形在 u 这一级。'),
      tr('Climb to a, and the verb accepts ない. Every other form is simply another step on the ladder.', 'Monte sur a, et le verbe accepte ない. Chaque autre forme n’est qu’une autre marche.', 'Sube a la a y el verbo acepta ない. Cada forma es solo otro peldaño.', '爬到 a，动词就能接 ない。其他形式只是梯子的另一级。'),
      tr('Verbs ending in う hide a surprise. Their a step is わ, so 買う becomes 買わない.', 'Les verbes en う cachent une surprise. Leur marche a est わ : 買う devient 買わない.', 'Los verbos en う esconden una sorpresa. Su peldaño a es わ: 買う pasa a 買わない.', '以 う 结尾的动词有个意外：a 级是 わ，所以 買う 变成 買わない。'),
      tr('Now 食べる. There is no ladder here: the stem never moves and endings just clip on. Drag the slider to see.', 'Voici 食べる. Pas d’échelle ici : le radical ne bouge jamais et les fins s’accrochent. Fais glisser pour voir.', 'Ahora 食べる. Aquí no hay escalera: la raíz no se mueve y las terminaciones se enganchan. Desliza para ver.', '再看 食べる。这里没有梯子：词干不动，词尾直接接上。拖动看看。'),
    ],
    ask: {
      q: tr('Climb the ladder: what is “not reading”?', 'Monte l’échelle : comment dire « ne pas lire » ?', 'Sube la escalera: ¿cómo se dice «no leer»?', '爬梯子：“不读”怎么说？'), ja: '読む → ？',
      options: ['読まない', '読みない', '読むない'], answer: 0,
      why: tr('ない needs the a step, and む climbs to ま.', 'ない demande la marche a, et む monte à ま.', 'ない necesita el peldaño a, y む sube a ま.', 'ない 要接 a 级，む 爬到 ま。'),
    },
  },
  {
    id: 'funnel', emoji: '🌀', Scene: FunnelScene,
    title: tr('The て-form funnel', 'L’entonnoir de la forme て', 'El embudo de la forma て', 'て形漏斗'),
    idea: tr('Nine endings pour into five sounds', 'Neuf fins se versent dans cinq sons', 'Nueve finales caen en cinco sonidos', '九种词尾汇入五种声音'),
    steps: [
      tr('う, つ and る are short, sharp sounds. They all pour into って.', 'う, つ et る sont des sons brefs et nets. Ils se versent tous dans って.', 'う, つ y る son sonidos breves y secos. Todos caen en って.', 'う、つ、る 都是短促的音，全都汇入 って。'),
      tr('む, ぶ and ぬ hum through the nose or lips. They soften into んで.', 'む, ぶ et ぬ résonnent par le nez ou les lèvres. Ils s’adoucissent en んで.', 'む, ぶ y ぬ suenan por la nariz o los labios. Se suavizan en んで.', 'む、ぶ、ぬ 带鼻音或唇音，变柔和成 んで。'),
      tr('く becomes いて, and its voiced twin ぐ becomes いで.', 'く devient いて, et son jumeau voisé ぐ devient いで.', 'く pasa a いて, y su gemelo sonoro ぐ pasa a いで.', 'く 变成 いて，它的浊音孪生 ぐ 变成 いで。'),
      tr('す just becomes して. Tap any circle to trace it, then flip to the past: the same funnel, with た and だ.', 'す devient simplement して. Touche un cercle pour le suivre, puis passe au passé : même entonnoir, avec た et だ.', 'す pasa simplemente a して. Toca un círculo y luego cambia al pasado: el mismo embudo, con た y だ.', 'す 直接变成 して。点圆圈跟着走，再切到过去式：同一个漏斗，换成 た 和 だ。'),
    ],
    ask: {
      q: tr('Follow the funnel: what is the て-form of 遊ぶ?', 'Suis l’entonnoir : quelle est la forme て de 遊ぶ ?', 'Sigue el embudo: ¿cuál es la forma て de 遊ぶ?', '顺着漏斗：遊ぶ 的 て形是？'), ja: '遊ぶ → ？',
      options: ['遊んで', '遊って', '遊いで'], answer: 0,
      why: tr('ぶ flows with む and ぬ into んで.', 'ぶ coule avec む et ぬ vers んで.', 'ぶ va con む y ぬ hacia んで.', 'ぶ 和 む、ぬ 一起流向 んで。'),
    },
  },
  {
    id: 'time', emoji: '⏳', Scene: TimeScene,
    title: tr('ている on a timeline', 'ている sur une ligne du temps', 'ている en una línea de tiempo', '时间轴上的 ている'),
    idea: tr('Why 結婚している is not “getting married”', 'Pourquoi 結婚している n’est pas « en train de se marier »', 'Por qué 結婚している no es «casándose»', '为什么 結婚している 不是“正在结婚”'),
    steps: [
      tr('Slide “now” along the line. Before the meal, Japanese uses 食べる. It also covers the future.', 'Fais glisser « maintenant ». Avant le repas, le japonais utilise 食べる, qui couvre aussi le futur.', 'Desliza «ahora». Antes de la comida se usa 食べる, que también cubre el futuro.', '拖动“现在”。吃饭之前用 食べる，它也能表示将来。'),
      tr('Inside the action, ている means it is in progress. After it, た closes it.', 'Pendant l’action, ている indique qu’elle est en cours. Après, た la referme.', 'Durante la acción, ている indica que está en curso. Después, た la cierra.', '在动作之中，ている 表示正在进行；之后用 た 收尾。'),
      tr('結婚する is different: it is one instant, not a stretch of time. Nothing can be “in progress” here.', '結婚する est différent : c’est un instant, pas une durée. Rien ne peut être « en cours ».', '結婚する es distinto: es un instante, no un periodo. Nada puede estar «en curso».', '結婚する 不一样：它是一个瞬间，没有“进行中”。'),
      tr('So ている shows the state left behind. 結婚している means “is married”, and the band stretches on.', 'ている montre donc l’état qui reste. 結婚している veut dire « est marié », et la bande continue.', 'Así que ている muestra el estado que queda. 結婚している significa «está casado», y la banda sigue.', '所以 ている 表示留下的状态。結婚している 是“已婚”，色带一直延伸。'),
    ],
    ask: {
      q: tr('知る is a change too: the instant you learn something. What does 知っている mean?', '知る est aussi un changement : l’instant où l’on apprend. Que veut dire 知っている ?', '知る también es un cambio: el instante de enterarse. ¿Qué significa 知っている?', '知る 也是变化：得知的那一瞬。知っている 是什么意思？'), ja: '知っている',
      options: [tr('I know it', 'Je le sais', 'Lo sé', '我知道'), tr('I am finding out now', 'Je suis en train de l’apprendre', 'Me estoy enterando', '我正在得知'), tr('I will find out', 'Je vais l’apprendre', 'Me enteraré', '我将会知道')], answer: 0,
      why: tr('The moment of finding out has passed, and the result, knowing, continues.', 'L’instant de la découverte est passé, et le résultat, savoir, continue.', 'El instante de enterarse pasó y el resultado, saber, continúa.', '得知的瞬间已过，“知道”这个结果在持续。'),
    },
  },
  {
    id: 'nest', emoji: '🪆', Scene: NestScene,
    title: tr('Sentences grow to the left', 'Les phrases grandissent à gauche', 'Las frases crecen a la izquierda', '句子向左生长'),
    idea: tr('Reading long Japanese nouns', 'Lire les longs groupes nominaux', 'Leer sustantivos largos', '读懂长名词短语'),
    steps: [
      tr('Start with one noun: 本, a book. It will stay at the far right whatever we add.', 'Commence par un nom : 本, un livre. Il restera tout à droite, quoi qu’on ajoute.', 'Empieza con un sustantivo: 本, libro. Se quedará a la derecha pase lo que pase.', '从一个名词开始：本，书。不管加什么，它都留在最右边。'),
      tr('Add a description. In Japanese, it goes in front, on the left.', 'Ajoute une description. En japonais, elle se place devant, à gauche.', 'Añade una descripción. En japonés va delante, a la izquierda.', '加一个描述，在日语里它放在前面，也就是左边。'),
      tr('A whole verb phrase fits in the same spot. There is no word for “that” or “which”.', 'Tout un groupe verbal tient au même endroit. Il n’y a pas de mot pour « que » ou « qui ».', 'Toda una frase verbal cabe en el mismo sitio. No hay palabra para «que».', '整个动词短语也能放在这里，不需要“的那个”这样的关系词。'),
      tr('Layers can keep growing. To read one, jump to the last noun, then unpack leftward.', 'Les couches peuvent continuer. Pour lire, saute au dernier nom, puis déballe vers la gauche.', 'Las capas pueden seguir creciendo. Para leer, salta al último sustantivo y desenvuelve hacia la izquierda.', '层次可以一直加。阅读时先跳到最后的名词，再向左拆开。'),
    ],
    ask: {
      q: tr('What is this sentence fragment really about?', 'De quoi parle vraiment ce groupe ?', '¿De qué trata realmente esta frase?', '这个短语真正说的是什么？'), ja: '母が作ったケーキ',
      options: [tr('🍰 a cake', '🍰 un gâteau', '🍰 una tarta', '🍰 蛋糕'), tr('👩 a mother', '👩 une mère', '👩 una madre', '👩 妈妈'), tr('🍳 cooking', '🍳 cuisiner', '🍳 cocinar', '🍳 做饭')], answer: 0,
      why: tr('The final noun is the head: a cake that Mum made.', 'Le dernier nom est le noyau : un gâteau fait par maman.', 'El último sustantivo es el núcleo: una tarta que hizo mamá.', '最后的名词是中心：妈妈做的蛋糕。'),
    },
  },
  {
    id: 'keigo', emoji: '🙇', Scene: KeigoScene,
    title: tr('Politeness is height', 'La politesse est une hauteur', 'La cortesía es altura', '礼貌就是高度'),
    idea: tr('Who is raised, who is lowered', 'Qui s’élève, qui s’abaisse', 'Quién sube, quién baja', '谁被抬高，谁被放低'),
    steps: [
      tr('Friends stand level, so plain forms are fine.', 'Entre amis, on est au même niveau : les formes simples conviennent.', 'Los amigos están al mismo nivel: basta la forma simple.', '朋友之间平起平坐，用简体就好。'),
      tr('です and ます form a small bow toward the listener. Nobody changes height yet.', 'です et ます sont un petit salut vers l’interlocuteur. Personne ne change de hauteur.', 'です y ます son una pequeña reverencia al oyente. Nadie cambia de altura.', 'です、ます 是向听者的小小鞠躬，高度还没变。'),
      tr('Respectful language lifts the other person. Use it only for what they do.', 'Le langage respectueux élève l’autre. On l’utilise seulement pour ce qu’il fait.', 'El lenguaje respetuoso eleva al otro. Se usa solo para lo que hace él.', '尊敬语抬高对方，只用于对方的动作。'),
      tr('Humble language lowers you, which also raises them. Use it only for what you do.', 'Le langage humble t’abaisse, ce qui élève aussi l’autre. On l’utilise seulement pour ce que tu fais.', 'El lenguaje humilde te baja, y así eleva al otro. Se usa solo para lo que haces tú.', '谦让语放低自己，也就抬高了对方，只用于自己的动作。'),
    ],
    ask: {
      q: tr('You tell a customer: “I will go tomorrow.” Which verb?', 'Tu dis à un client : « J’irai demain. » Quel verbe ?', 'Dices a un cliente: «Iré mañana». ¿Qué verbo?', '你对客户说“我明天去”。用哪个动词？'), ja: '明日 ___',
      options: ['参ります', 'いらっしゃいます', '行く'], answer: 0,
      why: tr('It is your own action, so you lower yourself. Using the respectful form would praise yourself.', 'C’est ta propre action, donc tu t’abaisses. La forme respectueuse reviendrait à te louer toi-même.', 'Es tu propia acción, así que te bajas. La forma respetuosa sería elogiarte a ti.', '这是自己的动作，要放低自己。用尊敬语等于抬高自己。'),
    },
  },
  {
    id: 'spot', emoji: '🔦', Scene: SpotScene,
    title: tr('は and が: follow the spotlight', 'は et が : suis le projecteur', 'は y が: sigue el foco', 'は 和 が：跟着聚光灯'),
    idea: tr('Old information, new information', 'Information connue, information nouvelle', 'Información conocida, información nueva', '旧信息与新信息'),
    steps: [
      tr('Someone asks who came. The answer is the person, so が puts the light on what comes before it.', 'On demande qui est venu. La réponse est la personne : が éclaire ce qui le précède.', 'Alguien pregunta quién vino. La respuesta es la persona: が ilumina lo que tiene delante.', '有人问谁来了。答案是人，所以 が 照亮它前面的词。'),
      tr('Now Tanaka is the known topic. は turns the light onto what comes after it.', 'Tanaka est maintenant le sujet connu. は dirige la lumière vers ce qui suit.', 'Ahora Tanaka es el tema conocido. は dirige la luz a lo que sigue.', '现在田中是已知话题，は 把灯光转向后面。'),
      tr('They can work together. は sets the stage for the whole sentence, and が works inside it.', 'Ils peuvent agir ensemble. は pose le décor de la phrase, et が agit à l’intérieur.', 'Pueden trabajar juntos. は pone el escenario de la frase y が actúa dentro.', '它们能合作：は 为整句搭台，が 在里面发挥作用。'),
      tr('Two は side by side also create a contrast: this one, but not that one. Use the numbers to compare.', 'Deux は côte à côte créent aussi un contraste : ceci, mais pas cela. Compare avec les numéros.', 'Dos は juntos también crean un contraste: esto, pero no aquello. Compara con los números.', '两个 は 并列也能形成对比：这个，而不是那个。用数字比较看看。'),
    ],
    ask: {
      q: tr('“Which one is yours?” Point at it and answer.', '« Lequel est à toi ? » Montre-le et réponds.', '«¿Cuál es el tuyo?» Señálalo y responde.', '“哪个是你的？”指着它回答。'), ja: 'これ ___ わたしのです。',
      options: ['が', 'は'], answer: 0,
      why: tr('“This one” is the new information that answers the question, so it takes が.', '« Celui-ci » est la nouveauté qui répond à la question, donc が.', '«Este» es la información nueva que responde, así que lleva が.', '“这个”是回答问题的新信息，所以用 が。'),
    },
  },
];
