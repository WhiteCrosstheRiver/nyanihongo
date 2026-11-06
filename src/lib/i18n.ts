import { createContext, useContext } from 'react';
import type { CategoryId } from '../data/vocab';
import type { FormGroup } from '../data/forms';

export const LANGS = ['en', 'fr', 'es', 'zh'] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_NAMES: Record<Lang, string> = { en: 'English', fr: 'Français', es: 'Español', zh: '简体中文' };

const en = {
  home: 'Home', kana: 'Kana', words: 'Words', verbs: 'Verbs', camera: 'Camera', read: 'Reading', me: 'Me',
  greeting: 'Nyan! Ready to learn?', dailyGoal: 'Daily goal', streak: 'day streak', xp: 'points today',
  reviewDue: 'words to review', reviewNow: 'Review now', noReview: 'No reviews right now. Learn new words!',
  continueLearning: 'Choose a lesson',
  hiragana: 'Hiragana', katakana: 'Katakana', chart: 'Chart', quiz: 'Quiz', trace: 'Tracing',
  kanaQuizHint: 'Which sound is this?', tracePrompt: 'Draw along the stroke order', replay: 'Replay', clear: 'Clear', next: 'Next',
  strokeOf: 'strokes',
  categories: 'Categories', flashcards: 'Flashcards', pictureQuiz: 'Picture quiz', pictureDesc: 'See a picture, pick or type the noun',
  learnSet: 'Learn this set', wordsLearned: 'words learned', showAnswer: 'Show answer',
  again: 'Again', hard: 'Hard', good: 'Good', easy: 'Easy',
  whichWord: 'Which word is this?', typeWord: 'Type the word in kana',
  verbPractice: 'Conjugation practice', verbTable: 'Verb tables', forms: 'Forms', verbTypes: 'Verb types',
  exerciseTypes: 'Exercise types', start: 'Start', selectAll: 'All', selectNone: 'None',
  ichidan: 'Ichidan (る)', godan: 'Godan (う)', suru: 'する verbs', kuru: '来る verbs',
  exType: 'Type the form', exIdentify: 'Name the form', exDictionary: 'Find dictionary form', exListen: 'Listen and choose', exSentence: 'Fill the sentence',
  qType: 'Conjugate this verb', qIdentify: 'Which form is this?', qDictionary: 'What is the dictionary form?', qListen: 'Which form did you hear?', qSentence: 'Complete the sentence',
  searchVerb: 'Search verbs', notAvailable: 'not used', romajiHint: 'Type in romaji or Japanese',
  check: 'Check', correct: 'Correct!', wrong: 'Not quite', theAnswer: 'Answer', finish: 'Finish', score: 'Score', again2: 'Play again', back: 'Back', play: 'Listen',
  niceJob: 'Great job!', keepGoing: 'Keep going, you can do it!',
  cameraTitle: 'What is this?', cameraHint: 'Point at an object or choose a photo. Nothing leaves your device.',
  startCamera: 'Open camera', stopCamera: 'Close camera', capture: 'Recognize', upload: 'Choose photo', loadingModel: 'Waking up the model…', thinking: 'Thinking…',
  topGuesses: 'Top guesses', notInList: 'Not in my word list yet', cameraError: 'The camera could not start. Try choosing a photo instead.', modelError: 'The recognition model could not load.',
  noMatch: 'I am not sure what this is. Try a closer photo of one object.', addReview: 'Add to review', added: 'Added!',
  stories: 'Stories', sentences: 'Sentences', sentenceQuiz: 'Sentence meaning', sentenceDesc: 'Read a sentence and choose its meaning', showTranslation: 'Show translation', hideTranslation: 'Hide translation', questions: 'Questions', furigana: 'Furigana', whatMeans: 'What does this mean?',
  stickers: 'Sticker book', settings: 'Settings', language: 'Language', theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark', sound: 'Sound effects', dailyTarget: 'Daily points goal', credits: 'Credits', reset: 'Reset progress', resetConfirm: 'Erase all progress? Tap again to confirm.', on: 'On', off: 'Off',
  voiceMissing: 'No Japanese voice found on this device. Install one in your system settings to hear audio.',
  stickerUnlocked: 'New sticker!', locked: 'Keep learning to unlock',
  daily: "Today's lesson", dailyDesc: "A short mix made for you: new words, reviews, verbs, grammar and listening", dailyStart: "Start lesson", dailyDone: "Done for today!", dailyAgain: "Practice more", newWord: "New word", gotIt: "Got it!", listen: "Listening", qDictation: "Type what you hear", qListenMeaning: "What does this word mean?", qListenSentence: "What does this sentence mean?", qPair: "Which one did you hear?", slowly: "Slowly", noVoiceListen: "No Japanese voice on this device, so you will read the text instead of hearing it. Install a Japanese voice in your system settings for real listening practice.", grammar: "Grammar", particles: "Particles", particlesDesc: "Choose the particle that fits the sentence", adjForms: "Adjective forms", adjDesc: "Past, negative and more for い and な adjectives", particleGuide: "Particle guide", guideDesc: "What each particle does", qParticle: "Choose the right particle", qAdjType: "Conjugate this adjective", iAdj: "い-adjective", naAdj: "な-adjective", backupTitle: "Backup", backupHint: "Save your progress to a file, then restore it after reinstalling or on another device.", backupSave: "Save backup", backupLoad: "Restore backup", backupSaved: "Backup saved!", backupFailed: "The backup could not be saved.", backupBad: "This file is not a Nyanihongo backup.", backupConfirm: "Replace your current progress with this backup?", backupReplace: "Replace", cancel: "Cancel", restored: "Progress restored!", offlineTitle: "Offline use", offlineBuiltIn: "Everything is built into this app, so you can study with no connection.", offlineReady: "All set. Everything is saved, so you can study with no connection.", offlineSaving: "Saving lessons for offline use", offlineWaiting: "Waiting for a connection to finish saving", offlineNone: "This browser cannot save the app for offline use.",
};
export type Key = keyof typeof en;

