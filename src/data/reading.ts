import type { Lang } from '../lib/i18n';

// Japanese text uses {漢字|かな} furigana markup.
export type Tr = Record<Lang, string>;
export interface Line { ja: string; tr: Tr }
export interface Question { q: string; options: string[]; answer: number }
export interface Story { id: string; level: 'N5' | 'N4'; emoji: string; title: Tr; lines: Line[]; questions: Question[] }

const t = (en: string, fr: string, es: string, zh: string): Tr => ({ en, fr, es, zh });
const l = (ja: string, en: string, fr: string, es: string, zh: string): Line => ({ ja, tr: t(en, fr, es, zh) });

export const STORIES: Story[] = [
  {
    id: 'cat', level: 'N5', emoji: '🐱', title: t('My cat', 'Mon chat', 'Mi gato', '我的猫'),
    lines: [
      l('{私|わたし}の{家|いえ}に{猫|ねこ}がいます。', 'There is a cat at my house.', 'Il y a un chat chez moi.', 'Hay un gato en mi casa.', '我家有一只猫。'),
      l('{名前|なまえ}はモチです。', 'Its name is Mochi.', "Il s'appelle Mochi.", 'Se llama Mochi.', '它叫麻糬。'),
      l('モチは{白|しろ}くて、とてもかわいいです。', 'Mochi is white and very cute.', 'Mochi est blanc et très mignon.', 'Mochi es blanco y muy mono.', '麻糬是白色的,非常可爱。'),
      l('{毎朝|まいあさ}、{魚|さかな}を{食|た}べます。', 'It eats fish every morning.', 'Il mange du poisson chaque matin.', 'Come pescado cada mañana.', '它每天早上吃鱼。'),
      l('{昼|ひる}は{窓|まど}の{近|ちか}くで{寝|ね}ています。', 'During the day it sleeps near the window.', 'Le jour, il dort près de la fenêtre.', 'De día duerme junto a la ventana.', '白天它在窗边睡觉。'),
    ],
    questions: [
      { q: 'モチは{何色|なにいろ}ですか。', options: ['{白|しろ}', '{黒|くろ}', '{茶色|ちゃいろ}'], answer: 0 },
      { q: 'モチは{朝|あさ}{何|なに}を{食|た}べますか。', options: ['{肉|にく}', '{魚|さかな}', 'パン'], answer: 1 },
      { q: 'モチは{昼|ひる}どこで{寝|ね}ていますか。', options: ['ベッドの{上|うえ}', 'いすの{下|した}', '{窓|まど}の{近|ちか}く'], answer: 2 },
    ],
  },
  {
    id: 'morning', level: 'N5', emoji: '🌅', title: t('My morning', 'Mon matin', 'Mi mañana', '我的早晨'),
    lines: [
      l('{私|わたし}は{毎朝|まいあさ}{七時|しちじ}に{起|お}きます。', 'I get up at seven every morning.', 'Je me lève à sept heures chaque matin.', 'Me levanto a las siete cada mañana.', '我每天早上七点起床。'),
      l('{朝|あさ}ご{飯|はん}はパンとコーヒーです。', 'Breakfast is bread and coffee.', 'Le petit-déjeuner, c\'est du pain et du café.', 'El desayuno es pan y café.', '早饭是面包和咖啡。'),
      l('{八時|はちじ}に{家|いえ}を{出|で}ます。', 'I leave home at eight.', 'Je quitte la maison à huit heures.', 'Salgo de casa a las ocho.', '我八点出门。'),
      l('{電車|でんしゃ}で{会社|かいしゃ}へ{行|い}きます。', 'I go to the office by train.', 'Je vais au bureau en train.', 'Voy a la oficina en tren.', '我坐电车去公司。'),
      l('{電車|でんしゃ}の{中|なか}で{本|ほん}を{読|よ}みます。', 'I read a book on the train.', 'Je lis un livre dans le train.', 'Leo un libro en el tren.', '我在电车上看书。'),
    ],
    questions: [
      { q: '{何時|なんじ}に{起|お}きますか。', options: ['{六時|ろくじ}', '{七時|しちじ}', '{八時|はちじ}'], answer: 1 },
      { q: '{何|なに}で{会社|かいしゃ}へ{行|い}きますか。', options: ['{電車|でんしゃ}', 'バス', '{車|くるま}'], answer: 0 },
      { q: '{電車|でんしゃ}の{中|なか}で{何|なに}をしますか。', options: ['{寝|ね}ます', '{音楽|おんがく}を{聞|き}きます', '{本|ほん}を{読|よ}みます'], answer: 2 },
    ],
  },
  {
    id: 'shop', level: 'N5', emoji: '🛒', title: t('At the store', 'Au magasin', 'En la tienda', '在商店'),
    lines: [
      l('{今日|きょう}、スーパーへ{行|い}きました。', 'Today I went to the supermarket.', "Aujourd'hui, je suis allé au supermarché.", 'Hoy fui al supermercado.', '今天我去了超市。'),
      l('りんごを{三|みっ}つ{買|か}いました。', 'I bought three apples.', "J'ai acheté trois pommes.", 'Compré tres manzanas.', '我买了三个苹果。'),
      l('{牛乳|ぎゅうにゅう}も{買|か}いました。', 'I also bought milk.', "J'ai aussi acheté du lait.", 'También compré leche.', '我还买了牛奶。'),
      l('{全部|ぜんぶ}で{五百円|ごひゃくえん}でした。', 'It was 500 yen in total.', 'Le tout coûtait 500 yens.', 'Fueron 500 yenes en total.', '一共五百日元。'),
      l('とても{安|やす}かったです。', 'It was very cheap.', "C'était très bon marché.", 'Fue muy barato.', '非常便宜。'),
    ],
    questions: [
      { q: 'りんごをいくつ{買|か}いましたか。', options: ['{二|ふた}つ', '{三|みっ}つ', '{五|いつ}つ'], answer: 1 },
      { q: '{全部|ぜんぶ}でいくらでしたか。', options: ['{五百円|ごひゃくえん}', '{三百円|さんびゃくえん}', '{千円|せんえん}'], answer: 0 },
    ],
  },
  {
    id: 'weekend', level: 'N5', emoji: '🗻', title: t('The weekend', 'Le week-end', 'El fin de semana', '周末'),
    lines: [
      l('{先週|せんしゅう}の{土曜日|どようび}、{友達|ともだち}と{山|やま}に{登|のぼ}りました。', 'Last Saturday I climbed a mountain with a friend.', "Samedi dernier, j'ai fait de la montagne avec un ami.", 'El sábado pasado subí una montaña con un amigo.', '上周六我和朋友去爬山了。'),
      l('{天気|てんき}がとてもよかったです。', 'The weather was very good.', 'Il faisait très beau.', 'Hizo muy buen tiempo.', '天气非常好。'),
      l('{山|やま}の{上|うえ}でおにぎりを{食|た}べました。', 'We ate rice balls on top of the mountain.', 'Nous avons mangé des onigiri au sommet.', 'Comimos bolas de arroz en la cima.', '我们在山顶吃了饭团。'),
      l('{写真|しゃしん}をたくさん{撮|と}りました。', 'We took a lot of photos.', 'Nous avons pris beaucoup de photos.', 'Sacamos muchas fotos.', '我们拍了很多照片。'),
      l('{日曜日|にちようび}は{足|あし}が{痛|いた}かったです。', 'On Sunday my legs hurt.', 'Dimanche, j\'avais mal aux jambes.', 'El domingo me dolían las piernas.', '星期天我的腿很疼。'),
    ],
    questions: [
      { q: 'だれと{山|やま}に{登|のぼ}りましたか。', options: ['{家族|かぞく}', '{一人|ひとり}で', '{友達|ともだち}'], answer: 2 },
      { q: '{山|やま}の{上|うえ}で{何|なに}を{食|た}べましたか。', options: ['おにぎり', 'ラーメン', 'ケーキ'], answer: 0 },
      { q: '{日曜日|にちようび}、どこが{痛|いた}かったですか。', options: ['{頭|あたま}', '{足|あし}', 'おなか'], answer: 1 },
    ],
  },
  {
    id: 'seasons', level: 'N5', emoji: '🌸', title: t('Japanese seasons', 'Les saisons au Japon', 'Las estaciones en Japón', '日本的四季'),
    lines: [
      l('{日本|にほん}には{四|よっ}つの{季節|きせつ}があります。', 'Japan has four seasons.', 'Le Japon a quatre saisons.', 'Japón tiene cuatro estaciones.', '日本有四个季节。'),
      l('{春|はる}は{桜|さくら}がきれいです。', 'In spring the cherry blossoms are pretty.', 'Au printemps, les cerisiers sont jolis.', 'En primavera los cerezos son bonitos.', '春天樱花很美。'),
      l('{夏|なつ}はとても{暑|あつ}いです。', 'Summer is very hot.', "L'été est très chaud.", 'El verano es muy caluroso.', '夏天非常热。'),
      l('{秋|あき}は{涼|すず}しくて、{紅葉|もみじ}がきれいです。', 'Autumn is cool and the maple leaves are pretty.', "L'automne est frais et les érables sont jolis.", 'El otoño es fresco y los arces son bonitos.', '秋天凉爽,红叶很美。'),
      l('{冬|ふゆ}は{寒|さむ}くて、{雪|ゆき}が{降|ふ}ります。', 'Winter is cold and it snows.', "L'hiver est froid et il neige.", 'El invierno es frío y nieva.', '冬天很冷,会下雪。'),
    ],
    questions: [
      { q: '{桜|さくら}がきれいな{季節|きせつ}はいつですか。', options: ['{春|はる}', '{夏|なつ}', '{冬|ふゆ}'], answer: 0 },
      { q: '{雪|ゆき}が{降|ふ}る{季節|きせつ}はいつですか。', options: ['{秋|あき}', '{夏|なつ}', '{冬|ふゆ}'], answer: 2 },
    ],
  },
  {
    id: 'restaurant', level: 'N5', emoji: '🍜', title: t('At the restaurant', 'Au restaurant', 'En el restaurante', '在餐厅'),
    lines: [
      l('{昨日|きのう}の{夜|よる}、{兄|あに}とレストランへ{行|い}きました。', 'Last night I went to a restaurant with my older brother.', 'Hier soir, je suis allé au restaurant avec mon grand frère.', 'Anoche fui a un restaurante con mi hermano mayor.', '昨晚我和哥哥去了餐厅。'),
      l('{兄|あに}はラーメンを{食|た}べました。', 'My brother ate ramen.', 'Mon frère a mangé des ramen.', 'Mi hermano comió ramen.', '哥哥吃了拉面。'),
      l('{私|わたし}はカレーを{食|た}べました。', 'I ate curry.', "J'ai mangé du curry.", 'Yo comí curry.', '我吃了咖喱。'),
      l('カレーは{少|すこ}し{辛|から}かったですが、おいしかったです。', 'The curry was a little spicy, but it was delicious.', 'Le curry était un peu épicé, mais délicieux.', 'El curry estaba un poco picante, pero delicioso.', '咖喱有点辣,但是很好吃。'),
    ],
    questions: [
      { q: 'だれとレストランへ{行|い}きましたか。', options: ['{兄|あに}', '{姉|あね}', '{友達|ともだち}'], answer: 0 },
      { q: 'カレーはどうでしたか。', options: ['{甘|あま}かった', '{少|すこ}し{辛|から}かった', 'まずかった'], answer: 1 },
    ],
  },
  {
    id: 'lost', level: 'N4', emoji: '🔑', title: t('The lost key', 'La clé perdue', 'La llave perdida', '丢失的钥匙'),
    lines: [
      l('{今朝|けさ}、{家|いえ}を{出|で}るとき、{鍵|かぎ}がありませんでした。', 'This morning when I was leaving home, my key was not there.', "Ce matin, en partant, je n'avais plus ma clé.", 'Esta mañana, al salir de casa, no tenía la llave.', '今天早上出门时,钥匙不见了。'),
      l('かばんの{中|なか}を{探|さが}しましたが、{見|み}つかりませんでした。', 'I searched inside my bag, but could not find it.', "J'ai cherché dans mon sac, sans la trouver.", 'Busqué en el bolso, pero no la encontré.', '我找了包里,但是没找到。'),
      l('{会社|かいしゃ}に{遅|おく}れるので、{急|いそ}いでいました。', 'I was in a hurry because I would be late for work.', 'Je me dépêchais car j\'allais être en retard au travail.', 'Tenía prisa porque iba a llegar tarde al trabajo.', '因为上班要迟到了,我很着急。'),
      l('すると、{猫|ねこ}がソファの{下|した}で{鍵|かぎ}で{遊|あそ}んでいました。', 'Then I found my cat playing with the key under the sofa.', 'Alors, le chat jouait avec la clé sous le canapé.', 'Entonces vi al gato jugando con la llave bajo el sofá.', '这时,猫正在沙发下面玩钥匙。'),
      l('{猫|ねこ}に{鍵|かぎ}を{取|と}られたのです。', 'The cat had taken my key.', "C'est le chat qui m'avait pris la clé.", 'El gato me había quitado la llave.', '原来是钥匙被猫拿走了。'),
    ],
    questions: [
      { q: '{鍵|かぎ}はどこにありましたか。', options: ['かばんの{中|なか}', 'ソファの{下|した}', '{会社|かいしゃ}'], answer: 1 },
      { q: 'どうして{急|いそ}いでいましたか。', options: ['{会社|かいしゃ}に{遅|おく}れるから', '{雨|あめ}が{降|ふ}っていたから', '{電車|でんしゃ}が{来|き}たから'], answer: 0 },
      { q: 'だれが{鍵|かぎ}を{取|と}りましたか。', options: ['{友達|ともだち}', '{母|はは}', '{猫|ねこ}'], answer: 2 },
    ],
  },
  {
    id: 'piano', level: 'N4', emoji: '🎹', title: t('Piano lessons', 'Cours de piano', 'Clases de piano', '钢琴课'),
    lines: [
      l('{子供|こども}のとき、{母|はは}にピアノを{習|なら}わされました。', 'As a child, my mother made me take piano lessons.', 'Enfant, ma mère me forçait à prendre des cours de piano.', 'De niño, mi madre me hacía tomar clases de piano.', '小时候,妈妈让我学钢琴。'),
      l('{練習|れんしゅう}は{大変|たいへん}で、{嫌|きら}いでした。', 'Practice was hard and I hated it.', "Les exercices étaient durs et je détestais ça.", 'Practicar era duro y lo odiaba.', '练习很辛苦,我很讨厌。'),
      l('でも、{今|いま}は{弾|ひ}けてよかったと{思|おも}います。', 'But now I think it is good that I can play.', 'Mais maintenant, je suis content de savoir jouer.', 'Pero ahora me alegro de saber tocar.', '但是现在我觉得会弹琴真好。'),
      l('{週末|しゅうまつ}に{子供|こども}たちに{教|おし}えています。', 'I teach children on weekends.', "J'enseigne aux enfants le week-end.", 'Enseño a niños los fines de semana.', '周末我教孩子们弹琴。'),
    ],
    questions: [
      { q: '{子供|こども}のとき、ピアノの{練習|れんしゅう}が{好|す}きでしたか。', options: ['はい、{好|す}きでした', 'いいえ、{嫌|きら}いでした'], answer: 1 },
      { q: '{今|いま}、{週末|しゅうまつ}に{何|なに}をしていますか。', options: ['{子供|こども}たちに{教|おし}えています', 'ピアノを{習|なら}っています', '{寝|ね}ています'], answer: 0 },
    ],
  },
  {
    id: 'kyoto', level: 'N4', emoji: '⛩️', title: t('A trip to Kyoto', 'Voyage à Kyoto', 'Viaje a Kioto', '京都之旅'),
    lines: [
      l('{来月|らいげつ}、{京都|きょうと}へ{旅行|りょこう}するつもりです。', 'I plan to travel to Kyoto next month.', 'Je compte aller à Kyoto le mois prochain.', 'Pienso viajar a Kioto el mes que viene.', '下个月我打算去京都旅行。'),
      l('{新幹線|しんかんせん}なら、{東京|とうきょう}から{二時間半|にじかんはん}ぐらいです。', 'By bullet train it takes about two and a half hours from Tokyo.', 'En shinkansen, il faut environ deux heures et demie depuis Tokyo.', 'En tren bala son unas dos horas y media desde Tokio.', '坐新干线的话,从东京出发大约两个半小时。'),
      l('お{寺|てら}や{神社|じんじゃ}をたくさん{見|み}たいです。', 'I want to see many temples and shrines.', 'Je veux voir beaucoup de temples et de sanctuaires.', 'Quiero ver muchos templos y santuarios.', '我想看很多寺庙和神社。'),
      l('{雨|あめ}が{降|ふ}ったら、{美術館|びじゅつかん}へ{行|い}こうと{思|おも}います。', 'If it rains, I think I will go to an art museum.', "S'il pleut, je pense aller au musée.", 'Si llueve, creo que iré a un museo.', '如果下雨,我想去美术馆。'),
    ],
    questions: [
      { q: 'いつ{京都|きょうと}へ{行|い}きますか。', options: ['{来週|らいしゅう}', '{来月|らいげつ}', '{来年|らいねん}'], answer: 1 },
      { q: '{雨|あめ}が{降|ふ}ったら、どこへ{行|い}きますか。', options: ['{神社|じんじゃ}', 'お{寺|てら}', '{美術館|びじゅつかん}'], answer: 2 },
    ],
  },
  {
    id: 'cold', level: 'N4', emoji: '🤧', title: t('Catching a cold', 'Un rhume', 'Un resfriado', '感冒'),
    lines: [
      l('{昨日|きのう}から{熱|ねつ}があって、{頭|あたま}が{痛|いた}いです。', 'I have had a fever since yesterday and my head hurts.', "J'ai de la fièvre depuis hier et mal à la tête.", 'Tengo fiebre desde ayer y me duele la cabeza.', '从昨天开始我发烧,头也疼。'),
      l('{病院|びょういん}へ{行|い}ったら、{医者|いしゃ}に{風邪|かぜ}だと{言|い}われました。', 'When I went to the hospital, the doctor told me it was a cold.', "À l'hôpital, le médecin m'a dit que c'était un rhume.", 'Fui al hospital y el médico me dijo que era un resfriado.', '我去了医院,医生说是感冒。'),
      l('{薬|くすり}を{飲|の}んで、ゆっくり{休|やす}まなければなりません。', 'I must take medicine and rest well.', 'Je dois prendre des médicaments et bien me reposer.', 'Debo tomar la medicina y descansar bien.', '我必须吃药,好好休息。'),
      l('{明日|あした}の{仕事|しごと}は{休|やす}むことにしました。', 'I decided to take tomorrow off work.', "J'ai décidé de ne pas travailler demain.", 'Decidí no ir a trabajar mañana.', '我决定明天请假。'),
    ],
    questions: [
      { q: '{医者|いしゃ}は{何|なん}と{言|い}いましたか。', options: ['{風邪|かぜ}です', '{元気|げんき}です', '{働|はたら}いてください'], answer: 0 },
      { q: '{明日|あした}どうしますか。', options: ['{仕事|しごと}に{行|い}きます', '{仕事|しごと}を{休|やす}みます', '{旅行|りょこう}します'], answer: 1 },
    ],
  },
];

