import { line, link, section, tr, type LifeTopic } from './types';

export const FOLK: LifeTopic = {
  id: 'folk',
  emoji: '🪆',
  jp: 'でんとう',
  title: tr('Folk traditions', 'Traditions populaires', 'Tradiciones populares', '民俗传统'),
  intro: tr(
    'Lucky cats, red cows, foxes at the shrine gate and ogres at the door. Folk Japan lives on shelves, in shops and on rooftops. Wake the figures, slide through a whole life, and learn the small rules people still keep.',
    'Chats porte-bonheur, vaches rouges, renards aux portes des sanctuaires et ogres sur le seuil. Le Japon populaire vit sur les étagères, dans les boutiques et sur les toits. Réveille les figurines, parcours toute une vie et découvre les petites règles encore respectées.',
    'Gatos de la suerte, vacas rojas, zorros en los santuarios y ogros en la puerta. El Japón popular vive en estantes, tiendas y tejados. Despierta las figuras, recorre toda una vida y aprende las pequeñas reglas que aún se siguen.',
    '招财猫、红牛、神社门口的狐狸、上门的鬼怪。民间的日本就在架子上、店铺里、屋顶上。唤醒人偶，走过一生，看看人们至今仍遵守的小规矩。',
  ),
  sections: [
    section('⛩️', tr('At a shrine', 'Au sanctuaire', 'En un santuario', '在神社'), tr(
      'Bow at the torii gate, then rinse your hands at the water basin. At the hall, a common pattern is two bows, two claps and one more bow. Afterwards you can buy an omamori charm, write a wish on a wooden ema, or draw an omikuji fortune. A bad fortune is often tied to a rack and left behind.',
      'Salue au torii, puis rince-toi les mains au bassin. Devant le pavillon, on fait souvent deux saluts, deux claquements de mains et un dernier salut. Ensuite, tu peux acheter un talisman omamori, écrire un vœu sur une plaquette ema ou tirer un oracle omikuji. Un mauvais oracle est souvent noué sur place.',
      'Inclínate ante el torii y enjuágate las manos en la fuente. Ante el pabellón se suele hacer dos reverencias, dos palmadas y una reverencia más. Después puedes comprar un amuleto omamori, escribir un deseo en una tablilla ema o sacar un oráculo omikuji. Un mal oráculo suele atarse allí y dejarse.',
      '在鸟居前鞠躬，然后在手水舍洗手。到拜殿前，常见做法是二拜、二拍手、一拜。之后可以买“御守”、在木牌“绘马”上写愿望，或抽“御神签”。抽到不好的签，常常系在架子上留下。',
    )),
    section('👻', tr('Yokai: the strange neighbours', 'Les yokai, voisins étranges', 'Yokai: vecinos extraños', '妖怪：奇妙的邻居'), tr(
      'Folk tales fill rivers and mountains with yokai. The kappa lives in water and loves cucumbers, the tengu haunts mountain forests with a long red nose, and old objects may wake up as tsukumogami after a hundred years. Parents long used such stories to keep children away from deep water.',
      'Les contes remplissent rivières et montagnes de yokai. Le kappa vit dans l’eau et adore les concombres, le tengu hante les forêts avec son long nez rouge, et de vieux objets peuvent s’éveiller en tsukumogami après cent ans. Ces histoires éloignaient aussi les enfants de l’eau profonde.',
      'Los cuentos llenan ríos y montañas de yokai. El kappa vive en el agua y adora los pepinos, el tengu ronda los bosques con su larga nariz roja, y los objetos viejos pueden despertar como tsukumogami tras cien años. Estas historias también alejaban a los niños del agua profunda.',
      '民间故事让山川里住满了妖怪。河童住在水里，爱吃黄瓜；天狗长着红长鼻，出没于山林；老物件满一百年可能化为“付丧神”。这些故事也让孩子们远离深水。',
    )),
    section('🥢', tr('Small taboos', 'Petits tabous', 'Pequeños tabúes', '小小的禁忌'), tr(
      'Never stand chopsticks upright in rice or pass food from chopstick to chopstick, because both recall funeral rites. Sleeping with your head to the north is linked to how the dead are laid out. Four can sound like death and nine like suffering, so some hospitals and gifts avoid them. Whistling at night is said to call snakes.',
      'Ne plante jamais les baguettes dans le riz et ne passe pas la nourriture de baguettes à baguettes : ces gestes rappellent les funérailles. Dormir la tête au nord évoque la disposition des défunts. Quatre sonne comme la mort et neuf comme la souffrance, donc certains hôpitaux et cadeaux les évitent. Siffler la nuit attirerait les serpents.',
      'Nunca claves los palillos en el arroz ni pases comida de palillo a palillo: ambos recuerdan ritos funerarios. Dormir con la cabeza al norte se asocia a cómo se coloca a los difuntos. Cuatro puede sonar a muerte y nueve a sufrimiento, y algunos hospitales y regalos los evitan. Silbar de noche atraería serpientes.',
      '不要把筷子竖插在米饭上，也不要用筷子互相传递食物，这两者都让人想到葬礼。头朝北睡与安置逝者的方式有关。“四”音近“死”，“九”音近“苦”，有些医院和礼品会避开。据说夜里吹口哨会招来蛇。',
    )),
    section('🎁', tr('Giving and wrapping', 'Offrir et emballer', 'Regalar y envolver', '送礼与包装'), tr(
      'Summer ochugen and winter oseibo gifts thank those who helped you. Travellers bring omiyage sweets back to the office. Knots matter too: a bow that can be retied suits happy events that may repeat, while a tight knot suits weddings and funerals, which should happen only once.',
      'Les cadeaux d’été ochugen et d’hiver oseibo remercient ceux qui t’ont aidé. Les voyageurs rapportent des douceurs omiyage au bureau. Les nœuds comptent aussi : un nœud refaisable convient aux joies qui se répètent, un nœud serré aux mariages et funérailles, qui ne doivent arriver qu’une fois.',
      'Los regalos de verano ochugen y de invierno oseibo agradecen la ayuda recibida. Quien viaja trae dulces omiyage a la oficina. Los nudos también importan: el que se puede rehacer es para alegrías repetibles, y el nudo firme para bodas y funerales, que deberían ocurrir una sola vez.',
      '夏季的“中元”和冬季的“岁暮”用来答谢帮助过自己的人。旅行归来要给同事带“伴手礼”点心。绳结也有讲究：可重新系的结用于可以重复的喜事，死结用于只该有一次的婚礼和丧事。',
    )),
  ],
  words: `
おまもり|お守り|🧿|charm|talisman|amuleto|御守
おみくじ|おみくじ|📜|fortune slip|oracle en papier|oráculo de papel|御神签
えま|絵馬|🪧|wooden wish plaque|plaquette à vœux|tablilla de deseos|绘马
とりい|鳥居|⛩️|shrine gate|portique de sanctuaire|puerta de santuario|鸟居
じんじゃ|神社|⛩️|shrine|sanctuaire|santuario|神社
おてら|お寺|🛕|temple|temple|templo|寺庙
かみさま|神様|✨|god, deity|divinité|deidad|神明
ほとけさま|仏様|🪷|Buddha|Bouddha|Buda|佛
おまいり|お参り|🙏|visit to pray|visite pour prier|visita para rezar|参拜
ようかい|妖怪|👻|yokai, folk monster|yokai, monstre populaire|yokai, monstruo popular|妖怪
かっぱ|河童|🥒|kappa, water sprite|kappa, esprit des eaux|kappa, espíritu del agua|河童
てんぐ|天狗|👺|tengu, mountain spirit|tengu, esprit des montagnes|tengu, espíritu de montaña|天狗
おに|鬼|👹|ogre, demon|ogre, démon|ogro, demonio|鬼
きつね|狐|🦊|fox|renard|zorro|狐狸
たぬき|狸|🦝|tanuki, raccoon dog|tanuki, chien viverrin|tanuki, perro mapache|狸猫
だるま|達磨|🔴|daruma doll|poupée daruma|muñeco daruma|达摩不倒翁
まねきねこ|招き猫|🐱|beckoning cat|chat qui invite|gato que llama|招财猫
にんぎょう|人形|🎎|doll|poupée|muñeca|人偶
えんぎ|縁起|🍀|omen, luck|présage, chance|augurio, suerte|兆头
ごりやく|ご利益|🌟|divine benefit|bienfait divin|favor divino|神佛保佑
ねがいごと|願い事|💫|wish|vœu|deseo|愿望
いのる|祈る|🙏|to pray|prier|rezar|祈祷
おはらい|お祓い|🌿|purification rite|rite de purification|rito de purificación|祓除仪式
でんせつ|伝説|📖|legend|légende|leyenda|传说
むかしばなし|昔話|📚|old folk tale|conte d’autrefois|cuento antiguo|民间故事
しきたり|しきたり|📏|custom, convention|usage, convention|costumbre, usanza|惯例
ふうしゅう|風習|🏮|local custom|coutume locale|costumbre local|风俗
おくりもの|贈り物|🎁|gift|cadeau|regalo|礼物
おみやげ|お土産|🍡|souvenir gift|souvenir à offrir|recuerdo para regalar|伴手礼
かんれき|還暦|🧧|60th birthday|60e anniversaire|60.º cumpleaños|花甲
やくどし|厄年|🧿|unlucky year|année néfaste|año de mala suerte|厄年
`,
  phrases: [
    line('{願|ねが}いが かないますように。', 'May my wish come true.', 'Que mon vœu se réalise.', 'Que se cumpla mi deseo.', '愿我的愿望成真。'),
    line('おみくじを {引|ひ}きましょう。', 'Let’s draw a fortune.', 'Tirons un oracle.', 'Saquemos un oráculo.', '我们抽签吧。'),
    line('{大吉|だいきち}だ！', 'Great luck!', 'Grande chance !', '¡Gran suerte!', '大吉！'),
    line('{鬼|おに}は{外|そと}、{福|ふく}は{内|うち}！', 'Demons out, luck in!', 'Les démons dehors, le bonheur dedans !', '¡Demonios fuera, suerte dentro!', '鬼出去，福进来！'),
    line('{縁起|えんぎ}がいいですね。', 'That is a good omen.', 'C’est de bon augure.', 'Es de buen augurio.', '真是好兆头。'),
    line('お{守|まも}りを ください。', 'A charm, please.', 'Un talisman, s’il vous plaît.', 'Un amuleto, por favor.', '请给我一个御守。'),
    line('{還暦|かんれき}、おめでとうございます。', 'Congratulations on your 60th birthday.', 'Félicitations pour vos 60 ans.', 'Enhorabuena por sus 60 años.', '恭喜您花甲之年。'),
    line('{昔|むかし}、{昔|むかし}、あるところに…', 'Once upon a time, in a certain place...', 'Il était une fois, quelque part...', 'Érase una vez, en cierto lugar...', '很久很久以前，在某个地方……'),
    line('{夜|よる}に{口笛|くちぶえ}を{吹|ふ}いてはいけません。', 'You must not whistle at night.', 'Il ne faut pas siffler la nuit.', 'No se debe silbar de noche.', '晚上不可以吹口哨。'),
    line('{両手|りょうて}を{合|あ}わせて、お{祈|いの}りします。', 'I put my hands together and pray.', 'Je joins les mains et je prie.', 'Junto las manos y rezo.', '我双手合十祈祷。'),
  ],
  links: [
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Daruma', tr('Daruma photos', 'Photos de daruma', 'Fotos de daruma', '达摩照片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Maneki-neko', tr('Beckoning cats', 'Chats porte-bonheur', 'Gatos de la suerte', '招财猫')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Kokeshi', tr('Kokeshi dolls', 'Poupées kokeshi', 'Muñecas kokeshi', '小芥子木偶')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Haniwa', tr('Haniwa figures', 'Figurines haniwa', 'Figuras haniwa', '埴轮')),
    link('video', 'Visit Japan (JNTO) on YouTube', 'https://www.youtube.com/@visitjapan', tr('JNTO’s Visit Japan channel', 'La chaîne Visit Japan de la JNTO', 'El canal Visit Japan de la JNTO', '日本国家旅游局频道')),
    link('guide', 'UNESCO', 'https://ich.unesco.org/en/RL/raiho-shin-ritual-visits-of-deities-in-masks-and-costumes-01399', tr('Raiho-shin ritual visits, including Namahage', 'Les visites rituelles raiho-shin, dont les Namahage', 'Las visitas rituales raiho-shin, incluidas las Namahage', '“来访神”仪式（包括生剥鬼）')),
    link('guide', 'Japan National Tourism Organization', 'https://www.japan.travel/en/guide/shrine-and-temple-traditions/', tr('Shrine and temple etiquette', 'Usages des sanctuaires et temples', 'Normas en santuarios y templos', '神社与寺庙礼仪')),
  ],
};
