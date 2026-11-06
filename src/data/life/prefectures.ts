/*
 * The 47 prefectures and the 8 traditional regions, used by the map screen and the regions topic.
 *
 * Map outlines (japan-map.json) are generated from Natural Earth 1:10m "Admin 1 – States, Provinces"
 * (ne_10m_admin_1_states_provinces, v5.1.x), https://www.naturalearthdata.com/
 * Licence: public domain. "All versions of Natural Earth raster + vector map data ... are in the
 * public domain", see https://www.naturalearthdata.com/about/terms-of-use/. No attribution is
 * required; the suggested credit if one is wanted is "Made with Natural Earth."
 *
 * Processing: projected with a Lambert conformal conic, simplified with shared borders kept intact,
 * tiny islands removed. Okinawa is moved into an inset. Amami and the Ogasawara islands are left out
 * of the drawing because they are far from the main islands and would shrink everything else.
 * Only the generated JSON is kept in this project.
 *
 * Every "known for" text is original writing for this app.
 */
import { tr } from './types';
import type { Tr } from '../reading';

export type RegionId = 'hokkaido' | 'tohoku' | 'kanto' | 'chubu' | 'kansai' | 'chugoku' | 'shikoku' | 'kyushu';

export interface RegionInfo { id: RegionId; written: string; kana: string; name: Tr }

export const REGION_LIST: RegionInfo[] = [
  { id: 'hokkaido', written: '北海道地方', kana: 'ほっかいどうちほう', name: tr('Hokkaido', 'Hokkaido', 'Hokkaido', '北海道地方') },
  { id: 'tohoku', written: '東北地方', kana: 'とうほくちほう', name: tr('Tohoku', 'Tohoku', 'Tohoku', '东北地方') },
  { id: 'kanto', written: '関東地方', kana: 'かんとうちほう', name: tr('Kanto', 'Kanto', 'Kanto', '关东地方') },
  { id: 'chubu', written: '中部地方', kana: 'ちゅうぶちほう', name: tr('Chubu', 'Chubu', 'Chubu', '中部地方') },
  { id: 'kansai', written: '近畿地方', kana: 'きんきちほう', name: tr('Kansai (Kinki)', 'Kansai (Kinki)', 'Kansai (Kinki)', '近畿地方（关西）') },
  { id: 'chugoku', written: '中国地方', kana: 'ちゅうごくちほう', name: tr('Chugoku', 'Chugoku', 'Chugoku', '中国地方') },
  { id: 'shikoku', written: '四国地方', kana: 'しこくちほう', name: tr('Shikoku', 'Shikoku', 'Shikoku', '四国地方') },
  { id: 'kyushu', written: '九州地方', kana: 'きゅうしゅうちほう', name: tr('Kyushu and Okinawa', 'Kyushu et Okinawa', 'Kyushu y Okinawa', '九州地方（含冲绳）') },
];

export interface Prefecture {
  id: string; // lowercase latin key, also the key in japan-map.json
  code: number; // JIS X 0401, north to south
  emoji: string;
  kana: string;
  written: string;
  region: RegionId;
  capital: { kana: string; written: string };
  name: Tr;
  knownFor: Tr;
}

const p = (
  code: number, id: string, emoji: string, kana: string, written: string, region: RegionId,
  capKana: string, capWritten: string, name: Tr, knownFor: Tr,
): Prefecture => ({ code, id, emoji, kana, written, region, capital: { kana: capKana, written: capWritten }, name, knownFor });

/** Same spelling in English, French and Spanish. */
const n = (latin: string, zh: string) => tr(latin, latin, latin, zh);

