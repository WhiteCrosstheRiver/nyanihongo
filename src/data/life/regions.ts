import { PREFECTURES } from './prefectures';
import { line, link, section, tr, type LifeTopic } from './types';

const prefectureWords = PREFECTURES
  .map((x) => [x.kana, x.written, x.emoji, x.name.en, x.name.fr, x.name.es, x.name.zh].join('|'))
  .join('\n');

export const REGIONS: LifeTopic = {
  id: 'regions',
  emoji: '🗾',
  jp: 'ちず',
  title: tr('Map of Japan', 'Carte du Japon', 'Mapa de Japón', '日本地图'),
  intro: tr(
    'Japan is a long chain of islands divided into 47 prefectures, from snowy Hokkaido to subtropical Okinawa. Tap the map to explore them, then test yourself with the game.',
    'Le Japon est une longue chaîne d\'îles divisée en 47 préfectures, de l\'enneigé Hokkaido à la subtropicale Okinawa. Touche la carte pour les explorer, puis teste-toi avec le jeu.',
    'Japón es una larga cadena de islas dividida en 47 prefecturas, desde la nevada Hokkaido hasta la subtropical Okinawa. Toca el mapa para explorarlas y luego ponte a prueba con el juego.',
    '日本是一条狭长的岛链，分为47个都道府县，从雪国北海道到亚热带的冲绳。点击地图探索它们，然后用小游戏测试自己吧。',
  ),
  sections: [
    section('🏝️', tr('An island country', 'Un pays d\'îles', 'Un país de islas', '岛国'), tr(
      'Four main islands make up most of Japan: Honshu, Hokkaido, Kyushu and Shikoku. Around them lie more than 14,000 smaller islands. Roughly three quarters of the land is mountain or hills, so most people live on narrow coastal plains. The highest point is Mt. Fuji at 3,776 metres.',
      'Quatre grandes îles forment l\'essentiel du Japon : Honshu, Hokkaido, Kyushu et Shikoku. Autour d\'elles se trouvent plus de 14 000 îles plus petites. Environ les trois quarts du territoire sont des montagnes ou des collines, si bien que la plupart des gens vivent sur d\'étroites plaines côtières. Le point culminant est le mont Fuji, à 3 776 mètres.',
      'Cuatro islas principales forman casi todo Japón: Honshu, Hokkaido, Kyushu y Shikoku. A su alrededor hay más de 14 000 islas menores. Cerca de tres cuartas partes del territorio son montañas o colinas, por lo que la mayoría de la gente vive en estrechas llanuras costeras. El punto más alto es el monte Fuji, con 3776 metros.',
      '日本主要由本州、北海道、九州和四国四个大岛组成，周围还有一万四千多个小岛。大约四分之三的国土是山地和丘陵，所以大多数人住在狭窄的沿海平原上。最高点是海拔3776米的富士山。',
    )),
    section('🗺️', tr('47 prefectures', '47 préfectures', '47 prefecturas', '47个都道府县'), tr(
      'The word 都道府県 lists the four kinds of prefecture. There is one 都 (Tokyo), one 道 (Hokkaido), two 府 (Osaka and Kyoto) and 43 県. Each has its own governor and assembly, much like a state or department, and a capital city that holds the local government.',
      'Le mot 都道府県 énumère les quatre types de préfectures. Il y a un 都 (Tokyo), un 道 (Hokkaido), deux 府 (Osaka et Kyoto) et 43 県. Chacune a son gouverneur et son assemblée, un peu comme un département ou un État, ainsi qu\'un chef-lieu où siège le gouvernement local.',
      'La palabra 都道府県 enumera los cuatro tipos de prefectura. Hay un 都 (Tokio), un 道 (Hokkaido), dos 府 (Osaka y Kioto) y 43 県. Cada una tiene su gobernador y su asamblea, parecido a un estado o provincia, y una capital donde está el gobierno local.',
      '“都道府县”这个词列出了四种行政区：一个都（东京）、一个道（北海道）、两个府（大阪和京都）以及43个县。每个行政区都有自己的知事和议会，还有设有地方政府的首府。',
    )),
    section('🧭', tr('The eight regions', 'Les huit régions', 'Las ocho regiones', '八大地方'), tr(
      'People often group the prefectures into eight traditional regions: Hokkaido, Tohoku, Kanto, Chubu, Kansai (also called Kinki), Chugoku, Shikoku and Kyushu, which usually includes Okinawa. The regions have no government of their own, but they appear in weather forecasts, sport and everyday talk. Beware of 中国: it means both the Chugoku region and China.',
      'On regroupe souvent les préfectures en huit régions traditionnelles : Hokkaido, Tohoku, Kanto, Chubu, Kansai (aussi appelé Kinki), Chugoku, Shikoku et Kyushu, qui inclut généralement Okinawa. Ces régions n\'ont pas de gouvernement propre, mais on les retrouve dans la météo, le sport et les conversations. Attention à 中国 : ce mot désigne à la fois la région de Chugoku et la Chine.',
      'Las prefecturas suelen agruparse en ocho regiones tradicionales: Hokkaido, Tohoku, Kanto, Chubu, Kansai (también llamada Kinki), Chugoku, Shikoku y Kyushu, que normalmente incluye Okinawa. Estas regiones no tienen gobierno propio, pero aparecen en el tiempo, el deporte y la conversación diaria. Cuidado con 中国: significa tanto la región de Chugoku como China.',
      '人们常把都道府县分为八个传统地方：北海道、东北、关东、中部、近畿（也叫关西）、中国、四国和九州，九州通常包括冲绳。这些地方没有自己的政府，但常出现在天气预报、体育和日常对话中。注意“中国”一词，在日语里既指中国地方，也指中国这个国家。',
    )),
    section('🌦️', tr('Climate', 'Le climat', 'El clima', '气候'), tr(
      'Japan stretches so far from north to south that cherry trees bloom weeks apart. Hokkaido has long snowy winters, while Okinawa stays warm all year. The rainy season arrives around June in most areas, and typhoons come mainly in late summer and autumn. In winter, winds from the continent drop deep snow on the Sea of Japan side, while the Pacific side stays dry and sunny.',
      'Le Japon s\'étire tant du nord au sud que les cerisiers y fleurissent à plusieurs semaines d\'écart. Hokkaido connaît de longs hivers neigeux, tandis qu\'Okinawa reste chaude toute l\'année. La saison des pluies arrive vers juin dans la plupart des régions, et les typhons surviennent surtout à la fin de l\'été et en automne. En hiver, les vents du continent déversent une neige épaisse sur le versant de la mer du Japon, alors que le versant pacifique reste sec et ensoleillé.',
      'Japón se extiende tanto de norte a sur que los cerezos florecen con semanas de diferencia. Hokkaido tiene largos inviernos nevados, mientras que Okinawa es cálida todo el año. La temporada de lluvias llega hacia junio en la mayoría de las zonas, y los tifones vienen sobre todo a finales de verano y en otoño. En invierno, los vientos del continente dejan mucha nieve en la vertiente del mar de Japón, mientras que la del Pacífico sigue seca y soleada.',
      '日本南北狭长，各地樱花的花期相差数周。北海道冬季漫长多雪，冲绳则全年温暖。大部分地区约在六月进入梅雨季，台风主要出现在夏末和秋季。冬天，来自大陆的季风给日本海一侧带来大雪，而太平洋一侧则干燥晴朗。',
    )),
    section('🗣️', tr('Dialects', 'Les dialectes', 'Los dialectos', '方言'), tr(
      'Standard Japanese is based on the speech of Tokyo, but every region has its own dialect, called 方言. In Kansai you may hear おおきに for "thank you" and あかん for "no good". In Hokkaido, なまら means "very", and in Hakata sentences may end in ばい or たい. The traditional Ryukyuan languages of Okinawa are so different that they are treated as separate languages.',
      'Le japonais standard repose sur le parler de Tokyo, mais chaque région a son dialecte, appelé 方言. Dans le Kansai, on peut entendre おおきに pour « merci » et あかん pour « pas bon ». À Hokkaido, なまら veut dire « très », et à Hakata les phrases peuvent finir par ばい ou たい. Les langues ryukyu traditionnelles d\'Okinawa sont si différentes qu\'on les considère comme des langues à part.',
      'El japonés estándar se basa en el habla de Tokio, pero cada región tiene su dialecto, llamado 方言. En Kansai se oye おおきに por «gracias» y あかん por «no está bien». En Hokkaido, なまら significa «muy», y en Hakata las frases pueden acabar en ばい o たい. Las lenguas ryukyuenses tradicionales de Okinawa son tan distintas que se consideran lenguas aparte.',
      '标准日语以东京话为基础，但各地都有自己的方言，日语同样写作“方言”。在关西，“谢谢”可以说おおきに，“不行”说あかん。在北海道，なまら表示“非常”，博多话的句尾常有ばい或たい。冲绳传统的琉球语差别很大，被视为独立的语言。',
    )),
    section('🚄', tr('Getting around', 'Se déplacer', 'Cómo moverse', '出行'), tr(
      'Shinkansen bullet trains link Hokkaido, Honshu and Kyushu, using an undersea tunnel to cross to Hokkaido. Shikoku is reached by great bridges and regular trains, and Okinawa by plane or boat. Stations sell ekiben, boxed meals that show off local food, so a train trip is also a tour of the regions.',
      'Les trains à grande vitesse Shinkansen relient Hokkaido, Honshu et Kyushu, avec un tunnel sous-marin pour rejoindre Hokkaido. On gagne le Shikoku par de grands ponts et des trains classiques, et Okinawa en avion ou en bateau. Les gares vendent des ekiben, des repas en boîte qui mettent en valeur les produits locaux : un voyage en train est aussi un tour des régions.',
      'Los trenes bala Shinkansen conectan Hokkaido, Honshu y Kyushu, con un túnel submarino para llegar a Hokkaido. A Shikoku se llega por grandes puentes y trenes normales, y a Okinawa en avión o barco. Las estaciones venden ekiben, comidas en caja que presumen de productos locales, así que un viaje en tren es también un recorrido por las regiones.',
      '新干线连接北海道、本州和九州，并通过海底隧道通往北海道。去四国要走跨海大桥和普通列车，去冲绳则要坐飞机或船。车站出售展示当地美食的铁路便当，所以坐火车旅行也是一场地方巡游。',
    )),
  ],
  words: `
${prefectureWords}
とどうふけん|都道府県|🗾|prefectures of Japan|préfectures du Japon|prefecturas de Japón|都道府县
ちほう|地方|🧭|region|région|región|地方
けん|県|🏛️|prefecture|préfecture|prefectura|县
ちず|地図|🗺️|map|carte|mapa|地图
けんちょうしょざいち|県庁所在地|🏙️|prefectural capital|chef-lieu de préfecture|capital de prefectura|县厅所在地
ほうげん|方言|🗣️|dialect|dialecte|dialecto|方言
ほんしゅう|本州|🗾|Honshu|Honshu|Honshu|本州
はんとう|半島|🏖️|peninsula|péninsule|península|半岛
ぼんち|盆地|⛰️|basin|bassin|cuenca|盆地
かざん|火山|🌋|volcano|volcan|volcán|火山
`,
  phrases: [
    line('{日本|にほん}には{四十七|よんじゅうなな}の{都道府県|とどうふけん}があります。', 'Japan has 47 prefectures.', 'Le Japon compte 47 préfectures.', 'Japón tiene 47 prefecturas.', '日本有47个都道府县。'),
    line('ご{出身|しゅっしん}はどちらですか。', 'Where are you from?', 'D\'où venez-vous ?', '¿De dónde es usted?', '您是哪里人？'),
    line('{大阪|おおさか}の{出身|しゅっしん}です。', 'I am from Osaka.', 'Je viens d\'Osaka.', 'Soy de Osaka.', '我是大阪人。'),
    line('{北海道|ほっかいどう}は{日本|にほん}の{北|きた}にあります。', 'Hokkaido is in the north of Japan.', 'Hokkaido se trouve dans le nord du Japon.', 'Hokkaido está en el norte de Japón.', '北海道在日本的北部。'),
    line('{沖縄|おきなわ}は{一年中|いちねんじゅう}{暖|あたた}かいです。', 'Okinawa is warm all year round.', 'Il fait doux à Okinawa toute l\'année.', 'En Okinawa hace calor todo el año.', '冲绳一年四季都很暖和。'),
    line('{大阪|おおさか}の{名物|めいぶつ}は{何|なん}ですか。', 'What is Osaka\'s local speciality?', 'Quelle est la spécialité d\'Osaka ?', '¿Cuál es la especialidad de Osaka?', '大阪的特产是什么？'),
    line('{京都|きょうと}まで{新幹線|しんかんせん}で{行|い}きます。', 'I will go to Kyoto by Shinkansen.', 'Je vais à Kyoto en Shinkansen.', 'Voy a Kioto en Shinkansen.', '我坐新干线去京都。'),
    line('{富士山|ふじさん}は{山梨県|やまなしけん}と{静岡県|しずおかけん}の{間|あいだ}にあります。', 'Mt. Fuji stands between Yamanashi and Shizuoka.', 'Le mont Fuji se dresse entre Yamanashi et Shizuoka.', 'El monte Fuji está entre Yamanashi y Shizuoka.', '富士山位于山梨县和静冈县之间。'),
    line('{九州|きゅうしゅう}へ{旅行|りょこう}に{行|い}きたいです。', 'I want to take a trip to Kyushu.', 'Je voudrais faire un voyage à Kyushu.', 'Quiero hacer un viaje a Kyushu.', '我想去九州旅行。'),
    line('{地図|ちず}を{見|み}せてください。', 'Please show me the map.', 'Montrez-moi la carte, s\'il vous plaît.', 'Muéstreme el mapa, por favor.', '请给我看看地图。'),
    line('{関西|かんさい}の{方言|ほうげん}が{好|す}きです。', 'I like the Kansai dialect.', 'J\'aime le dialecte du Kansai.', 'Me gusta el dialecto de Kansai.', '我喜欢关西方言。'),
    line('{冬|ふゆ}の{新潟|にいがた}は{雪|ゆき}が{多|おお}いです。', 'Niigata gets a lot of snow in winter.', 'Il neige beaucoup à Niigata en hiver.', 'En Niigata nieva mucho en invierno.', '新潟的冬天雪很多。'),
  ],
  links: [
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=4Yw3VDsTquw', tr('Discover the regions: Hokkaido', 'Découvrir les régions : Hokkaido', 'Descubre las regiones: Hokkaido', '探索各地：北海道')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=bRimtN3sfzU', tr('Discover the regions: Tohoku', 'Découvrir les régions : Tohoku', 'Descubre las regiones: Tohoku', '探索各地：东北')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=mu-0CoEPWqA', tr('Discover the regions: Kanto', 'Découvrir les régions : Kanto', 'Descubre las regiones: Kanto', '探索各地：关东')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=gqcV7rWRTpo', tr('Discover the regions: Tokai, in Chubu', 'Découvrir les régions : Tokai, dans le Chubu', 'Descubre las regiones: Tokai, en Chubu', '探索各地：中部的东海')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=Tx5BO5636C8', tr('Discover the regions: Kansai', 'Découvrir les régions : Kansai', 'Descubre las regiones: Kansai', '探索各地：关西')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=qr5IDTGLtzY', tr('Discover the regions: Chugoku', 'Découvrir les régions : Chugoku', 'Descubre las regiones: Chugoku', '探索各地：中国地方')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=c3nh6zL45xg', tr('Discover the regions: Shikoku', 'Découvrir les régions : Shikoku', 'Descubre las regiones: Shikoku', '探索各地：四国')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=Rt-ZD3mPzN8', tr('Discover the regions: Kyushu', 'Découvrir les régions : Kyushu', 'Descubre las regiones: Kyushu', '探索各地：九州')),
    link('video', 'Visit Japan (JNTO)', 'https://www.youtube.com/watch?v=3Dv4yN0TP88', tr('Discover the regions: Okinawa', 'Découvrir les régions : Okinawa', 'Descubre las regiones: Okinawa', '探索各地：冲绳')),
    link('video', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Videos_of_Shinkansen', tr('Shinkansen trains in motion', 'Shinkansen en mouvement', 'Trenes Shinkansen en marcha', '行驶中的新干线')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Prefectures_of_Japan', tr('Photos by prefecture', 'Photos par préfecture', 'Fotos por prefectura', '各都道府县的照片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Landscapes_of_Japan', tr('Landscapes of Japan', 'Paysages du Japon', 'Paisajes de Japón', '日本风景')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Aerial_photographs_of_Japan', tr('Japan from the air', 'Le Japon vu du ciel', 'Japón desde el aire', '从空中看日本')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Japanese_Alps', tr('The Japanese Alps', 'Les Alpes japonaises', 'Los Alpes japoneses', '日本阿尔卑斯山')),
    link('guide', 'Japan National Tourism Organization', 'https://www.japan.travel/en/destinations/', tr('Official guide to destinations', 'Guide officiel des destinations', 'Guía oficial de destinos', '官方目的地指南')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/List_of_regions_of_Japan', tr('The regions of Japan', 'Les régions du Japon', 'Las regiones de Japón', '日本的地方')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/Japanese_dialects', tr('Japanese dialects', 'Les dialectes japonais', 'Los dialectos japoneses', '日语方言')),
    link('guide', 'Geospatial Information Authority of Japan', 'https://maps.gsi.go.jp/', tr('GSI Maps, the official map of Japan', 'GSI Maps, la carte officielle du Japon', 'GSI Maps, el mapa oficial de Japón', '日本官方地图 GSI Maps')),
  ],
};
