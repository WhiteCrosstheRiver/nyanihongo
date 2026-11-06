import type { Verb, VerbClass } from '../lib/conjugate';
import type { Lang } from '../lib/i18n';

export interface VerbEntry extends Verb { meaning: Record<Lang, string> }

// word|kana|class(1=ichidan 5=godan s=suru k=kuru, +t stative, +h honorific)|en|fr|es|zh
const RAW = `
食べる|たべる|1|to eat|manger|comer|吃
見る|みる|1|to see, to watch|voir, regarder|ver|看
起きる|おきる|1|to wake up|se réveiller|despertarse|起床
寝る|ねる|1|to go to bed|se coucher|acostarse|睡觉
着る|きる|1|to wear (clothes)|porter (un vêtement)|ponerse (ropa)|穿(衣服)
教える|おしえる|1|to teach, to tell|enseigner|enseñar|教
覚える|おぼえる|1|to memorize|mémoriser|memorizar|记住
忘れる|わすれる|1|to forget|oublier|olvidar|忘记
開ける|あける|1|to open|ouvrir|abrir|打开
閉める|しめる|1|to close|fermer|cerrar|关闭
始める|はじめる|1|to begin (something)|commencer|empezar|开始
止める|とめる|1|to stop (something)|arrêter|detener|停止
調べる|しらべる|1|to look up|vérifier, se renseigner|investigar|调查
答える|こたえる|1|to answer|répondre|responder|回答
考える|かんがえる|1|to think about|réfléchir|pensar|思考
借りる|かりる|1|to borrow|emprunter|pedir prestado|借入
降りる|おりる|1|to get off|descendre|bajarse|下车
浴びる|あびる|1|to take (a shower)|prendre (une douche)|tomar (una ducha)|淋(浴)
出る|でる|1|to leave, to go out|sortir|salir|出去
入れる|いれる|1|to put in|mettre dans|meter|放入
出かける|でかける|1|to go out|sortir|salir|外出
掛ける|かける|1|to hang, to make (a call)|accrocher|colgar|挂
つける|つける|1|to turn on|allumer|encender|打开(电器)
見せる|みせる|1|to show|montrer|mostrar|给…看
捨てる|すてる|1|to throw away|jeter|tirar|扔掉
集める|あつめる|1|to collect|rassembler|reunir|收集
育てる|そだてる|1|to raise, to grow|élever|criar|培养
建てる|たてる|1|to build|construire|construir|建造
変える|かえる|1|to change (something)|changer|cambiar|改变
続ける|つづける|1|to continue|continuer|continuar|继续
決める|きめる|1|to decide|décider|decidir|决定
褒める|ほめる|1|to praise|féliciter|elogiar|表扬
比べる|くらべる|1|to compare|comparer|comparar|比较
信じる|しんじる|1|to believe|croire|creer|相信
感じる|かんじる|1|to feel|ressentir|sentir|感觉
疲れる|つかれる|1|to get tired|se fatiguer|cansarse|疲劳
遅れる|おくれる|1|to be late|être en retard|llegar tarde|迟到
生まれる|うまれる|1|to be born|naître|nacer|出生
負ける|まける|1|to lose (a game)|perdre|perder|输
受ける|うける|1|to receive, to take (an exam)|passer (un examen)|recibir|接受
助ける|たすける|1|to help, to save|aider, sauver|ayudar|帮助
届ける|とどける|1|to deliver|livrer|entregar|送到
並べる|ならべる|1|to line up|aligner|alinear|排列
数える|かぞえる|1|to count|compter|contar|数
迎える|むかえる|1|to welcome|accueillir|recibir|迎接
伝える|つたえる|1|to convey|transmettre|transmitir|传达
慣れる|なれる|1|to get used to|s'habituer|acostumbrarse|习惯
落ちる|おちる|1|to fall|tomber|caer|掉落
いる|いる|1|to exist (living things)|être, se trouver|estar|在
できる|できる|1t|to be able to|pouvoir|poder|能
見える|みえる|1t|to be visible|être visible|verse|看得见
聞こえる|きこえる|1t|to be audible|s'entendre|oírse|听得见
行く|いく|5|to go|aller|ir|去
書く|かく|5|to write|écrire|escribir|写
聞く|きく|5|to listen, to ask|écouter, demander|escuchar|听
歩く|あるく|5|to walk|marcher|caminar|走路
働く|はたらく|5|to work|travailler|trabajar|工作
泣く|なく|5|to cry|pleurer|llorar|哭
開く|あく|5|to open (by itself)|s'ouvrir|abrirse|开
着く|つく|5|to arrive|arriver|llegar|到达
置く|おく|5|to put, to place|poser|poner|放置
引く|ひく|5|to pull|tirer|tirar|拉
弾く|ひく|5|to play (an instrument)|jouer (d'un instrument)|tocar (un instrumento)|弹奏
履く|はく|5|to wear (shoes)|chausser|calzarse|穿(鞋)
咲く|さく|5|to bloom|fleurir|florecer|开花
急ぐ|いそぐ|5|to hurry|se dépêcher|apresurarse|赶快
泳ぐ|およぐ|5|to swim|nager|nadar|游泳
脱ぐ|ぬぐ|5|to take off (clothes)|enlever (un vêtement)|quitarse (ropa)|脱
話す|はなす|5|to speak|parler|hablar|说话
貸す|かす|5|to lend|prêter|prestar|借出
返す|かえす|5|to give back|rendre|devolver|归还
消す|けす|5|to turn off, to erase|éteindre, effacer|apagar, borrar|关掉
出す|だす|5|to take out, to send|sortir, envoyer|sacar|拿出
押す|おす|5|to push|pousser|empujar|推
探す|さがす|5|to look for|chercher|buscar|寻找
待つ|まつ|5|to wait|attendre|esperar|等
持つ|もつ|5|to hold, to have|tenir, avoir|sostener, tener|拿
立つ|たつ|5|to stand|se lever|ponerse de pie|站
勝つ|かつ|5|to win|gagner|ganar|赢
死ぬ|しぬ|5|to die|mourir|morir|死
遊ぶ|あそぶ|5|to play|jouer|jugar|玩
呼ぶ|よぶ|5|to call|appeler|llamar|叫
飛ぶ|とぶ|5|to fly|voler|volar|飞
選ぶ|えらぶ|5|to choose|choisir|elegir|选择
読む|よむ|5|to read|lire|leer|读
飲む|のむ|5|to drink|boire|beber|喝
休む|やすむ|5|to rest|se reposer|descansar|休息
住む|すむ|5|to live (somewhere)|habiter|vivir|居住
頼む|たのむ|5|to request|demander|pedir|请求
買う|かう|5|to buy|acheter|comprar|买
会う|あう|5|to meet|rencontrer|encontrarse|见面
言う|いう|5|to say|dire|decir|说
使う|つかう|5|to use|utiliser|usar|使用
習う|ならう|5|to learn|apprendre|aprender|学习
思う|おもう|5|to think|penser|creer|想
洗う|あらう|5|to wash|laver|lavar|洗
歌う|うたう|5|to sing|chanter|cantar|唱
笑う|わらう|5|to laugh|rire|reír|笑
払う|はらう|5|to pay|payer|pagar|付款
手伝う|てつだう|5|to help out|aider|ayudar|帮忙
吸う|すう|5|to inhale, to smoke|aspirer, fumer|fumar|吸
もらう|もらう|5|to receive|recevoir|recibir|收到
拾う|ひろう|5|to pick up|ramasser|recoger|捡
違う|ちがう|5t|to differ|être différent|ser diferente|不同
帰る|かえる|5|to go home|rentrer|volver a casa|回家
入る|はいる|5|to enter|entrer|entrar|进入
走る|はしる|5|to run|courir|correr|跑
知る|しる|5|to get to know|savoir|saber|知道
切る|きる|5|to cut|couper|cortar|切
作る|つくる|5|to make|fabriquer, préparer|hacer|做
乗る|のる|5|to ride, to board|monter (à bord)|subir|乘坐
取る|とる|5|to take|prendre|tomar|取
撮る|とる|5|to take (a photo)|photographier|fotografiar|拍摄
座る|すわる|5|to sit|s'asseoir|sentarse|坐
降る|ふる|5t|to fall (rain, snow)|tomber (pluie, neige)|caer (lluvia, nieve)|下(雨、雪)
曲がる|まがる|5|to turn|tourner|girar|转弯
渡る|わたる|5|to cross|traverser|cruzar|渡过
終わる|おわる|5|to end|finir|terminar|结束
始まる|はじまる|5|to begin (by itself)|commencer|empezar|开始
止まる|とまる|5|to stop (by itself)|s'arrêter|pararse|停
送る|おくる|5|to send|envoyer|enviar|发送
売る|うる|5|to sell|vendre|vender|卖
困る|こまる|5|to be in trouble|être embêté|tener problemas|为难
登る|のぼる|5|to climb|grimper|subir|攀登
太る|ふとる|5|to gain weight|grossir|engordar|发胖
触る|さわる|5|to touch|toucher|tocar|触摸
謝る|あやまる|5|to apologize|s'excuser|disculparse|道歉
守る|まもる|5|to protect|protéger|proteger|保护
眠る|ねむる|5|to fall asleep|s'endormir|dormirse|入睡
わかる|わかる|5t|to understand|comprendre|entender|明白
ある|ある|5t|to exist (things)|il y a|haber|有(物)
要る|いる|5t|to need|avoir besoin de|necesitar|需要
いらっしゃる|いらっしゃる|5h|to be, to come (honorific)|être, venir (honorifique)|estar, venir (honorífico)|在、来(敬语)
おっしゃる|おっしゃる|5h|to say (honorific)|dire (honorifique)|decir (honorífico)|说(敬语)
なさる|なさる|5h|to do (honorific)|faire (honorifique)|hacer (honorífico)|做(敬语)
くださる|くださる|5h|to give (honorific)|donner (honorifique)|dar (honorífico)|给(敬语)
する|する|s|to do|faire|hacer|做
勉強する|べんきょうする|s|to study|étudier|estudiar|学习
料理する|りょうりする|s|to cook|cuisiner|cocinar|做菜
掃除する|そうじする|s|to clean|nettoyer|limpiar|打扫
洗濯する|せんたくする|s|to do laundry|faire la lessive|lavar la ropa|洗衣服
買い物する|かいものする|s|to go shopping|faire les courses|ir de compras|购物
運動する|うんどうする|s|to exercise|faire du sport|hacer ejercicio|运动
旅行する|りょこうする|s|to travel|voyager|viajar|旅行
電話する|でんわする|s|to phone|téléphoner|llamar por teléfono|打电话
結婚する|けっこんする|s|to marry|se marier|casarse|结婚
練習する|れんしゅうする|s|to practice|s'entraîner|practicar|练习
散歩する|さんぽする|s|to take a walk|se promener|pasear|散步
説明する|せつめいする|s|to explain|expliquer|explicar|说明
連絡する|れんらくする|s|to contact|contacter|contactar|联系
約束する|やくそくする|s|to promise|promettre|prometer|约定
準備する|じゅんびする|s|to prepare|préparer|preparar|准备
質問する|しつもんする|s|to ask a question|poser une question|preguntar|提问
心配する|しんぱいする|s|to worry|s'inquiéter|preocuparse|担心
来る|くる|k|to come|venir|venir|来
持って来る|もってくる|k|to bring (a thing)|apporter|traer|带来
連れて来る|つれてくる|k|to bring (a person)|amener|traer (a alguien)|带(人)来
`;

const CLASSES: Record<string, VerbClass> = { '1': 'ichidan', '5': 'godan', s: 'suru', k: 'kuru' };

export const VERBS: VerbEntry[] = RAW.trim().split('\n').map((line) => {
  const [word, kana, c, en, fr, es, zh] = line.split('|');
  return {
    word, kana, cls: CLASSES[c[0]],
    stative: c.includes('t') || undefined,
    honorific: c.includes('h') || undefined,
    meaning: { en, fr, es, zh },
  };
});