const fr: Record<Key, string> = {
  home: 'Accueil', kana: 'Kana', words: 'Mots', verbs: 'Verbes', camera: 'Caméra', read: 'Lecture', me: 'Moi',
  greeting: 'Nyan ! Prêt à apprendre ?', dailyGoal: 'Objectif du jour', streak: 'jours de suite', xp: 'points aujourd\'hui',
  reviewDue: 'mots à réviser', reviewNow: 'Réviser', noReview: 'Rien à réviser. Apprends de nouveaux mots !',
  continueLearning: 'Choisis une leçon',
  hiragana: 'Hiragana', katakana: 'Katakana', chart: 'Tableau', quiz: 'Quiz', trace: 'Tracé',
  kanaQuizHint: 'Quel est ce son ?', tracePrompt: "Suis l'ordre des traits", replay: 'Revoir', clear: 'Effacer', next: 'Suivant',
  strokeOf: 'traits',
  categories: 'Catégories', flashcards: 'Cartes', pictureQuiz: 'Quiz en images', pictureDesc: 'Regarde une image, choisis ou écris le nom',
  learnSet: 'Apprendre cette série', wordsLearned: 'mots appris', showAnswer: 'Voir la réponse',
  again: 'Encore', hard: 'Difficile', good: 'Bien', easy: 'Facile',
  whichWord: 'Quel est ce mot ?', typeWord: 'Écris le mot en kana',
  verbPractice: 'Entraînement', verbTable: 'Tableaux de verbes', forms: 'Formes', verbTypes: 'Types de verbes',
  exerciseTypes: "Types d'exercices", start: 'Commencer', selectAll: 'Tout', selectNone: 'Rien',
  ichidan: 'Ichidan (る)', godan: 'Godan (う)', suru: 'Verbes する', kuru: 'Verbes 来る',
  exType: 'Écrire la forme', exIdentify: 'Nommer la forme', exDictionary: 'Forme du dictionnaire', exListen: 'Écouter et choisir', exSentence: 'Compléter la phrase',
  qType: 'Conjugue ce verbe', qIdentify: 'Quelle est cette forme ?', qDictionary: 'Quelle est la forme du dictionnaire ?', qListen: 'Quelle forme as-tu entendue ?', qSentence: 'Complète la phrase',
  searchVerb: 'Chercher un verbe', notAvailable: 'non utilisé', romajiHint: 'Écris en romaji ou en japonais',
  check: 'Vérifier', correct: 'Correct !', wrong: 'Pas tout à fait', theAnswer: 'Réponse', finish: 'Terminer', score: 'Score', again2: 'Rejouer', back: 'Retour', play: 'Écouter',
  niceJob: 'Bravo !', keepGoing: 'Continue, tu peux le faire !',
  cameraTitle: "Qu'est-ce que c'est ?", cameraHint: "Vise un objet ou choisis une photo. Rien ne quitte ton appareil.",
  startCamera: 'Ouvrir la caméra', stopCamera: 'Fermer la caméra', capture: 'Reconnaître', upload: 'Choisir une photo', loadingModel: 'Le modèle se réveille…', thinking: 'Je réfléchis…',
  topGuesses: 'Meilleures suppositions', notInList: "Pas encore dans ma liste", cameraError: "La caméra n'a pas démarré. Choisis plutôt une photo.", modelError: "Le modèle n'a pas pu être chargé.",
  noMatch: "Je ne suis pas sûr. Essaie une photo plus proche d'un seul objet.", addReview: 'Ajouter aux révisions', added: 'Ajouté !',
  stories: 'Histoires', sentences: 'Phrases', sentenceQuiz: 'Sens des phrases', sentenceDesc: 'Lis une phrase et choisis son sens', showTranslation: 'Voir la traduction', hideTranslation: 'Masquer la traduction', questions: 'Questions', furigana: 'Furigana', whatMeans: 'Que veut dire ceci ?',
  stickers: 'Album de stickers', settings: 'Réglages', language: 'Langue', theme: 'Thème', themeAuto: 'Auto', themeLight: 'Clair', themeDark: 'Sombre', sound: 'Effets sonores', dailyTarget: 'Objectif de points', credits: 'Crédits', reset: 'Réinitialiser', resetConfirm: 'Tout effacer ? Touche encore pour confirmer.', on: 'Oui', off: 'Non',
  voiceMissing: "Aucune voix japonaise sur cet appareil. Installe-en une dans les réglages système.",
  stickerUnlocked: 'Nouveau sticker !', locked: 'Continue pour le débloquer',
  daily: "Leçon du jour", dailyDesc: "Un petit mélange pour toi : mots nouveaux, révisions, verbes, grammaire et écoute", dailyStart: "Commencer", dailyDone: "C'est fini pour aujourd'hui !", dailyAgain: "Continuer à pratiquer", newWord: "Nouveau mot", gotIt: "Compris !", listen: "Écoute", qDictation: "Écris ce que tu entends", qListenMeaning: "Que signifie ce mot ?", qListenSentence: "Que signifie cette phrase ?", qPair: "Lequel as-tu entendu ?", slowly: "Lentement", noVoiceListen: "Aucune voix japonaise sur cet appareil : tu liras le texte au lieu de l'entendre. Installe une voix japonaise dans les réglages du système pour un vrai entraînement.", grammar: "Grammaire", particles: "Particules", particlesDesc: "Choisis la particule qui convient", adjForms: "Formes des adjectifs", adjDesc: "Passé, négatif et plus pour les adjectifs en い et な", particleGuide: "Guide des particules", guideDesc: "Le rôle de chaque particule", qParticle: "Choisis la bonne particule", qAdjType: "Conjugue cet adjectif", iAdj: "adjectif en い", naAdj: "adjectif en な", backupTitle: "Sauvegarde", backupHint: "Enregistre ta progression dans un fichier, puis restaure-la après une réinstallation ou sur un autre appareil.", backupSave: "Enregistrer", backupLoad: "Restaurer", backupSaved: "Sauvegarde enregistrée !", backupFailed: "La sauvegarde n'a pas pu être enregistrée.", backupBad: "Ce fichier n'est pas une sauvegarde Nyanihongo.", backupConfirm: "Remplacer ta progression actuelle par cette sauvegarde ?", backupReplace: "Remplacer", cancel: "Annuler", restored: "Progression restaurée !", offlineTitle: "Hors ligne", offlineBuiltIn: "Tout est intégré à l'application : tu peux étudier sans connexion.", offlineReady: "Tout est prêt : tu peux étudier sans connexion.", offlineSaving: "Enregistrement des leçons pour le hors-ligne", offlineWaiting: "En attente d'une connexion pour terminer", offlineNone: "Ce navigateur ne peut pas enregistrer l'application hors ligne.",
};

