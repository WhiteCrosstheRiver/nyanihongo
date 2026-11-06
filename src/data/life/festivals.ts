import { line, link, section, tr, type LifeTopic } from './types';

export const FESTIVALS: LifeTopic = {
  id: 'festivals',
  emoji: '🎆',
  jp: 'まつり',
  title: tr('Festivals', 'Festivals', 'Festivales', '节日祭典'),
  intro: tr(
    'The Japanese year turns from one celebration to the next: bells at midnight, beans thrown at demons, picnics under cherry trees, drums on hot summer nights. Walk through the calendar with us, taste the street food, and learn how to greet the gods politely.',
    'L’année japonaise passe d’une fête à l’autre : cloches à minuit, graines de soja lancées aux démons, pique-niques sous les cerisiers, tambours dans les chaudes nuits d’été. Parcourons le calendrier ensemble, goûtons la cuisine des stands et apprenons à saluer poliment les divinités.',
    'El año japonés pasa de una celebración a otra: campanas a medianoche, soja lanzada a los demonios, picnics bajo los cerezos, tambores en las calurosas noches de verano. Recorre el calendario con nosotros, prueba la comida de los puestos y aprende a saludar con respeto a los dioses.',
    '日本的一年就在一个又一个节日中流转：午夜的钟声、撒向恶鬼的豆子、樱花树下的野餐、炎炎夏夜的鼓声。跟我们一起走过这本日历，尝尝摊位小吃，再学学怎样礼貌地参拜神明吧。',
  ),
  sections: [
    section(
      '🎍',
      tr('New Year: the quiet heart of the calendar', 'Le Nouvel An : le cœur paisible du calendrier', 'Año Nuevo: el corazón tranquilo del calendario', '新年：一年中最安静的时刻'),
      tr(
        'Shops grow quiet, pine decorations stand at front doors, and families gather at home. On 31 December people eat long toshikoshi soba for a long life, and near midnight temple bells ring 108 times in joya no kane, one strike for each worldly desire. Many people then visit a shrine or temple in the first days of January for hatsumode, queuing in the cold breath of the crowd to make a first prayer. At home, lacquer boxes of osechi hold beautifully arranged dishes, each with its own wish for the year. Children receive otoshidama, money in tiny decorated envelopes, and the post brings a stack of nengajo greeting cards, though fewer people send them now.',
        'Les boutiques se taisent, des décorations de pin se dressent devant les portes et les familles se retrouvent à la maison. Le 31 décembre, on mange de longues toshikoshi soba pour une longue vie, et vers minuit les cloches des temples sonnent 108 fois lors du joya no kane, un coup pour chaque désir terrestre. Beaucoup se rendent ensuite dans un sanctuaire ou un temple pendant les premiers jours de janvier pour le hatsumode, patientant dans le froid pour leur première prière de l’année. À la maison, des boîtes laquées d’osechi renferment des mets joliment disposés, chacun porteur d’un vœu. Les enfants reçoivent l’otoshidama, de l’argent dans de minuscules enveloppes décorées, et le facteur apporte une pile de cartes de vœux nengajo, même si on en envoie moins aujourd’hui.',
        'Las tiendas se quedan en silencio, los adornos de pino aparecen en las puertas y las familias se reúnen en casa. El 31 de diciembre se comen largos toshikoshi soba para tener una vida larga, y cerca de medianoche las campanas de los templos suenan 108 veces en el joya no kane, una por cada deseo mundano. Después, mucha gente va a un santuario o templo en los primeros días de enero para el hatsumode, haciendo cola en el frío para rezar por primera vez en el año. En casa, las cajas lacadas de osechi guardan platos bellamente dispuestos, cada uno con su deseo para el año. Los niños reciben otoshidama, dinero en sobres diminutos y decorados, y el correo trae un montón de postales nengajo, aunque hoy se envían menos.',
        '商店安静下来，门前摆上松枝装饰，一家人团聚在家中。十二月三十一日，人们吃细长的“跨年荞麦面”，祈求长寿；临近午夜，寺庙敲响一百零八下“除夕钟声”，每一下对应一种人间烦恼。接着，很多人在一月初前往神社或寺庙“初诣”，在寒风里排队做新年第一次祈祷。家里的漆盒中盛着摆放精美的“御节料理”，每道菜都寄托着一个新年愿望。孩子们能收到装在小巧红包里的压岁钱，邮差也会送来一叠贺年卡，不过如今寄贺年卡的人少了一些。',
      ),
    ),
    section(
      '👹',
      tr('Setsubun and Hinamatsuri', 'Setsubun et Hinamatsuri', 'Setsubun y Hinamatsuri', '节分与女儿节'),
      tr(
        'Around 3 February, the day before spring on the old calendar, a parent in a paper demon mask becomes the target of a shower of roasted soybeans. Children shout oni wa soto, fuku wa uchi: demons out, good luck in. Then everyone eats one bean for each year of their age, and many families also bite into a whole ehomaki sushi roll, facing the year’s lucky direction in silence. A month later, on 3 March, Hinamatsuri celebrates the health and happiness of girls. Families set out dolls of the emperor and empress with their court on tiers covered in red cloth, serve pretty pastel rice crackers and sweet white drinks, and put the dolls away soon afterwards. An old saying warns that leaving them out could delay a daughter’s marriage.',
        'Vers le 3 février, veille du printemps selon l’ancien calendrier, un parent coiffé d’un masque de démon en papier devient la cible d’une pluie de soja grillé. Les enfants crient oni wa soto, fuku wa uchi : les démons dehors, le bonheur dedans ! Chacun mange ensuite une graine par année de son âge, et beaucoup de familles croquent aussi un rouleau de sushi ehomaki entier, en silence, tourné vers la direction porte-bonheur de l’année. Un mois plus tard, le 3 mars, Hinamatsuri célèbre la santé et le bonheur des filles. Les familles installent sur des gradins recouverts de tissu rouge les poupées de l’empereur, de l’impératrice et de leur cour, servent de jolis biscuits de riz pastel et des boissons blanches sucrées, puis rangent vite les poupées : un vieux dicton dit qu’en les laissant trop longtemps, on retarderait le mariage de sa fille.',
        'Hacia el 3 de febrero, la víspera de la primavera según el antiguo calendario, un padre o una madre con máscara de demonio de papel recibe una lluvia de soja tostada. Los niños gritan oni wa soto, fuku wa uchi: ¡demonios fuera, suerte dentro! Después, cada uno come un grano por cada año de edad, y muchas familias muerden además un rollo de sushi ehomaki entero, en silencio y mirando hacia la dirección afortunada del año. Un mes más tarde, el 3 de marzo, Hinamatsuri celebra la salud y la felicidad de las niñas. Las familias colocan en gradas cubiertas de tela roja las muñecas del emperador, la emperatriz y su corte, sirven galletitas de arroz de colores suaves y bebidas dulces blancas, y guardan las muñecas pronto: un viejo dicho advierte que dejarlas fuera podría retrasar la boda de la hija.',
        '二月三日前后，也就是旧历立春的前一天，戴着纸鬼面具的爸爸或妈妈成了烤黄豆“攻击”的目标。孩子们一边撒豆一边喊“鬼出去，福进来”。然后每人吃下与年龄同样多的豆子，很多家庭还会朝着当年的吉利方位，默默地咬下一整条“惠方卷”。一个月后的三月三日是女儿节，祝福女孩健康幸福。人们在铺着红布的阶梯台上摆好天皇、皇后及其宫廷人偶，端上粉嫩的米果和白色甜饮，过后很快就把人偶收起来：老话说，摆得太久会耽误女儿出嫁。',
      ),
    ),
    section(
      '🌸',
      tr('Hanami and Golden Week', 'Hanami et Golden Week', 'Hanami y Golden Week', '赏樱与黄金周'),
      tr(
        'Weather reports follow the cherry blossom front as it travels north, from late March in Tokyo to early May in Hokkaido. A junior office worker may be sent out at dawn to spread a blue sheet under a good tree, and by afternoon the park smells of grilled food and everyone sits shoes off on the tarp, sharing snacks and cans of beer beneath a pale pink ceiling. At night, paper lanterns light the branches for yozakura. The blossoms last only a week or so, and a little of the pleasure lies in knowing that. Soon after comes Golden Week, a cluster of holidays between 29 April and 5 May. Trains and motorways fill up as people go travelling, while carp streamers fly above rooftops for Children’s Day on 5 May.',
        'La météo suit le front des cerisiers qui remonte vers le nord, de fin mars à Tokyo jusqu’au début mai à Hokkaido. Un jeune employé est parfois envoyé à l’aube pour étendre une bâche bleue sous un bel arbre, et l’après-midi, le parc sent les grillades : chacun s’assoit sans chaussures sur la bâche et partage en-cas et canettes de bière sous un plafond rose pâle. Le soir, des lanternes en papier éclairent les branches pour le yozakura. Les fleurs ne durent qu’une semaine environ, et le plaisir tient un peu à cela. Peu après arrive la Golden Week, un groupe de jours fériés entre le 29 avril et le 5 mai. Trains et autoroutes se remplissent, tandis que des carpes en tissu flottent au-dessus des toits pour la fête des Enfants du 5 mai.',
        'Los informes del tiempo siguen el frente de los cerezos en su viaje al norte, desde finales de marzo en Tokio hasta principios de mayo en Hokkaido. A veces mandan a un empleado joven al amanecer a extender una lona azul bajo un buen árbol, y por la tarde el parque huele a comida a la parrilla: todos se sientan sin zapatos sobre la lona y comparten aperitivos y latas de cerveza bajo un techo rosa pálido. Por la noche, los farolillos de papel iluminan las ramas para el yozakura. Las flores duran apenas una semana, y parte del placer está en saberlo. Poco después llega la Golden Week, un grupo de festivos entre el 29 de abril y el 5 de mayo. Trenes y autopistas se llenan de viajeros, mientras las carpas de tela ondean sobre los tejados por el Día de los Niños, el 5 de mayo.',
        '天气预报每天追踪着“樱花前线”一路北上，从东京的三月下旬直到北海道的五月初。公司的新人可能天一亮就被派去，在好位置的树下铺开蓝色防水布；到了下午，公园里飘着烧烤的香味，大家脱了鞋坐在布上，在淡粉色的“天花板”下分享零食和罐装啤酒。入夜后，纸灯笼照亮枝头，这就是“夜樱”。花期只有一周左右，这份短暂也正是乐趣的一部分。不久后便迎来黄金周，四月二十九日到五月五日之间集中了好几个假日。电车和高速公路上挤满出游的人，屋顶上空则飘起鲤鱼旗，迎接五月五日的儿童节。',
      ),
    ),
    section(
      '🎋',
      tr('Tanabata and Obon', 'Tanabata et Obon', 'Tanabata y Obon', '七夕与盂兰盆节'),
      tr(
        'The star festival of Tanabata, usually on 7 July, recalls two lovers, Orihime and Hikoboshi, who may meet only once a year across the Milky Way. Children write wishes on narrow paper strips called tanzaku and tie them to bamboo at school, in shopping streets and even at station entrances. Sendai holds its huge version from 6 to 8 August, with paper streamers filling the arcades. Mid-August, or July in some areas, brings Obon, when the spirits of ancestors are believed to return home. Families travel back to their home towns, clean the graves and leave offerings. Small fires welcome the spirits and see them off again, and in Kyoto, great fires on the mountainsides do the same on 16 August. In the evening, neighbours gather round a lantern-hung stage for Bon dancing, and visitors are usually welcome to join the circle.',
        'Tanabata, la fête des étoiles, généralement le 7 juillet, évoque deux amants, Orihime et Hikoboshi, qui ne peuvent se retrouver qu’une fois par an par-delà la Voie lactée. Les enfants écrivent leurs vœux sur de fines bandes de papier appelées tanzaku et les attachent à des bambous à l’école, dans les rues commerçantes et même à l’entrée des gares. Sendai organise sa version géante du 6 au 8 août, avec des banderoles de papier dans toutes les galeries. La mi-août, ou juillet dans certaines régions, amène Obon, lorsque les esprits des ancêtres sont censés revenir à la maison. Les familles rentrent au pays, nettoient les tombes et déposent des offrandes. De petits feux accueillent puis raccompagnent les esprits, et à Kyoto, de grands feux sur les montagnes font de même le 16 août. Le soir, les voisins se réunissent autour d’une estrade ornée de lanternes pour danser le Bon, et les visiteurs sont en général invités à rejoindre le cercle.',
        'Tanabata, la fiesta de las estrellas, suele celebrarse el 7 de julio y recuerda a dos enamorados, Orihime y Hikoboshi, que solo pueden verse una vez al año a través de la Vía Láctea. Los niños escriben deseos en tiras de papel llamadas tanzaku y las atan a bambúes en la escuela, en las calles comerciales e incluso en las estaciones. Sendai celebra su enorme versión del 6 al 8 de agosto, con serpentinas de papel que llenan las galerías. A mediados de agosto, o en julio en algunas zonas, llega Obon, cuando se cree que los espíritus de los antepasados vuelven a casa. Las familias viajan a su pueblo, limpian las tumbas y dejan ofrendas. Pequeñas hogueras reciben y despiden a los espíritus, y en Kioto grandes fuegos en las montañas hacen lo mismo el 16 de agosto. Por la noche, los vecinos se reúnen alrededor de un escenario con farolillos para bailar el Bon, y los visitantes suelen ser bienvenidos en el círculo.',
        '七夕是星星的节日，通常在七月七日，讲述织女和牛郎这对恋人一年只能隔着银河相会一次。孩子们把愿望写在名为“短册”的细长纸条上，系在竹枝上，学校、商店街甚至车站入口都能看到。仙台则在八月六日至八日举办盛大的七夕祭，纸彩带挂满了拱廊。八月中旬（部分地区在七月）是盂兰盆节，人们相信祖先的灵魂会在此时回家。大家返回故乡，打扫墓地，供上祭品。小小的火堆迎接并送别先人，京都在八月十六日还会在山上点燃巨大的“五山送火”，同样是为了送别先人。傍晚，邻里们围着挂满灯笼的高台跳起盆舞，游客通常也可以加入这个圈子。',
      ),
    ),
    section(
      '🎇',
      tr('Summer fireworks', 'Les feux d’artifice d’été', 'Fuegos artificiales de verano', '夏日烟花'),
      tr(
        'Almost every town has a hanabi taikai on some summer evening, usually by a river or the sea. People arrive hours early with picnic sheets, cold drinks and paper fans, many of them in yukata. Then the first shell climbs with a thin whistle, opens in a huge chrysanthemum, and the boom arrives a moment later in your chest. Tokyo’s Sumida River display, usually on the last Saturday of July, carries on a tradition with roots in the Edo period. Nagaoka in Niigata is known for its enormous shells in early August, and Omagari in Akita hosts a national contest of fireworks makers in late summer. Afterwards comes the other tradition: the long, patient shuffle to the station with thousands of others.',
        'Presque chaque ville a son hanabi taikai un soir d’été, en général au bord d’une rivière ou de la mer. On arrive des heures à l’avance avec bâches, boissons fraîches et éventails, beaucoup en yukata. Puis le premier obus monte avec un mince sifflement, s’ouvre en immense chrysanthème, et le grondement arrive un instant plus tard dans la poitrine. Le spectacle de la rivière Sumida à Tokyo, généralement le dernier samedi de juillet, prolonge une tradition née à l’époque d’Edo. Nagaoka, dans le Niigata, est connue pour ses énormes obus début août, et Omagari, dans l’Akita, accueille à la fin de l’été un concours national d’artificiers. Vient ensuite l’autre tradition : le long et patient piétinement vers la gare, avec des milliers d’autres.',
        'Casi todas las ciudades tienen su hanabi taikai alguna tarde de verano, normalmente junto a un río o al mar. La gente llega horas antes con lonas, bebidas frías y abanicos de papel, y muchos van en yukata. Entonces el primer cohete sube con un silbido fino, se abre en un enorme crisantemo y el estruendo te llega al pecho un instante después. El espectáculo del río Sumida, en Tokio, normalmente el último sábado de julio, continúa una tradición con raíces en la época Edo. Nagaoka, en Niigata, es famosa por sus enormes cohetes a principios de agosto, y Omagari, en Akita, acoge a finales del verano un concurso nacional de pirotécnicos. Después llega la otra tradición: la larga y paciente caminata hacia la estación entre miles de personas.',
        '几乎每座城市都会在夏天的某个夜晚举办“花火大会”，地点通常在河边或海边。人们提前几个小时带着野餐垫、冷饮和团扇前来，不少人穿着浴衣。第一发烟花带着细细的哨音升空，绽放成一朵巨大的菊花，片刻之后，轰鸣声才震到你的胸口。东京隅田川烟花大会通常在七月最后一个星期六举行，传统可以追溯到江户时代。新潟县长冈以八月初的超大型烟花闻名，秋田县大曲则在夏末举办全国烟花师大赛。散场后还有另一项“传统”：和成千上万的人一起，耐心地慢慢挪向车站。',
      ),
    ),
    section(
      '🏮',
      tr('Famous matsuri', 'Les grands matsuri', 'Los matsuri más famosos', '著名祭典'),
      tr(
        'Each festival belongs to its own town, and locals train for it all year. Kyoto’s Gion Matsuri fills July, with origins going back to 869, and its towering wooden floats are pulled through the streets on 17 and 24 July while musicians play above the crowd. In Aomori, from 2 to 7 August, giant illuminated paper warriors roll through the night while dancers leap and chant rasse-ra. Tokushima’s Awa Odori in mid-August sends long lines of dancers through the streets to shamisen and drums, and it even teases spectators for only watching. Other highlights include Osaka’s Tenjin Matsuri with boats on the river, Kishiwada’s racing danjiri carts, and Sapporo’s Snow Festival in February. A UNESCO listing honours Japan’s float festivals as a shared living heritage.',
        'Chaque festival appartient à sa ville, et les habitants s’y préparent toute l’année. Le Gion Matsuri de Kyoto occupe tout juillet, avec des origines remontant à 869, et ses immenses chars de bois sont tirés dans les rues les 17 et 24 juillet, tandis que des musiciens jouent au-dessus de la foule. À Aomori, du 2 au 7 août, de gigantesques guerriers de papier illuminés avancent dans la nuit tandis que les danseurs bondissent en criant rasse-ra. L’Awa Odori de Tokushima, à la mi-août, fait défiler de longues files de danseurs au son du shamisen et des tambours, et se moque même gentiment de ceux qui ne font que regarder. Citons aussi le Tenjin Matsuri d’Osaka et ses bateaux sur la rivière, les chars danjiri lancés à toute allure de Kishiwada et le festival de la neige de Sapporo en février. L’UNESCO a inscrit les festivals de chars du Japon comme patrimoine vivant.',
        'Cada festival pertenece a su ciudad, y los vecinos se preparan durante todo el año. El Gion Matsuri de Kioto ocupa todo julio, con orígenes que se remontan al año 869, y sus altísimas carrozas de madera recorren las calles los días 17 y 24 de julio mientras los músicos tocan sobre la multitud. En Aomori, del 2 al 7 de agosto, gigantescos guerreros de papel iluminados avanzan en la noche mientras los bailarines saltan y gritan rasse-ra. El Awa Odori de Tokushima, a mediados de agosto, llena las calles de largas filas de bailarines al son del shamisen y los tambores, y hasta se burla con cariño de quienes solo miran. También destacan el Tenjin Matsuri de Osaka con barcos en el río, las veloces carretas danjiri de Kishiwada y el festival de la nieve de Sapporo en febrero. La UNESCO reconoce las fiestas de carrozas de Japón como patrimonio vivo.',
        '每个祭典都属于自己的城镇，当地人为此准备一整年。京都的祇园祭贯穿整个七月，起源可以追溯到公元869年，高耸的木制山鉾在七月十七日和二十四日巡行街头，乐师就在人群头顶演奏。八月二日至七日的青森，巨大的发光纸武者在夜色中缓缓前行，舞者一边跳跃一边高喊“らっせらー”。德岛的阿波舞在八月中旬举行，长长的舞者队伍随着三味线和鼓声穿过街道，还会打趣那些只看不跳的观众。此外还有大阪天神祭的河上船队、岸和田飞奔的地车、二月的札幌冰雪节。日本的山车祭典已被联合国教科文组织列为活的文化遗产。',
      ),
    ),
    section(
      '🍢',
      tr('At the food stalls', 'Devant les stands', 'En los puestos de comida', '逛小吃摊'),
      tr(
        'Follow the smell of sweet soy sauce and you will find the yatai, a row of stalls lit by bare bulbs along the shrine approach. Stall owners flip takoyaki in iron pans, fry yakisoba on a roaring griddle and hand you chocolate-dipped banana on a stick in bright colours. In summer there is kakigori, a mountain of shaved ice drenched in neon syrup; in autumn, candied apples glow on their sticks. Children crouch over a pool of goldfish with a paper scoop that tears as soon as it gets wet, or fish for water balloons, or aim a cork gun at the prizes. Bring cash, as many stalls accept nothing else, and eat near the stall or at the edge of the path rather than walking through the crowd with food.',
        'Suivez l’odeur de sauce soja sucrée et vous trouverez les yatai, une rangée de stands éclairés par des ampoules nues le long de l’allée du sanctuaire. Les vendeurs retournent les takoyaki dans leurs moules en fonte, font sauter les yakisoba sur une plaque brûlante et vous tendent une banane enrobée de chocolat aux couleurs vives. L’été, il y a le kakigori, une montagne de glace pilée arrosée de sirop fluo ; l’automne, les pommes d’amour brillent sur leurs bâtonnets. Les enfants s’accroupissent devant un bassin de poissons rouges, armés d’une épuisette en papier qui se déchire dès qu’elle est mouillée, pêchent des ballons d’eau ou visent les lots au pistolet à bouchon. Prenez de l’argent liquide, car beaucoup de stands n’acceptent rien d’autre, et mangez près du stand ou sur le côté plutôt qu’en marchant dans la foule.',
        'Sigue el olor a salsa de soja dulce y encontrarás los yatai, una hilera de puestos iluminados con bombillas desnudas a lo largo del camino al santuario. Los vendedores voltean takoyaki en planchas de hierro, saltean yakisoba en una plancha ardiente y te dan plátanos con chocolate de colores vivos en un palo. En verano hay kakigori, una montaña de hielo raspado bañada en sirope fluorescente; en otoño, las manzanas de caramelo brillan en sus palitos. Los niños se agachan ante un estanque de peces de colores con una redecilla de papel que se rompe en cuanto se moja, pescan globos de agua o apuntan a los premios con una escopeta de corchos. Lleva efectivo, porque muchos puestos no aceptan otra cosa, y come junto al puesto o a un lado del camino en vez de caminar con la comida entre la gente.',
        '循着甜酱油的香气走，就能找到“屋台”：一排排亮着灯泡的小摊沿着神社参道展开。摊主在铁板模具里翻着章鱼小丸子，在滋滋作响的铁板上炒着炒面，还递给你一串色彩鲜艳的巧克力香蕉。夏天有刨冰，雪山似的冰堆浇满荧光色糖浆；秋天的苹果糖在竹签上闪闪发亮。孩子们蹲在金鱼池边，拿着一沾水就破的纸网捞金鱼，或者钓水气球，或者举起软木塞枪瞄准奖品。记得带现金，很多摊位只收现金；吃东西时最好站在摊位旁或路边，不要边走边吃穿过人群。',
      ),
    ),
    section(
      '⛩️',
      tr('Shrines and temples: visiting with respect', 'Sanctuaires et temples : une visite respectueuse', 'Santuarios y templos: visitar con respeto', '神社与寺庙：心怀敬意地参拜'),
      tr(
        'Shrines belong to Shinto and temples to Buddhism, and many Japanese people visit both without any contradiction. At a shrine, you bow at the torii gate and walk slightly to one side of the path, since the centre is traditionally left for the gods. At the water basin, rinse your left hand, then your right, pour a little water into your cupped hand to rinse your mouth, and never touch the ladle with your lips. Before the hall, drop a coin in the offering box, ring the bell if there is one, then bow twice, clap twice, pray and bow once more. A few shrines have their own custom, such as Izumo Taisha with four claps. At a temple you simply press your palms together in silence, without clapping. Keep your voice low and check signs before taking photos, as some places do not allow them.',
        'Les sanctuaires relèvent du shinto et les temples du bouddhisme, et beaucoup de Japonais fréquentent les deux sans y voir de contradiction. Au sanctuaire, on s’incline devant le torii et l’on marche légèrement sur le côté de l’allée, le centre étant traditionnellement réservé aux divinités. Au bassin, rincez la main gauche, puis la droite, versez un peu d’eau dans votre main pour vous rincer la bouche, sans jamais toucher la louche avec les lèvres. Devant le pavillon, déposez une pièce dans le tronc, agitez la cloche s’il y en a une, puis inclinez-vous deux fois, frappez deux fois dans les mains, priez et inclinez-vous encore une fois. Quelques sanctuaires ont leur propre coutume, comme Izumo Taisha et ses quatre claquements. Au temple, on joint simplement les mains en silence, sans les frapper. Parlez à voix basse et vérifiez les panneaux avant de photographier, car certains lieux l’interdisent.',
        'Los santuarios pertenecen al sintoísmo y los templos al budismo, y muchos japoneses visitan ambos sin ver contradicción alguna. En un santuario, inclínate ante el torii y camina un poco a un lado del sendero, pues el centro se reserva tradicionalmente a los dioses. En la pila de agua, enjuágate la mano izquierda, luego la derecha, vierte un poco de agua en la mano para enjuagarte la boca y nunca toques el cazo con los labios. Ante el pabellón, echa una moneda en la caja de ofrendas, toca la campana si la hay, inclínate dos veces, da dos palmadas, reza y vuelve a inclinarte una vez. Algunos santuarios tienen su propia costumbre, como Izumo Taisha con cuatro palmadas. En un templo basta con juntar las palmas en silencio, sin aplaudir. Habla en voz baja y mira los carteles antes de hacer fotos, pues en algunos lugares no se permite.',
        '神社属于神道，寺庙属于佛教，很多日本人两边都去，并不觉得矛盾。到神社时，先在鸟居前鞠一躬，走参道时稍微靠边，因为中间传统上是留给神明的。在洗手处，先洗左手，再洗右手，然后把水倒在手心里漱口，注意嘴唇不要碰到水勺。来到殿前，把硬币投入赛钱箱，有铃就摇一摇，然后二鞠躬、二拍手、祈祷，最后再鞠一躬。少数神社有自己的规矩，比如出云大社要拍四次手。在寺庙里，只需静静地双手合十，不用拍手。说话要轻声，拍照前先看告示，因为有些地方不允许拍摄。',
      ),
    ),
    section(
      '🗓️',
      tr('Autumn rites and national holidays', 'Rites d’automne et jours fériés', 'Ritos de otoño y días festivos', '秋日习俗与国定假日'),
      tr(
        'On or around 15 November, families dress their children in tiny kimono and hakama for Shichi-Go-San, the “seven-five-three” visit to a shrine: traditionally boys of three and five, and girls of three and seven. The children leave with a long paper bag of chitose ame, candy sticks wishing them a long life. Japan has 16 national holidays, many tied to the seasons or to gratitude: the spring and autumn equinoxes, when families often visit graves, Greenery Day, Mountain Day on 11 August, Respect for the Aged Day, Culture Day on 3 November, and Labour Thanksgiving Day on 23 November. Several fall on Mondays so people get a long weekend, and if a holiday lands on a Sunday, the following working day becomes a substitute day off.',
        'Vers le 15 novembre, les familles habillent leurs enfants de minuscules kimonos et hakama pour le Shichi-Go-San, « sept-cinq-trois », une visite au sanctuaire traditionnellement réservée aux garçons de trois et cinq ans et aux filles de trois et sept ans. Les enfants repartent avec un long sachet de chitose ame, des bâtons de sucre qui leur souhaitent une longue vie. Le Japon compte 16 jours fériés, souvent liés aux saisons ou à la gratitude : les équinoxes de printemps et d’automne, où l’on se rend volontiers sur les tombes, le jour de la Verdure, le jour de la Montagne le 11 août, le jour du Respect des personnes âgées, le jour de la Culture le 3 novembre et la fête du Travail et de la Gratitude le 23 novembre. Plusieurs tombent un lundi pour offrir un long week-end, et si un jour férié tombe un dimanche, le jour ouvré suivant est chômé en compensation.',
        'Hacia el 15 de noviembre, las familias visten a sus hijos con kimonos y hakama diminutos para el Shichi-Go-San, «siete-cinco-tres», una visita al santuario tradicionalmente para niños de tres y cinco años y niñas de tres y siete. Los pequeños salen con una bolsa alargada de chitose ame, barritas de caramelo que les desean larga vida. Japón tiene 16 días festivos nacionales, muchos ligados a las estaciones o a la gratitud: los equinoccios de primavera y otoño, cuando muchas familias visitan las tumbas, el Día del Verdor, el Día de la Montaña el 11 de agosto, el Día del Respeto a los Mayores, el Día de la Cultura el 3 de noviembre y el Día de Agradecimiento al Trabajo el 23 de noviembre. Varios caen en lunes para formar puentes, y si un festivo cae en domingo, el siguiente día laborable se convierte en día libre compensatorio.',
        '十一月十五日前后，家长们给孩子穿上小小的和服和袴，去神社参加“七五三”：按传统，是三岁、五岁的男孩和三岁、七岁的女孩。孩子们离开时，手里拎着长长的纸袋，里面的“千岁糖”寄托着长寿的祝福。日本有十六个国定假日，很多都与季节或感恩有关：春分和秋分（许多家庭会去扫墓）、绿之日、八月十一日的山之日、敬老日、十一月三日的文化日、十一月二十三日的勤劳感谢日。有几个假日固定在星期一，方便大家过长周末；假日如果碰上星期日，之后的第一个工作日就会补休。',
      ),
    ),
  ],
  words: `
まつり|祭り|🏮|festival|fête, festival|festival|祭典
はなみ|花見|🌸|cherry blossom viewing|contemplation des cerisiers|contemplación de los cerezos|赏樱
よざくら|夜桜|🌃|cherry blossoms at night|cerisiers de nuit|cerezos de noche|夜樱
おしょうがつ|お正月|🎍|New Year|Nouvel An|Año Nuevo|新年
おおみそか|大晦日||New Year’s Eve|réveillon du Nouvel An|Nochevieja|除夕
がんじつ|元日||New Year’s Day|jour de l’An|día de Año Nuevo|元旦
さんがにち|三が日||first three days of January|trois premiers jours de janvier|primeros tres días de enero|正月头三天
はつもうで|初詣|⛩️|first shrine visit of the year|première visite au sanctuaire de l’année|primera visita al santuario del año|新年首次参拜
おせちりょうり|おせち料理|🍱|New Year dishes|plats du Nouvel An|platos de Año Nuevo|御节料理
としこしそば|年越しそば|🍜|New Year’s Eve soba|soba du réveillon|soba de Nochevieja|跨年荞麦面
じょやのかね|除夜の鐘|🔔|New Year’s Eve temple bells|cloches du réveillon|campanas de Nochevieja|除夕钟声
おとしだま|お年玉|🧧|New Year’s money gift|étrennes|aguinaldo de Año Nuevo|压岁钱
ねんがじょう|年賀状|💌|New Year’s card|carte de vœux|tarjeta de Año Nuevo|贺年卡
かどまつ|門松|🎍|New Year pine decoration|décoration de pin du Nouvel An|adorno de pino de Año Nuevo|门松
かがみもち|鏡餅||New Year rice cake offering|offrande de gâteaux de riz|ofrenda de pastel de arroz|镜饼
せつぶん|節分|👹|Setsubun, eve of spring|Setsubun, veille du printemps|Setsubun, víspera de la primavera|节分
まめまき|豆まき|🫘|bean throwing|lancer de graines de soja|lanzamiento de soja|撒豆
えほうまき|恵方巻||lucky direction sushi roll|rouleau de sushi porte-bonheur|rollo de sushi de la suerte|惠方卷
ひなまつり|ひな祭り|🎎|Girls’ Day, Doll Festival|fête des poupées|Fiesta de las Muñecas|女儿节
ひなにんぎょう|雛人形|🎎|Hinamatsuri dolls|poupées de Hinamatsuri|muñecas de Hinamatsuri|女儿节人偶
こいのぼり|鯉のぼり|🎏|carp streamer|manche à air en forme de carpe|banderola de carpa|鲤鱼旗
たなばた|七夕|🎋|Tanabata, star festival|Tanabata, fête des étoiles|Tanabata, fiesta de las estrellas|七夕
たんざく|短冊||paper wish strip|bande de papier pour les vœux|tira de papel para deseos|许愿纸条
ささ|笹|🎋|bamboo grass|bambou nain|bambú enano|细竹
おぼん|お盆||Obon, festival of ancestors|Obon, fête des ancêtres|Obon, fiesta de los antepasados|盂兰盆节
ぼんおどり|盆踊り|💃|Bon dance|danse de Bon|danza de Bon|盆舞
きせい|帰省||returning to your home town|retour au pays natal|volver al pueblo natal|回乡探亲
はかまいり|墓参り||visiting a grave|visite sur la tombe|visita a la tumba|扫墓
はなびたいかい|花火大会|🎇|fireworks display|grand spectacle pyrotechnique|festival de fuegos artificiales|烟花大会
うちわ|団扇|🪭|paper fan|éventail rond|abanico redondo|团扇
しちごさん|七五三|👘|Seven-Five-Three festival|fête des enfants de 7, 5 et 3 ans|fiesta de los niños de 7, 5 y 3 años|七五三节
ちとせあめ|千歳飴|🍬|long-life candy stick|bâton de sucre de longue vie|caramelo de larga vida|千岁糖
みこし|神輿||portable shrine|sanctuaire portatif|santuario portátil|神轿
だし|山車||festival float|char de festival|carroza de festival|花车
ちょうちん|提灯|🏮|paper lantern|lanterne en papier|farolillo de papel|灯笼
おはやし|お囃子|🪈|festival music|musique de festival|música de festival|祭典伴奏
やたい|屋台|🏮|food stall|stand de rue|puesto callejero|小吃摊
たこやき|たこ焼き|🐙|octopus balls|boulettes de poulpe|bolitas de pulpo|章鱼小丸子
わたあめ|綿あめ|🍭|cotton candy|barbe à papa|algodón de azúcar|棉花糖
りんごあめ|りんご飴|🍎|candied apple|pomme d’amour|manzana de caramelo|苹果糖
かきごおり|かき氷|🍧|shaved ice|glace pilée|hielo raspado|刨冰
きんぎょすくい|金魚すくい|🐠|goldfish scooping|pêche aux poissons rouges|pesca de peces de colores|捞金鱼
しゃてき|射的|🎯|shooting gallery|stand de tir|tiro al blanco|射击摊
さんぱい|参拝|🙏|visit to worship|visite pour prier|visita para rezar|参拜
さんどう|参道||approach to a shrine|allée menant au sanctuaire|camino al santuario|参道
とりい|鳥居|⛩️|torii gate|portique torii|puerta torii|鸟居
ちょうずや|手水舎||purification water basin|bassin de purification|pila de purificación|手水舍
さいせん|賽銭|🪙|coin offering|offrande de pièces|ofrenda de monedas|香油钱
おみくじ||📜|paper fortune|papier de bonne aventure|papel de la fortuna|神签
おまもり|お守り|🧿|protective charm|amulette|amuleto|护身符
えま|絵馬||wooden wish plaque|plaquette de vœux en bois|tablilla de deseos de madera|绘马
だいきち|大吉||great good fortune|grande chance|gran fortuna|大吉
しゅくじつ|祝日|🗓️|national holiday|jour férié|día festivo nacional|国定假日
れんきゅう|連休||consecutive days off|jours de congé consécutifs|días festivos seguidos|连休
ふりかえきゅうじつ|振替休日||substitute holiday|jour férié compensatoire|festivo compensatorio|补休日
ゴールデンウィーク|||Golden Week|Golden Week|Golden Week|黄金周
`,
  phrases: [
    line('あけましておめでとうございます。', 'Happy New Year!', 'Bonne année !', '¡Feliz Año Nuevo!', '新年快乐！'),
    line('{今年|ことし}もよろしくお{願|ねが}いします。', 'I look forward to another year with you.', 'Je compte sur vous encore cette année.', 'Espero seguir contando contigo este año.', '今年也请多多关照。'),
    line('{鬼|おに}は{外|そと}、{福|ふく}は{内|うち}！', 'Demons out, good luck in!', 'Les démons dehors, le bonheur dedans !', '¡Demonios fuera, suerte dentro!', '鬼出去，福进来！'),
    line('{今週末|こんしゅうまつ}、お{花見|はなみ}に{行|い}きませんか。', 'Shall we go cherry blossom viewing this weekend?', 'On va voir les cerisiers ce week-end ?', '¿Vamos a ver los cerezos este fin de semana?', '这个周末一起去赏樱吧？'),
    line('{短冊|たんざく}に{願|ねが}い{事|ごと}を{書|か}きました。', 'I wrote my wish on a paper strip.', 'J’ai écrit mon vœu sur une bande de papier.', 'Escribí mi deseo en una tira de papel.', '我把愿望写在了纸条上。'),
    line('お{盆|ぼん}は{実家|じっか}に{帰|かえ}ります。', 'I’m going back to my family home for Obon.', 'Je rentre chez mes parents pour Obon.', 'Para Obon vuelvo a casa de mis padres.', '盂兰盆节我要回老家。'),
    line('{花火大会|はなびたいかい}は{何時|なんじ}からですか。', 'What time do the fireworks start?', 'Les feux d’artifice commencent à quelle heure ?', '¿A qué hora empiezan los fuegos artificiales?', '烟花大会几点开始？'),
    line('たこ{焼|や}きを{一|ひと}つください。', 'One takoyaki, please.', 'Une portion de takoyaki, s’il vous plaît.', 'Una ración de takoyaki, por favor.', '请给我一份章鱼小丸子。'),
    line('{一緒|いっしょ}に{踊|おど}りましょう！', 'Let’s dance together!', 'Dansons ensemble !', '¡Bailemos juntos!', '一起跳舞吧！'),
    line('{神輿|みこし}が{来|き}ましたよ！', 'Here comes the portable shrine!', 'Voilà le sanctuaire portatif !', '¡Ya viene el santuario portátil!', '神轿来了！'),
    line('おみくじを{引|ひ}いたら、{大吉|だいきち}でした！', 'I drew a fortune slip and got great luck!', 'J’ai tiré un papier de bonne aventure : grande chance !', '¡Saqué un papel de la fortuna y me tocó gran suerte!', '我抽了神签，是大吉！'),
    line('ここで{写真|しゃしん}を{撮|と}ってもいいですか。', 'May I take photos here?', 'Je peux prendre des photos ici ?', '¿Puedo hacer fotos aquí?', '这里可以拍照吗？'),
    line('{来週|らいしゅう}の{月曜日|げつようび}は{祝日|しゅくじつ}です。', 'Next Monday is a national holiday.', 'Lundi prochain est férié.', 'El lunes que viene es festivo.', '下周一是国定假日。'),
    line('ゴールデンウィークはどこも{混|こ}んでいますね。', 'Everywhere is crowded during Golden Week, isn’t it?', 'Tout est bondé pendant la Golden Week, hein ?', 'En la Golden Week está todo lleno, ¿verdad?', '黄金周到处都是人啊。'),
  ],
  links: [
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Hanami', tr('Hanami photos', 'Photos de hanami', 'Fotos de hanami', '赏樱图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Hina_matsuri', tr('Hinamatsuri dolls', 'Poupées de Hinamatsuri', 'Muñecas de Hinamatsuri', '女儿节人偶图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Setsubun', tr('Setsubun photos', 'Photos de Setsubun', 'Fotos de Setsubun', '节分图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Tanabata', tr('Tanabata decorations', 'Décorations de Tanabata', 'Adornos de Tanabata', '七夕装饰图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Shichi-Go-San', tr('Shichi-Go-San photos', 'Photos de Shichi-Go-San', 'Fotos de Shichi-Go-San', '七五三图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Gion_Matsuri', tr('Gion Matsuri photos', 'Photos du Gion Matsuri', 'Fotos del Gion Matsuri', '祇园祭图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Aomori_Nebuta_Festival', tr('Aomori Nebuta photos', 'Photos du Nebuta d’Aomori', 'Fotos del Nebuta de Aomori', '青森睡魔祭图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Awa_Odori', tr('Awa Odori photos', 'Photos de l’Awa Odori', 'Fotos del Awa Odori', '阿波舞图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Fireworks_in_Japan', tr('Fireworks in Japan', 'Feux d’artifice au Japon', 'Fuegos artificiales en Japón', '日本的烟花')),
    link('video', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Videos_of_festivals_in_Tokyo', tr('Festival videos from Tokyo', 'Vidéos de festivals à Tokyo', 'Vídeos de festivales en Tokio', '东京祭典视频')),
    link('video', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Videos_of_festivals_in_Osaka_prefecture', tr('Danjiri and other festival videos from Osaka', 'Vidéos de danjiri et de festivals à Osaka', 'Vídeos de danjiri y festivales en Osaka', '大阪地车等祭典视频')),
    link('video', 'Visit Japan (JNTO) on YouTube', 'https://www.youtube.com/@visitjapan', tr('JNTO’s Visit Japan channel', 'La chaîne Visit Japan de la JNTO', 'El canal Visit Japan de la JNTO', '日本国家旅游局 Visit Japan 频道')),
    link('guide', 'Japan National Tourism Organization', 'https://www.japan.travel/en/see-and-do/festivals-and-events/', tr('Festivals and events in Japan', 'Festivals et événements au Japon', 'Festivales y eventos en Japón', '日本的祭典与活动')),
    link('guide', 'Japan National Tourism Organization', 'https://www.japan.travel/en/guide/shrine-and-temple-traditions/', tr('Shrine and temple traditions', 'Traditions des sanctuaires et temples', 'Tradiciones de santuarios y templos', '神社与寺庙的传统')),
    link('guide', 'Cabinet Office, Japan', 'https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html', tr('National holidays list (in Japanese)', 'Liste des jours fériés (en japonais)', 'Lista de días festivos (en japonés)', '国定假日一览（日文）')),
    link('guide', 'UNESCO', 'https://ich.unesco.org/en/RL/yama-hoko-yatai-float-festivals-in-japan-02292', tr('Japan’s float festivals', 'Les festivals de chars du Japon', 'Las fiestas de carrozas de Japón', '日本的山车祭典')),
  ],
};