export const PREFECTURES: Prefecture[] = [
  p(1, 'hokkaido', '❄️', 'ほっかいどう', '北海道', 'hokkaido', 'さっぽろし', '札幌市', n('Hokkaido', '北海道'), tr(
    'The largest and northernmost prefecture, loved for wide open farmland, fresh dairy and seafood. Sapporo fills its streets with giant ice and snow sculptures every February.',
    'La préfecture la plus vaste et la plus au nord, appréciée pour ses grands espaces agricoles, ses produits laitiers et ses fruits de mer. Chaque février, Sapporo remplit ses rues de sculptures géantes de neige et de glace.',
    'La prefectura más grande y más septentrional, querida por sus amplios campos, sus lácteos y su marisco. Cada febrero, Sapporo llena sus calles de esculturas gigantes de nieve y hielo.',
    '面积最大、位置最北的行政区，以广阔的农田、新鲜乳制品和海鲜闻名。每年二月，札幌街头都会摆满巨大的冰雪雕塑。')),
  p(2, 'aomori', '🍎', 'あおもりけん', '青森県', 'tohoku', 'あおもりし', '青森市', n('Aomori', '青森县'), tr(
    'Japan grows more apples here than anywhere else. In August, huge glowing paper floats parade through Aomori city for the Nebuta festival.',
    'C\'est ici que le Japon produit le plus de pommes. En août, d\'immenses chars de papier illuminés défilent à Aomori pour le festival Nebuta.',
    'Aquí se cultivan más manzanas que en ningún otro lugar de Japón. En agosto, enormes carrozas de papel iluminadas desfilan por Aomori en el festival Nebuta.',
    '日本苹果产量第一。每年八月，巨大的发光纸灯彩车在青森市巡游，这就是睡魔祭。')),
  p(3, 'iwate', '⛩️', 'いわてけん', '岩手県', 'tohoku', 'もりおかし', '盛岡市', n('Iwate', '岩手县'), tr(
    'The second largest prefecture after Hokkaido, with a rugged Pacific coast. Hiraizumi\'s golden hall at Chuson-ji is a World Heritage treasure, and Morioka is known for wanko soba served in endless tiny bowls.',
    'La deuxième plus grande préfecture après Hokkaido, avec une côte pacifique sauvage. Le pavillon doré du Chuson-ji à Hiraizumi est classé au patrimoine mondial, et Morioka est connue pour ses wanko soba servies dans une suite de petits bols.',
    'La segunda prefectura más grande tras Hokkaido, con una costa pacífica escarpada. El pabellón dorado del Chuson-ji en Hiraizumi es Patrimonio Mundial, y Morioka es famosa por el wanko soba, servido en cuenquitos sin fin.',
    '面积仅次于北海道，太平洋海岸线崎岖壮观。平泉中尊寺的金色堂是世界遗产，盛冈则以一小碗接一小碗的“碗子荞麦面”闻名。')),
  p(4, 'miyagi', '🌌', 'みやぎけん', '宮城県', 'tohoku', 'せんだいし', '仙台市', n('Miyagi', '宫城县'), tr(
    'Home to Sendai, the biggest city in Tohoku, famous for grilled beef tongue and a colourful Tanabata festival. The pine-covered islets of Matsushima Bay are a classic Japanese view.',
    'Elle abrite Sendai, la plus grande ville du Tohoku, célèbre pour sa langue de bœuf grillée et son festival Tanabata très coloré. Les îlots couverts de pins de la baie de Matsushima sont un paysage classique du Japon.',
    'Aquí está Sendai, la mayor ciudad de Tohoku, famosa por su lengua de res a la parrilla y su colorido festival Tanabata. Los islotes con pinos de la bahía de Matsushima son una vista clásica de Japón.',
    '这里有东北地方最大的城市仙台，以烤牛舌和色彩缤纷的七夕祭闻名。松岛湾长满松树的小岛是日本的经典风景。')),
  p(5, 'akita', '🐕', 'あきたけん', '秋田県', 'tohoku', 'あきたし', '秋田市', n('Akita', '秋田县'), tr(
    'The home of the loyal Akita dog and of kiritanpo, grilled rice sticks served in hot pot. At the Kanto festival, performers balance tall poles hung with lanterns.',
    'Le pays du fidèle chien Akita et du kiritanpo, des bâtonnets de riz grillés servis en fondue. Au festival Kanto, des artistes font tenir en équilibre de hautes perches garnies de lanternes.',
    'La tierra del fiel perro Akita y del kiritanpo, palitos de arroz asados que se sirven en olla caliente. En el festival Kanto, los artistas equilibran altas pértigas cargadas de farolillos.',
    '忠犬秋田犬的故乡，也是烤米棒“切蒲英”的产地，常放入火锅食用。在竿灯祭上，表演者用身体平衡挂满灯笼的长竿。')),
  p(6, 'yamagata', '🍒', 'やまがたけん', '山形県', 'tohoku', 'やまがたし', '山形市', n('Yamagata', '山形县'), tr(
    'Japan\'s top producer of cherries. Visitors climb about a thousand stone steps to the mountain temple of Yamadera, and in winter the trees of Zao freeze into "snow monsters".',
    'Premier producteur de cerises du Japon. On gravit environ mille marches de pierre pour atteindre le temple de montagne Yamadera, et en hiver les arbres de Zao gèlent en « monstres de neige ».',
    'El mayor productor de cerezas de Japón. Se suben unos mil escalones de piedra hasta el templo de montaña Yamadera, y en invierno los árboles de Zao se congelan en «monstruos de nieve».',
    '日本最大的樱桃产地。游客要登上约一千级石阶才能到达山寺，冬天的藏王树木被冰雪包裹，成为“雪怪”。')),
  p(7, 'fukushima', '🍑', 'ふくしまけん', '福島県', 'tohoku', 'ふくしまし', '福島市', n('Fukushima', '福岛县'), tr(
    'A large prefecture of mountains and orchards, known for sweet peaches. Aizu-Wakamatsu keeps its samurai history alive at Tsuruga Castle, close to the wide Lake Inawashiro.',
    'Une grande préfecture de montagnes et de vergers, connue pour ses pêches sucrées. Aizu-Wakamatsu garde vivant son passé samouraï au château de Tsuruga, non loin du vaste lac Inawashiro.',
    'Una gran prefectura de montañas y huertos, conocida por sus dulces melocotones. Aizu-Wakamatsu conserva su historia samurái en el castillo de Tsuruga, cerca del amplio lago Inawashiro.',
    '山地和果园众多的大县，以香甜的桃子闻名。会津若松的鹤城保留着武士历史，附近还有广阔的猪苗代湖。')),
  p(8, 'ibaraki', '🌸', 'いばらきけん', '茨城県', 'kanto', 'みとし', '水戸市', n('Ibaraki', '茨城县'), tr(
    'Mito is the home of sticky natto and of Kairakuen, a garden famous for its plum blossoms. In spring, Hitachi Seaside Park turns blue with millions of nemophila flowers.',
    'Mito est le berceau du natto gluant et du Kairakuen, un jardin réputé pour ses pruniers en fleurs. Au printemps, le parc Hitachi Seaside se teinte de bleu grâce à des millions de némophiles.',
    'Mito es la cuna del pegajoso natto y del Kairakuen, un jardín célebre por sus ciruelos en flor. En primavera, el parque Hitachi Seaside se tiñe de azul con millones de nemófilas.',
    '水户是黏糯纳豆的故乡，偕乐园以梅花闻名。春天，常陆海滨公园被数百万朵粉蝶花染成一片蓝色。')),
  p(9, 'tochigi', '🍓', 'とちぎけん', '栃木県', 'kanto', 'うつのみやし', '宇都宮市', n('Tochigi', '栃木县'), tr(
    'Nikko\'s richly carved Toshogu shrine honours Tokugawa Ieyasu. The prefecture also leads Japan in strawberries, and Utsunomiya is proud of its gyoza dumplings.',
    'Le Toshogu de Nikko, aux sculptures foisonnantes, honore Tokugawa Ieyasu. La préfecture est aussi la première du Japon pour les fraises, et Utsunomiya est fière de ses gyoza.',
    'El Toshogu de Nikko, ricamente tallado, honra a Tokugawa Ieyasu. La prefectura también es la primera de Japón en fresas, y Utsunomiya presume de sus gyoza.',
    '日光东照宫雕饰华丽，供奉德川家康。这里也是日本草莓产量第一的县，宇都宫则以饺子自豪。')),
  p(10, 'gunma', '♨️', 'ぐんまけん', '群馬県', 'kanto', 'まえばしし', '前橋市', n('Gunma', '群马县'), tr(
    'A mountain prefecture of hot spring towns such as Kusatsu. The Tomioka Silk Mill is a World Heritage site, and Takasaki makes most of Japan\'s red daruma dolls.',
    'Une préfecture de montagne aux villes thermales comme Kusatsu. La filature de soie de Tomioka est classée au patrimoine mondial, et Takasaki fabrique la plupart des poupées daruma rouges du Japon.',
    'Una prefectura de montaña con pueblos termales como Kusatsu. La fábrica de seda de Tomioka es Patrimonio Mundial, y Takasaki produce la mayoría de los muñecos daruma rojos de Japón.',
    '多山的县，有草津等温泉小镇。富冈制丝厂是世界遗产，高崎则生产了日本大部分的红色达摩不倒翁。')),
  p(11, 'saitama', '🏮', 'さいたまけん', '埼玉県', 'kanto', 'さいたまし', 'さいたま市', n('Saitama', '埼玉县'), tr(
    'Just north of Tokyo, with no coast of its own. Kawagoe\'s old merchant streets earned it the nickname "Little Edo", and Omiya has a village of bonsai gardens.',
    'Juste au nord de Tokyo, sans aucune côte. Les vieilles rues marchandes de Kawagoe lui valent le surnom de « Petit Edo », et Omiya possède un village de jardins de bonsaïs.',
    'Justo al norte de Tokio y sin costa propia. Las viejas calles comerciales de Kawagoe le valen el apodo de «Pequeño Edo», y Omiya tiene un pueblo de jardines de bonsáis.',
    '位于东京以北，没有海岸线。川越的老商业街被称为“小江户”，大宫则有一座盆栽村。')),
  p(12, 'chiba', '✈️', 'ちばけん', '千葉県', 'kanto', 'ちばし', '千葉市', n('Chiba', '千叶县'), tr(
    'Many travellers arrive here first, at Narita Airport, and Tokyo Disney Resort actually sits in Urayasu, Chiba. The Boso Peninsula offers beaches, fishing ports and famous peanuts.',
    'Beaucoup de voyageurs arrivent d\'abord ici, à l\'aéroport de Narita, et Tokyo Disney Resort se trouve en réalité à Urayasu, dans le Chiba. La péninsule de Boso offre plages, ports de pêche et cacahuètes réputées.',
    'Muchos viajeros llegan primero aquí, al aeropuerto de Narita, y Tokyo Disney Resort está en realidad en Urayasu, Chiba. La península de Boso ofrece playas, puertos pesqueros y famosos cacahuetes.',
    '许多旅客由此入境，抵达成田机场，而东京迪士尼度假区其实位于千叶县浦安市。房总半岛有海滩、渔港和著名的花生。')),
  p(13, 'tokyo', '🗼', 'とうきょうと', '東京都', 'kanto', 'とうきょう', '東京', tr('Tokyo', 'Tokyo', 'Tokio', '东京都'), tr(
    'Japan\'s capital and its most populous prefecture, from the crossings of Shibuya to the old temples of Asakusa. It also governs remote islands far out in the Pacific, and its government sits in Shinjuku.',
    'La capitale du Japon et sa préfecture la plus peuplée, des carrefours de Shibuya aux vieux temples d\'Asakusa. Elle administre aussi des îles lointaines du Pacifique, et son gouvernement siège à Shinjuku.',
    'La capital de Japón y su prefectura más poblada, desde los cruces de Shibuya hasta los viejos templos de Asakusa. También gobierna islas remotas del Pacífico, y su gobierno tiene sede en Shinjuku.',
    '日本的首都，也是人口最多的行政区，既有涩谷的十字路口，也有浅草的古老寺庙。它还管辖太平洋上的偏远岛屿，都政府设在新宿。')),
  p(14, 'kanagawa', '🗿', 'かながわけん', '神奈川県', 'kanto', 'よこはまし', '横浜市', n('Kanagawa', '神奈川县'), tr(
    'Yokohama offers a lively port and a large Chinatown, Kamakura has its Great Buddha, and Hakone mixes hot springs with views of Mt. Fuji.',
    'Yokohama offre un port animé et un grand quartier chinois, Kamakura a son Grand Bouddha, et Hakone mêle sources chaudes et vues sur le mont Fuji.',
    'Yokohama ofrece un puerto animado y un gran barrio chino, Kamakura tiene su Gran Buda y Hakone combina aguas termales con vistas al monte Fuji.',
    '横滨有热闹的港口和大型中华街，镰仓有大佛，箱根则既有温泉又能眺望富士山。')),
  p(15, 'niigata', '🍚', 'にいがたけん', '新潟県', 'chubu', 'にいがたし', '新潟市', n('Niigata', '新潟县'), tr(
    'Deep winter snow melts into the water behind its celebrated Koshihikari rice and clean sake. Offshore lies Sado Island, with its old gold mines.',
    'La neige abondante de l\'hiver donne l\'eau de son célèbre riz Koshihikari et de son saké limpide. Au large se trouve l\'île de Sado et ses anciennes mines d\'or.',
    'La abundante nieve del invierno da el agua de su célebre arroz Koshihikari y de su sake limpio. Frente a la costa está la isla de Sado, con sus antiguas minas de oro.',
    '冬季的厚雪化成清水，孕育出著名的越光米和清爽的清酒。海上的佐渡岛还留有古老的金矿。')),
  p(16, 'toyama', '🏔️', 'とやまけん', '富山県', 'chubu', 'とやまし', '富山市', n('Toyama', '富山县'), tr(
    'The Northern Alps rise straight behind the sea here. The Tateyama Kurobe Alpine Route passes between towering walls of snow in spring, and Toyama Bay glows with firefly squid.',
    'Ici, les Alpes du Nord s\'élèvent juste derrière la mer. La route alpine de Tateyama Kurobe passe au printemps entre d\'immenses murs de neige, et la baie de Toyama brille de calmars lucioles.',
    'Aquí los Alpes del Norte se alzan justo detrás del mar. La ruta alpina Tateyama Kurobe pasa en primavera entre altísimas paredes de nieve, y la bahía de Toyama brilla con calamares luciérnaga.',
    '北阿尔卑斯山紧贴海岸拔地而起。春天，立山黑部阿尔卑斯路线穿行在高耸的雪墙之间，富山湾还有会发光的萤火鱿。')),
  p(17, 'ishikawa', '✨', 'いしかわけん', '石川県', 'chubu', 'かなざわし', '金沢市', n('Ishikawa', '石川县'), tr(
    'Kanazawa is known for Kenrokuen garden, old samurai and geisha districts, and delicate gold leaf. The Noto Peninsula reaches into the Sea of Japan and is the home of Wajima lacquerware.',
    'Kanazawa est connue pour le jardin Kenrokuen, ses vieux quartiers de samouraïs et de geishas et ses fines feuilles d\'or. La péninsule de Noto s\'avance dans la mer du Japon et abrite la laque de Wajima.',
    'Kanazawa es conocida por el jardín Kenrokuen, sus antiguos barrios de samuráis y geishas y su delicado pan de oro. La península de Noto se adentra en el mar de Japón y es la cuna de la laca de Wajima.',
    '金泽以兼六园、古老的武士和艺伎街区以及精致的金箔闻名。能登半岛伸入日本海，是轮岛漆器的产地。')),
  p(18, 'fukui', '🦕', 'ふくいけん', '福井県', 'chubu', 'ふくいし', '福井市', n('Fukui', '福井县'), tr(
    'Japan\'s dinosaur country, with a big museum in Katsuyama built around local fossils. Sabae makes most of the country\'s eyeglass frames, and winter brings prized Echizen crab.',
    'Le pays des dinosaures au Japon, avec un grand musée à Katsuyama autour de fossiles locaux. Sabae fabrique la plupart des montures de lunettes du pays, et l\'hiver apporte le précieux crabe d\'Echizen.',
    'El país de los dinosaurios de Japón, con un gran museo en Katsuyama dedicado a los fósiles locales. Sabae fabrica la mayoría de las monturas de gafas del país, y el invierno trae el apreciado cangrejo de Echizen.',
    '日本的恐龙之乡，胜山有一座围绕本地化石建成的大型博物馆。鲭江生产了日本大部分的眼镜架，冬天还有珍贵的越前蟹。')),
  p(19, 'yamanashi', '🍇', 'やまなしけん', '山梨県', 'chubu', 'こうふし', '甲府市', n('Yamanashi', '山梨县'), tr(
    'The Fuji Five Lakes spread along the north side of Mt. Fuji. The Kofu basin is full of grape and peach orchards and is the heart of Japanese wine.',
    'Les cinq lacs du Fuji s\'étendent sur le versant nord du mont Fuji. Le bassin de Kofu regorge de vignes et de pêchers, et c\'est le cœur du vin japonais.',
    'Los Cinco Lagos del Fuji se extienden por la ladera norte del monte Fuji. La cuenca de Kofu está llena de viñas y melocotoneros y es el corazón del vino japonés.',
    '富士五湖分布在富士山北麓。甲府盆地遍布葡萄园和桃园，是日本葡萄酒的中心。')),
  p(20, 'nagano', '🐒', 'ながのけん', '長野県', 'chubu', 'ながのし', '長野市', n('Nagano', '长野县'), tr(
    'A high, landlocked prefecture in the Japanese Alps that hosted the 1998 Winter Olympics. Visit black Matsumoto Castle, the old temple of Zenko-ji, and the monkeys that bathe in hot springs.',
    'Une haute préfecture sans mer, au cœur des Alpes japonaises, hôte des Jeux olympiques d\'hiver de 1998. On y visite le château noir de Matsumoto, le vieux temple Zenko-ji et les singes qui se baignent dans les sources chaudes.',
    'Una alta prefectura sin mar, en los Alpes japoneses, sede de los Juegos Olímpicos de Invierno de 1998. Se puede visitar el castillo negro de Matsumoto, el antiguo templo Zenko-ji y los monos que se bañan en aguas termales.',
    '位于日本阿尔卑斯山区的内陆县，曾举办1998年冬季奥运会。这里有黑色的松本城、古老的善光寺和泡温泉的猴子。')),
  p(21, 'gifu', '🏡', 'ぎふけん', '岐阜県', 'chubu', 'ぎふし', '岐阜市', n('Gifu', '岐阜县'), tr(
    'The steep thatched farmhouses of Shirakawa-go are a World Heritage site, and Takayama keeps a beautifully preserved old town. On the Nagara River, fishers still work with cormorants.',
    'Les fermes aux toits de chaume pentus de Shirakawa-go sont classées au patrimoine mondial, et Takayama conserve une belle vieille ville. Sur la rivière Nagara, on pêche encore avec des cormorans.',
    'Las granjas de empinados techos de paja de Shirakawa-go son Patrimonio Mundial, y Takayama conserva un bello casco antiguo. En el río Nagara todavía se pesca con cormoranes.',
    '白川乡陡峭的茅草屋是世界遗产，高山保存着美丽的老街。在长良川上，渔夫至今仍用鸬鹚捕鱼。')),
  p(22, 'shizuoka', '🍵', 'しずおかけん', '静岡県', 'chubu', 'しずおかし', '静岡市', n('Shizuoka', '静冈县'), tr(
    'Rolling green tea fields with Mt. Fuji behind them are the classic image of this Pacific prefecture. It also offers fresh wasabi and the hot springs of the Izu Peninsula.',
    'Des champs de thé vert ondulants devant le mont Fuji : voilà l\'image classique de cette préfecture du Pacifique. Elle offre aussi du wasabi frais et les sources chaudes de la péninsule d\'Izu.',
    'Campos ondulantes de té verde con el monte Fuji detrás son la imagen clásica de esta prefectura del Pacífico. También ofrece wasabi fresco y las aguas termales de la península de Izu.',
    '起伏的绿茶田与背后的富士山，是这个太平洋沿岸县的经典画面。这里还有新鲜山葵和伊豆半岛的温泉。')),
  p(23, 'aichi', '🚗', 'あいちけん', '愛知県', 'chubu', 'なごやし', '名古屋市', n('Aichi', '爱知县'), tr(
    'The heart of Japan\'s car industry, home of Toyota. Its capital Nagoya has a golden-roofed castle and rich food flavoured with dark red miso.',
    'Le cœur de l\'industrie automobile japonaise, berceau de Toyota. Sa capitale Nagoya possède un château aux ornements dorés et une cuisine riche au miso rouge foncé.',
    'El corazón de la industria automovilística japonesa, cuna de Toyota. Su capital, Nagoya, tiene un castillo con adornos dorados y una cocina intensa con miso rojo oscuro.',
    '日本汽车工业的中心，丰田的故乡。首府名古屋有金鯱装饰的城堡，美食则以深红色的味噌著称。')),
  p(24, 'mie', '🦪', 'みえけん', '三重県', 'kansai', 'つし', '津市', n('Mie', '三重县'), tr(
    'The Ise Grand Shrine is among the most sacred places in Shinto. Cultured pearls were pioneered around Ise-Shima, Matsusaka beef is a luxury, and Suzuka hosts Formula 1.',
    'Le grand sanctuaire d\'Ise est l\'un des lieux les plus sacrés du shinto. La perle de culture est née dans la région d\'Ise-Shima, le bœuf de Matsusaka est un luxe, et Suzuka accueille la Formule 1.',
    'El Gran Santuario de Ise es uno de los lugares más sagrados del sintoísmo. Las perlas cultivadas nacieron en la zona de Ise-Shima, la carne de Matsusaka es un lujo y Suzuka acoge la Fórmula 1.',
    '伊势神宫是神道教最神圣的地方之一。伊势志摩一带开创了人工养殖珍珠，松阪牛十分名贵，铃鹿还举办一级方程式赛车。')),
  p(25, 'shiga', '🛶', 'しがけん', '滋賀県', 'kansai', 'おおつし', '大津市', n('Shiga', '滋贺县'), tr(
    'Lake Biwa, the largest lake in Japan, fills the middle of this prefecture and supplies water to the Kansai region. On its shore stands the original castle of Hikone.',
    'Le lac Biwa, le plus grand du Japon, occupe le centre de la préfecture et alimente le Kansai en eau. Sur sa rive se dresse le château d\'origine de Hikone.',
    'El lago Biwa, el mayor de Japón, ocupa el centro de la prefectura y abastece de agua a Kansai. En su orilla se alza el castillo original de Hikone.',
    '日本最大的湖泊琵琶湖位于县中央，为关西地区供水。湖畔矗立着保存至今的彦根城。')),
  p(26, 'kyoto', '🦊', 'きょうとふ', '京都府', 'kansai', 'きょうとし', '京都市', tr('Kyoto', 'Kyoto', 'Kioto', '京都府'), tr(
    'The imperial capital for more than a thousand years. Some two thousand temples and shrines remain, from the golden Kinkaku-ji to the red gates of Fushimi Inari, and the Gion festival fills July.',
    'La capitale impériale pendant plus de mille ans. Il reste environ deux mille temples et sanctuaires, du Kinkaku-ji doré aux portiques rouges de Fushimi Inari, et le festival de Gion anime tout le mois de juillet.',
    'La capital imperial durante más de mil años. Quedan unos dos mil templos y santuarios, desde el dorado Kinkaku-ji hasta las puertas rojas de Fushimi Inari, y el festival de Gion llena todo julio.',
    '一千多年间的皇都。这里留下了约两千座寺庙和神社，从金色的金阁寺到伏见稻荷的红色鸟居，七月还有祇园祭。')),
  p(27, 'osaka', '🐙', 'おおさかふ', '大阪府', 'kansai', 'おおさかし', '大阪市', n('Osaka', '大阪府'), tr(
    'A cheerful merchant city once called "the nation\'s kitchen", famous for takoyaki, okonomiyaki and comedy. Its castle and the neon lights of Dotonbori are favourite sights.',
    'Une joyeuse ville marchande autrefois surnommée « la cuisine du pays », célèbre pour ses takoyaki, ses okonomiyaki et son humour. Son château et les néons de Dotonbori sont très appréciés.',
    'Una alegre ciudad de comerciantes, antaño llamada «la cocina del país», famosa por el takoyaki, el okonomiyaki y la comedia. Su castillo y los neones de Dotonbori son muy queridos.',
    '开朗的商业城市，曾被称为“天下的厨房”，以章鱼烧、大阪烧和喜剧闻名。大阪城和道顿堀的霓虹灯都很受欢迎。')),
  p(28, 'hyogo', '🏯', 'ひょうごけん', '兵庫県', 'kansai', 'こうべし', '神戸市', n('Hyogo', '兵库县'), tr(
    'Stretching from the Sea of Japan to the Inland Sea, it holds the brilliant white Himeji Castle. Kobe is a stylish port known for its beef, and Arima is one of Japan\'s oldest hot spring towns.',
    'S\'étendant de la mer du Japon à la mer Intérieure, elle abrite le château blanc éclatant de Himeji. Kobe est un port élégant connu pour son bœuf, et Arima est l\'une des plus anciennes stations thermales du Japon.',
    'Se extiende del mar de Japón al mar Interior y alberga el brillante castillo blanco de Himeji. Kobe es un elegante puerto conocido por su carne, y Arima es uno de los pueblos termales más antiguos de Japón.',
    '从日本海一直延伸到濑户内海，拥有洁白耀眼的姬路城。神户是以牛肉闻名的时尚港口，有马则是日本最古老的温泉乡之一。')),
  p(29, 'nara', '🦌', 'ならけん', '奈良県', 'kansai', 'ならし', '奈良市', n('Nara', '奈良县'), tr(
    'Japan\'s capital in the 8th century. Friendly deer wander through Nara Park, close to the giant bronze Buddha of Todai-ji.',
    'La capitale du Japon au VIIIe siècle. Des cerfs familiers se promènent dans le parc de Nara, tout près du Bouddha de bronze géant du Todai-ji.',
    'La capital de Japón en el siglo VIII. Unos ciervos amistosos pasean por el parque de Nara, muy cerca del gigantesco Buda de bronce del Todai-ji.',
    '八世纪时的日本首都。温顺的鹿在奈良公园漫步，附近就是东大寺的巨大铜佛。')),
  p(30, 'wakayama', '🍊', 'わかやまけん', '和歌山県', 'kansai', 'わかやまし', '和歌山市', n('Wakayama', '和歌山县'), tr(
    'The pilgrim trails of Kumano Kodo and the temple town of Koyasan are sacred sites in the mountains. Its sunny slopes lead Japan in mandarins and ume plums.',
    'Les chemins de pèlerinage du Kumano Kodo et la ville-temple de Koyasan sont des lieux sacrés dans les montagnes. Ses pentes ensoleillées sont les premières du Japon pour les mandarines et les prunes ume.',
    'Las rutas de peregrinación del Kumano Kodo y el pueblo de templos de Koyasan son lugares sagrados en las montañas. Sus laderas soleadas lideran Japón en mandarinas y ciruelas ume.',
    '熊野古道的朝圣路和高野山的寺院小镇都是山中圣地。这里阳光充足的山坡出产的柑橘和青梅均为日本第一。')),
  p(31, 'tottori', '🐫', 'とっとりけん', '鳥取県', 'chugoku', 'とっとりし', '鳥取市', n('Tottori', '鸟取县'), tr(
    'The prefecture with the fewest people in Japan. The great Tottori Sand Dunes rise beside the Sea of Japan, and visitors can even ride a camel there.',
    'La préfecture la moins peuplée du Japon. Les grandes dunes de Tottori s\'élèvent au bord de la mer du Japon, et l\'on peut même y monter à dos de chameau.',
    'La prefectura con menos habitantes de Japón. Las grandes dunas de Tottori se alzan junto al mar de Japón, y allí se puede incluso montar en camello.',
    '日本人口最少的县。巨大的鸟取沙丘紧邻日本海，游客甚至可以在那里骑骆驼。')),
  p(32, 'shimane', '🎋', 'しまねけん', '島根県', 'chugoku', 'まつえし', '松江市', n('Shimane', '岛根县'), tr(
    'Izumo Taisha is one of Japan\'s oldest great shrines, where the gods are said to gather each autumn. The Iwami Ginzan silver mine is a World Heritage site, and Matsue has an original castle.',
    'Izumo Taisha est l\'un des plus anciens grands sanctuaires du Japon ; on dit que les dieux s\'y réunissent chaque automne. La mine d\'argent d\'Iwami Ginzan est classée au patrimoine mondial, et Matsue possède un château d\'origine.',
    'Izumo Taisha es uno de los grandes santuarios más antiguos de Japón, donde se dice que los dioses se reúnen cada otoño. La mina de plata de Iwami Ginzan es Patrimonio Mundial, y Matsue tiene un castillo original.',
    '出云大社是日本最古老的大神社之一，传说众神每年秋天在此聚会。石见银山是世界遗产，松江还有保存至今的天守。')),
  p(33, 'okayama', '🍑', 'おかやまけん', '岡山県', 'chugoku', 'おかやまし', '岡山市', n('Okayama', '冈山县'), tr(
    'The land of Momotaro, the peach boy of the folk tale, and of real white peaches and muscat grapes. Korakuen is one of Japan\'s three great gardens, and Kurashiki has a pretty canal quarter.',
    'Le pays de Momotaro, le garçon de la pêche du conte, et de véritables pêches blanches et raisins muscat. Le Korakuen est l\'un des trois grands jardins du Japon, et Kurashiki possède un joli quartier de canaux.',
    'La tierra de Momotaro, el niño melocotón del cuento, y de auténticos melocotones blancos y uvas moscatel. El Korakuen es uno de los tres grandes jardines de Japón, y Kurashiki tiene un bonito barrio de canales.',
    '民间故事“桃太郎”的故乡，也盛产白桃和麝香葡萄。后乐园是日本三大名园之一，仓敷有美丽的运河街区。')),
  p(34, 'hiroshima', '🕊️', 'ひろしまけん', '広島県', 'chugoku', 'ひろしまし', '広島市', n('Hiroshima', '广岛县'), tr(
    'Hiroshima\'s Peace Memorial Park remembers the atomic bombing of 1945 and calls for peace. Nearby Miyajima has the great torii gate that seems to float at high tide, and the region is known for oysters.',
    'Le parc du Mémorial de la paix d\'Hiroshima rappelle le bombardement atomique de 1945 et appelle à la paix. Non loin, Miyajima possède le grand torii qui semble flotter à marée haute, et la région est connue pour ses huîtres.',
    'El Parque Conmemorativo de la Paz de Hiroshima recuerda el bombardeo atómico de 1945 y llama a la paz. Cerca, Miyajima tiene el gran torii que parece flotar con la marea alta, y la zona es conocida por sus ostras.',
    '广岛和平纪念公园铭记1945年的原子弹轰炸，并呼吁和平。附近的宫岛有涨潮时仿佛漂浮在海上的大鸟居，这一带还以牡蛎闻名。')),
  p(35, 'yamaguchi', '🐡', 'やまぐちけん', '山口県', 'chugoku', 'やまぐちし', '山口市', n('Yamaguchi', '山口县'), tr(
    'At the western tip of Honshu. Iwakuni has the graceful arched Kintaikyo bridge, Shimonoseki is the capital of fugu pufferfish, and Akiyoshido is one of the largest caves in Japan.',
    'À la pointe ouest de Honshu. Iwakuni possède le gracieux pont en arches Kintaikyo, Shimonoseki est la capitale du fugu, et Akiyoshido est l\'une des plus grandes grottes du Japon.',
    'En el extremo oeste de Honshu. Iwakuni tiene el grácil puente de arcos Kintaikyo, Shimonoseki es la capital del pez globo fugu y Akiyoshido es una de las mayores cuevas de Japón.',
    '位于本州最西端。岩国有优美的拱桥锦带桥，下关是河豚之都，秋芳洞则是日本最大的洞穴之一。')),
  p(36, 'tokushima', '💃', 'とくしまけん', '徳島県', 'shikoku', 'とくしまし', '徳島市', n('Tokushima', '德岛县'), tr(
    'Each August the streets fill with the Awa Odori dance. The tide makes huge whirlpools in the Naruto Strait, and local craftspeople have a long tradition of indigo dyeing.',
    'Chaque août, les rues s\'emplissent de la danse Awa Odori. La marée crée d\'énormes tourbillons dans le détroit de Naruto, et les artisans locaux ont une longue tradition de teinture à l\'indigo.',
    'Cada agosto las calles se llenan con la danza Awa Odori. La marea forma enormes remolinos en el estrecho de Naruto, y los artesanos locales tienen una larga tradición de teñido con índigo.',
    '每年八月，街道上都跳起阿波舞。潮水在鸣门海峡形成巨大的漩涡，当地工匠还有悠久的蓝染传统。')),
  p(37, 'kagawa', '🍜', 'かがわけん', '香川県', 'shikoku', 'たかまつし', '高松市', n('Kagawa', '香川县'), tr(
    'The smallest prefecture by area, and proud to call itself the udon prefecture thanks to chewy Sanuki noodles. The art islands of the Seto Inland Sea, such as Naoshima, are nearby.',
    'La plus petite préfecture par la superficie, fière de se dire « préfecture des udon » grâce aux nouilles élastiques de Sanuki. Les îles d\'art de la mer Intérieure, comme Naoshima, sont toutes proches.',
    'La prefectura más pequeña en superficie, orgullosa de llamarse «prefectura del udon» gracias a los elásticos fideos de Sanuki. Las islas de arte del mar Interior, como Naoshima, están muy cerca.',
    '面积最小的县，凭借筋道的赞岐乌冬面自豪地自称“乌冬县”。附近还有濑户内海的艺术岛屿，比如直岛。')),
  p(38, 'ehime', '🛁', 'えひめけん', '愛媛県', 'shikoku', 'まつやまし', '松山市', n('Ehime', '爱媛县'), tr(
    'Matsuyama\'s Dogo Onsen is one of Japan\'s oldest hot springs, with a wonderful old bathhouse. The hillsides are covered with citrus groves, and the Shimanami Kaido cycling road starts here.',
    'Le Dogo Onsen de Matsuyama est l\'une des plus anciennes sources chaudes du Japon, avec un superbe vieux bain public. Les collines sont couvertes d\'agrumes, et la route cyclable Shimanami Kaido arrive ici.',
    'El Dogo Onsen de Matsuyama es una de las aguas termales más antiguas de Japón, con una preciosa casa de baños antigua. Las colinas están cubiertas de cítricos, y la ruta ciclista Shimanami Kaido llega hasta aquí.',
    '松山的道后温泉是日本最古老的温泉之一，还有一座精美的老浴场。山坡上种满柑橘，岛波海道自行车道也通到这里。')),
  p(39, 'kochi', '🐟', 'こうちけん', '高知県', 'shikoku', 'こうちし', '高知市', n('Kochi', '高知县'), tr(
    'Facing the open Pacific, it is known for bonito seared over straw flames, the Yosakoi dance festival and the hero Sakamoto Ryoma. The Shimanto River is often called Japan\'s last clear river.',
    'Face au grand Pacifique, elle est connue pour la bonite saisie sur des flammes de paille, le festival de danse Yosakoi et le héros Sakamoto Ryoma. La Shimanto est souvent appelée la dernière rivière limpide du Japon.',
    'Frente al Pacífico abierto, es conocida por el bonito sellado con llamas de paja, el festival de danza Yosakoi y el héroe Sakamoto Ryoma. Al río Shimanto se le suele llamar el último río cristalino de Japón.',
    '面朝辽阔的太平洋，以稻草火炙烤的鲣鱼、夜来祭和英雄坂本龙马闻名。清澈的四万十川被称为“日本最后的清流”。')),
  p(40, 'fukuoka', '🍥', 'ふくおかけん', '福岡県', 'kyushu', 'ふくおかし', '福岡市', n('Fukuoka', '福冈县'), tr(
    'The gateway to Kyushu, home of rich Hakata tonkotsu ramen and cosy yatai street stalls at night. Dazaifu Tenmangu shrine draws students praying for good exam results.',
    'La porte du Kyushu, berceau du riche ramen tonkotsu de Hakata et des petits stands de rue yatai le soir. Le sanctuaire Dazaifu Tenmangu attire les élèves qui prient pour réussir leurs examens.',
    'La puerta de Kyushu, cuna del intenso ramen tonkotsu de Hakata y de los acogedores puestos callejeros yatai por la noche. El santuario Dazaifu Tenmangu atrae a estudiantes que rezan por aprobar sus exámenes.',
    '九州的门户，是浓郁的博多豚骨拉面和夜间温馨路边摊的故乡。太宰府天满宫吸引着祈求考试顺利的学生。')),
  p(41, 'saga', '🎈', 'さがけん', '佐賀県', 'kyushu', 'さがし', '佐賀市', n('Saga', '佐贺县'), tr(
    'Arita and Imari gave Japan its first porcelain over 400 years ago. Each autumn, colourful hot air balloons fill the sky over Saga for an international balloon fiesta.',
    'Arita et Imari ont donné au Japon sa première porcelaine il y a plus de 400 ans. Chaque automne, des montgolfières colorées emplissent le ciel de Saga pour une fête internationale.',
    'Arita e Imari dieron a Japón su primera porcelana hace más de 400 años. Cada otoño, coloridos globos aerostáticos llenan el cielo de Saga en una fiesta internacional.',
    '四百多年前，有田和伊万里烧出了日本最早的瓷器。每年秋天，五彩的热气球布满佐贺的天空，这就是国际热气球节。')),
  p(42, 'nagasaki', '⛪', 'ながさきけん', '長崎県', 'kyushu', 'ながさきし', '長崎市', n('Nagasaki', '长崎县'), tr(
    'For centuries it was Japan\'s window to the outside world through the Dutch trading post of Dejima. Its Peace Park remembers the atomic bombing of 1945, and castella sponge cake is a sweet local legacy.',
    'Pendant des siècles, ce fut la fenêtre du Japon sur le monde, grâce au comptoir hollandais de Dejima. Son parc de la Paix rappelle le bombardement atomique de 1945, et le gâteau castella est un doux héritage local.',
    'Durante siglos fue la ventana de Japón al mundo gracias al puesto comercial holandés de Dejima. Su Parque de la Paz recuerda el bombardeo atómico de 1945, y el bizcocho castella es un dulce legado local.',
    '几个世纪以来，这里通过荷兰商馆出岛成为日本面向世界的窗口。和平公园铭记1945年的原子弹轰炸，长崎蛋糕则是甜美的本地遗产。')),
  p(43, 'kumamoto', '🌋', 'くまもとけん', '熊本県', 'kyushu', 'くまもとし', '熊本市', n('Kumamoto', '熊本县'), tr(
    'Mt. Aso has one of the world\'s largest calderas, with green grassland inside. Kumamoto Castle is a mighty fortress, and the black bear mascot Kumamon is loved all over Japan.',
    'Le mont Aso possède l\'une des plus grandes caldeiras du monde, avec des prairies vertes à l\'intérieur. Le château de Kumamoto est une puissante forteresse, et l\'ours noir Kumamon est adoré dans tout le Japon.',
    'El monte Aso tiene una de las mayores calderas del mundo, con verdes praderas en su interior. El castillo de Kumamoto es una poderosa fortaleza, y la mascota Kumamon, un oso negro, es querida en todo Japón.',
    '阿苏山拥有世界最大的破火山口之一，里面是绿色的草原。熊本城是一座雄伟的要塞，黑熊吉祥物熊本熊深受全日本喜爱。')),
  p(44, 'oita', '♨️', 'おおいたけん', '大分県', 'kyushu', 'おおいたし', '大分市', n('Oita', '大分县'), tr(
    'It proudly calls itself the hot spring prefecture, with more springs than anywhere else in Japan. Beppu has steaming "hells" of coloured water, and Yufuin is a calm resort below Mt. Yufu.',
    'Elle se dit fièrement la préfecture des sources chaudes, avec plus de sources que partout ailleurs au Japon. Beppu possède ses « enfers » d\'eaux colorées et fumantes, et Yufuin est une station paisible au pied du mont Yufu.',
    'Se llama con orgullo la prefectura de las aguas termales, pues tiene más fuentes que ningún otro lugar de Japón. Beppu tiene sus humeantes «infiernos» de aguas de colores, y Yufuin es un tranquilo balneario al pie del monte Yufu.',
    '自豪地自称“温泉县”，温泉数量居日本之首。别府有冒着热气的彩色“地狱”温泉，由布院则是由布岳脚下宁静的度假地。')),
  p(45, 'miyazaki', '🥭', 'みやざきけん', '宮崎県', 'kyushu', 'みやざきし', '宮崎市', n('Miyazaki', '宫崎县'), tr(
    'Warm and sunny, with surf beaches and palm-lined roads along the Pacific. Takachiho\'s deep gorge is tied to old myths of the gods, and its ripe mangoes are famous gifts.',
    'Chaude et ensoleillée, avec des plages de surf et des routes bordées de palmiers le long du Pacifique. Les gorges profondes de Takachiho sont liées aux vieux mythes des dieux, et ses mangues mûres sont des cadeaux réputés.',
    'Cálida y soleada, con playas de surf y carreteras con palmeras junto al Pacífico. El profundo desfiladero de Takachiho está ligado a antiguos mitos de los dioses, y sus mangos maduros son regalos famosos.',
    '温暖晴朗，太平洋沿岸有冲浪海滩和棕榈大道。高千穗的深峡谷与古老的神话相连，熟透的芒果则是有名的礼品。')),
  p(46, 'kagoshima', '🌋', 'かごしまけん', '鹿児島県', 'kyushu', 'かごしまし', '鹿児島市', n('Kagoshima', '鹿儿岛县'), tr(
    'The active volcano Sakurajima smokes just across the bay from the city. To the south, Yakushima is a World Heritage island of ancient cedars, and sweet potatoes are a local speciality.',
    'Le volcan actif Sakurajima fume juste en face de la ville, de l\'autre côté de la baie. Au sud, Yakushima est une île du patrimoine mondial aux cèdres millénaires, et la patate douce est une spécialité locale.',
    'El volcán activo Sakurajima humea justo al otro lado de la bahía. Al sur, Yakushima es una isla Patrimonio Mundial de cedros milenarios, y el boniato es una especialidad local.',
    '活火山樱岛就在海湾对面冒着烟。南方的屋久岛是世界遗产，生长着古老的杉树，红薯则是当地特产。')),
  p(47, 'okinawa', '🌺', 'おきなわけん', '沖縄県', 'kyushu', 'なはし', '那覇市', n('Okinawa', '冲绳县'), tr(
    'A chain of subtropical islands that was once the independent Ryukyu Kingdom, with its own language, music and food. People come for coral seas and beaches, and for Shuri Castle, the symbol of the old kingdom.',
    'Un chapelet d\'îles subtropicales, autrefois le royaume indépendant des Ryukyu, avec sa langue, sa musique et sa cuisine. On y vient pour les mers de corail, les plages et le château de Shuri, symbole de l\'ancien royaume.',
    'Una cadena de islas subtropicales que fue el reino independiente de Ryukyu, con su propia lengua, música y comida. La gente viene por sus mares de coral, sus playas y el castillo de Shuri, símbolo del antiguo reino.',
    '一串亚热带岛屿，曾是独立的琉球王国，有自己的语言、音乐和饮食。人们来这里欣赏珊瑚海和沙滩，还有古老王国的象征首里城。')),
];

export const prefectureById = (id: string) => PREFECTURES.find((x) => x.id === id);