const es: Record<Key, string> = {
  home: 'Inicio', kana: 'Kana', words: 'Palabras', verbs: 'Verbos', camera: 'Cámara', read: 'Lectura', me: 'Yo',
  greeting: '¡Nyan! ¿Listo para aprender?', dailyGoal: 'Meta diaria', streak: 'días seguidos', xp: 'puntos hoy',
  reviewDue: 'palabras por repasar', reviewNow: 'Repasar', noReview: 'Nada que repasar. ¡Aprende palabras nuevas!',
  continueLearning: 'Elige una lección',
  hiragana: 'Hiragana', katakana: 'Katakana', chart: 'Tabla', quiz: 'Prueba', trace: 'Trazos',
  kanaQuizHint: '¿Qué sonido es?', tracePrompt: 'Sigue el orden de los trazos', replay: 'Repetir', clear: 'Borrar', next: 'Siguiente',
  strokeOf: 'trazos',
  categories: 'Categorías', flashcards: 'Tarjetas', pictureQuiz: 'Prueba con imágenes', pictureDesc: 'Mira una imagen y elige o escribe el nombre',
  learnSet: 'Aprender este grupo', wordsLearned: 'palabras aprendidas', showAnswer: 'Ver respuesta',
  again: 'Otra vez', hard: 'Difícil', good: 'Bien', easy: 'Fácil',
  whichWord: '¿Qué palabra es?', typeWord: 'Escribe la palabra en kana',
  verbPractice: 'Práctica de conjugación', verbTable: 'Tablas de verbos', forms: 'Formas', verbTypes: 'Tipos de verbo',
  exerciseTypes: 'Tipos de ejercicio', start: 'Empezar', selectAll: 'Todo', selectNone: 'Nada',
  ichidan: 'Ichidan (る)', godan: 'Godan (う)', suru: 'Verbos する', kuru: 'Verbos 来る',
  exType: 'Escribir la forma', exIdentify: 'Nombrar la forma', exDictionary: 'Forma de diccionario', exListen: 'Escuchar y elegir', exSentence: 'Completar la frase',
  qType: 'Conjuga este verbo', qIdentify: '¿Qué forma es?', qDictionary: '¿Cuál es la forma de diccionario?', qListen: '¿Qué forma has oído?', qSentence: 'Completa la frase',
  searchVerb: 'Buscar verbos', notAvailable: 'no se usa', romajiHint: 'Escribe en romaji o japonés',
  check: 'Comprobar', correct: '¡Correcto!', wrong: 'Casi', theAnswer: 'Respuesta', finish: 'Terminar', score: 'Puntuación', again2: 'Jugar otra vez', back: 'Volver', play: 'Escuchar',
  niceJob: '¡Muy bien!', keepGoing: '¡Sigue así, tú puedes!',
  cameraTitle: '¿Qué es esto?', cameraHint: 'Apunta a un objeto o elige una foto. Nada sale de tu dispositivo.',
  startCamera: 'Abrir cámara', stopCamera: 'Cerrar cámara', capture: 'Reconocer', upload: 'Elegir foto', loadingModel: 'Despertando el modelo…', thinking: 'Pensando…',
  topGuesses: 'Mejores opciones', notInList: 'Aún no está en mi lista', cameraError: 'La cámara no pudo iniciarse. Prueba a elegir una foto.', modelError: 'No se pudo cargar el modelo.',
  noMatch: 'No estoy seguro. Prueba con una foto más cercana de un solo objeto.', addReview: 'Añadir al repaso', added: '¡Añadido!',
  stories: 'Historias', sentences: 'Frases', sentenceQuiz: 'Significado de frases', sentenceDesc: 'Lee una frase y elige su significado', showTranslation: 'Ver traducción', hideTranslation: 'Ocultar traducción', questions: 'Preguntas', furigana: 'Furigana', whatMeans: '¿Qué significa esto?',
  stickers: 'Álbum de pegatinas', settings: 'Ajustes', language: 'Idioma', theme: 'Tema', themeAuto: 'Auto', themeLight: 'Claro', themeDark: 'Oscuro', sound: 'Efectos de sonido', dailyTarget: 'Meta de puntos', credits: 'Créditos', reset: 'Reiniciar progreso', resetConfirm: '¿Borrar todo? Toca de nuevo para confirmar.', on: 'Sí', off: 'No',
  voiceMissing: 'No hay voz japonesa en este dispositivo. Instala una en los ajustes del sistema.',
  stickerUnlocked: '¡Nueva pegatina!', locked: 'Sigue aprendiendo para desbloquearla',
  daily: "Lección de hoy", dailyDesc: "Una mezcla corta para ti: palabras nuevas, repasos, verbos, gramática y escucha", dailyStart: "Empezar", dailyDone: "¡Listo por hoy!", dailyAgain: "Practicar más", newWord: "Palabra nueva", gotIt: "¡Entendido!", listen: "Escucha", qDictation: "Escribe lo que oyes", qListenMeaning: "¿Qué significa esta palabra?", qListenSentence: "¿Qué significa esta frase?", qPair: "¿Cuál has oído?", slowly: "Despacio", noVoiceListen: "No hay voz japonesa en este dispositivo, así que leerás el texto en lugar de oírlo. Instala una voz japonesa en los ajustes del sistema para practicar de verdad.", grammar: "Gramática", particles: "Partículas", particlesDesc: "Elige la partícula que encaja en la frase", adjForms: "Formas de adjetivos", adjDesc: "Pasado, negativo y más para adjetivos con い y な", particleGuide: "Guía de partículas", guideDesc: "Qué hace cada partícula", qParticle: "Elige la partícula correcta", qAdjType: "Conjuga este adjetivo", iAdj: "adjetivo con い", naAdj: "adjetivo con な", backupTitle: "Copia de seguridad", backupHint: "Guarda tu progreso en un archivo y restáuralo tras reinstalar o en otro dispositivo.", backupSave: "Guardar copia", backupLoad: "Restaurar copia", backupSaved: "¡Copia guardada!", backupFailed: "No se pudo guardar la copia.", backupBad: "Este archivo no es una copia de Nyanihongo.", backupConfirm: "¿Reemplazar tu progreso actual con esta copia?", backupReplace: "Reemplazar", cancel: "Cancelar", restored: "¡Progreso restaurado!", offlineTitle: "Sin conexión", offlineBuiltIn: "Todo está integrado en la app, así que puedes estudiar sin conexión.", offlineReady: "Todo listo: puedes estudiar sin conexión.", offlineSaving: "Guardando lecciones para usar sin conexión", offlineWaiting: "Esperando conexión para terminar de guardar", offlineNone: "Este navegador no puede guardar la app para usarla sin conexión.",
};

