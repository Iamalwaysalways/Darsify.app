import React from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Gamepad2,
  HelpCircle,
  Box,
  MonitorPlay,
  Play,
  Edit3,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Lesson, Language, Screen } from '../types';
import { translations } from '../data/translations';

interface LessonOverviewScreenProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  onOpenEditLesson: (lesson: Lesson) => void;
}

export const LessonOverviewScreen: React.FC<LessonOverviewScreenProps> = ({
  lesson,
  language,
  onBack,
  onNavigate,
  onOpenEditLesson,
}) => {
  const t = translations[language];

  return (
    <div
      id="lesson-overview-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-24 relative"
    >
      {/* Background glow in palette colors */}
      <div className="absolute top-0 left-1/3 w-[450px] h-[300px] bg-[#6E3482]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-[#49225B]/25 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container max-w-xl */}
      <div className="w-full max-w-xl flex flex-col space-y-5 z-10">
        {/* HEADER matching Image 2 & 6 */}
        <header className="w-full flex items-start justify-between pt-1">
          <div className="flex items-start gap-3">
            <button
              id="back-to-dashboard-btn"
              type="button"
              onClick={onBack}
              className="mt-1 w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {lesson.title}
                </h1>
                {/* Topic Rename button explicitly fulfilling "jasusha qurilisi, suw skili, sanlar dunyasi degen sozlerdi ozgert" */}
                <button
                  type="button"
                  onClick={() => onOpenEditLesson(lesson)}
                  title="Temanı ózgertiw"
                  className="p-1 text-[#A56ABD] hover:text-white transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#E7DBEF]/70 font-medium mt-0.5">
                {lesson.subject} · {lesson.materialsCount} {t.materialsCreated}
              </p>
            </div>
          </div>

          {/* Status Badge "✓ Tayın" matching image 2 & 6 */}
          <div className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-bold text-xs flex items-center gap-1.5 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t.ready}</span>
          </div>
        </header>

        {/* AI Key Concept Card (from user prompt: "KEY INFORMATION with clean cards or sections. Example: KEY CONCEPT Short explanation") */}
        <div className="rounded-2xl bg-[#2A1335]/70 border border-[#6E3482]/40 p-3.5 sm:p-4 text-xs text-[#E7DBEF]/90 flex items-start gap-3">
          <div className="w-7 h-7 rounded-xl bg-[#6E3482]/40 flex-shrink-0 flex items-center justify-center text-[#A56ABD] mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white uppercase tracking-wider text-[10px] block text-[#A56ABD]">
              AI Tiykarǵı túsinigi
            </span>
            <p className="mt-0.5 text-[#E7DBEF]/80 leading-relaxed">
              {lesson.summary}
            </p>
          </div>
        </div>

        {/* 4 PRIMARY ACTION ITEMS matching Image 2 & 6 */}
        <div className="space-y-3 pt-1">
          {/* Item 1: Sabaq jobası (Ustaz aytatuǵın lekciya matni) -> [Kóriw] */}
          <div
            id="item-lesson-plan"
            className="w-full rounded-2xl bg-[#230F30]/90 border border-[#49225B] hover:border-[#6E3482] p-4 transition-all duration-200 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6E3482] to-[#8C43A4] flex items-center justify-center text-white shadow-md shadow-[#6E3482]/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {t.lessonPlanTitle}
                </h3>
                <p className="text-xs text-[#E7DBEF]/60 mt-0.5">
                  {t.lessonPlanDesc}
                </p>
              </div>
            </div>

            <button
              id="view-lesson-plan-btn"
              type="button"
              onClick={() => onNavigate('lesson_plan')}
              className="px-4 py-2 rounded-xl bg-[#371646] hover:bg-[#49225B] border border-[#6E3482]/60 text-white font-bold text-xs transition-all hover:scale-105 active:scale-95"
            >
              {t.view}
            </button>
          </div>

          {/* Item 2: Sáykeslestiriw oyını (1-oyın · interaktiv) -> [Oynaw] */}
          <div
            id="item-matching-game"
            className="w-full rounded-2xl bg-[#230F30]/90 border border-[#49225B] hover:border-[#6E3482] p-4 transition-all duration-200 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6E3482] to-[#8C43A4] flex items-center justify-center text-white shadow-md shadow-[#6E3482]/30">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {t.matchGameTitle}
                </h3>
                <p className="text-xs text-[#E7DBEF]/60 mt-0.5">
                  {t.matchGameDesc}
                </p>
              </div>
            </div>

            <button
              id="play-matching-game-btn"
              type="button"
              onClick={() => onNavigate('matching_game')}
              className="px-4 py-2 rounded-xl bg-[#371646] hover:bg-[#49225B] border border-[#6E3482]/60 text-white font-bold text-xs transition-all hover:scale-105 active:scale-95"
            >
              {t.play}
            </button>
          </div>

          {/* Item 3: Bilim viktorinası (2-oyın · interaktiv) -> [Oynaw] */}
          <div
            id="item-quiz"
            className="w-full rounded-2xl bg-[#230F30]/90 border border-[#49225B] hover:border-[#6E3482] p-4 transition-all duration-200 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6E3482] to-[#8C43A4] flex items-center justify-center text-white shadow-md shadow-[#6E3482]/30">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  {t.quizTitle}
                </h3>
                <p className="text-xs text-[#E7DBEF]/60 mt-0.5">
                  {t.quizDesc}
                </p>
              </div>
            </div>

            <button
              id="play-quiz-btn"
              type="button"
              onClick={() => onNavigate('quiz')}
              className="px-4 py-2 rounded-xl bg-[#371646] hover:bg-[#49225B] border border-[#6E3482]/60 text-white font-bold text-xs transition-all hover:scale-105 active:scale-95"
            >
              {t.play}
            </button>
          </div>

          {/* Item 4: 3D jasusha modeli (Aylanatuǵın 3D format) -> [Kóriw] */}
          <div
            id="item-3d-model"
            className="w-full rounded-2xl bg-[#230F30]/90 border border-[#49225B] hover:border-[#6E3482] p-4 transition-all duration-200 flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6E3482] to-[#8C43A4] flex items-center justify-center text-white shadow-md shadow-[#6E3482]/30">
                <Box className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-white">
                  3D {lesson.subject === 'Biologiya' ? 'jasusha' : 'vizual'} modeli
                </h3>
                <p className="text-xs text-[#E7DBEF]/60 mt-0.5">
                  {t.model3DDesc}
                </p>
              </div>
            </div>

            <button
              id="view-3d-model-btn"
              type="button"
              onClick={() => onNavigate('model_3d')}
              className="px-4 py-2 rounded-xl bg-[#371646] hover:bg-[#49225B] border border-[#6E3482]/60 text-white font-bold text-xs transition-all hover:scale-105 active:scale-95"
            >
              {t.view}
            </button>
          </div>
        </div>

        {/* BOTTOM ACTION BUTTONS matching Image 2 & 6 */}
        <div className="pt-3 grid grid-cols-2 gap-3">
          {/* Button 1: [ Slaydlardı kóriw ] (outline) */}
          <button
            id="view-slides-btn"
            type="button"
            onClick={() => onNavigate('slides')}
            className="py-3.5 px-4 rounded-2xl bg-[#230F30] hover:bg-[#2F153E] border border-[#6E3482] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MonitorPlay className="w-4 h-4 text-[#A56ABD]" />
            <span>{t.viewSlides}</span>
          </button>

          {/* Button 2: [ ▶ Darsti baslaw ] (gradient purple fill) */}
          <button
            id="start-live-lesson-btn"
            type="button"
            onClick={() => onNavigate('classroom_mode')}
            className="py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#6E3482] via-[#853EA0] to-[#A56ABD] hover:from-[#7b3991] hover:to-[#b373cb] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#6E3482]/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>{t.startLesson}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
