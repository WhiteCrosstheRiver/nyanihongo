import { line, link, section, tr, type LifeTopic } from './types';

export const JPGOODS: LifeTopic = {
  id: 'jpgoods',
  emoji: '🏪',
  jp: 'にちようひん',
  title: tr('Everyday goods', 'Objets du quotidien', 'Artículos cotidianos', '日用品'),
  intro: tr(
    "Toothpaste, sticky notes, rubbish bags, a box of sweets for a colleague: daily life in Japan runs on small things and the shops that sell them. Let’s wander the aisles together, learn what to say at the till, and find out which bin everything goes in.",
    "Du dentifrice, des notes adhésives, des sacs-poubelle, une boîte de gâteaux pour un collègue : la vie au Japon repose sur de petites choses et sur les boutiques qui les vendent. Flânons ensemble dans les rayons, apprenons quoi dire à la caisse et découvrons dans quelle poubelle tout doit aller.",
    "Pasta de dientes, notas adhesivas, bolsas de basura, una caja de dulces para un compañero: la vida diaria en Japón funciona a base de cosas pequeñas y de las tiendas que las venden. Paseemos juntos por los pasillos, aprendamos qué decir en la caja y descubramos en qué cubo va cada cosa.",
    "牙膏、便利贴、垃圾袋，还有带给同事的一盒点心：日本的日常生活正是由这些小东西和卖它们的小店撑起来的。一起去逛逛货架，学学收银台前该说什么，再看看每样东西该扔进哪个垃圾桶吧。",
  ),
  sections: [
    section('🏪', tr('The konbini on every corner', 'Le konbini à chaque coin de rue', 'El konbini de cada esquina', '街角的便利店'), tr(
      "The door chimes, a voice calls irasshaimase, and you step into a bright little world that is usually open day and night. A konbini sells far more than snacks: shirts and socks for an unexpected night away, umbrellas when the rain starts, phone chargers and stamps. It is also a neighbourhood service counter. People pay utility bills, withdraw cash from the ATM, print documents on the multi-function copier, collect tickets and send parcels. Because everything is packed into a small space, staff restock constantly, and many customers drop in several times a week without really planning to.",
      "La porte carillonne, une voix lance irasshaimase, et vous entrez dans un petit monde lumineux, généralement ouvert jour et nuit. Le konbini vend bien plus que des en-cas : chemises et chaussettes pour une nuit imprévue, parapluies quand la pluie commence, chargeurs de téléphone et timbres. C’est aussi un guichet de quartier. On y paie ses factures, on retire de l’argent au distributeur, on imprime des documents sur le copieur multifonction, on récupère des billets et on envoie des colis. Comme tout tient dans un petit espace, le personnel réapprovisionne sans cesse, et beaucoup de clients y passent plusieurs fois par semaine sans vraiment l’avoir prévu.",
      "Suena el timbre de la puerta, una voz dice irasshaimase y entras en un pequeño mundo luminoso que suele abrir día y noche. El konbini vende mucho más que aperitivos: camisas y calcetines para una noche imprevista, paraguas cuando empieza a llover, cargadores de móvil y sellos. También es un mostrador de servicios del barrio. La gente paga recibos, saca dinero del cajero, imprime documentos en la fotocopiadora multifunción, recoge entradas y envía paquetes. Como todo cabe en un espacio pequeño, el personal repone sin parar, y muchos clientes entran varias veces por semana sin haberlo planeado.",
      "门铃一响，一声“いらっしゃいませ”传来，你走进了一个明亮的小世界，这里通常日夜营业。便利店卖的远不止零食：有临时过夜用的衬衫和袜子，有下雨时救急的雨伞，还有手机充电器和邮票。它也是社区里的服务窗口：人们在这里交水电费、用ATM取现金、用多功能复印机打印文件、取门票、寄包裹。因为东西都挤在小小的空间里，店员总在不停地补货，很多顾客一周不知不觉就会进来好几次。",
    )),
    section('🪙', tr('The 100-yen shop treasure hunt', 'La chasse au trésor du magasin à 100 yens', 'La búsqueda del tesoro en la tienda de 100 yenes', '百元店寻宝'), tr(
      "Going in for a pack of clothes pegs and leaving with a full basket is a familiar story. Hyaku-en shops stock kitchen gadgets, storage boxes, sewing kits, party supplies, gardening tools and seasonal decorations, and many items are surprisingly well designed. Despite the name, the price at the till is about 110 yen once consumption tax is added, and some shelves now hold goods at 200, 300 or 500 yen, so check the label. Students furnish first flats here, parents buy school craft materials, and hobbyists search for cheap supplies. A quick look at the aisle of the month shows what season Japan is thinking about.",
      "Entrer pour un paquet de pinces à linge et ressortir avec un panier plein : une histoire bien connue. Les magasins à 100 yens proposent des gadgets de cuisine, des boîtes de rangement, des kits de couture, des articles de fête, des outils de jardinage et des décorations de saison, et beaucoup d’objets sont étonnamment bien conçus. Malgré le nom, le prix en caisse est d’environ 110 yens avec la taxe, et certains rayons proposent désormais des articles à 200, 300 ou 500 yens : mieux vaut regarder l’étiquette. Les étudiants y équipent leur premier logement, les parents y achètent le matériel de bricolage scolaire, et les passionnés y cherchent des fournitures bon marché. Un coup d’œil au rayon du mois montre à quelle saison pense le Japon.",
      "Entrar por un paquete de pinzas y salir con la cesta llena es una historia muy conocida. Las tiendas de 100 yenes tienen utensilios de cocina, cajas de almacenaje, costureros, artículos de fiesta, herramientas de jardín y adornos de temporada, y muchos objetos están sorprendentemente bien diseñados. Pese al nombre, en caja cuestan unos 110 yenes con el impuesto, y algunos estantes ya ofrecen productos de 200, 300 o 500 yenes, así que conviene mirar la etiqueta. Los estudiantes amueblan aquí su primer piso, los padres compran material para manualidades y los aficionados buscan materiales baratos. Un vistazo al pasillo del mes muestra en qué estación está pensando Japón.",
      "本来只想买一包晾衣夹，结果提着满满一篮出来，这种事太常见了。百元店里有厨房小工具、收纳盒、针线包、派对用品、园艺工具和季节装饰，很多东西设计得出人意料地好。虽然叫百元店，但加上消费税后结账时约为110日元，现在有些货架上还有200、300或500日元的商品，所以最好看清标签。学生在这里置办第一个小家，家长来买学校手工材料，爱好者来淘便宜的素材。看一眼当月的特设货架，就知道日本正在迎接什么季节。",
    )),
    section('🛒', tr('Drugstores and supermarkets', 'Drugstores et supermarchés', 'Droguerías y supermercados', '药妆店与超市'), tr(
      "Drugstores are loud and cheerful, with jingles playing and special offers piled at the entrance. Besides cold medicine, plasters and eye drops, they sell cosmetics, shampoo, nappies, drinks and often snacks at low prices. Some medicines can only be bought when a pharmacist is on duty, so a section may be closed in the evening. At the supermarket, fish and meat come neatly cut on trays, and there is a fascinating aisle of tofu, pickles and instant soups. Near closing time staff walk the aisles with stickers marking prepared food at 20 or 50 percent off. After paying, you carry your basket to a shelf and bag your own shopping.",
      "Les drugstores sont bruyants et joyeux, avec leurs ritournelles et leurs promotions empilées à l’entrée. En plus des médicaments contre le rhume, des pansements et du collyre, on y trouve des cosmétiques, du shampoing, des couches, des boissons et souvent des en-cas à petit prix. Certains médicaments ne se vendent que lorsqu’un pharmacien est présent : un rayon peut donc être fermé le soir. Au supermarché, le poisson et la viande sont joliment découpés sur des barquettes, et l’allée du tofu, des légumes marinés et des soupes instantanées vaut le détour. Près de la fermeture, le personnel passe avec des étiquettes qui baissent les plats préparés de 20 ou 50 %. Après avoir payé, on porte son panier jusqu’à une tablette pour emballer soi-même ses courses.",
      "Las droguerías son ruidosas y alegres, con sus melodías pegadizas y sus ofertas apiladas en la entrada. Además de medicinas para el resfriado, tiritas y colirios, venden cosméticos, champú, pañales, bebidas y a menudo aperitivos baratos. Algunos medicamentos solo se venden cuando hay un farmacéutico de servicio, así que por la noche una sección puede estar cerrada. En el supermercado, el pescado y la carne vienen bien cortados en bandejas, y el pasillo de tofu, encurtidos y sopas instantáneas es fascinante. Cerca del cierre, el personal recorre los pasillos con etiquetas que rebajan la comida preparada un 20 o un 50 %. Tras pagar, llevas la cesta a una mesa y embolsas tú mismo la compra.",
      "药妆店总是热热闹闹，放着朗朗上口的广告歌，门口堆满特价商品。除了感冒药、创可贴和眼药水，这里还卖化妆品、洗发水、尿布、饮料，零食也往往很便宜。有些药品只有药剂师在岗时才能买，所以晚上某些柜台可能会关闭。超市里，鱼和肉都切得整整齐齐放在托盘上，豆腐、腌菜和速食汤的货架也很有看头。快打烊时，店员会拿着标签在货架间走动，给熟食贴上八折或半价。结完账后，要把篮子提到旁边的台子上，自己装袋。",
    )),
    section('🧴', tr('Bathroom, kitchen and desk', 'Salle de bains, cuisine et bureau', 'Baño, cocina y escritorio', '浴室、厨房和书桌'), tr(
      "Look around a Japanese home and you will find many small, thoughtful products. Shampoo and detergent are widely sold in refill pouches, which use less plastic than a new bottle each time. In the kitchen, a ceramic rice bowl sits beside a sponge, a scrubbing brush, plastic wrap and a mesh for the sink drain. Bathrooms may have a plastic stool and basin for washing before getting in the tub, and many toilets have their own separate slippers. Stationery is a small joy of its own: smooth gel pens, erasable pens, cute sticky notes and neat folders fill whole floors of big shops, and students love comparing them.",
      "Dans un foyer japonais, on remarque une foule de petits produits bien pensés. Le shampoing et la lessive se vendent largement en sachets de recharge, qui utilisent moins de plastique qu’un flacon neuf à chaque fois. Dans la cuisine, un bol à riz en céramique côtoie une éponge, une brosse, du film alimentaire et un filet pour la bonde de l’évier. La salle de bains peut avoir un tabouret et une bassine en plastique pour se laver avant d’entrer dans la baignoire, et beaucoup de toilettes ont leurs propres pantoufles. La papeterie est un petit bonheur à part : stylos gel très fluides, stylos effaçables, jolies notes adhésives et classeurs soignés occupent des étages entiers dans les grandes boutiques, et les élèves adorent les comparer.",
      "Si miras una casa japonesa, verás muchos productos pequeños y bien pensados. El champú y el detergente se venden mucho en bolsas de recarga, que gastan menos plástico que una botella nueva cada vez. En la cocina, un cuenco de cerámica para arroz está junto a una esponja, un cepillo, film transparente y una malla para el desagüe del fregadero. Los baños pueden tener un taburete y un barreño de plástico para lavarse antes de entrar en la bañera, y muchos aseos tienen sus propias zapatillas. La papelería es una pequeña alegría aparte: bolígrafos de gel suaves, bolígrafos borrables, notas adhesivas monas y carpetas ordenadas llenan plantas enteras de las grandes tiendas, y a los estudiantes les encanta compararlos.",
      "走进日本人的家，你会发现许多贴心的小物件。洗发水和洗涤剂大多有补充装，比每次买新瓶少用塑料。厨房里，陶瓷饭碗旁边放着海绵、刷子、保鲜膜和水槽过滤网。浴室里可能有塑料小凳和水盆，方便进浴缸前先洗身体；很多厕所还备有专用拖鞋。文具本身就是一种小确幸：顺滑的中性笔、可擦笔、可爱的便利贴和整洁的文件夹，能占满大型商店的整整几层，学生们特别喜欢互相比较。",
    )),
    section('🎁', tr('The art of giving', 'L’art d’offrir', 'El arte de regalar', '送礼的讲究'), tr(
      "Come back from a trip and you are expected to bring omiyage, usually a box of individually wrapped sweets from the place you visited, easy to share around the office. Twice a year, many people send formal gifts: ochūgen in summer and oseibo at the end of the year, often coffee, seasonal fruit or fine towels, ordered at department stores. Formal gifts wear a noshi paper band, with printed cords chosen to suit the occasion. If you receive a gift for a wedding or a birth, it is customary to give something back later, often worth about a third to a half. A furoshiki cloth wraps a present beautifully and can be reused forever.",
      "Au retour d’un voyage, on rapporte des omiyage, en général une boîte de douceurs emballées une à une, venant de l’endroit visité et faciles à partager au bureau. Deux fois par an, beaucoup de gens envoient des cadeaux formels : l’ochūgen en été et l’oseibo en fin d’année, souvent du café, des fruits de saison ou de belles serviettes, commandés dans les grands magasins. Les cadeaux formels portent une bande de papier noshi, dont les cordelettes imprimées varient selon l’occasion. Si l’on reçoit un cadeau pour un mariage ou une naissance, il est d’usage d’offrir ensuite quelque chose en retour, souvent d’une valeur d’un tiers à la moitié environ. Un tissu furoshiki enveloppe joliment un présent et se réutilise à l’infini.",
      "Al volver de un viaje se espera que traigas omiyage, normalmente una caja de dulces envueltos uno a uno del lugar visitado, fáciles de repartir en la oficina. Dos veces al año, mucha gente envía regalos formales: el ochūgen en verano y el oseibo a fin de año, a menudo café, fruta de temporada o buenas toallas, encargados en grandes almacenes. Los regalos formales llevan una banda de papel noshi, con cordones impresos que se eligen según la ocasión. Si recibes un regalo por una boda o un nacimiento, se acostumbra a devolver algo después, con frecuencia por valor de entre un tercio y la mitad. Un paño furoshiki envuelve un regalo con elegancia y se puede reutilizar siempre.",
      "旅行回来时，大家会带“お土産”（伴手礼），通常是当地的一盒独立包装点心，方便在办公室分给同事。一年两次，许多人会送正式的礼物：夏天的“中元”和年底的“岁暮”，常见的有咖啡、时令水果或高级毛巾，多在百货公司订购。正式的礼物要加上“熨斗纸”，上面印的绳结图案要根据场合选择。收到结婚或生子的贺礼后，习惯上过后要回礼，价值通常约为三分之一到一半。一块“风吕敷”包袱布能把礼物包得很漂亮，还能反复使用。",
    )),
    section('♻️', tr('Rubbish sorting', 'Le tri des déchets', 'Separar la basura', '垃圾分类'), tr(
      "Your first week in a new town often begins with a colourful rubbish calendar from the local city office. The rules change from one municipality to the next, but burnable rubbish, non-burnable rubbish and recyclables usually go out on different mornings, at a shared collection spot covered with a net to keep crows away. Some towns require their own bags. PET bottles have their caps and labels removed and are rinsed, cans and glass go separately, and flattened cardboard is tied in bundles. Oversized items such as furniture need a booking and a paid sticker. Public bins are rare, so people often carry their rubbish home, and supermarkets commonly collect clean trays and milk cartons.",
      "La première semaine dans une nouvelle ville commence souvent par un calendrier des déchets coloré remis par la mairie. Les règles changent d’une commune à l’autre, mais les déchets combustibles, les non combustibles et les recyclables sortent en général des matins différents, à un point de collecte commun couvert d’un filet contre les corbeaux. Certaines villes imposent leurs propres sacs. On retire le bouchon et l’étiquette des bouteilles en PET avant de les rincer, les canettes et le verre sont séparés, et le carton aplati est ficelé. Les objets encombrants, comme les meubles, demandent une réservation et une vignette payante. Les poubelles publiques sont rares : on rapporte souvent ses déchets chez soi, et les supermarchés récupèrent couramment les barquettes propres et les briques de lait.",
      "La primera semana en una ciudad nueva suele empezar con un colorido calendario de basura del ayuntamiento. Las normas cambian de un municipio a otro, pero la basura combustible, la no combustible y los reciclables suelen sacarse en mañanas distintas, en un punto común cubierto con una red para ahuyentar a los cuervos. Algunas ciudades exigen sus propias bolsas. A las botellas de PET se les quita el tapón y la etiqueta y se enjuagan, las latas y el vidrio van aparte, y el cartón aplastado se ata en fardos. Los objetos grandes, como los muebles, necesitan reserva y una pegatina de pago. Las papeleras públicas son escasas, así que muchos se llevan la basura a casa, y los supermercados suelen recoger las bandejas limpias y los envases de leche.",
      "到新城市的第一周，往往从市政府发的彩色垃圾日历开始。各地规定不同，但可燃垃圾、不可燃垃圾和可回收物通常在不同的早晨扔到共用的收集点，上面盖着防乌鸦的网。有些城市要求使用指定垃圾袋。PET瓶要取下瓶盖和标签并冲洗干净，易拉罐和玻璃瓶分开放，纸箱压平后捆好。家具等大件垃圾需要预约，并购买收费贴纸。公共垃圾桶很少，人们常把垃圾带回家，超市一般也回收洗净的托盘和牛奶盒。",
    )),
    section('💴', tr('Paying and receipts', 'Payer et les tickets', 'Pagar y los recibos', '付款与小票'), tr(
      "At the till, you place your money in a small tray rather than handing it over, and the cashier counts your change back out loud, then gives you the receipt. Cards are widely accepted, as are rechargeable transit cards and smartphone QR payments, though some small shops are still cash only. Expect a question about a point card, and it is fine to say no. Plastic bags have carried a small charge since 2020, so many people bring a folded eco bag. Shelf prices usually include tax, though some shops show the pre-tax price larger, and rates differ for food to go and food eaten in. For business expenses, ask for a formal ryōshūsho.",
      "À la caisse, on dépose son argent dans une petite coupelle au lieu de le tendre, et le caissier compte la monnaie à voix haute avant de donner le ticket. Les cartes sont largement acceptées, tout comme les cartes de transport rechargeables et les paiements par QR code, même si certaines petites boutiques ne prennent encore que les espèces. On vous demandera sans doute une carte de fidélité, et il est tout à fait possible de dire non. Les sacs plastique sont facturés une petite somme depuis 2020, si bien que beaucoup de gens gardent un sac réutilisable plié sur eux. Les prix affichés incluent généralement la taxe, mais certains magasins mettent le prix hors taxe en plus gros, et le taux diffère entre la nourriture à emporter et sur place. Pour une note de frais, demandez un ryōshūsho en bonne et due forme.",
      "En la caja, dejas el dinero en una bandejita en lugar de darlo en mano, y el cajero cuenta el cambio en voz alta antes de entregarte el recibo. Las tarjetas se aceptan ampliamente, igual que las tarjetas recargables de transporte y los pagos con código QR en el móvil, aunque algunas tiendas pequeñas solo admiten efectivo. Seguramente te preguntarán por una tarjeta de puntos, y puedes decir que no. Las bolsas de plástico tienen un pequeño coste desde 2020, así que mucha gente lleva una bolsa reutilizable plegada. Los precios suelen incluir el impuesto, aunque algunas tiendas muestran más grande el precio sin impuesto, y el tipo varía entre la comida para llevar y la que se toma allí. Para gastos de empresa, pide un ryōshūsho formal.",
      "在收银台，钱要放在小托盘上，而不是直接递到对方手里，收银员会大声数出找零，再把小票给你。银行卡使用广泛，可充值的交通卡和手机二维码支付也很常见，但有些小店仍然只收现金。店员多半会问你有没有积分卡，说没有也完全没关系。2020年起塑料袋开始收取少量费用，所以很多人随身带一个折叠环保袋。标价一般含税，但也有商店把不含税价格写得更大；打包和堂食的税率也不一样。如果要报销，记得索取正式的“領収書”（收据）。",
    )),
  ],
  words: `
ふくろ|袋|🛍️|bag|sac|bolsa|袋子
レジぶくろ|レジ袋|🛍️|shopping bag from the till|sac de caisse|bolsa de caja|购物塑料袋
エコバッグ||👜|reusable shopping bag|sac réutilisable|bolsa reutilizable|环保袋
かいものかご|買い物かご|🧺|shopping basket|panier de courses|cesta de la compra|购物篮
わりびき|割引|🏷️|discount|réduction|descuento|折扣
はんがく|半額|🏷️|half price|moitié prix|mitad de precio|半价
ぜいこみ|税込|💴|tax included|taxe comprise|impuesto incluido|含税
しょうひぜい|消費税|💴|consumption tax|taxe à la consommation|impuesto al consumo|消费税
げんきん|現金|💵|cash|espèces|efectivo|现金
でんしマネー|電子マネー|📱|electronic money|monnaie électronique|dinero electrónico|电子货币
ポイントカード||💳|point card|carte de fidélité|tarjeta de puntos|积分卡
りょうしゅうしょ|領収書|🧾|formal receipt|reçu officiel|recibo formal|正式收据
セルフレジ||🛒|self-checkout|caisse automatique|caja de autopago|自助收银机
じどうはんばいき|自動販売機|🥤|vending machine|distributeur automatique|máquina expendedora|自动售货机
ひゃくえんショップ|百円ショップ|🪙|100-yen shop|magasin à 100 yens|tienda de 100 yenes|百元店
ドラッグストア||💊|drugstore|drugstore|droguería|药妆店
たくはいびん|宅配便|📦|parcel delivery service|service de livraison de colis|servicio de paquetería|快递
しょうみきげん|賞味期限|📅|best-before date|date de consommation recommandée|fecha de consumo preferente|保质期
シャンプー||🧴|shampoo|shampoing|champú|洗发水
はみがきこ|歯磨き粉|🪥|toothpaste|dentifrice|pasta de dientes|牙膏
トイレットペーパー||🧻|toilet paper|papier toilette|papel higiénico|卫生纸
ティッシュ||🤧|tissues|mouchoirs en papier|pañuelos de papel|纸巾
せんざい|洗剤|🧴|detergent|lessive, détergent|detergente|洗涤剂
つめかえ|詰め替え|🔄|refill pack|recharge|recambio|补充装
スポンジ||🧽|sponge|éponge|esponja|海绵
ラップ||🥡|plastic wrap|film alimentaire|film transparente|保鲜膜
ほうちょう|包丁|🔪|kitchen knife|couteau de cuisine|cuchillo de cocina|菜刀
まないた|まな板|🍽️|chopping board|planche à découper|tabla de cortar|砧板
ハンカチ|||handkerchief|mouchoir en tissu|pañuelo|手帕
マスク||😷|face mask|masque|mascarilla|口罩
ばんそうこう|絆創膏|🩹|plaster|pansement|tirita|创可贴
めぐすり|目薬|💧|eye drops|collyre|colirio|眼药水
かぜぐすり|風邪薬|💊|cold medicine|médicament contre le rhume|medicina para el resfriado|感冒药
カイロ||🔥|disposable hand warmer|chaufferette jetable|calentador de bolsillo|暖宝宝
ボールペン||🖊️|ballpoint pen|stylo à bille|bolígrafo|圆珠笔
ふせん|付箋|📝|sticky note|note adhésive|nota adhesiva|便利贴
ふうとう|封筒|✉️|envelope|enveloppe|sobre|信封
びんせん|便箋|📄|letter paper|papier à lettres|papel de carta|信纸
じょうぎ|定規|📏|ruler|règle|regla|尺子
ホッチキス||📎|stapler|agrafeuse|grapadora|订书机
ぶんべつ|分別|♻️|sorting rubbish|tri des déchets|separación de basura|垃圾分类
もえるゴミ|燃えるゴミ|🔥|burnable rubbish|déchets combustibles|basura combustible|可燃垃圾
もえないゴミ|燃えないゴミ|🚫|non-burnable rubbish|déchets non combustibles|basura no combustible|不可燃垃圾
しげんゴミ|資源ゴミ|♻️|recyclable waste|déchets recyclables|residuos reciclables|可回收垃圾
そだいゴミ|粗大ゴミ|🛋️|oversized rubbish|encombrants|basura voluminosa|大件垃圾
ゴミぶくろ|ゴミ袋|🗑️|rubbish bag|sac-poubelle|bolsa de basura|垃圾袋
ペットボトル||🧴|plastic drink bottle|bouteille en plastique|botella de plástico|塑料瓶
あきかん|空き缶|🥫|empty can|canette vide|lata vacía|空罐
だんボール|段ボール|📦|cardboard|carton|cartón|瓦楞纸箱
リサイクル||♻️|recycling|recyclage|reciclaje|回收利用
おみやげ|お土産|🎁|souvenir gift|souvenir à offrir|recuerdo para regalar|伴手礼
おちゅうげん|お中元|🎁|summer gift|cadeau de l’été|regalo de verano|中元节礼物
おせいぼ|お歳暮|🎁|year-end gift|cadeau de fin d’année|regalo de fin de año|年终礼物
のしがみ|のし紙|🎀|gift paper band|bande de papier cadeau|banda de papel para regalo|礼品封纸
ふろしき|風呂敷|🧣|wrapping cloth|tissu d’emballage|paño para envolver|包袱布
ほうそう|包装|🎀|gift wrapping|emballage|envoltorio|包装
`,
  phrases: [
    line('{袋|ふくろ}はいりません。', 'I don’t need a bag.', 'Je n’ai pas besoin de sac.', 'No necesito bolsa.', '不用袋子。'),
    line('{袋|ふくろ}をお{願|ねが}いします。', 'A bag, please.', 'Un sac, s’il vous plaît.', 'Una bolsa, por favor.', '请给我一个袋子。'),
    line('お{弁当|べんとう}を{温|あたた}めてください。', 'Could you heat up the bento, please?', 'Pourriez-vous réchauffer le bento ?', '¿Me calienta el bentō, por favor?', '请帮我把便当加热一下。'),
    line('お{箸|はし}をつけてください。', 'Could I have some chopsticks with that?', 'Vous pouvez ajouter des baguettes ?', '¿Me pone unos palillos, por favor?', '请给我一双筷子。'),
    line('カードで{払|はら}えますか。', 'Can I pay by card?', 'Je peux payer par carte ?', '¿Puedo pagar con tarjeta?', '可以刷卡吗？'),
    line('{現金|げんきん}でお{願|ねが}いします。', 'I’ll pay in cash, please.', 'Je vais payer en espèces.', 'En efectivo, por favor.', '我付现金。'),
    line('ポイントカードは{持|も}っていません。', 'I don’t have a point card.', 'Je n’ai pas de carte de fidélité.', 'No tengo tarjeta de puntos.', '我没有积分卡。'),
    line('{領収書|りょうしゅうしょ}をください。', 'Could I have a formal receipt?', 'Je pourrais avoir un reçu officiel ?', '¿Me da un recibo formal?', '请给我开一张正式收据。'),
    line('{税込|ぜいこ}みでいくらですか。', 'How much is it with tax?', 'Ça fait combien, taxe comprise ?', '¿Cuánto es con impuestos?', '含税多少钱？'),
    line('{電池|でんち}はどこにありますか。', 'Where are the batteries?', 'Où sont les piles ?', '¿Dónde están las pilas?', '电池在哪里？'),
    line('{頭痛|ずつう}の{薬|くすり}はありますか。', 'Do you have anything for a headache?', 'Vous avez quelque chose contre le mal de tête ?', '¿Tienen algo para el dolor de cabeza?', '有治头痛的药吗？'),
    line('{贈|おく}り{物|もの}なので、{包|つつ}んでいただけますか。', 'It’s a gift. Could you wrap it, please?', 'C’est pour offrir. Pourriez-vous l’emballer ?', 'Es para regalo. ¿Me lo envuelve, por favor?', '这是送人的，可以帮我包装一下吗？'),
    line('これは{何|なに}ゴミですか。', 'Which kind of rubbish is this?', 'Ça va dans quels déchets ?', '¿En qué tipo de basura va esto?', '这个属于哪类垃圾？'),
    line('{燃|も}えるゴミの{日|ひ}はいつですか。', 'When is burnable rubbish day?', 'C’est quand, le jour des déchets combustibles ?', '¿Qué día se saca la basura combustible?', '可燃垃圾哪天收？'),
    line('{粗大|そだい}ゴミはどうやって{出|だ}せばいいですか。', 'How do I put out oversized rubbish?', 'Comment faire pour jeter des encombrants ?', '¿Cómo se saca la basura voluminosa?', '大件垃圾要怎么扔？'),
  ],
  links: [
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Convenience_stores_in_Japan', tr('Photos of Japanese convenience stores', 'Photos de konbini japonais', 'Fotos de konbinis japoneses', '日本便利店图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Supermarkets_in_Japan', tr('Photos of Japanese supermarkets', 'Photos de supermarchés japonais', 'Fotos de supermercados japoneses', '日本超市图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Drugstores_in_Japan', tr('Photos of Japanese drugstores', 'Photos de drugstores japonais', 'Fotos de droguerías japonesas', '日本药妆店图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Daiso', tr('Photos of a 100-yen shop chain', 'Photos d’une chaîne de magasins à 100 yens', 'Fotos de una cadena de tiendas de 100 yenes', '百元连锁店图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Waste_containers_in_Japan', tr('Photos of rubbish bins in Japan', 'Photos de poubelles au Japon', 'Fotos de contenedores en Japón', '日本垃圾桶图片')),
    link('photo', 'Wikimedia Commons', 'https://commons.wikimedia.org/wiki/Category:Noshi', tr('Photos of noshi gift decorations', 'Photos de décorations noshi', 'Fotos de adornos noshi', '熨斗礼品装饰图片')),
    link('video', 'FamilyMart (YouTube)', 'https://www.youtube.com/@familymart', tr('Official channel of a convenience-store chain', 'Chaîne officielle d’une enseigne de konbini', 'Canal oficial de una cadena de konbinis', '便利店连锁官方频道')),
    link('video', 'NHK WORLD-JAPAN (YouTube)', 'https://www.youtube.com/@NHKWORLDJAPAN', tr('Life in Japan from the public broadcaster', 'La vie au Japon par le diffuseur public', 'La vida en Japón según la televisión pública', '日本公共广播机构带你看日本生活')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/100-yen_shop', tr('Encyclopedia article on 100-yen shops', 'Article encyclopédique sur les magasins à 100 yens', 'Artículo enciclopédico sobre las tiendas de 100 yenes', '百元店百科条目')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/Waste_management_in_Japan', tr('How waste is handled in Japan', 'La gestion des déchets au Japon', 'La gestión de residuos en Japón', '日本的垃圾处理')),
    link('guide', 'Wikipedia', 'https://en.wikipedia.org/wiki/Omiyage', tr('Encyclopedia article on omiyage gifts', 'Article encyclopédique sur les omiyage', 'Artículo enciclopédico sobre los omiyage', '伴手礼百科条目')),
    link('guide', 'Ministry of the Environment, Japan', 'https://www.env.go.jp/en/recycle/', tr('Official waste and recycling policy', 'Politique officielle des déchets et du recyclage', 'Política oficial de residuos y reciclaje', '官方垃圾与回收政策')),
    link('guide', 'Council for PET Bottle Recycling', 'https://www.petbottle-rec.gr.jp/english/', tr('How PET bottles are recycled', 'Le recyclage des bouteilles en PET', 'Cómo se reciclan las botellas de PET', 'PET瓶如何回收')),
  ],
};