const zh: Record<Key, string> = {
  home: '首页', kana: '假名', words: '单词', verbs: '动词', camera: '相机', read: '阅读', me: '我的',
  greeting: '喵!准备好学习了吗?', dailyGoal: '每日目标', streak: '天连续', xp: '今日积分',
  reviewDue: '个单词待复习', reviewNow: '开始复习', noReview: '现在没有要复习的,学点新单词吧!',
  continueLearning: '选择课程',
  hiragana: '平假名', katakana: '片假名', chart: '图表', quiz: '测验', trace: '描写',
  kanaQuizHint: '这个怎么读?', tracePrompt: '按笔顺描写', replay: '重播', clear: '清除', next: '下一个',
  strokeOf: '笔',
  categories: '分类', flashcards: '单词卡', pictureQuiz: '看图测验', pictureDesc: '看图片,选择或输入名词',
  learnSet: '学习这一组', wordsLearned: '个单词已学', showAnswer: '显示答案',
  again: '重来', hard: '困难', good: '良好', easy: '简单',
  whichWord: '这是哪个词?', typeWord: '用假名输入这个词',
  verbPractice: '变形练习', verbTable: '动词变形表', forms: '变形', verbTypes: '动词类型',
  exerciseTypes: '练习类型', start: '开始', selectAll: '全选', selectNone: '全不选',
  ichidan: '一段动词 (る)', godan: '五段动词 (う)', suru: 'する动词', kuru: '来る动词',
  exType: '输入变形', exIdentify: '说出变形名称', exDictionary: '找出辞书形', exListen: '听音选择', exSentence: '填空',
  qType: '请变形这个动词', qIdentify: '这是什么变形?', qDictionary: '辞书形是什么?', qListen: '你听到的是哪个?', qSentence: '完成句子',
  searchVerb: '搜索动词', notAvailable: '不使用', romajiHint: '用罗马字或日语输入',
  check: '检查', correct: '正确!', wrong: '差一点', theAnswer: '答案', finish: '完成', score: '得分', again2: '再来一次', back: '返回', play: '听',
  niceJob: '太棒了!', keepGoing: '继续加油,你可以的!',
  cameraTitle: '这是什么?', cameraHint: '对准物体或选择照片。任何内容都不会离开你的设备。',
  startCamera: '打开相机', stopCamera: '关闭相机', capture: '识别', upload: '选择照片', loadingModel: '正在唤醒模型…', thinking: '思考中…',
  topGuesses: '最可能的结果', notInList: '还不在我的单词表里', cameraError: '相机无法启动,请改为选择照片。', modelError: '识别模型加载失败。',
  noMatch: '我不太确定。请拍一张更近的单个物体的照片。', addReview: '加入复习', added: '已加入!',
  stories: '短文', sentences: '句子', sentenceQuiz: '句子含义', sentenceDesc: '读句子,选择它的意思', showTranslation: '显示翻译', hideTranslation: '隐藏翻译', questions: '问题', furigana: '注音', whatMeans: '这是什么意思?',
  stickers: '贴纸册', settings: '设置', language: '语言', theme: '主题', themeAuto: '自动', themeLight: '浅色', themeDark: '深色', sound: '音效', dailyTarget: '每日积分目标', credits: '致谢', reset: '重置进度', resetConfirm: '要清除所有进度吗?再点一次确认。', on: '开', off: '关',
  voiceMissing: '此设备没有日语语音。请在系统设置中安装后再收听。',
  stickerUnlocked: '新贴纸!', locked: '继续学习即可解锁',
  daily: "今日课程", dailyDesc: "为你准备的小组合:新单词、复习、动词、语法和听力", dailyStart: "开始学习", dailyDone: "今天完成啦!", dailyAgain: "继续练习", newWord: "新单词", gotIt: "记住了!", listen: "听力", qDictation: "写下你听到的内容", qListenMeaning: "这个词是什么意思?", qListenSentence: "这句话是什么意思?", qPair: "你听到的是哪一个?", slowly: "慢速", noVoiceListen: "此设备没有日语语音,所以会显示文字而不是播放声音。请在系统设置中安装日语语音,才能进行真正的听力练习。", grammar: "语法", particles: "助词", particlesDesc: "选择适合句子的助词", adjForms: "形容词变形", adjDesc: "い形容词和な形容词的过去、否定等形式", particleGuide: "助词指南", guideDesc: "每个助词的作用", qParticle: "选择正确的助词", qAdjType: "变换这个形容词", iAdj: "い形容词", naAdj: "な形容词", backupTitle: "备份", backupHint: "把学习进度保存为文件,重装后或在其他设备上即可恢复。", backupSave: "保存备份", backupLoad: "恢复备份", backupSaved: "备份已保存!", backupFailed: "无法保存备份。", backupBad: "这不是 Nyanihongo 备份文件。", backupConfirm: "用这个备份替换当前进度吗?", backupReplace: "替换", cancel: "取消", restored: "进度已恢复!", offlineTitle: "离线使用", offlineBuiltIn: "所有内容都内置在应用中,无需网络也能学习。", offlineReady: "准备好了!所有内容已保存,无需网络也能学习。", offlineSaving: "正在保存课程以供离线使用", offlineWaiting: "等待网络连接以完成保存", offlineNone: "此浏览器无法保存应用以供离线使用。",
};

