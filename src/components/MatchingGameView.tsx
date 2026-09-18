import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  RotateCcw,
  Trophy,
  CheckCircle2,
  Clock,
  Zap,
  Sparkles,
  Award,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, Language, MatchingPair } from '../types';
import { translations } from '../data/translations';

interface MatchingGameViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
  onGoToQuiz?: () => void;
}

export const MatchingGameView: React.FC<MatchingGameViewProps> = ({
  lesson,
  language,
  onBack,
  onGoToQuiz,
}) => {
  const t = translations[language];
  const pairs = lesson.matchingGame.pairs;

  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [selectedDefId, setSelectedDefId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchIds, setMismatchIds] = useState<{ termId: string; defId: string } | null>(null);
  const [shuffledDefs, setShuffledDefs] = useState<MatchingPair[]>([]);
  const [seconds, setSeconds] = useState(0);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize and shuffle definitions
  useEffect(() => {
    resetGame();
  }, [lesson]);

  // Timer
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const resetGame = () => {
    const shuffled = [...pairs].sort(() => Math.random() - 0.5);
    setShuffledDefs(shuffled);
    setMatchedIds([]);
    setSelectedTermId(null);
    setSelectedDefId(null);
    setMismatchIds(null);
    setSeconds(0);
    setMoves(0);
    setScore(0);
    setCombo(1);
    setIsCompleted(false);
  };

  const handleTermClick = (pairId: string) => {
    if (matchedIds.includes(pairId) || isCompleted) return;
    setSelectedTermId(pairId);

    if (selectedDefId) {
      checkMatch(pairId, selectedDefId);
    }
  };

  const handleDefClick = (pairId: string) => {
    if (matchedIds.includes(pairId) || isCompleted) return;
    setSelectedDefId(pairId);

    if (selectedTermId) {
      checkMatch(selectedTermId, pairId);
    }
  };

  const checkMatch = (termId: string, defId: string) => {
    setMoves((m) => m + 1);

    if (termId === defId) {
      // Match success!
      const newMatched = [...matchedIds, termId];
      setMatchedIds(newMatched);
      setScore((s) => s + 100 * combo);
      setCombo((c) => c + 1);
      setSelectedTermId(null);
      setSelectedDefId(null);

      // Check if all matched
      if (newMatched.length === pairs.length) {
        setIsCompleted(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6E3482', '#A56ABD', '#F5EBFA', '#4ECCA3', '#FFD166'],
          });
        } catch {
          // fallback
        }
      }
    } else {
      // Mismatch
      setMismatchIds({ termId, defId });
      setCombo(1);
      setTimeout(() => {
        setMismatchIds(null);
        setSelectedTermId(null);
        setSelectedDefId(null);
      }, 700);
    }
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      id="matching-game-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            id="back-from-game-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {t.matchGameTitle}
            </h1>
            <p className="text-xs text-[#A56ABD] font-medium">
              {lesson.matchingGame.gameTitle}
            </p>
          </div>

          <button
            id="reset-matching-game-btn"
            type="button"
            onClick={resetGame}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
            title={t.playAgain}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </header>

        {/* Game Stats Bar */}
        <div className="grid grid-cols-4 gap-2 bg-[#1A0B24] p-3 rounded-2xl border border-[#49225B] text-center">
          <div>
            <div className="text-[10px] text-[#E7DBEF]/60 uppercase font-semibold">{t.timer}</div>
            <div className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#A56ABD]" />
              <span>{formatTime(seconds)}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#E7DBEF]/60 uppercase font-semibold">{t.matchedPairs}</div>
            <div className="text-sm sm:text-base font-bold text-emerald-400">
              {matchedIds.length} / {pairs.length}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#E7DBEF]/60 uppercase font-semibold">{t.moves}</div>
            <div className="text-sm sm:text-base font-bold text-white">
              {moves}
            </div>
          </div>

          <div>
            <div className="text-[10px] text-[#E7DBEF]/60 uppercase font-semibold">{t.score}</div>
            <div className="text-sm sm:text-base font-bold text-[#A56ABD] flex items-center justify-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{score}</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-xs text-[#E7DBEF]/70 px-2">
          {lesson.matchingGame.instructions}
        </div>

        {/* Completion Modal / Card */}
        {isCompleted ? (
          <div className="rounded-3xl bg-gradient-to-b from-[#321342] to-[#230F30] border border-emerald-500/50 p-6 text-center space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black text-white">{t.congrats}</h2>
              <p className="text-xs text-[#E7DBEF]/80">
                Waqıt: <strong className="text-white">{formatTime(seconds)}</strong> · Háreket: <strong className="text-white">{moves}</strong> · Bal: <strong className="text-emerald-400">{score}</strong>
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={resetGame}
                className="px-4 py-2.5 rounded-xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] text-xs font-bold text-white flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.playAgain}</span>
              </button>

              {onGoToQuiz && (
                <button
                  type="button"
                  onClick={onGoToQuiz}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#6E3482]/40"
                >
                  <Award className="w-4 h-4" />
                  <span>Bilim viktorinasına ótiw</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Match Board: Two Columns */
          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Column 1: Scientific Terms / Organoids */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-[#A56ABD] uppercase tracking-wider px-1">
                Atama / Organoid
              </div>
              {pairs.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedTermId === pair.id;
                const isMismatch = mismatchIds?.termId === pair.id;

                return (
                  <button
                    key={`term-${pair.id}`}
                    id={`term-btn-${pair.id}`}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleTermClick(pair.id)}
                    className={`w-full min-h-[72px] p-3 rounded-2xl border text-left text-xs font-bold transition-all duration-200 flex items-center justify-between shadow-sm ${
                      isMatched
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 opacity-80 ring-1 ring-emerald-500/30'
                        : isMismatch
                        ? 'bg-rose-950/50 border-rose-500 text-rose-300 animate-shake'
                        : isSelected
                        ? 'bg-[#6E3482] border-[#A56ABD] text-white ring-2 ring-[#A56ABD] scale-[1.02]'
                        : 'bg-[#230F30] hover:bg-[#2F153E] border-[#49225B] text-[#E7DBEF] hover:border-[#6E3482]'
                    }`}
                  >
                    <span>{pair.term}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Column 2: Shuffled Definitions */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold text-[#A56ABD] uppercase tracking-wider px-1">
                Biologiyalıq xızmeti
              </div>
              {shuffledDefs.map((pair) => {
                const isMatched = matchedIds.includes(pair.id);
                const isSelected = selectedDefId === pair.id;
                const isMismatch = mismatchIds?.defId === pair.id;

                return (
                  <button
                    key={`def-${pair.id}`}
                    id={`def-btn-${pair.id}`}
                    type="button"
                    disabled={isMatched}
                    onClick={() => handleDefClick(pair.id)}
                    className={`w-full min-h-[72px] p-3 rounded-2xl border text-left text-[11px] leading-relaxed transition-all duration-200 flex items-center justify-between shadow-sm ${
                      isMatched
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 opacity-80 ring-1 ring-emerald-500/30 font-medium'
                        : isMismatch
                        ? 'bg-rose-950/50 border-rose-500 text-rose-300 animate-shake'
                        : isSelected
                        ? 'bg-[#6E3482] border-[#A56ABD] text-white ring-2 ring-[#A56ABD] scale-[1.02] font-semibold'
                        : 'bg-[#230F30] hover:bg-[#2F153E] border-[#49225B] text-[#E7DBEF]/90 hover:border-[#6E3482]'
                    }`}
                  >
                    <span>{pair.definition}</span>
                    {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
