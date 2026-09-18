import React, { useState } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Trophy,
  Flame,
  Award,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Language } from '../types';
import { translations } from '../data/translations';

interface QuizViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
  onGoToModel3D?: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  lesson,
  language,
  onBack,
  onGoToModel3D,
}) => {
  const t = translations[language];
  const questions = lesson.quiz.questions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (index: number) => {
    if (isAnswered || isFinished) return;

    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQ.correctIndex) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);
      setCorrectCount((prev) => prev + 1);
      setScore((s) => s + 100 + newStreak * 20);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#6E3482', '#A56ABD', '#FFD166', '#06D6A0'],
        });
      } catch {
        // fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setHighestStreak(0);
    setCorrectCount(0);
    setIsFinished(false);
  };

  const percent = Math.round((correctCount / questions.length) * 100);

  return (
    <div
      id="quiz-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            id="back-from-quiz-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {t.quizTitle}
            </h1>
            <p className="text-xs text-[#A56ABD] font-medium">
              {lesson.quiz.quizTitle}
            </p>
          </div>

          <button
            id="reset-quiz-btn"
            type="button"
            onClick={handleRestart}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
            title={t.playAgain}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </header>

        {/* Top Progress & Score */}
        <div className="rounded-2xl bg-[#1A0B24] border border-[#49225B] p-3.5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-[#E7DBEF]/80">
              {t.question} <strong className="text-white">{currentIndex + 1}</strong> / {questions.length}
            </span>

            <div className="flex items-center gap-3 font-bold">
              {streak > 1 && (
                <span className="flex items-center gap-1 text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-lg border border-amber-500/40 animate-pulse">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{streak}x streak</span>
                </span>
              )}
              <span className="text-[#A56ABD]">
                {score} {t.score}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 rounded-full bg-[#2A1335] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6E3482] to-[#A56ABD] transition-all duration-300 rounded-full"
              style={{ width: `${((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Quiz Content or Finished Card */}
        {isFinished ? (
          <div className="rounded-3xl bg-gradient-to-b from-[#321342] to-[#230F30] border border-[#6E3482] p-6 text-center space-y-5 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-[#6E3482] to-[#A56ABD] text-white flex items-center justify-center shadow-lg shadow-[#6E3482]/40">
              <Trophy className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white">{t.congrats}</h2>
              <p className="text-xs text-[#E7DBEF]/80">
                Viktorina tabıslı juwmaqlandı! Nátiyjeler:
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-[#180D21] p-3.5 rounded-2xl border border-[#49225B]">
              <div>
                <div className="text-[11px] text-[#E7DBEF]/60">Anıqlıq</div>
                <div className="text-lg font-black text-emerald-400">{percent}%</div>
              </div>
              <div>
                <div className="text-[11px] text-[#E7DBEF]/60">Tuwrı juwap</div>
                <div className="text-lg font-black text-white">{correctCount}/{questions.length}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#E7DBEF]/60">Jámi bal</div>
                <div className="text-lg font-black text-[#A56ABD]">{score}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleRestart}
                className="px-4 py-2.5 rounded-xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] text-xs font-bold text-white flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.playAgain}</span>
              </button>

              {onGoToModel3D && (
                <button
                  type="button"
                  onClick={onGoToModel3D}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#6E3482]/40"
                >
                  <Award className="w-4 h-4" />
                  <span>3D modeldi kóriw</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Question Box */}
            <div className="rounded-3xl bg-[#230F30] border border-[#6E3482]/60 p-5 shadow-xl space-y-2">
              <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#49225B] text-[#E7DBEF] uppercase tracking-wider">
                {lesson.subject} · {lesson.gradeLevel}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* 4 Options */}
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let cardStyle = 'bg-[#230F30] hover:bg-[#2F153E] border-[#49225B] text-[#E7DBEF]';
                let badgeStyle = 'bg-[#180D21] text-[#A56ABD] border border-[#49225B]';

                if (isAnswered) {
                  if (isCorrect) {
                    cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 ring-1 ring-emerald-400';
                    badgeStyle = 'bg-emerald-600 text-white';
                  } else if (isSelected && !isCorrect) {
                    cardStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    badgeStyle = 'bg-rose-600 text-white';
                  } else {
                    cardStyle = 'bg-[#180D21]/60 border-[#49225B]/50 text-[#E7DBEF]/40';
                  }
                }

                const labels = ['A', 'B', 'C', 'D'];

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-between shadow-sm ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${badgeStyle}`}>
                        {labels[idx]}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box when answered */}
            {isAnswered && (
              <div className="rounded-2xl bg-[#180D21] border border-[#6E3482]/60 p-4 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-xs font-bold text-[#A56ABD]">
                  <HelpCircle className="w-4 h-4" />
                  <span>{t.explanation}</span>
                </div>
                <p className="text-xs text-[#E7DBEF]/90 leading-relaxed">
                  {currentQ.explanation}
                </p>

                <div className="pt-2 flex justify-end">
                  <button
                    id="next-quiz-question-btn"
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] hover:from-[#7c3a93] hover:to-[#b377cb] text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-[#6E3482]/40"
                  >
                    <span>{currentIndex < questions.length - 1 ? t.nextQuestion : 'Nátiyjeni kóriw'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