export const STRINGS: Record<Lang, Record<Key, string>> = { en, fr, es, zh };

export const CATEGORY_NAMES: Record<CategoryId, Record<Lang, string>> = {
  animals: { en: 'Animals', fr: 'Animaux', es: 'Animales', zh: '动物' },
  food: { en: 'Food & drink', fr: 'Nourriture', es: 'Comida', zh: '食物' },
  body: { en: 'Body', fr: 'Corps', es: 'Cuerpo', zh: '身体' },
  people: { en: 'People', fr: 'Personnes', es: 'Personas', zh: '人物' },
  home: { en: 'Home', fr: 'Maison', es: 'Casa', zh: '家居' },
  clothes: { en: 'Clothes', fr: 'Vêtements', es: 'Ropa', zh: '服饰' },
  nature: { en: 'Nature & weather', fr: 'Nature et météo', es: 'Naturaleza', zh: '自然与天气' },
  transport: { en: 'Transport', fr: 'Transports', es: 'Transporte', zh: '交通' },
  places: { en: 'Places', fr: 'Lieux', es: 'Lugares', zh: '地点' },
  school: { en: 'School & hobbies', fr: 'École et loisirs', es: 'Escuela y aficiones', zh: '学校与爱好' },
  time: { en: 'Time', fr: 'Temps', es: 'Tiempo', zh: '时间' },
  numbers: { en: 'Numbers', fr: 'Nombres', es: 'Números', zh: '数字' },
  life: { en: 'Daily life', fr: 'Vie quotidienne', es: 'Vida diaria', zh: '日常生活' },
  ideas: { en: 'Ideas & feelings', fr: 'Idées et sentiments', es: 'Ideas y sentimientos', zh: '想法与感受' },
  colors: { en: 'Colors', fr: 'Couleurs', es: 'Colores', zh: '颜色' },
  adjectives: { en: 'Adjectives', fr: 'Adjectifs', es: 'Adjetivos', zh: '形容词' },
  phrases: { en: 'Phrases', fr: 'Expressions', es: 'Expresiones', zh: '常用语' },
};

export const GROUP_NAMES: Record<FormGroup, Record<Lang, string>> = {
  polite: { en: 'Polite', fr: 'Poli', es: 'Cortés', zh: '礼貌' },
  plain: { en: 'Plain', fr: 'Neutre', es: 'Informal', zh: '简体' },
  voice: { en: 'Voice', fr: 'Voix', es: 'Voz', zh: '态' },
  mood: { en: 'Commands & will', fr: 'Ordres et volonté', es: 'Órdenes y voluntad', zh: '命令与意向' },
  condition: { en: 'Conditionals', fr: 'Conditionnels', es: 'Condicionales', zh: '条件' },
  desire: { en: 'Desire & while', fr: 'Désir et simultané', es: 'Deseo y simultáneo', zh: '愿望与同时' },
};

export const LangContext = createContext<Lang>('en');
export function useT() {
  const lang = useContext(LangContext);
  return { lang, t: (k: Key) => STRINGS[lang][k] };
}
