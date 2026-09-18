import React, { useState, useRef } from 'react';
import { ArrowLeft, X, UploadCloud, Zap, Sparkles, FileText, CheckCircle2, Loader2 } from 'lucide-react';
import { Language, Lesson } from '../types';
import { translations } from '../data/translations';

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onLessonCreated: (newLesson: Lesson) => void;
}

export const CreateLessonModal: React.FC<CreateLessonModalProps> = ({
  isOpen,
  onClose,
  language,
  onLessonCreated,
}) => {
  if (!isOpen) return null;

  const t = translations[language];
  const [topic, setTopic] = useState('');
  const [subject, setSubject] = useState('Biologiya');
  const [gradeLevel, setGradeLevel] = useState('7-klas');
  const [rawText, setRawText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjects = [
    'Biologiya',
    'Geografiya',
    'Matematika',
    'Fizika',
    'Informatika',
    'Ximiya',
    'Tariyx',
    'Tábiyattanıw',
  ];

  const generationSteps = [
    { title: t.aiAnalyzing, sub: 'Matn strukturası hám atamalar tallanbaqta...' },
    { title: 'Tiykarǵı koncepciyalardı ajıratıw', sub: 'Oqıwshı ushın zárúr formulalar hám qásiyetler...' },
    { title: t.aiGenerating, sub: 'Sáykeslestiriw oyını, 3D model hám viktorina dúzilmekte...' },
    { title: t.aiCompleted, sub: 'Dars paketi tolıq tayın boldı!' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // If it's a text file or markdown, read it
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (content) setRawText(content.slice(0, 4000));
        };
        reader.readAsText(file);
      } else {
        // Provide contextual mock extracted content based on file name
        setRawText(`${file.name} faylınan maǵlıwmatlar júklendi. Tema boyınsha tiykarǵı paragraf hám kórsetpeler.`);
      }
      if (!topic) {
        setTopic(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      if (!topic) {
        setTopic(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalTopic = topic.trim() || 'Jasusha dúzilisi hám organoidlar';

    setIsGenerating(true);
    setStepIndex(0);

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < generationSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 900);

    try {
      // Try to call server-side Gemini API endpoint
      const response = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: finalTopic,
          subject,
          language,
          gradeLevel,
          rawContent: rawText,
        }),
      });

      const resData = await response.json();

      setTimeout(() => {
        clearInterval(stepInterval);
        let generatedData = resData?.data;

        const newLesson: Lesson = {
          id: `lesson-${Date.now()}`,
          title: generatedData?.title || finalTopic,
          subject: generatedData?.subject || subject,
          gradeLevel: generatedData?.gradeLevel || gradeLevel,
          materialsCount: 4,
          status: 'ready',
          createdAt: new Date().toISOString().split('T')[0],
          timeAgo: 'Házir jaratıldı',
          summary:
            generatedData?.summary ||
            `"${finalTopic}" teması boyınsha AI járdeminde tayarlanǵan tolıq interaktiv oqıw paketi.`,
          learningGoals: generatedData?.learningGoals || [
            `${finalTopic} temasınıń tiykarǵı anıqlamaların úyreniw`,
            'Interaktiv oyınlar arqalı bilimdi bekkemlew',
            '3D vizual formatta kóz aldına keltiriw',
          ],
          lessonPlan: generatedData?.lessonPlan || {
            durationMinutes: 45,
            stages: [
              {
                stageName: '1. Kirisiw & Dıqqattı tartıw (5 min)',
                duration: '5 min',
                teacherScript: `Ássalawma áleykum oqıwshılar! Búgingi sabıǵımızda biz ${finalTopic} temasın úyrenemiz.`,
                studentActivity: 'Oqıwshılar temaǵa baylanıslı sorawlarǵa juwap beredi.',
                keyTips: 'Dıqqattı tartıw ushın 3D vizual modeldi kórsetiń.',
              },
              {
                stageName: '2. Tiykarǵı leksiya & túsinikler (20 min)',
                duration: '20 min',
                teacherScript: `Bul temada tiykarǵı 3 qásiyetke itibar qaratıw zárúr...`,
                studentActivity: 'Dápterge tiykarǵı formulası hám shemasın sızadı.',
                keyTips: 'Mısallardı kóbeytiń.',
              },
              {
                stageName: '3. Interaktiv oyın & Viktorina (15 min)',
                duration: '15 min',
                teacherScript: `Qáne, Darsify platformasında sáykeslestiriw oyının oynap kóreyik!`,
                studentActivity: 'Orınlarında interaktiv oyındı orınlaydı.',
                keyTips: 'Jaqsı nátiyjeni xoshametleń.',
              },
              {
                stageName: '4. Juwmaq & Uy tapsırması (5 min)',
                duration: '5 min',
                teacherScript: `Búgingi sabıqtı bekkemlew ushın uyge berilgen tapsırmanı jazıp alıń.`,
                studentActivity: 'Kúndelikke jazadı.',
              },
            ],
          },
          matchingGame: generatedData?.matchingGame || {
            gameTitle: `${finalTopic} atamaları sáykesligi`,
            instructions: 'Har bir atamanı óziniń anıqlaması menen birlestiriń.',
            pairs: [
              { id: 'g1', term: `${finalTopic} tiykarları`, definition: 'Temanıń oraylıq mánisi hám kórsetkishi' },
              { id: 'g2', term: 'Struktura & Dúzilis', definition: 'Quramalı bólimlerdiń ózara baylanısı' },
              { id: 'g3', term: 'Funksional xızmet', definition: 'Atqaratuǵın zárúr wazıypası' },
              { id: 'g4', term: 'Tábiyattaǵı roli', definition: 'Ekologiya hám jámiyettegi ornı' },
            ],
          },
          quiz: generatedData?.quiz || {
            quizTitle: `${finalTopic} boyınsha test`,
            questions: [
              {
                id: 1,
                question: `${finalTopic} temasınıń eń zárúr qásiyeti qaysı?`,
                options: ['Birinshi tiykarǵı faktor', 'Ekinshi qosımsha faktor', 'Úshinshi baylanıs', 'Barlıǵı tuwrı'],
                correctIndex: 3,
                explanation: 'Barlıq sanap ótilgen faktorlar tema boyınsha zárúr esaplanadı.',
              },
              {
                id: 2,
                question: `Bul process qaysı tarawda kóbirek qollanıladı?`,
                options: [subject, 'Fizika', 'Matematika', 'Biybaha tábiyat'],
                correctIndex: 0,
                explanation: `Álbette, bul ${subject} pániniń tiykarǵı bólimi esaplanadı.`,
              },
            ],
          },
          visualModel: generatedData?.visualModel || {
            modelType: 'cell',
            modelTitle: `${finalTopic} (3D Vizual Model)`,
            description: `${finalTopic} temasınıń interaktiv 3D strukturası hám quramlı bólimleri.`,
            parts: [
              { id: 'p1', name: 'Oraylıq Bólim', color: '#A56ABD', role: 'Tiykarǵı yadrolıq oray', interestingFact: 'Pútkil processti basqaradı.', coords: { x: 50, y: 50 } },
              { id: 'p2', name: 'Energiya Bólimi', color: '#FF6B6B', role: 'Energiya quralı', interestingFact: 'Joqarı ónimdilik beredi.', coords: { x: 30, y: 35 } },
              { id: 'p3', name: 'Sırtqı Qabıq', color: '#6E3482', role: 'Qorǵaw perdesi', interestingFact: 'Turaqlılıqtı saqlaydı.', coords: { x: 75, y: 65 } },
            ],
          },
          slides: generatedData?.slides || [
            {
              slideNumber: 1,
              slideTitle: finalTopic,
              bullets: [`${subject} páni boyınsha jańa tema`, 'Tiykarǵı maqset hám wazıypalar', 'Interaktiv úyreniw usılları'],
              teacherNotes: 'Sabıqtı qızıqlı mısallar menen baslań.',
            },
            {
              slideNumber: 2,
              slideTitle: 'Tiykarǵı túsinikler',
              bullets: ['Birinshi tiykarǵı nızamlılıq', 'Ameliy qollanılıwı', 'Oqıwshılar ushın qızıqlı faktlar'],
              teacherNotes: 'Oqıwshılardan óz pikirlerin sorap barıń.',
            },
          ],
        };

        setIsGenerating(false);
        onLessonCreated(newLesson);
        onClose();
      }, 3600);
    } catch (err) {
      console.error(err);
      setIsGenerating(false);
    }
  };

  return (
    <div
      id="create-lesson-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
    >
      <div
        id="create-lesson-dialog"
        className="w-full max-w-xl rounded-3xl bg-[#230F30] border border-[#6E3482]/70 shadow-2xl p-5 sm:p-7 text-white relative my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header matching Image 5 */}
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#49225B]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg sm:text-xl font-bold">{t.newLessonModalTitle}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isGenerating ? (
          /* Animated AI Generation State */
          <div className="py-12 px-4 flex flex-col items-center justify-center text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#6E3482] to-[#A56ABD] animate-pulse flex items-center justify-center shadow-xl shadow-[#6E3482]/50">
                <Zap className="w-10 h-10 text-white animate-bounce" />
              </div>
              <div className="absolute -inset-2 rounded-3xl border-2 border-[#A56ABD]/40 border-dashed animate-spin" />
            </div>

            <div className="space-y-2 max-w-md">
              <h3 className="text-xl font-bold text-white">
                {generationSteps[stepIndex].title}
              </h3>
              <p className="text-sm text-[#E7DBEF]/70">
                {generationSteps[stepIndex].sub}
              </p>
            </div>

            {/* Progress pills */}
            <div className="flex items-center gap-2 pt-2">
              {generationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx <= stepIndex
                      ? 'w-8 bg-[#A56ABD] shadow-sm shadow-[#A56ABD]'
                      : 'w-2 bg-[#49225B]'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-[#E7DBEF]/50 italic">
              Darsify AI · Darslik, testler hám 3D model birlestirilmekte...
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4 overflow-y-auto pr-1">
            {/* Tema input */}
            <div>
              <label className="block text-xs font-semibold text-[#E7DBEF]/90 mb-1.5">
                {t.topicLabel}
              </label>
              <input
                id="lesson-topic-input"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder={t.topicPlaceholder}
                className="w-full px-4 py-3 rounded-2xl bg-[#1A0B24] border border-[#6E3482]/70 text-white placeholder-[#E7DBEF]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#A56ABD] transition-all"
              />
            </div>

            {/* Subject selector */}
            <div>
              <label className="block text-xs font-semibold text-[#E7DBEF]/90 mb-1.5">
                {t.subjectLabel}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {subjects.map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => setSubject(sub)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      subject === sub
                        ? 'bg-[#6E3482] text-white shadow-md shadow-[#6E3482]/40 ring-1 ring-[#A56ABD]'
                        : 'bg-[#1A0B24] text-[#E7DBEF]/70 hover:bg-[#371646] hover:text-white border border-[#49225B]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Section matching image 5 */}
            <div>
              <label className="block text-xs font-semibold text-[#E7DBEF]/90 mb-1.5">
                {t.materialLabel}
              </label>

              {/* Upload Dropzone */}
              <div
                id="dropzone-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full rounded-2xl border-2 border-dashed transition-all p-6 flex flex-col items-center justify-center text-center cursor-pointer ${
                  uploadedFileName
                    ? 'border-[#A56ABD] bg-[#49225B]/30'
                    : 'border-[#6E3482]/60 hover:border-[#A56ABD] bg-[#1A0B24]/60 hover:bg-[#1A0B24]'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.docx,.pptx,.txt,.md"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-2xl bg-[#6E3482]/30 text-[#A56ABD] flex items-center justify-center mb-2.5">
                  <UploadCloud className="w-6 h-6" />
                </div>

                {uploadedFileName ? (
                  <div className="flex items-center gap-2 text-xs text-[#E7DBEF] font-semibold bg-[#49225B]/70 px-3 py-1.5 rounded-xl border border-[#A56ABD]/40">
                    <FileText className="w-4 h-4 text-[#A56ABD]" />
                    <span className="truncate max-w-[200px]">{uploadedFileName}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                ) : (
                  <>
                    <p className="text-xs sm:text-sm font-semibold text-[#E7DBEF]">
                      {t.dragDropText}
                    </p>
                    <span className="text-[11px] text-[#E7DBEF]/50 my-1">{t.or}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="px-4 py-1.5 rounded-xl bg-[#49225B] hover:bg-[#6E3482] text-[#E7DBEF] font-semibold text-xs border border-[#A56ABD]/30 transition-colors"
                    >
                      {t.orChooseFile}
                    </button>
                  </>
                )}

                <span className="text-[10px] text-[#E7DBEF]/40 mt-2">
                  {t.fileLimits}
                </span>
              </div>

              {/* Text Divider */}
              <div className="flex items-center gap-3 my-3">
                <div className="flex-1 h-px bg-[#49225B]" />
                <span className="text-[11px] text-[#E7DBEF]/50 font-medium">
                  {t.orEnterText}
                </span>
                <div className="flex-1 h-px bg-[#49225B]" />
              </div>

              {/* Textarea */}
              <textarea
                id="lesson-raw-text"
                rows={3}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder={t.textPlaceholder}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B24] border border-[#49225B] text-white placeholder-[#E7DBEF]/40 text-xs focus:outline-none focus:ring-2 focus:ring-[#A56ABD] resize-none"
              />
            </div>

            {/* Submit Button matching Image 5 */}
            <div className="pt-2">
              <button
                id="submit-create-lesson-btn"
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#6E3482] via-[#853ea0] to-[#A56ABD] hover:from-[#7b3991] hover:to-[#b373cb] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-[#6E3482]/50 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Zap className="w-5 h-5 fill-white/20" />
                <span>{t.createLessonBtn}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