/** Single sentences: read the Japanese, pick the matching meaning. */
export const SENTENCES: Line[] = [
  l('{私|わたし}は{学生|がくせい}です。', 'I am a student.', 'Je suis étudiant.', 'Soy estudiante.', '我是学生。'),
  l('これは{何|なん}ですか。', 'What is this?', "Qu'est-ce que c'est ?", '¿Qué es esto?', '这是什么?'),
  l('トイレはどこですか。', 'Where is the toilet?', 'Où sont les toilettes ?', '¿Dónde está el baño?', '厕所在哪里?'),
  l('{水|みず}をください。', 'Water, please.', "De l'eau, s'il vous plaît.", 'Agua, por favor.', '请给我水。'),
  l('{今|いま}{何時|なんじ}ですか。', 'What time is it now?', 'Quelle heure est-il ?', '¿Qué hora es?', '现在几点?'),
  l('{日本語|にほんご}を{勉強|べんきょう}しています。', 'I am studying Japanese.', "J'étudie le japonais.", 'Estoy estudiando japonés.', '我在学日语。'),
  l('{明日|あした}は{雨|あめ}が{降|ふ}ります。', 'It will rain tomorrow.', 'Il pleuvra demain.', 'Mañana lloverá.', '明天会下雨。'),
  l('{昨日|きのう}は{寒|さむ}かったです。', 'It was cold yesterday.', 'Il faisait froid hier.', 'Ayer hizo frío.', '昨天很冷。'),
  l('{駅|えき}はあそこです。', 'The station is over there.', 'La gare est là-bas.', 'La estación está allí.', '车站在那边。'),
  l('{猫|ねこ}が{好|す}きです。', 'I like cats.', "J'aime les chats.", 'Me gustan los gatos.', '我喜欢猫。'),
  l('お{金|かね}がありません。', "I don't have money.", "Je n'ai pas d'argent.", 'No tengo dinero.', '我没有钱。'),
  l('{一緒|いっしょ}に{行|い}きましょう。', "Let's go together.", 'Allons-y ensemble.', 'Vamos juntos.', '一起去吧。'),
  l('もう{一度|いちど}{言|い}ってください。', 'Please say it once more.', "Répétez, s'il vous plaît.", 'Repítalo, por favor.', '请再说一遍。'),
  l('ゆっくり{話|はな}してください。', 'Please speak slowly.', "Parlez lentement, s'il vous plaît.", 'Hable despacio, por favor.', '请慢慢说。'),
  l('{写真|しゃしん}を{撮|と}ってもいいですか。', 'May I take a photo?', 'Puis-je prendre une photo ?', '¿Puedo sacar una foto?', '可以拍照吗?'),
  l('ここでタバコを{吸|す}わないでください。', 'Please do not smoke here.', 'Ne fumez pas ici, svp.', 'Por favor, no fume aquí.', '请不要在这里吸烟。'),
  l('{朝|あさ}ご{飯|はん}を{食|た}べませんでした。', "I didn't eat breakfast.", "Je n'ai pas pris de petit-déjeuner.", 'No desayuné.', '我没吃早饭。'),
  l('{兄|あに}は{車|くるま}を{持|も}っています。', 'My older brother has a car.', 'Mon grand frère a une voiture.', 'Mi hermano mayor tiene coche.', '我哥哥有车。'),
  l('{窓|まど}を{開|あ}けてもいいですか。', 'May I open the window?', 'Puis-je ouvrir la fenêtre ?', '¿Puedo abrir la ventana?', '可以开窗吗?'),
  l('{漢字|かんじ}が{読|よ}めません。', "I can't read kanji.", 'Je ne sais pas lire les kanji.', 'No puedo leer kanji.', '我看不懂汉字。'),
  l('{泳|およ}げますか。', 'Can you swim?', 'Sais-tu nager ?', '¿Sabes nadar?', '你会游泳吗?'),
  l('{先生|せんせい}に{褒|ほ}められました。', 'I was praised by the teacher.', "J'ai été félicité par le professeur.", 'El profesor me elogió.', '我被老师表扬了。'),
  l('{弟|おとうと}にケーキを{食|た}べられました。', 'My younger brother ate my cake.', 'Mon petit frère a mangé mon gâteau.', 'Mi hermano menor se comió mi pastel.', '我的蛋糕被弟弟吃了。'),
  l('{母|はは}は{私|わたし}に{野菜|やさい}を{食|た}べさせます。', 'My mother makes me eat vegetables.', 'Ma mère me fait manger des légumes.', 'Mi madre me hace comer verduras.', '妈妈让我吃蔬菜。'),
  l('{駅|えき}まで{歩|ある}かされました。', 'I was made to walk to the station.', "On m'a fait marcher jusqu'à la gare.", 'Me hicieron caminar hasta la estación.', '我被迫走到车站。'),
  l('{春|はる}になると、{花|はな}が{咲|さ}きます。', 'When spring comes, flowers bloom.', 'Quand vient le printemps, les fleurs fleurissent.', 'Cuando llega la primavera, florecen las flores.', '一到春天,花就开了。'),
  l('{安|やす}ければ{買|か}います。', "If it's cheap, I'll buy it.", "Si c'est bon marché, je l'achète.", 'Si es barato, lo compro.', '如果便宜我就买。'),
  l('{時間|じかん}があったら、{映画|えいが}を{見|み}ます。', "If I have time, I'll watch a movie.", "Si j'ai le temps, je regarderai un film.", 'Si tengo tiempo, veré una película.', '如果有时间,我就看电影。'),
  l('{京都|きょうと}なら、{秋|あき}がいいですよ。', 'If it is Kyoto, autumn is good.', "Pour Kyoto, l'automne est bien.", 'Para Kioto, el otoño es bueno.', '要去京都的话,秋天不错。'),
  l('{音楽|おんがく}を{聞|き}きながら{勉強|べんきょう}します。', 'I study while listening to music.', "J'étudie en écoutant de la musique.", 'Estudio mientras escucho música.', '我一边听音乐一边学习。'),
  l('{新|あたら}しいパソコンが{欲|ほ}しいです。', 'I want a new computer.', 'Je veux un nouvel ordinateur.', 'Quiero un ordenador nuevo.', '我想要新电脑。'),
  l('{海|うみ}へ{行|い}きたいです。', 'I want to go to the sea.', 'Je veux aller à la mer.', 'Quiero ir al mar.', '我想去海边。'),
  l('{今日|きょう}は{何|なに}もしたくないです。', "I don't want to do anything today.", "Je ne veux rien faire aujourd'hui.", 'Hoy no quiero hacer nada.', '今天我什么都不想做。'),
  l('{走|はし}るな!', "Don't run!", 'Ne cours pas !', '¡No corras!', '不许跑!'),
  l('{早|はや}く{起|お}きろ!', 'Get up quickly!', 'Lève-toi vite !', '¡Levántate rápido!', '快起床!'),
  l('{手|て}を{洗|あら}ってから{食|た}べます。', 'I eat after washing my hands.', 'Je mange après m\'être lavé les mains.', 'Como después de lavarme las manos.', '我洗手后吃饭。'),
  l('{宿題|しゅくだい}をしなければなりません。', 'I have to do my homework.', 'Je dois faire mes devoirs.', 'Tengo que hacer los deberes.', '我必须做作业。'),
  l('{日本|にほん}へ{行|い}ったことがあります。', 'I have been to Japan.', 'Je suis déjà allé au Japon.', 'He estado en Japón.', '我去过日本。'),
  l('{彼|かれ}は{今|いま}{寝|ね}ています。', 'He is sleeping now.', 'Il dort maintenant.', 'Él está durmiendo ahora.', '他现在在睡觉。'),
  l('お{誕生日|たんじょうび}おめでとうございます。', 'Happy birthday.', 'Joyeux anniversaire.', 'Feliz cumpleaños.', '生日快乐。'),
];
