import { Language } from '../types';

export const translations: Record<Language, {
  appName: string;
  tagline: string;
  loginGoogle: string;
  loginEmail: string;
  or: string;
  termsNotice: string;
  welcomeTeacher: string;
  todayPrompt: string;
  createNewLesson: string;
  statLessons: string;
  statTimeSaved: string;
  statStudents: string;
  hours: string;
  recentLessons: string;
  view: string;
  play: string;
  ready: string;
  materialsCreated: string;
  lessonPlanTitle: string;
  lessonPlanDesc: string;
  matchGameTitle: string;
  matchGameDesc: string;
  quizTitle: string;
  quizDesc: string;
  model3DTitle: string;
  model3DDesc: string;
  viewSlides: string;
  startLesson: string;
  settings: string;
  languageSelect: string;
  theme: string;
  themeDark: string;
  themeLight: string;
  teacherProfile: string;
  fullName: string;
  schoolName: string;
  subjectSpecialty: string;
  saveSettings: string;
  close: string;
  back: string;
  newLessonModalTitle: string;
  topicLabel: string;
  topicPlaceholder: string;
  subjectLabel: string;
  materialLabel: string;
  dragDropText: string;
  orChooseFile: string;
  fileLimits: string;
  orEnterText: string;
  textPlaceholder: string;
  createLessonBtn: string;
  aiAnalyzing: string;
  aiGenerating: string;
  aiCompleted: string;
  lessonReadyNotice: string;
  changeWordsNotice: string;
  editTopicTitle: string;
  editTopicBtn: string;
  matchedPairs: string;
  moves: string;
  timer: string;
  congrats: string;
  playAgain: string;
  question: string;
  nextQuestion: string;
  quizCompleted: string;
  score: string;
  explanation: string;
  rotateInstructions: string;
  fullscreen: string;
  slide: string;
  nextSlide: string;
  prevSlide: string;
  teacherNotes: string;
  livePoll: string;
  understandWell: string;
  repeatPlease: string;
  studentsConnected: string;
  lectureVoiceSim: string;
  copyScript: string;
  copied: string;
}> = {
  kaa: {
    appName: "DARSIFY",
    tagline: "AI-POWERED EDUCATION",
    loginGoogle: "Google menen kiriw",
    loginEmail: "Email menen kiriw",
    or: "yamasa",
    termsNotice: "Kiriw arqalı Paydalanıw shártlerin qabıllaysız",
    welcomeTeacher: "Qosh keldińiz, ustaz!",
    todayPrompt: "Búgin qanday tema oqıtamız?",
    createNewLesson: "Jańa dars jaratıw",
    statLessons: "Jaratılǵan dars",
    statTimeSaved: "Tejelgen waqıt",
    statStudents: "Oqıwshılar",
    hours: "saat",
    recentLessons: "Sońǵı darslar",
    view: "Kóriw",
    play: "Oynaw",
    ready: "Tayın",
    materialsCreated: "material jaratıldı",
    lessonPlanTitle: "Sabaq jobası",
    lessonPlanDesc: "Ustaz aytatuǵın lekciya matni",
    matchGameTitle: "Sáykeslestiriw oyını",
    matchGameDesc: "1-oyın · interaktiv",
    quizTitle: "Bilim viktorinası",
    quizDesc: "2-oyın · interaktiv",
    model3DTitle: "3D model",
    model3DDesc: "Aylanatuǵın 3D format",
    viewSlides: "Slaydlardı kóriw",
    startLesson: "Darsti baslaw",
    settings: "Sazlawlar",
    languageSelect: "Til tańlaw",
    theme: "Kórinis reńi",
    themeDark: "Qaraqoshqıl plam (Túngi)",
    themeLight: "Názik aqshıl lavanda",
    teacherProfile: "Ustaz profili",
    fullName: "Tolıq atı-jónińiz",
    schoolName: "Mektep / Máleme",
    subjectSpecialty: "Pán qánigeligi",
    saveSettings: "Saqlaw",
    close: "Jabıw",
    back: "Artqa",
    newLessonModalTitle: "Jańa dars jaratıw",
    topicLabel: "Tema",
    topicPlaceholder: "Mısalı: Jasusha qurılısı yamasa Fotosintez",
    subjectLabel: "Pán",
    materialLabel: "Material",
    dragDropText: "Fayldı osı jerge taslań",
    orChooseFile: "Fayldı tańlaw",
    fileLimits: "PDF, DOCX, PPTX · 20 MB shekli",
    orEnterText: "yamasa tekst kiritiń",
    textPlaceholder: "Dars materialın bul jerge qoyıń...",
    createLessonBtn: "Dars jaratıw",
    aiAnalyzing: "AI oqıw materialın úyrenbekte...",
    aiGenerating: "Interaktiv oyınlar, lekciya hám 3D model dúzilmekte...",
    aiCompleted: "Dars tayın boldı!",
    lessonReadyNotice: "Darsińiz tolıq tayın!",
    changeWordsNotice: "Temanı yamasa atamalardı ózgertiw",
    editTopicTitle: "Dars atın ózgertiw",
    editTopicBtn: "Ózgertiw",
    matchedPairs: "Tabılǵan sáykeslik",
    moves: "Háreketler",
    timer: "Waqıt",
    congrats: "Ájayıp nátiyje! Barlıq juplıqlar tabıldı!",
    playAgain: "Qaytadan oynaw",
    question: "Soraw",
    nextQuestion: "Keyingi soraw",
    quizCompleted: "Viktorina juwmaqlandı!",
    score: "Nátiyje",
    explanation: "Túsindirme",
    rotateInstructions: "Modeldi aylandırıw ushın tıshqanstanı sırıń yamasa tegiń",
    fullscreen: "Tolıq ekran",
    slide: "Slayd",
    nextSlide: "Keyingi",
    prevSlide: "Aldınǵı",
    teacherNotes: "Ustazǵa esletpe & sóylew teksti",
    livePoll: "Túsinikli boldı ma?",
    understandWell: "Awa, túsindim! 👍",
    repeatPlease: "Qaytadan túsindirip beriń 🤔",
    studentsConnected: "Sabaqqa qatnasıwshı oqıwshılar",
    lectureVoiceSim: "Lekciya dawısın esitiw (AI Audio)",
    copyScript: "Matndi kóshirip alıw",
    copied: "Kóshirildi!",
  },
  uz: {
    appName: "DARSIFY",
    tagline: "AI-POWERED EDUCATION",
    loginGoogle: "Google orqali kirish",
    loginEmail: "Email orqali kirish",
    or: "yoki",
    termsNotice: "Kirish orqali Foydalanish shartlariga rozilik bildirasiz",
    welcomeTeacher: "Xush kelibsiz, ustoz!",
    todayPrompt: "Bugun qanday mavzuni o'tamiz?",
    createNewLesson: "Yangi dars yaratish",
    statLessons: "Yaratilgan darslar",
    statTimeSaved: "Tejalgan vaqt",
    statStudents: "O'quvchilar",
    hours: "soat",
    recentLessons: "So'nggi darslar",
    view: "Ko'rish",
    play: "O'ynash",
    ready: "Tayyor",
    materialsCreated: "material yaratildi",
    lessonPlanTitle: "Dars rejasi",
    lessonPlanDesc: "O'qituvchi aytadigan ma'ruza matni",
    matchGameTitle: "Moslashtirish o'yini",
    matchGameDesc: "1-o'yin · interaktiv",
    quizTitle: "Bilim viktorinasi",
    quizDesc: "2-o'yin · interaktiv",
    model3DTitle: "3D model",
    model3DDesc: "Aylanuvchi 3D format",
    viewSlides: "Slaydlarni ko'rish",
    startLesson: "Darsni boshlash",
    settings: "Sozlamalar",
    languageSelect: "Tilni tanlash",
    theme: "Mavzu ko'rinishi",
    themeDark: "To'q binafsha (Tungi)",
    themeLight: "Och mayin lavanda",
    teacherProfile: "O'qituvchi profili",
    fullName: "To'liq ism-sharifingiz",
    schoolName: "Maktab / Ta'lim muassasasi",
    subjectSpecialty: "Fan mutaxassisligi",
    saveSettings: "Saqlash",
    close: "Yopish",
    back: "Orqaga",
    newLessonModalTitle: "Yangi dars yaratish",
    topicLabel: "Mavzu",
    topicPlaceholder: "Masalan: Hujayra tuzilishi yoki Fotosintez",
    subjectLabel: "Fan",
    materialLabel: "Material",
    dragDropText: "Faylni bu yerga tashlang",
    orChooseFile: "Faylni tanlash",
    fileLimits: "PDF, DOCX, PPTX · 20 MB gacha",
    orEnterText: "yoki matn kiriting",
    textPlaceholder: "Dars materialini bu yerga joylang...",
    createLessonBtn: "Dars yaratish",
    aiAnalyzing: "AI o'quv materialini tahlil qilmoqda...",
    aiGenerating: "Interaktiv o'yinlar, ma'ruza va 3D model yaratilmoqda...",
    aiCompleted: "Dars tayyor bo'ldi!",
    lessonReadyNotice: "Darsingiz to'liq tayyor!",
    changeWordsNotice: "Mavzuni yoki atamalarni o'zgartirish",
    editTopicTitle: "Dars nomini tahrirlash",
    editTopicBtn: "O'zgartirish",
    matchedPairs: "Topilgan juftliklar",
    moves: "Harakatlar",
    timer: "Vaqt",
    congrats: "Ajoyib natija! Barcha juftliklar topildi!",
    playAgain: "Qayta o'ynash",
    question: "Savol",
    nextQuestion: "Keyingi savol",
    quizCompleted: "Viktorina yakunlandi!",
    score: "Natija",
    explanation: "Izoh",
    rotateInstructions: "Modelni aylantirish uchun sichqonchani siljiting yoki teging",
    fullscreen: "To'liq ekran",
    slide: "Slayd",
    nextSlide: "Keyingi",
    prevSlide: "Oldingi",
    teacherNotes: "O'qituvchi nutqi va eslatmalari",
    livePoll: "Tushunarlimi?",
    understandWell: "Ha, tushundim! 👍",
    repeatPlease: "Qayta tushuntirib bering 🤔",
    studentsConnected: "Darsdagi o'quvchilar soni",
    lectureVoiceSim: "Ma'ruza ovozini tinglash (AI Audio)",
    copyScript: "Matnni nusxalash",
    copied: "Nusxalandi!",
  },
  en: {
    appName: "DARSIFY",
    tagline: "AI-POWERED EDUCATION",
    loginGoogle: "Sign in with Google",
    loginEmail: "Sign in with Email",
    or: "or",
    termsNotice: "By signing in you agree to our Terms & Privacy",
    welcomeTeacher: "Welcome, Teacher!",
    todayPrompt: "What topic are we teaching today?",
    createNewLesson: "Create new lesson",
    statLessons: "Lessons created",
    statTimeSaved: "Time saved",
    statStudents: "Students taught",
    hours: "hrs",
    recentLessons: "Recent lessons",
    view: "View",
    play: "Play",
    ready: "Ready",
    materialsCreated: "materials created",
    lessonPlanTitle: "Lesson Plan",
    lessonPlanDesc: "Teacher lecture script & outline",
    matchGameTitle: "Matching Game",
    matchGameDesc: "Game 1 · Interactive pairing",
    quizTitle: "Knowledge Quiz",
    quizDesc: "Game 2 · Interactive trivia",
    model3DTitle: "3D Model",
    model3DDesc: "Interactive 3D format",
    viewSlides: "View Slides",
    startLesson: "Start Lesson",
    settings: "Settings",
    languageSelect: "Language",
    theme: "Interface Theme",
    themeDark: "Deep Plum Violet (Dark)",
    themeLight: "Soft Lavender Pearl (Light)",
    teacherProfile: "Teacher Profile",
    fullName: "Full name",
    schoolName: "School / Institution",
    subjectSpecialty: "Subject",
    saveSettings: "Save",
    close: "Close",
    back: "Back",
    newLessonModalTitle: "Create New Lesson",
    topicLabel: "Topic",
    topicPlaceholder: "e.g., Cell Structure or Photosynthesis",
    subjectLabel: "Subject",
    materialLabel: "Material",
    dragDropText: "Drag & drop files here",
    orChooseFile: "Browse files",
    fileLimits: "PDF, DOCX, PPTX · Up to 20 MB",
    orEnterText: "or enter raw text",
    textPlaceholder: "Paste your textbook page or lecture notes here...",
    createLessonBtn: "Generate Lesson",
    aiAnalyzing: "AI is analyzing learning material...",
    aiGenerating: "Synthesizing games, slides, script and 3D visual...",
    aiCompleted: "Lesson is ready!",
    lessonReadyNotice: "Your lesson is ready.",
    changeWordsNotice: "Rename or customize lesson topics",
    editTopicTitle: "Rename Lesson Topic",
    editTopicBtn: "Update",
    matchedPairs: "Pairs matched",
    moves: "Moves",
    timer: "Timer",
    congrats: "Brilliant! You matched all pairs!",
    playAgain: "Play Again",
    question: "Question",
    nextQuestion: "Next Question",
    quizCompleted: "Quiz Completed!",
    score: "Score",
    explanation: "Explanation",
    rotateInstructions: "Drag or swipe to rotate and explore the 3D model",
    fullscreen: "Fullscreen",
    slide: "Slide",
    nextSlide: "Next",
    prevSlide: "Previous",
    teacherNotes: "Teacher speaking notes & guide",
    livePoll: "Live Comprehension Check",
    understandWell: "Understood well! 👍",
    repeatPlease: "Please repeat 🤔",
    studentsConnected: "Active students",
    lectureVoiceSim: "Listen to Teacher Script (AI Audio)",
    copyScript: "Copy Lecture Text",
    copied: "Copied!",
  },
  ru: {
    appName: "DARSIFY",
    tagline: "AI-POWERED EDUCATION",
    loginGoogle: "Войти через Google",
    loginEmail: "Войти по Email",
    or: "или",
    termsNotice: "Входя в систему, вы принимаете Условия использования",
    welcomeTeacher: "Добро пожаловать, учитель!",
    todayPrompt: "Какую тему преподаем сегодня?",
    createNewLesson: "Создать новый урок",
    statLessons: "Создано уроков",
    statTimeSaved: "Сэкономлено времени",
    statStudents: "Учеников",
    hours: "ч",
    recentLessons: "Недавние уроки",
    view: "Смотреть",
    play: "Играть",
    ready: "Готово",
    materialsCreated: "материалов создано",
    lessonPlanTitle: "План урока",
    lessonPlanDesc: "Текст лекции для учителя",
    matchGameTitle: "Игра на соответствие",
    matchGameDesc: "1-я игра · интерактив",
    quizTitle: "Викторина знаний",
    quizDesc: "2-я игра · интерактив",
    model3DTitle: "3D модель",
    model3DDesc: "Вращающийся 3D формат",
    viewSlides: "Смотреть слайды",
    startLesson: "Начать урок",
    settings: "Настройки",
    languageSelect: "Язык интерфейса",
    theme: "Тема оформления",
    themeDark: "Глубокий сливовый (Темная)",
    themeLight: "Нежная лаванда (Светлая)",
    teacherProfile: "Профиль учителя",
    fullName: "Полное имя",
    schoolName: "Школа / Учреждение",
    subjectSpecialty: "Предмет",
    saveSettings: "Сохранить",
    close: "Закрыть",
    back: "Назад",
    newLessonModalTitle: "Создание нового урока",
    topicLabel: "Тема",
    topicPlaceholder: "Например: Строение клетки или Фотосинтез",
    subjectLabel: "Предмет",
    materialLabel: "Материал",
    dragDropText: "Перетащите файл сюда",
    orChooseFile: "Выбрать файл",
    fileLimits: "PDF, DOCX, PPTX · до 20 МБ",
    orEnterText: "или введите текст",
    textPlaceholder: "Вставьте текст параграфа или лекции сюда...",
    createLessonBtn: "Создать урок",
    aiAnalyzing: "ИИ анализирует учебный материал...",
    aiGenerating: "Генерация интерактивов, викторины и 3D модели...",
    aiCompleted: "Урок готов!",
    lessonReadyNotice: "Ваш урок готов.",
    changeWordsNotice: "Изменить тему или названия",
    editTopicTitle: "Изменить название урока",
    editTopicBtn: "Изменить",
    matchedPairs: "Найдено пар",
    moves: "Ходы",
    timer: "Время",
    congrats: "Отличный результат! Все пары найдены!",
    playAgain: "Сыграть снова",
    question: "Вопрос",
    nextQuestion: "Следующий вопрос",
    quizCompleted: "Викторина завершена!",
    score: "Результат",
    explanation: "Объяснение",
    rotateInstructions: "Вращайте и приближайте интерактивную модель",
    fullscreen: "Во весь экран",
    slide: "Слайд",
    nextSlide: "Вперед",
    prevSlide: "Назад",
    teacherNotes: "Подсказка и речь учителя",
    livePoll: "Понятен ли материал?",
    understandWell: "Да, всё понятно! 👍",
    repeatPlease: "Повторите, пожалуйста 🤔",
    studentsConnected: "Учеников на уроке",
    lectureVoiceSim: "Озвучить лекцию (ИИ Голос)",
    copyScript: "Скопировать речь",
    copied: "Скопировано!",
  }
};
