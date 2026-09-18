import { Lesson } from '../types';

export const initialLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Jasusha hám tirishilik dúzilisi',
    subject: 'Biologiya',
    gradeLevel: '7-klas',
    materialsCount: 4,
    status: 'ready',
    createdAt: '2026-09-15',
    timeAgo: '2 kún burın',
    summary: "Barlıq tiri organizmlerdiń tiykarǵı dúzilisi, organoidlar hám olardıń ózara baylanısı haqqındaǵı interaktiv sabaq paketi.",
    learningGoals: [
      "Jasushanıń tiykarǵı strukturalıq bólimlerin ajıratıp biliw (yadro, sitoplazma, membrana)",
      "Mitoxondriya hám xloroplastlardıń energetikalıq xızmetlerin túsiniw",
      "Ósimlik hám haywanat jasushalarınıń parqın anıqlaw"
    ],
    lessonPlan: {
      durationMinutes: 45,
      stages: [
        {
          stageName: "1. Shólkemlestiriw & Qızıqtırıw (5 min)",
          duration: "5 min",
          teacherScript: "Húrmetli oqıwshılar! Búgingi darsimizda biz kózge kórindi-kórinbeytuǵın ǵarayıp mikroálemge — jasushanıń ishine sayaxat qılamız. Qáne, oylap kóriń-shi: neshun bir kishi ǵana jasusha pútkil úlken adam yamasa daraqtıń júrek urısı hám dem alıwın támiyinley aladı?",
          studentActivity: "Oqıwshılar óz pikirlerin aytadı, ekrandagi 3D kletka modeline dıqqat qaratadı.",
          keyTips: "Dıqqattı tartıw ushın ekrandagi 3D jasushanı aylandırıp kórsetiń."
        },
        {
          stageName: "2. Tiykarǵı túsinikler & Organoidlar (20 min)",
          duration: "20 min",
          teacherScript: "Jasusha bul házirgi zaman qalasina uqsas. Membrana — qalanıń qorǵaw diywalı. Yadro — qala basqarıw orayı hám kitapxanası (DNK saqlanadı). Mitoxondriya — elektr stanciyası (ATF energiyası). Ribosomalar bolsa — kerekli zatlardı quratuǵın fabrikani ańlatadı.",
          studentActivity: "Oqıwshılar dápterlerine jasusha shemasın sızadı hám kestege organoidlar xızmetin jazadı.",
          keyTips: "Har bir organoidtı qala infrastrukturasına salıstırıw oqıwshı yadında bekkem saqlanadı."
        },
        {
          stageName: "3. Interaktiv bekkemlew & Viktorina (15 min)",
          duration: "15 min",
          teacherScript: "Házir biz Darsify-dıń sáykeslestiriw oyını hám bilim viktorinası arqalı bilimińizdi sınaymız. Har bir jup organoidtı óz xızmeti menen birlestiriń!",
          studentActivity: "Oqıwshılar orınlarında yamasa interaktiv doskada sáykeslestiriw oyının oynaydı.",
          keyTips: "Tez hám qátesiz tapqan oqıwshılardı xoshametleń."
        },
        {
          stageName: "4. Juwmaq & Uyge tapsırma (5 min)",
          duration: "5 min",
          teacherScript: "Búgingi sabıǵımızda biz jasushanıń tiykarǵı organoidların úyrendik. Uyge tapsırma: Ósimlik jasushasınıń haywanat jasushasınan 3 tiykarǵı parqın keste túrinde jazıp keliw.",
          studentActivity: "Kúndeliklerine tapsırmanı jazıp aladı.",
          keyTips: "Keyingi dars fotosintez teması menen baylanısatuǵının eskertiń."
        }
      ]
    },
    matchingGame: {
      gameTitle: "Jasusha organoidları sáykesligi",
      instructions: "Har bir organoidtı ózine tiyisli bolǵan biologiyalıq xızmeti menen sáykeslestiriń.",
      pairs: [
        {
          id: "p1",
          term: "Yadro (Nucleus)",
          definition: "Genetikalıq informaciyanı (DNK) saqlawshı hám jasushanı basqarıwshı oray",
          category: "Basqarıw"
        },
        {
          id: "p2",
          term: "Mitoxondriya",
          definition: "Energiya (ATF) islep shıǵarıwshı jasusha elektr stanciyası",
          category: "Energetika"
        },
        {
          id: "p3",
          term: "Ribosoma",
          definition: "Belok (aqsil) sintezleytuǵın mikroskopik fabrika",
          category: "Sintez"
        },
        {
          id: "p4",
          term: "Kletka membranasi",
          definition: "Jasushanı qorshap turıwshı, zatlar almasıwın basqarıwshı elastik qabıq",
          category: "Qorǵaw"
        },
        {
          id: "p5",
          term: "Golji apparatı",
          definition: "Sintezlengen moddalardı saralawshı hám tasıwshı transport apparatı",
          category: "Logistika"
        },
        {
          id: "p6",
          term: "Xloroplast",
          definition: "Quyash nurı járdeminde fotosintez procesin júrgizip, glyukoza jaratadı",
          category: "Ósimlik"
        }
      ]
    },
    quiz: {
      quizTitle: "Jasusha dúzilisi boyınsha test",
      questions: [
        {
          id: 1,
          question: "Jasushanıń genetikalıq informaciyası (DNK) tiykarınan qaysı organoidta saqlanadı?",
          options: ["Ribosomada", "Yadronıń ishinde", "Mitoxondriyada", "Vakuolada"],
          correctIndex: 1,
          explanation: "Jasushanıń barlıq tuqım quwawshılıq informaciyası xromosomalar túrinde yadronıń ishinde saqlanadı."
        },
        {
          id: 2,
          question: "Jasushanıń 'kúsh stanciyası' dep qaysı organoid ataladı hám ne ushın?",
          options: [
            "Lizosoma — zatlardı eritiwi sebepli",
            "Mitoxondriya — ATF kórinisinde energiya beriwshi",
            "Xloroplast — suw sızıwshı",
            "Ribosoma — may toplaytuǵın"
          ],
          correctIndex: 1,
          explanation: "Mitoxondriyada dem alıw procesi júrgizilip, organizm ushın zárúr bolǵan ATF energiya molekulaları sintezlenedi."
        },
        {
          id: 3,
          question: "Ósimlik jasushasında bar, biraq haywanat jasushasında ushıraspaytuǵın organoidtı kórsetiń:",
          options: ["Mitoxondriya", "Xloroplast hám kletka diywalı", "Yadro", "Sitoplazma"],
          correctIndex: 1,
          explanation: "Ósimlikler jasushasında qattı selluloza diywalı hám jasıl xloroplastlar boladı, olar haywan jasushasında bolmaydı."
        },
        {
          id: 4,
          question: "Beloklardı (aqsillardi) sintezlew wazıypasın qaysı mayda organoid orınlaydı?",
          options: ["Ribosoma", "Vakuola", "Sentriola", "Yadro membranasi"],
          correctIndex: 0,
          explanation: "Ribosomalar aminokislotalardan polipeptid shınjırların — beloklardı qurıwshı unikal molekulyar stanoklar esaplanadı."
        },
        {
          id: 5,
          question: "Zatlardıń jasusha ishine kiriwi hám shıǵıwın qadaǵalawshı qabıq qalay ataladı?",
          options: ["Sitoplazmatik tor", "Plazmatikalıq membrana", "Golji kompleksi", "Xromatin"],
          correctIndex: 1,
          explanation: "Plazmatikalıq membrana selektiv (tańlap ótkizgishlik) qásiyetke iye bolıp, kletka turaqlılıǵın saqlaydı."
        }
      ]
    },
    visualModel: {
      modelType: 'cell',
      modelTitle: 'Eukariot Jasusha Dúzilisi (3D Vizualizator)',
      description: 'Jasushanıń oraylıq yadrosı, mitoxondriyaları, ribosomaları hám sırtqı qabıǵı kórsetilgen dinamikalıq vizual model.',
      parts: [
        {
          id: 'nucleus',
          name: 'Yadro (Nucleus)',
          color: '#A56ABD',
          role: 'Jasusha orayında ornalasqan basqarıw shtabı. DNK hám RNK-nı saqlaydı.',
          interestingFact: 'Eger bir insan jasushasındagı DNK-nı sozsaq, uzınlıǵı derlik 2 metrge jetedi!',
          coords: { x: 50, y: 50 }
        },
        {
          id: 'mitochondria',
          name: 'Mitoxondriya (Mitochondria)',
          color: '#FF6B6B',
          role: 'Kletkanıń energetika generatorı. Kislorod járdeminde azıqlıq zatlardı ATF-qa aylandıradı.',
          interestingFact: 'Mitoxondriyalardıń óz jeke DNK-sı bar bolıp, olar ana tárepinen ótedi.',
          coords: { x: 30, y: 35 }
        },
        {
          id: 'membrane',
          name: 'Kletka Membranasi',
          color: '#6E3482',
          role: 'Eki qatlamlı fosfolipidlerden dúzilgen qorǵaw perdesi.',
          interestingFact: 'Membrana qalıńlıǵı bar bolǵanı 7-10 nanometrdi quraydı.',
          coords: { x: 80, y: 50 }
        },
        {
          id: 'golgi',
          name: 'Golji Kompleksi',
          color: '#F9A826',
          role: 'Jasusha fabrikasında jasalǵan beloklardı orap, kerekli jerlerge jetkerip beredi.',
          interestingFact: '1898-jılı italyan alımı Kamillo Golji tárepinen kashf etilgen.',
          coords: { x: 68, y: 65 }
        },
        {
          id: 'ribosomes',
          name: 'Ribosomalar',
          color: '#4ECCA3',
          role: 'Genetik kod boyınsha tirishiliktiń tiykarı bolǵan aqsıllardı dúzedi.',
          interestingFact: 'Bír kletkada bir neshe million ribosomalar bir waqıtta isley aladı.',
          coords: { x: 35, y: 70 }
        }
      ]
    },
    slides: [
      {
        slideNumber: 1,
        slideTitle: "Jasusha — Tirishiliktiń Tiykarǵı Birligi",
        bullets: [
          "Barlıq tiri janlar (adamlar, haywanlar, ósimlikler) jasushalardan quralǵan",
          "Jasushanı dáslep 1665-jılı Robert Guk mikroskop arqalı kórgen",
          "Búgingi maqset: jasushanıń ishki dúzilisin hám organoidların túsiniw"
        ],
        teacherNotes: "Robert Guk shishe probkasın qırıp qarap, 'kletka' (hújra) dep at bergenin qızıqlı mısallar menen aytıp beriń."
      },
      {
        slideNumber: 2,
        slideTitle: "Jasushanıń Úsh Tiykarǵı Bólimi",
        bullets: [
          "1. Sirtqı membrana: qorǵaw hám tańlap ótkiziw",
          "2. Sitoplazma: organoidlar jaylasqan suyıqlıq orta",
          "3. Yadro: kletkanı basqarıwshı hám genlerdi saqlawshı oray"
        ],
        teacherNotes: "Ekrandagi diagrammadan paydalanıp, kletka bólimlerin kórsetiń."
      },
      {
        slideNumber: 3,
        slideTitle: "Mitoxondriya — Energiya Stanciyası",
        bullets: [
          "Organizmge háreketleniw, oylaw, jasaw ushın energiya kerek",
          "Mitoxondriyalar glukoza hám kislorodtan ATF energiyasın sintezleydi",
          "Júrek hám bulshıq et jasushalarında mitoxondriyalar júdá kóp boladı"
        ],
        teacherNotes: "Neshun júrek hesh sharchamaydı? Sebebi onda mitoxondriya sanı júzlegen marta kóp!"
      },
      {
        slideNumber: 4,
        slideTitle: "Ósimlik hám Haywanat Jasushası Parqı",
        bullets: [
          "Ósimlik jasushasında: Qattı kletka diywalı, jasıl Xloroplastlar, úlken Vakuola bar",
          "Haywan jasushasında: Forma elastik, xloroplast joq, xemosintez/geterotrof azıqlanıw",
          "Fotosintez arqalı Jer betindegi kislorod teń salmaqlılıǵı saqlanadı"
        ],
        teacherNotes: "Doskada eki kletkanı qatar qoyıp salıstırıw kestesin toltırıń."
      },
      {
        slideNumber: 5,
        slideTitle: "Sabıqtı Bekkemlew & Nátijeler",
        bullets: [
          "Jasusha organoidları ózara tınımsız baylanısta háreket etedi",
          "Interaktiv oyın hám viktorina arqalı bilimińizdi bekkemleń",
          "Uy tapsırması: Salıstırıw kestesin toltırıw"
        ],
        teacherNotes: "Oqıwshılardı Darsify-dıń oyın rejimine ótkerip, nátijelerin bahalań."
      }
    ]
  },
  {
    id: 'lesson-2',
    title: 'Suw aylanısı hám Jer ekologiyası',
    subject: 'Geografiya',
    gradeLevel: '6-klas',
    materialsCount: 4,
    status: 'ready',
    createdAt: '2026-09-13',
    timeAgo: '4 kún burın',
    summary: "Jer planetasındagı suw aylanısınıń basqıshları: puwlanıw, kondensaciya, jawın-shashın hám dárya aǵımları.",
    learningGoals: [
      "Suwdıń úsh agregat halatın túsiniw",
      "Kishi hám úlken suw aylanısı parqın biliw",
      "Aral teńizi hám suw resursların tejew áhmiyetin bahalaw"
    ],
    lessonPlan: {
      durationMinutes: 45,
      stages: [
        {
          stageName: "1. Kirisiw (5 min)",
          duration: "5 min",
          teacherScript: "Balalar, Jer planetasınıń 71 procenti suw menen qaplanǵan. Biraq nege dáryalar aqsa da teńizler tolıp ketpeydi?",
          studentActivity: "Oqıwshılar puwlanıw hám jawın boyınsha dáslepki pikirlerin aytadı.",
          keyTips: "Aral teńizi misalında regional áhmiyetin túsindiriń."
        },
        {
          stageName: "2. Suw aylanısı basqıshları (25 min)",
          duration: "25 min",
          teacherScript: "Quyash suwdı qızdırǵanda puwlanıw baslanadı. Joqarıda suwıq hawada bulutlar payda boladı (kondensaciya). Son soń jawın yamasa qar jawıp, jer astı suwları arqalı qaytadan okeanlarǵa quyıladı.",
          studentActivity: "Dápterde suw aylanısı ciklin sızadı.",
          keyTips: "Interaktiv 3D animaciyada aylanıstı kórsetiń."
        },
        {
          stageName: "3. Interaktiv tapsırma (15 min)",
          duration: "15 min",
          teacherScript: "Suw aylanısı elementlerin sáykeslestiriw oyınında orınlarına qoyayıq.",
          studentActivity: "Oqıwshılar testti orınlaydı.",
          keyTips: "Suwdı tejew mısalların talqılań."
        }
      ]
    },
    matchingGame: {
      gameTitle: "Suw sikli elementleri sáykesligi",
      instructions: "Hár bir geografiyalıq processti anıqlaması menen birlestiriń.",
      pairs: [
        { id: "w1", term: "Puwlanıw (Evaporation)", definition: "Quyash jıllılıǵı tásirinde suwdıń gaz halına ótiwi" },
        { id: "w2", term: "Kondensaciya", definition: "Buxardıń joqarıda suwıp, bulutlarǵa aylanıw procesi" },
        { id: "w3", term: "Jawın-shashın", definition: "Bulutlardan jerge jawatuǵın jamǵır, qar yamasa móldir" },
        { id: "w4", term: "Transpiraciya", definition: "Ósimlikler japıraǵı arqalı suwdıń átirapqa puwlanıwı" }
      ]
    },
    quiz: {
      quizTitle: "Gidrosfera & Suw aylanısı viktorinası",
      questions: [
        {
          id: 1,
          question: "Suwdıń suyıq halattan gaz (puw) halatına ótiw procesi qalay ataladı?",
          options: ["Kondensaciya", "Puwlanıw", "Muzlaw", "Filtraciya"],
          correctIndex: 1,
          explanation: "Quyash radiaciyası tásirinde suw molekulaları kóp energiya alıp, gaz kórinisinde hawaga kóteriledi."
        },
        {
          id: 2,
          question: "Jer júzindegi eń kóp dushshı (ishem suw) zapası qayerda saqlanadı?",
          options: ["Dáryalarda", "Polyar muzlıqlarda", "Bulaqlarda", "Atmosferada"],
          correctIndex: 1,
          explanation: "Dushshı suwdıń derlik 69% bólimi Antarktida hám Grenlandiya muzlıqlarında tońıp jatır."
        }
      ]
    },
    visualModel: {
      modelType: 'ecosystem',
      modelTitle: 'Jer Gidrosferası & Suw Cikli',
      description: 'Okean, quyash nurları, bulutlar, tawlar hám dáryalardıń uzliksiz suw háreketi.',
      parts: [
        { id: 'sun', name: 'Quyash energiyası', color: '#FFD166', role: 'Puwlanıw dvigatelı', interestingFact: 'Bir kúnlik quyash energiyası milliard tonnalap suwdı hawaga kóteredi.', coords: { x: 80, y: 20 } },
        { id: 'clouds', name: 'Bulutlar & Kondensaciya', color: '#E7DBEF', role: 'Jawın jetkizgish', interestingFact: 'Ortasha bir kishi bulut 500 tonna suw awırlıǵına iye!', coords: { x: 50, y: 30 } },
        { id: 'river', name: 'Dáryalar & Aǵımlar', color: '#118AB2', role: 'Okeanǵa qaytarıw', interestingFact: 'Amiwdárya hám Sırdárya Aral teńizine quyılatuǵın tiykarǵı dáryalar.', coords: { x: 30, y: 80 } }
      ]
    },
    slides: [
      {
        slideNumber: 1,
        slideTitle: "Jer — Kók Planetamiz",
        bullets: ["Gidrosferanıń dúzilisi", "Okeanlar, teńizler, dáryalar", "Suw aylanısınıń áhmiyeti"],
        teacherNotes: "Jer sharı kartasın kórsetip baslań."
      }
    ]
  },
  {
    id: 'lesson-3',
    title: 'Sanlar dúnyası & Logikalıq esaplar',
    subject: 'Matematika',
    gradeLevel: '5-klas',
    materialsCount: 4,
    status: 'ready',
    createdAt: '2026-09-10',
    timeAgo: '1 hápte burın',
    summary: "Natural sanlar, ápiwayı hám qospa sanlar, dáslepki logikalıq tenlemelerdi qızıqlı oyınlar arqalı úyreniw.",
    learningGoals: [
      "Ápiwayı sanlar menen qospa sanlardıń parqın túsiniw",
      "Sanlardıń bólinish belgilerin este saqlaw",
      "Matematikalıq logikanı rawajlandırıw"
    ],
    lessonPlan: {
      durationMinutes: 45,
      stages: [
        {
          stageName: "1. Kirisiw (10 min)",
          duration: "10 min",
          teacherScript: "Matematika — ilimlerdiń patshası! Búgin biz sanlardıń qupiyaların ashamız.",
          studentActivity: "Tez esaplaw oyınında qatnasadı.",
          keyTips: "Ápiwayı sanlardı tabıw ushın Eratosfen elek metodın esletiń."
        }
      ]
    },
    matchingGame: {
      gameTitle: "Matematikalıq atamalar sáykesligi",
      instructions: "Sanlar qásiyetlerin óz anıqlaması menen sáykeslestiriń.",
      pairs: [
        { id: "m1", term: "Ápiwayı san (Prime)", definition: "Tek 1-ge hám ózine ǵana bólinetuǵın san (2, 3, 5, 7, 11...)" },
        { id: "m2", term: "Jup san (Even)", definition: "2-ge qaldıqsız bólinetuǵın natural sanlar" },
        { id: "m3", term: "Kvadrat san", definition: "Sannıń ózin ózine kóbeytpesi (mısalı: 5x5 = 25)" },
        { id: "m4", term: "Pifagor sanları", definition: "a² + b² = c² qatnasın qanaatlandıratuǵın úshlikler" }
      ]
    },
    quiz: {
      quizTitle: "Sanlar teoriyası sınaǵı",
      questions: [
        {
          id: 1,
          question: "Eń kishi ápiwayı san hám jalǵız jup ápiwayı san qaysı?",
          options: ["1", "2", "3", "0"],
          correctIndex: 1,
          explanation: "2 — jalǵız jup ápiwayı san bolıp, ol tek 1-ge hám 2-ge bólinedi."
        }
      ]
    },
    visualModel: {
      modelType: 'geometry',
      modelTitle: 'Pifagor Teoreması hám Geometriyalıq Kvadratlar',
      description: 'Tuwrı múyeshli úshmúyeshlik qabırǵaları kvadratlarınıń baylanısı.',
      parts: [
        { id: 'katet1', name: 'Katet A', color: '#A56ABD', role: 'Gorizontal qabırǵa', interestingFact: 'a² maydanın beredi', coords: { x: 30, y: 50 } },
        { id: 'katet2', name: 'Katet B', color: '#6E3482', role: 'Vertikal qabırǵa', interestingFact: 'b² maydanın beredi', coords: { x: 50, y: 70 } },
        { id: 'hypotenuse', name: 'Gipotenuza C', color: '#F9A826', role: 'Eń uzın qabırǵa', interestingFact: 'c² = a² + b²', coords: { x: 70, y: 40 } }
      ]
    },
    slides: [
      {
        slideNumber: 1,
        slideTitle: "Sanlardıń Qudiretli Dúnyası",
        bullets: ["Matematikanıń payda bolıw tariyxı", "Ápiwayı sanlardıń kiber-qáwipsizliktegi ornı"],
        teacherNotes: "Shifrlaw (kriptografiya) ushın ápiwayı sanlar qollanılatuǵının aytsańız, oqıwshılarda qızıǵıwshılıq artadı."
      }
    ]
  },
  {
    id: 'lesson-4',
    title: 'Fotosintez hám Ósimlikler energetikası',
    subject: 'Biologiya',
    gradeLevel: '8-klas',
    materialsCount: 4,
    status: 'ready',
    createdAt: '2026-09-08',
    timeAgo: '10 kún burın',
    summary: "Xlorofill pigmenti, quyash nurınan ximiyalıq baylanıslar energiyasın (glyukoza) jaratıw hám kislorod ajıratıw mexanizmi.",
    learningGoals: [
      "Fotosintez reakciyasınıń teńlemesin úyreniw",
      "Qarańǵı hám jaqtılıq fazaları parqın túsiniw",
      "Ósimliklerdiń Jer atmosferasındaǵı ekologiyalıq rolini biliw"
    ],
    lessonPlan: {
      durationMinutes: 45,
      stages: [
        {
          stageName: "1. Kirisiw & Dıqqattı tartıw (5 min)",
          duration: "5 min",
          teacherScript: "Búgin biz pútkil Jer sharı tiri tábiyatın azıq penen támiyinleytuǵın 'jasıl fabrika' haqqında sóylesemiz.",
          studentActivity: "Japıraq strukturasın kóz aldına keltiredi.",
          keyTips: "Xlorofill jasıl bolıwınıń sebebi jaqtılıqtıń jasıl spektrin qaytarıwında ekenin túsindiriń."
        }
      ]
    },
    matchingGame: {
      gameTitle: "Fotosintez quramı sáykesligi",
      instructions: "Fotosintez qatnasıwshıların anıqlaması menen sáykeslestiriń.",
      pairs: [
        { id: "f1", term: "Xloroplast", definition: "Fotosintez procesi júrgiziletuǵın jasıl organoid" },
        { id: "f2", term: "Uglerod dioksidi (CO₂)", definition: "Ósimlik hawadan ózine sińiretuǵın gaz" },
        { id: "f3", term: "Glyukoza (C₆H₁₂O₆)", definition: "Fotosintez nátiyjesinde payda bolatuǵın tiykarǵı azıq qantı" },
        { id: "f4", term: "Kislorod (O₂)", definition: "Qosımsha ónim retinde hawaga ajıratılatuǵın tirishilik gazı" }
      ]
    },
    quiz: {
      quizTitle: "Fotosintez procesi boyınsha test",
      questions: [
        {
          id: 1,
          question: "Fotosintez reakciyasında zárúr bolǵan dáslepki moddalar qaysılar?",
          options: ["Kislorod hám azot", "Suw, uglerod dioksidi hám quyash nurı", "Maylar hám kraxmal", "Fosfor hám temir"],
          correctIndex: 1,
          explanation: "Ósimlik tamırı arqalı suwdı, japıraǵı arqalı CO₂-ni alıp, quyash nurı járdeminde reakciyaga kirisedi."
        }
      ]
    },
    visualModel: {
      modelType: 'plant',
      modelTitle: 'Japıraq Jasushası & Xloroplast (3D Kesim)',
      description: 'Japıraq toqımaları hám tilakoid diski modeliniń jaqtılıq sińiriwi.',
      parts: [
        { id: 'chlorophyll', name: 'Xlorofill', color: '#2ECC71', role: 'Nur sińiriwshi', interestingFact: 'Magnit atomı orayında jaylasqan unikal molekula.', coords: { x: 50, y: 50 } },
        { id: 'stoma', name: 'Agızsha (Stomata)', color: '#A56ABD', role: 'Gaz almasıw dárwazası', interestingFact: 'Yaxshi hawa rayında ashılıp, qurǵaqshılıqta jawıladı.', coords: { x: 30, y: 70 } }
      ]
    },
    slides: [
      {
        slideNumber: 1,
        slideTitle: "Fotosintez — Tábiyat Dvigatelı",
        bullets: ["Reakciya: 6CO₂ + 6H₂O + Nur -> C₆H₁₂O₆ + 6O₂", "Organik zatlardıń jaratılıwı", "Jasıl ósimliklerdi saqlaw májbúriyatımız"],
        teacherNotes: "Global jıllınıw hám toǵaylardı kesiw qáwpin baylanıstırıń."
      }
    ]
  }
];
