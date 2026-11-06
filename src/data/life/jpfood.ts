import { line, link, section, tr, type LifeTopic } from './types';

export const JPFOOD: LifeTopic = {
  id: 'jpfood',
  emoji: '🍱',
  jp: 'たべもの',
  title: tr('Food in Japan', 'La cuisine au Japon', 'Comida en Japón', '日本的饮食'),
  intro: tr(
    "From a steaming bowl of miso soup at home to a late-night ramen counter, food is one of the friendliest ways into daily life in Japan. Pull up a chair: here is what people really eat, how they order it, and the little words that go with every meal.",
    "D’un bol de soupe miso fumant à la maison à un comptoir de ramen en pleine nuit, la cuisine est l’une des portes d’entrée les plus accueillantes de la vie japonaise. Installez-vous : voici ce que l’on mange vraiment, comment on le commande et les petits mots qui accompagnent chaque repas.",
    "Desde un cuenco humeante de sopa de miso en casa hasta una barra de ramen a medianoche, la comida es una de las puertas más acogedoras a la vida diaria en Japón. Siéntate: aquí verás lo que la gente come de verdad, cómo lo pide y las palabritas que acompañan cada comida.",
    "从家里热气腾腾的味噌汤，到深夜的拉面吧台，饮食是走进日本日常生活最亲切的入口。快坐下吧：这里有人们平时真正吃的东西、点餐的方法，以及每顿饭都用得上的小词句。",
  ),
  sections: [
    section('🍚', tr('The table at home', 'La table à la maison', 'La mesa en casa', '家里的餐桌'), tr(
      "A classic home dinner is built around a bowl of plain rice and a bowl of miso soup, with a main dish and a couple of small sides around them: perhaps grilled fish, simmered potatoes and meat, and a dish of pickles. This pattern is called ichijū sansai, one soup and three dishes, and few families follow it strictly every night. Much of the flavour comes from dashi, a light stock usually made with kelp and dried bonito. Curry, gyoza and pasta are just as much part of the weekly rotation. Before eating, people say itadakimasu, and when the bowls are empty, gochisōsama.",
      "Le dîner familial classique s’organise autour d’un bol de riz nature et d’un bol de soupe miso, accompagnés d’un plat principal et de quelques petites garnitures : du poisson grillé, un mijoté de viande et de pommes de terre, un peu de légumes marinés. Ce modèle s’appelle ichijū sansai, « une soupe, trois plats », mais peu de familles le suivent à la lettre chaque soir. Une grande partie du goût vient du dashi, un bouillon léger souvent préparé avec de l’algue kombu et de la bonite séchée. Le curry, les gyoza et les pâtes font tout autant partie des menus de la semaine. Avant de manger, on dit itadakimasu, et quand les bols sont vides, gochisōsama.",
      "La cena casera clásica gira en torno a un cuenco de arroz blanco y otro de sopa de miso, con un plato principal y un par de guarniciones pequeñas: quizá pescado a la parrilla, un guiso de carne con patatas y unos encurtidos. Este esquema se llama ichijū sansai, «una sopa y tres platos», aunque pocas familias lo siguen al pie de la letra cada noche. Gran parte del sabor viene del dashi, un caldo ligero que suele hacerse con alga kombu y bonito seco. El curry, los gyoza y la pasta también forman parte del menú semanal. Antes de comer se dice itadakimasu, y con los cuencos vacíos, gochisōsama.",
      "典型的家庭晚餐以一碗白米饭和一碗味噌汤为中心，再配上主菜和几样小菜：比如烤鱼、土豆炖肉和一小碟腌菜。这种搭配叫“一汁三菜”，不过很少有家庭每天都严格照做。许多味道来自“出汁”，一种常用海带和柴鱼熬成的清淡高汤。咖喱、饺子和意大利面也同样是一周餐桌上的常客。开动前大家会说“いただきます”，吃完后说“ごちそうさま”。",
    )),
    section('🍱', tr('Set meals and bento', 'Menus et bento', 'Menús y bentō', '定食与便当'), tr(
      "At lunchtime, office workers fill small diners for a teishoku: one tray with rice, soup, pickles and a main such as ginger pork or fried chicken. It is quick, balanced and often comes with a free rice refill. Bento are the portable version. Parents pack them for children, with tiny compartments and sometimes cute shapes, while supermarkets and department-store basements sell ready-made boxes, and many supermarkets put discount stickers on them in the evening. At big stations, ekiben are bento made for train journeys, often showing off a regional speciality in a pretty box you may want to keep.",
      "À midi, les employés remplissent les petits restaurants pour un teishoku : un plateau avec du riz, de la soupe, des légumes marinés et un plat comme du porc au gingembre ou du poulet frit. C’est rapide, équilibré, et le riz est souvent resservi gratuitement. Le bento en est la version à emporter. Les parents en préparent pour leurs enfants, avec de minuscules compartiments et parfois des formes mignonnes, tandis que les supermarchés et les sous-sols des grands magasins vendent des boîtes toutes prêtes, souvent à prix réduit le soir dans les supermarchés. Dans les grandes gares, les ekiben sont des bento pensés pour le train, qui mettent souvent en valeur une spécialité régionale dans une jolie boîte qu’on a envie de garder.",
      "A mediodía, los oficinistas llenan los pequeños restaurantes para tomar un teishoku: una bandeja con arroz, sopa, encurtidos y un plato principal, como cerdo al jengibre o pollo frito. Es rápido, equilibrado y a menudo incluye repetir arroz gratis. El bentō es la versión para llevar. Los padres lo preparan para sus hijos, con compartimentos diminutos y a veces formas graciosas, mientras que los supermercados y los sótanos de los grandes almacenes venden cajas ya hechas; en muchos supermercados llevan etiquetas de descuento por la tarde. En las grandes estaciones, los ekiben son bentō pensados para el tren, que suelen lucir una especialidad regional en una caja tan bonita que dan ganas de guardarla.",
      "午饭时间，上班族挤满小餐馆，点一份“定食”：一个托盘上放着米饭、汤、腌菜，以及姜烧猪肉或炸鸡之类的主菜。它上得快、营养均衡，很多店还能免费添饭。便当则是可以带走的版本。父母为孩子做便当，分成小小的格子，有时还做成可爱的造型；超市和百货公司地下层也卖现成的便当，不少超市到傍晚还会贴上打折标签。大车站里的“駅弁”（车站便当）专为坐火车而做，常以当地特产为主角，盒子漂亮得让人舍不得扔。",
    )),
    section('🍜', tr('Ramen, udon and soba', 'Ramen, udon et soba', 'Ramen, udon y soba', '拉面、乌冬和荞麦面'), tr(
      "Noodles are Japan’s favourite quick meal. In many ramen shops you buy a ticket from a machine at the door, hand it over at the counter and wait a few minutes on a stool, steam on your glasses. Broths vary by region: soy sauce, miso, salt, or the rich pork-bone tonkotsu of Kyushu. Thick, chewy udon is simple and comforting, whether hot in broth or chilled with a dipping sauce. Soba, made with buckwheat, is often eaten cold from a bamboo tray in summer, and stand-up soba counters at stations feed commuters in minutes. Slurping noodles is normal, and it cools them as you eat.",
      "Les nouilles sont le repas rapide préféré du Japon. Dans beaucoup de restaurants de ramen, on achète un ticket à la machine près de la porte, on le tend au comptoir et on attend quelques minutes sur un tabouret, les lunettes embuées. Les bouillons varient selon les régions : sauce soja, miso, sel, ou le riche tonkotsu d’os de porc de Kyushu. Les udon, épaisses et élastiques, sont simples et réconfortantes, chaudes en bouillon ou froides avec une sauce à tremper. Les soba, à base de sarrasin, se mangent souvent froides sur un plateau de bambou en été, et les comptoirs debout des gares nourrissent les voyageurs en quelques minutes. Aspirer ses nouilles bruyamment est normal, et cela les refroidit.",
      "Los fideos son la comida rápida favorita de Japón. En muchos locales de ramen compras un tique en la máquina de la entrada, lo entregas en la barra y esperas unos minutos en un taburete, con las gafas empañadas. Los caldos cambian según la región: salsa de soja, miso, sal o el denso tonkotsu de huesos de cerdo de Kyushu. Los udon, gruesos y elásticos, son sencillos y reconfortantes, tanto calientes en caldo como fríos con salsa para mojar. La soba, hecha con trigo sarraceno, suele tomarse fría en una bandeja de bambú en verano, y las barras de pie de las estaciones alimentan a los viajeros en minutos. Sorber los fideos es normal, y además los enfría.",
      "面条是日本人最爱的快餐。在许多拉面店，要先在门口的机器上买餐券，交到吧台，然后坐在高脚凳上等几分钟，热气把眼镜都蒙上了。汤底因地而异：酱油、味噌、盐味，还有九州浓郁的猪骨豚骨汤。粗而有嚼劲的乌冬简单又暖心，既可以热汤吃，也可以冷着蘸汁吃。荞麦面夏天常放在竹帘上冷吃，车站里的立食荞麦面店几分钟就能让上班族吃饱。吃面时发出吸溜声很正常，还能让面凉得快一些。",
    )),
    section('🍣', tr('Sushi for every day', 'Le sushi au quotidien', 'Sushi para todos los días', '日常的寿司'), tr(
      "Sushi is not only a luxury. Conveyor-belt restaurants are family outings: children order on a touch screen, plates zip past, and the colour or pattern of a plate may show its price. Supermarkets sell trays of sushi for an easy dinner, and families often order a big platter for a celebration. At a traditional counter, the chef shapes each piece in front of you and you can simply ask for a recommendation. Nigiri may be eaten with fingers or chopsticks. Dip the fish side lightly in soy sauce rather than soaking the rice, and if you dislike wasabi, ask for it without.",
      "Le sushi n’est pas qu’un luxe. Les restaurants à tapis roulant sont des sorties en famille : les enfants commandent sur un écran tactile, les assiettes filent, et leur couleur ou leur motif peut indiquer le prix. Les supermarchés vendent des plateaux de sushis pour un dîner sans effort, et les familles commandent souvent un grand assortiment pour une fête. À un comptoir traditionnel, le chef façonne chaque pièce devant vous et il suffit de demander une recommandation. Le nigiri se mange avec les doigts ou des baguettes. Trempez légèrement le côté poisson dans la sauce soja sans noyer le riz, et si vous n’aimez pas le wasabi, demandez-le sans.",
      "El sushi no es solo un lujo. Los restaurantes de cinta transportadora son salidas familiares: los niños piden en una pantalla táctil, los platos pasan a toda velocidad y su color o dibujo puede indicar el precio. Los supermercados venden bandejas de sushi para una cena fácil, y las familias suelen encargar una gran fuente para las celebraciones. En una barra tradicional, el chef forma cada pieza delante de ti y basta con pedir una recomendación. El nigiri se puede comer con los dedos o con palillos. Moja ligeramente el lado del pescado en salsa de soja, sin empapar el arroz, y si no te gusta el wasabi, pídelo sin él.",
      "寿司并不只是奢侈品。回转寿司店是全家出游的好去处：孩子在触摸屏上点餐，盘子飞快地驶过，盘子的颜色或花纹可能代表价格。超市里有盒装寿司，方便当晚餐；家里有喜事时也常订一大盘。在传统的寿司吧台，师傅当面捏好每一贯，你只要请他推荐就行。握寿司用手或用筷子吃都可以。蘸酱油时轻轻蘸鱼的一面，不要把米饭泡湿；如果不喜欢芥末，可以请店家不放。",
    )),
    section('🏮', tr('An evening at the izakaya', 'Une soirée à l’izakaya', 'Una noche en la izakaya', '居酒屋之夜'), tr(
      "Push aside the short noren curtain and you are met with a loud welcome, the smell of grilled skewers and a hot towel for your hands. An izakaya is a pub where food matters as much as drink, and everyone shares small plates: edamame, yakitori, fried chicken, sashimi. A little starter called otoshi usually arrives without being ordered and appears on the bill as a kind of table charge. The first round often starts with beer and a cheerful kanpai, though soft drinks are fine too, and the legal drinking age is 20. Many places offer all-you-can-drink plans for a set time, commonly about 90 to 120 minutes.",
      "On écarte le petit rideau noren et l’on est accueilli par un salut sonore, l’odeur des brochettes grillées et une serviette chaude pour les mains. L’izakaya est un bistrot où la cuisine compte autant que les boissons, et l’on partage de petites assiettes : edamame, yakitori, poulet frit, sashimi. Une petite entrée appelée otoshi arrive généralement sans avoir été commandée et figure sur l’addition comme une sorte de droit de table. Le premier verre est souvent une bière, accompagnée d’un joyeux kanpai, mais les boissons sans alcool sont tout à fait acceptées, et l’âge légal pour boire est de 20 ans. Beaucoup d’établissements proposent des formules à volonté pendant une durée fixe, souvent 90 à 120 minutes environ.",
      "Apartas la pequeña cortina noren y te recibe un saludo bien alto, el olor de las brochetas a la brasa y una toalla caliente para las manos. La izakaya es un bar donde la comida importa tanto como la bebida, y todos comparten platitos: edamame, yakitori, pollo frito, sashimi. Un pequeño entrante llamado otoshi suele llegar sin pedirlo y aparece en la cuenta como una especie de cubierto. La primera ronda suele ser de cerveza con un alegre kanpai, aunque los refrescos también están bien vistos, y la edad legal para beber es de 20 años. Muchos locales ofrecen planes de bebida libre por un tiempo fijo, normalmente unos 90 a 120 minutos.",
      "掀开短短的门帘，迎接你的是响亮的招呼声、烤串的香气和一条擦手的热毛巾。居酒屋是一种吃和喝同样重要的小酒馆，大家一起分享小盘菜：毛豆、烤鸡串、炸鸡、生鱼片。一小碟叫作“お通し”的前菜通常不用点就会送上来，并作为类似座位费的项目计入账单。第一轮往往是啤酒，再加一声欢快的“乾杯”，不过喝软饮也完全没问题；法定饮酒年龄是20岁。很多店提供限时畅饮套餐，时间大多在90到120分钟左右。",
    )),
    section('🍡', tr('Sweets and the seasons', 'Douceurs et saisons', 'Dulces y estaciones', '点心与四季'), tr(
      "The calendar is easy to read in food. Spring brings pink sakura mochi wrapped in a salted cherry leaf, and early May brings kashiwa mochi for Children’s Day. In the sticky heat of summer, people turn to chilled sōmen noodles, shaved ice with syrup and grilled eel, which is said to restore energy. Autumn smells of salt-grilled saury and roasted sweet potatoes, while winter means simmering pots and oden. On New Year’s Eve many families eat long soba for a long life, then open tiered boxes of osechi on New Year’s Day. Bean-paste treats such as daifuku, dorayaki and taiyaki are loved all year.",
      "Le calendrier se lit facilement dans les assiettes. Le printemps apporte le sakura mochi rose, enveloppé d’une feuille de cerisier salée, et début mai, le kashiwa mochi de la fête des enfants. Dans la chaleur moite de l’été, on se tourne vers les nouilles sōmen glacées, la glace pilée au sirop et l’anguille grillée, réputée redonner de l’énergie. L’automne sent le balaou grillé au sel et la patate douce rôtie, tandis que l’hiver est le temps des plats mijotés et de l’oden. Le soir du Nouvel An, beaucoup de familles mangent de longues soba pour une longue vie, puis ouvrent le jour de l’An les boîtes étagées de l’osechi. Les douceurs à la pâte de haricot comme le daifuku, le dorayaki et le taiyaki sont appréciées toute l’année.",
      "El calendario se lee fácilmente en el plato. La primavera trae el rosado sakura mochi, envuelto en una hoja de cerezo salada, y a principios de mayo llega el kashiwa mochi del Día de los Niños. En el calor pegajoso del verano se recurre a los fideos sōmen fríos, al hielo raspado con sirope y a la anguila a la parrilla, de la que se dice que devuelve las fuerzas. El otoño huele a paparda asada con sal y a boniato asado, y el invierno significa ollas al fuego y oden. En Nochevieja muchas familias toman largos fideos soba para desear una larga vida, y el día de Año Nuevo abren las cajas apiladas de osechi. Los dulces de pasta de judías, como el daifuku, el dorayaki y el taiyaki, se disfrutan todo el año.",
      "从食物里很容易读出季节。春天有包着盐渍樱叶的粉色樱饼，五月初儿童节吃柏饼。夏天闷热时，人们会吃冰镇素面、淋糖浆的刨冰，还有据说能恢复体力的烤鳗鱼。秋天飘着盐烤秋刀鱼和烤红薯的香味，冬天则是火锅和关东煮的季节。除夕夜，许多家庭吃细长的荞麦面，祈求长寿，到了元旦再打开层层叠叠的年菜盒。大福、铜锣烧、鲷鱼烧这些豆沙点心，一年四季都很受欢迎。",
    )),
    section('🏪', tr('Convenience food and drinks', 'Plats de konbini et boissons', 'Comida de konbini y bebidas', '便利店美食与饮料'), tr(
      "Convenience-store food is a real part of daily eating, not just an emergency. Onigiri wrappers are cleverly numbered so the seaweed stays crisp until you pull them open. Near the till you may find fried chicken and, in the colder months at many shops, a pot of oden. The staff will offer to heat your bento, and fresh products appear several times a day. Vending machines sell drinks almost everywhere, with hot cans in winter. Bottled green tea and barley tea are usually unsweetened, which surprises many visitors. In restaurants, water or tea is normally free, and tipping is not expected.",
      "La nourriture de konbini fait vraiment partie du quotidien, ce n’est pas qu’un dépannage. Les emballages d’onigiri sont astucieusement numérotés pour que l’algue reste croustillante jusqu’à l’ouverture. Près de la caisse, on trouve du poulet frit et, pendant les mois froids dans beaucoup de boutiques, une marmite d’oden. Le personnel propose de réchauffer votre bento, et les produits frais arrivent plusieurs fois par jour. Les distributeurs vendent des boissons presque partout, avec des canettes chaudes en hiver. Le thé vert et le thé d’orge en bouteille sont en général non sucrés, ce qui surprend beaucoup de visiteurs. Au restaurant, l’eau ou le thé sont normalement gratuits, et le pourboire n’est pas attendu.",
      "La comida de konbini forma parte real de la dieta diaria, no es solo un recurso de emergencia. Los envoltorios de onigiri están numerados con ingenio para que el alga siga crujiente hasta abrirlos. Cerca de la caja hay pollo frito y, en los meses fríos y en muchas tiendas, una olla de oden. El personal se ofrece a calentar tu bentō, y los productos frescos llegan varias veces al día. Las máquinas expendedoras venden bebidas casi en todas partes, con latas calientes en invierno. El té verde y el té de cebada embotellados no suelen llevar azúcar, algo que sorprende a muchos visitantes. En los restaurantes, el agua o el té normalmente son gratis, y no se espera propina.",
      "便利店的食物是日常饮食的一部分，而不只是应急之选。饭团的包装巧妙地标了序号，这样海苔在打开之前都能保持酥脆。收银台附近有炸鸡，天冷的时候很多店还摆着一锅关东煮。店员会问要不要帮你加热便当，新鲜商品一天会到货好几次。自动售货机几乎随处可见，冬天还有热饮罐。瓶装绿茶和大麦茶通常不加糖，这让不少外国游客感到意外。在餐馆里，水或茶一般是免费的，也不需要给小费。",
    )),
    section('🥢', tr('Manners and ordering', 'Bonnes manières et commande', 'Modales y cómo pedir', '餐桌礼仪与点餐'), tr(
      "Most restaurant meals begin with a wet towel, the oshibori, and a staff member asking how many are in your party. To order, call out sumimasen or press the table bell if there is one; many chains now use tablets. A few chopstick habits matter: do not stand them upright in rice or pass food from chopsticks to chopsticks, since both are linked to funeral customs. Rest them on the holder, not across a bowl, and it is polite to lift your rice bowl towards you. At the end, you usually pay at the till by the door, and a warm gochisōsama on the way out is always welcome.",
      "La plupart des repas au restaurant commencent par une serviette humide, l’oshibori, et par la question du nombre de convives. Pour commander, on lance un sumimasen ou l’on appuie sur la sonnette de table s’il y en a une ; beaucoup de chaînes utilisent désormais des tablettes. Quelques gestes comptent avec les baguettes : ne les plantez pas debout dans le riz et ne passez pas de nourriture de baguettes à baguettes, car ces deux gestes évoquent les rites funéraires. Posez-les sur leur support plutôt qu’en travers d’un bol, et il est poli de porter son bol de riz vers soi. À la fin, on paie généralement à la caisse près de la porte, et un gochisōsama chaleureux en sortant fait toujours plaisir.",
      "La mayoría de las comidas en restaurantes empiezan con una toallita húmeda, el oshibori, y con la pregunta de cuántos sois. Para pedir, di sumimasen o pulsa el timbre de la mesa si lo hay; muchas cadenas usan ya tabletas. Algunos gestos con los palillos importan: no los claves de pie en el arroz ni pases comida de palillos a palillos, porque ambos se asocian a ritos funerarios. Déjalos en su soporte y no cruzados sobre un cuenco, y es de buena educación acercar el cuenco de arroz con la mano. Al terminar, normalmente se paga en la caja junto a la puerta, y un gochisōsama sincero al salir siempre se agradece.",
      "在餐馆吃饭，通常先有人递上湿毛巾，并问你们几位。点餐时喊一声“すみません”，或者按桌上的呼叫铃；很多连锁店现在用平板点餐。用筷子有几点要注意：不要把筷子竖插在米饭里，也不要用筷子互相传递食物，因为这两种做法都和葬礼习俗有关。筷子要放在筷架上，不要横搁在碗上；把饭碗端起来吃才算礼貌。吃完后一般到门口的收银台结账，出门时真诚地说一句“ごちそうさま”，店家总会很高兴。",
    )),
  ],
  words: `
ていしょく|定食|🍱|set meal|menu complet|menú del día|定食
しょくけん|食券|🎫|meal ticket|ticket de repas|tique de comida|餐券
おおもり|大盛り|🍚|large portion|grande portion|ración grande|大份
おかわり|||second helping, refill|ration supplémentaire, resservice|segunda ración, repetir|再来一份
おしぼり|||wet hand towel|serviette humide|toallita húmeda|湿毛巾
おひや|お冷|💧|cold water (restaurant word)|eau fraîche (au restaurant)|agua fría (en restaurantes)|冰水（餐馆用语）
おかいけい|お会計|🧾|the bill|l’addition|la cuenta|结账
わりばし|割り箸|🥢|disposable chopsticks|baguettes jetables|palillos desechables|一次性筷子
はしおき|箸置き|🥢|chopstick rest|repose-baguettes|reposapalillos|筷架
のれん|暖簾|🏮|shop entrance curtain|rideau d’entrée|cortina de entrada|门帘
おとおし|お通し|🥗|small starter at a bar|petite entrée d’izakaya|entrante de izakaya|居酒屋小菜
のみほうだい|飲み放題|🍻|all you can drink|boissons à volonté|bebida libre|畅饮
たべほうだい|食べ放題|🍽️|all you can eat|buffet à volonté|comida libre|自助畅吃
かんぱい|乾杯|🍻|cheers|santé|salud|干杯
わしょく|和食|🍚|Japanese cuisine|cuisine japonaise|cocina japonesa|日本料理
だし|出汁|🍲|Japanese soup stock|bouillon japonais|caldo japonés|高汤
みりん|味醂|🍶|sweet cooking rice wine|mirin, saké doux de cuisine|mirin, vino dulce de arroz para cocinar|味醂
のり|海苔|🍙|dried seaweed|algue nori|alga nori|海苔
わさび|山葵|🌿|wasabi|wasabi|wasabi|山葵
うめぼし|梅干し|🔴|pickled plum|prune marinée|ciruela encurtida|腌梅子
つけもの|漬物|🥒|pickles|légumes marinés|encurtidos|腌菜
なっとう|納豆|🫘|fermented soybeans|soja fermenté|soja fermentado|纳豆
たまごやき|卵焼き|🍳|rolled omelette|omelette roulée|tortilla enrollada|日式煎蛋卷
にくじゃが|肉じゃが|🥔|simmered meat and potatoes|mijoté de viande et pommes de terre|guiso de carne y patatas|土豆炖肉
しょうがやき|生姜焼き|🐷|ginger pork|porc au gingembre|cerdo al jengibre|姜烧猪肉
からあげ|唐揚げ|🍗|Japanese fried chicken|poulet frit japonais|pollo frito japonés|日式炸鸡
とんかつ|豚カツ|🐷|breaded pork cutlet|escalope de porc panée|chuleta de cerdo empanada|炸猪排
ぎょうざ|餃子|🥟|gyoza dumplings|raviolis gyoza|empanadillas gyoza|饺子
かつどん|カツ丼|🍚|pork cutlet rice bowl|bol de riz au porc pané|cuenco de arroz con cerdo empanado|猪排盖饭
ぎゅうどん|牛丼|🐮|beef rice bowl|bol de riz au bœuf|cuenco de arroz con ternera|牛肉盖饭
おやこどん|親子丼|🐔|chicken and egg rice bowl|bol de riz au poulet et à l’œuf|cuenco de arroz con pollo y huevo|鸡肉鸡蛋盖饭
そうめん|素麺|🍜|thin wheat noodles|fines nouilles de blé|fideos finos de trigo|素面
ひやしちゅうか|冷やし中華|🍜|chilled ramen salad|nouilles froides garnies|fideos fríos con guarnición|中华凉面
さしみ|刺身|🐟|sashimi|sashimi|sashimi|生鱼片
かいてんずし|回転寿司|🍣|conveyor-belt sushi|sushi sur tapis roulant|sushi en cinta transportadora|回转寿司
やきとり|焼き鳥|🍢|grilled chicken skewers|brochettes de poulet|brochetas de pollo|烤鸡串
えだまめ|枝豆|🫛|edamame|edamame|edamame|毛豆
おでん||🍢|simmered oden stew|pot-au-feu oden|guiso oden|关东煮
おこのみやき|お好み焼き|🥞|savoury pancake|crêpe salée japonaise|tortita salada japonesa|大阪烧
たこやき|たこ焼き|🐙|octopus balls|boulettes au poulpe|bolitas de pulpo|章鱼烧
すきやき|すき焼き|🥘|sukiyaki hot pot|fondue sukiyaki|olla sukiyaki|寿喜烧
ちゃわんむし|茶碗蒸し|🥚|savoury egg custard|flan salé aux œufs|flan salado de huevo|茶碗蒸
うなぎ|鰻|🐟|eel|anguille|anguila|鳗鱼
さんま|秋刀魚|🐟|Pacific saury|balaou du Pacifique|paparda del Pacífico|秋刀鱼
もち|餅|🍡|rice cake|gâteau de riz|pastel de arroz|年糕
だいふく|大福|🍡|mochi stuffed with bean paste|mochi fourré aux haricots|mochi relleno de judías|大福
どらやき|どら焼き|🥞|bean-paste pancake sandwich|pancakes fourrés aux haricots|tortitas rellenas de judías|铜锣烧
たいやき|たい焼き|🐟|fish-shaped filled cake|gâteau fourré en forme de poisson|pastel relleno con forma de pez|鲷鱼烧
ようかん|羊羹|🍫|sweet bean jelly|gelée de haricots sucrée|gelatina dulce de judías|羊羹
かきごおり|かき氷|🍧|shaved ice|glace pilée|hielo raspado|刨冰
さくらもち|桜餅|🌸|cherry-leaf mochi|mochi à la feuille de cerisier|mochi con hoja de cerezo|樱饼
かしわもち|柏餅|🍃|oak-leaf mochi|mochi à la feuille de chêne|mochi con hoja de roble|柏饼
まっちゃ|抹茶|🍵|powdered green tea|thé vert en poudre|té verde en polvo|抹茶
むぎちゃ|麦茶|🧋|barley tea|thé d’orge|té de cebada|大麦茶
あまざけ|甘酒|🍶|sweet rice drink|boisson douce de riz|bebida dulce de arroz|甜酒
としこしそば|年越しそば|🍜|New Year’s Eve soba|soba du réveillon|soba de Nochevieja|跨年荞麦面
おせちりょうり|おせち料理|🍱|New Year’s dishes|plats du Nouvel An|platos de Año Nuevo|年菜
えきべん|駅弁|🚉|station bento|bento de gare|bentō de estación|车站便当
`,
  phrases: [
    line('{二人|ふたり}です。{席|せき}は{空|あ}いていますか。', 'There are two of us. Do you have a table free?', 'Nous sommes deux. Vous avez une table de libre ?', 'Somos dos. ¿Tienen alguna mesa libre?', '我们两个人。现在有空位吗？'),
    line('おすすめは{何|なん}ですか。', 'What do you recommend?', 'Que me conseillez-vous ?', '¿Qué me recomienda?', '您有什么推荐的？'),
    line('{日替|ひが}わり{定食|ていしょく}をお{願|ねが}いします。', 'The daily set meal, please.', 'Le menu du jour, s’il vous plaît.', 'El menú del día, por favor.', '请给我一份每日定食。'),
    line('ご{飯|はん}を{大盛|おおも}りにできますか。', 'Could I have a large portion of rice?', 'Je peux avoir une grande portion de riz ?', '¿Me puede poner una ración grande de arroz?', '米饭可以要大份吗？'),
    line('これに{卵|たまご}は{入|はい}っていますか。', 'Does this contain egg?', 'Est-ce qu’il y a de l’œuf dedans ?', '¿Esto lleva huevo?', '这个里面有鸡蛋吗？'),
    line('わさび{抜|ぬ}きでお{願|ねが}いします。', 'No wasabi, please.', 'Sans wasabi, s’il vous plaît.', 'Sin wasabi, por favor.', '请不要放芥末。'),
    line('{麺|めん}はかためでお{願|ねが}いします。', 'I’d like the noodles firm, please.', 'Les nouilles bien fermes, s’il vous plaît.', 'Los fideos al dente, por favor.', '面请煮硬一点。'),
    line('とりあえず{生|なま}ビールを{二|ふた}つください。', 'Two draught beers to start with, please.', 'Deux bières pression pour commencer, s’il vous plaît.', 'Para empezar, dos cañas, por favor.', '先来两杯生啤吧。'),
    line('{取|と}り{皿|ざら}をいただけますか。', 'Could we have some small plates to share with?', 'Pourrions-nous avoir de petites assiettes ?', '¿Nos trae unos platitos para compartir?', '可以给我们几个小碟子吗？'),
    line('お{水|みず}をもう{一杯|いっぱい}お{願|ねが}いします。', 'Another glass of water, please.', 'Encore un verre d’eau, s’il vous plaît.', 'Otro vaso de agua, por favor.', '请再给我一杯水。'),
    line('{持|も}ち{帰|かえ}りできますか。', 'Can I get this to take away?', 'C’est possible à emporter ?', '¿Se puede pedir para llevar?', '可以打包带走吗？'),
    line('お{会計|かいけい}をお{願|ねが}いします。', 'The bill, please.', 'L’addition, s’il vous plaît.', 'La cuenta, por favor.', '麻烦结账。'),
    line('{別々|べつべつ}に{払|はら}えますか。', 'Can we pay separately?', 'Pouvons-nous payer séparément ?', '¿Podemos pagar por separado?', '可以分开付吗？'),
    line('ごちそうさまでした。とてもおいしかったです。', 'Thank you for the meal. It was delicious.', 'Merci pour ce repas, c’était délicieux.', 'Gracias por la comida. Estaba buenísima.', '谢谢款待，非常好吃。'),
  ],
  links: [
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Cuisine_of_Japan', tr('Photos of Japanese cuisine', 'Photos de cuisine japonaise', 'Fotos de cocina japonesa', '日本料理图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Teishoku', tr('Photos of set meals', 'Photos de menus teishoku', 'Fotos de menús teishoku', '定食图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Ekiben', tr('Photos of station bento', 'Photos de bento de gare', 'Fotos de bentō de estación', '车站便当图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Ramen', tr('Photos of ramen', 'Photos de ramen', 'Fotos de ramen', '拉面图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Sushi', tr('Photos of sushi', 'Photos de sushi', 'Fotos de sushi', '寿司图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Izakaya', tr('Photos of izakaya', 'Photos d’izakaya', 'Fotos de izakayas', '居酒屋图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Wagashi', tr('Photos of traditional sweets', 'Photos de pâtisseries traditionnelles', 'Fotos de dulces tradicionales', '日式传统点心图片')),
    link('video', 'Ministry of Agriculture, Forestry and Fisheries (YouTube)', 'https://www.youtube.com/@MAFFchannel', tr('Official channel of Japan’s food and farming ministry', 'Chaîne officielle du ministère japonais de l’Agriculture', 'Canal oficial del Ministerio de Agricultura de Japón', '日本农林水产省官方频道')),
    link('video', 'Japan National Tourism Organization (YouTube)', 'https://www.youtube.com/@visitjapan', tr('Official Visit Japan travel videos', 'Vidéos officielles de voyage Visit Japan', 'Vídeos oficiales de viajes Visit Japan', 'Visit Japan 官方旅行视频')),
    link('guide', 'Japan National Tourism Organization', 'https://www.japan.travel/en/guide/ramen/', tr('A guide to ramen', 'Guide du ramen', 'Guía del ramen', '拉面指南')),
    link('guide', 'Ministry of Agriculture, Forestry and Fisheries', 'https://www.maff.go.jp/e/policies/market/k_ryouri/index.html', tr('Regional home cooking across Japan', 'Cuisines régionales du Japon', 'Cocinas regionales de Japón', '日本各地的乡土料理')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/Japanese_cuisine', tr('Encyclopedia article on Japanese cuisine', 'Article encyclopédique sur la cuisine japonaise', 'Artículo enciclopédico sobre la cocina japonesa', '日本料理百科条目')),
  ],
};
