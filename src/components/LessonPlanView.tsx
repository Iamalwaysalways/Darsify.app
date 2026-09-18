import React, { useState } from 'react';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { Lesson, Language } from '../types';
import { translations } from '../data/translations';

interface LessonPlanViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
}

export const LessonPlanView: React.FC<LessonPlanViewProps> = ({
  lesson,
  language,
  onBack,
}) => {
  const t = translations[language];
  const [activeStage, setActiveStage] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  const plan = lesson.lessonPlan;
  const currentStage = plan.stages[activeStage] || plan.stages[0];

  const handleCopy = () => {
    const fullText = plan.stages
      .map((s) => `${s.stageName} (${s.duration})\n\nUstaz sóylew teksti:\n${s.teacherScript}\n\nOqıwshı háreketi:\n${s.studentActivity}\n`)
      .join('\n---\n\n');
    navigator.clipboard?.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  return (
    <div
      id="lesson-plan-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <button
            id="back-to-lesson-from-plan-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {t.lessonPlanTitle}
            </h1>
            <p className="text-xs text-[#A56ABD] font-medium">
              {lesson.title}
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#49225B] border border-[#6E3482]/50 text-xs font-semibold text-[#E7DBEF]">
            <Clock className="w-3.5 h-3.5 text-[#A56ABD]" />
            <span>{plan.durationMinutes} min</span>
          </div>
        </header>

        {/* Audio & Copy Action Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-[#321342] to-[#250F33] border border-[#6E3482]/50 p-4 flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <button
              id="voice-sim-btn"
              type="button"
              onClick={toggleAudio}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isPlayingAudio
                  ? 'bg-emerald-600 text-white animate-pulse ring-2 ring-emerald-400'
                  : 'bg-[#6E3482] text-white hover:bg-[#853EA0]'
              }`}
              title={t.lectureVoiceSim}
            >
              {isPlayingAudio ? <Volume2 className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <div>
              <div className="text-xs font-bold text-white">
                {isPlayingAudio ? "AI Ustaz dawısı oqılmaqta..." : t.lectureVoiceSim}
              </div>
              <div className="text-[11px] text-[#E7DBEF]/60">
                {isPlayingAudio ? "Dawıslı lekciya oynatılmaqta" : "Oqıtıwshı ushın tayarlanǵan úlgi"}
              </div>
            </div>
          </div>

          <button
            id="copy-lecture-script-btn"
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] text-xs font-semibold text-[#E7DBEF] transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#A56ABD]" />
                <span>{t.copyScript}</span>
              </>
            )}
          </button>
        </div>

        {/* Animated Soundwave if audio is active */}
        {isPlayingAudio && (
          <div className="p-3 rounded-2xl bg-[#1A0B24] border border-emerald-500/30 flex items-center justify-center gap-1">
            {[40, 70, 90, 30, 80, 50, 100, 45, 85, 60, 95, 35, 75].map((h, i) => (
              <div
                key={i}
                style={{ height: `${(h * 0.25)}px` }}
                className="w-1.5 bg-gradient-to-t from-emerald-500 to-[#A56ABD] rounded-full animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Learning Goals */}
        <div className="rounded-2xl bg-[#230F30]/80 border border-[#49225B] p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#A56ABD] uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Sabaq maqsetleri</span>
          </div>
          <div className="space-y-1.5">
            {lesson.learningGoals.map((goal, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-[#E7DBEF]">
                <span className="w-4 h-4 rounded-full bg-[#6E3482]/40 text-[#A56ABD] flex-shrink-0 flex items-center justify-center font-bold text-[10px] mt-0.5">
                  {idx + 1}
                </span>
                <span>{goal}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stages Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {plan.stages.map((stage, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveStage(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeStage === idx
                  ? 'bg-[#6E3482] text-white shadow-md shadow-[#6E3482]/40 ring-1 ring-[#A56ABD]'
                  : 'bg-[#230F30] text-[#E7DBEF]/60 hover:text-white border border-[#49225B]'
              }`}
            >
              {stage.stageName.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Active Stage Card */}
        <div className="rounded-3xl bg-[#230F30] border border-[#6E3482]/50 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#49225B] pb-3">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-xl bg-[#6E3482] text-white font-bold text-xs flex items-center justify-center">
                {activeStage + 1}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {currentStage.stageName}
              </h3>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#49225B] text-[#E7DBEF] font-semibold">
              {currentStage.duration}
            </span>
          </div>

          {/* Teacher Speaking Script */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#A56ABD]">
              <Sparkles className="w-4 h-4" />
              <span>Ustaz aytatuǵın sózler (Lekciya teksti):</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#180D21] border border-[#49225B] text-xs sm:text-sm text-[#F5EBFA] leading-relaxed italic relative">
              "{currentStage.teacherScript}"
            </div>
          </div>

          {/* Student Activity */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>Oqıwshılar háreketi:</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#1A1A2E]/60 border border-emerald-500/20 text-xs text-[#E7DBEF]">
              {currentStage.studentActivity}
            </div>
          </div>

          {/* Key Tips */}
          {currentStage.keyTips && (
            <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#371646]/50 border border-[#A56ABD]/30 text-xs text-[#E7DBEF]">
              <Lightbulb className="w-4 h-4 text-[#A56ABD] flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Metodikalıq kórsetpe:</span>
                <span className="text-[#E7DBEF]/80">{currentStage.keyTips}</span>
              </div>
            </div>
          )}

          {/* Next/Prev stage controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#49225B]">
            <button
              type="button"
              disabled={activeStage === 0}
              onClick={() => setActiveStage(activeStage - 1)}
              className="px-3.5 py-1.5 rounded-xl bg-[#2A1335] disabled:opacity-40 text-xs font-semibold"
            >
              {t.prevSlide}
            </button>
            <span className="text-xs text-[#E7DBEF]/50">
              {activeStage + 1} / {plan.stages.length} basqısh
            </span>
            <button
              type="button"
              disabled={activeStage === plan.stages.length - 1}
              onClick={() => setActiveStage(activeStage + 1)}
              className="px-3.5 py-1.5 rounded-xl bg-[#6E3482] hover:bg-[#853EA0] disabled:opacity-40 text-xs font-semibold text-white"
            >
              {t.nextSlide}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
