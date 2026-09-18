import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Users,
  Gamepad2,
  HelpCircle,
  Box,
  MonitorPlay,
  Sparkles,
  CheckCircle2,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { Lesson, Language, Screen } from '../types';
import { translations } from '../data/translations';

interface LiveClassroomViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
}

export const LiveClassroomView: React.FC<LiveClassroomViewProps> = ({
  lesson,
  language,
  onBack,
  onNavigate,
}) => {
  const t = translations[language];
  const [seconds, setSeconds] = useState(45 * 60); // 45 minutes countdown
  const [isActive, setIsActive] = useState(true);
  const [studentReactionCount, setStudentReactionCount] = useState(28);
  const [hasNewQuestion, setHasNewQuestion] = useState(true);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="live-classroom-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative select-none"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            id="back-from-classroom-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              SABALIK JÁRIYALANBAQTA (LIVE)
            </span>
            <h1 className="text-base sm:text-lg font-bold text-white mt-0.5">
              {lesson.title}
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setIsActive(!isActive)}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            {isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
          </button>
        </header>

        {/* Live Timer & Class Attendance Cockpit */}
        <div className="rounded-3xl bg-gradient-to-r from-[#321342] via-[#2A1335] to-[#3B174F] border border-[#6E3482]/60 p-5 shadow-xl flex items-center justify-between">
          <div>
            <span className="text-[11px] text-[#E7DBEF]/70 font-semibold block">
              Qalǵan sabaq waqtı:
            </span>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-wider">
              {formatTimer(seconds)}
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            <span className="text-xs px-3 py-1 rounded-full bg-[#49225B] border border-[#A56ABD]/40 text-[#E7DBEF] font-bold flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#A56ABD]" />
              <span>32 oqıwshı qatnaspaqta</span>
            </span>

            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setStudentReactionCount((c) => c + 1)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-semibold"
              >
                <ThumbsUp className="w-3 h-3" />
                <span>{studentReactionCount} túsindi</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Launch Projections */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#A56ABD] uppercase tracking-wider px-1">
            Ekranǵa shıǵarıw & Interaktiv orınlaw:
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              id="live-launch-game-btn"
              type="button"
              onClick={() => onNavigate('matching_game')}
              className="p-4 rounded-2xl bg-[#230F30] hover:bg-[#2F153E] border border-[#6E3482] flex flex-col items-start gap-2 text-left group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6E3482] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Sáykeslestiriw oyını</h4>
                <p className="text-[11px] text-[#E7DBEF]/60">Doskaǵa shıǵarıp oynatıw</p>
              </div>
            </button>

            <button
              id="live-launch-quiz-btn"
              type="button"
              onClick={() => onNavigate('quiz')}
              className="p-4 rounded-2xl bg-[#230F30] hover:bg-[#2F153E] border border-[#6E3482] flex flex-col items-start gap-2 text-left group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6E3482] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Bilim viktorinası</h4>
                <p className="text-[11px] text-[#E7DBEF]/60">Klass boyınsha test</p>
              </div>
            </button>

            <button
              id="live-launch-3d-btn"
              type="button"
              onClick={() => onNavigate('model_3d')}
              className="p-4 rounded-2xl bg-[#230F30] hover:bg-[#2F153E] border border-[#6E3482] flex flex-col items-start gap-2 text-left group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6E3482] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">3D Jasusha</h4>
                <p className="text-[11px] text-[#E7DBEF]/60">Aylanatuǵın vizualizaciya</p>
              </div>
            </button>

            <button
              id="live-launch-slides-btn"
              type="button"
              onClick={() => onNavigate('slides')}
              className="p-4 rounded-2xl bg-[#230F30] hover:bg-[#2F153E] border border-[#6E3482] flex flex-col items-start gap-2 text-left group transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#6E3482] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">Prezentaciya</h4>
                <p className="text-[11px] text-[#E7DBEF]/60">Slaydlardı kórsetiw</p>
              </div>
            </button>
          </div>
        </div>

        {/* Live Question Notification */}
        {hasNewQuestion && (
          <div className="rounded-2xl bg-[#1A0B24] border border-amber-500/40 p-3.5 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-amber-400" />
              <div>
                <span className="font-bold text-white block">Oqıwshı sorawı (Azamat, 7-B):</span>
                <span className="text-[#E7DBEF]/80">"Mitoxondriya ósimlik jasushasında da barma?"</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasNewQuestion(false)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-semibold text-[11px]"
            >
              Juwap berildi ✓
            </button>
          </div>
        )}

        {/* Finish Lesson Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={onBack}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#6E3482] text-white font-bold text-xs sm:text-sm text-center"
          >
            Sabaqtı juwmaqlaw hám nátiyjeni saqlaw
          </button>
        </div>
      </div>
    </div>
  );
};
