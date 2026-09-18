import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { Lesson, Language } from '../types';
import { translations } from '../data/translations';

interface SlidesViewProps {
  lesson: Lesson;
  language: Language;
  onBack: () => void;
}

export const SlidesView: React.FC<SlidesViewProps> = ({
  lesson,
  language,
  onBack,
}) => {
  const t = translations[language];
  const slides = lesson.slides;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);

  const slide = slides[currentSlideIndex] || slides[0];

  return (
    <div
      id="slides-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative select-none"
    >
      <div className="w-full max-w-xl flex flex-col space-y-4 z-10">
        {/* Header */}
        <header className="flex items-center justify-between">
          <button
            id="back-from-slides-btn"
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-2xl bg-[#2A1335] hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="text-base sm:text-lg font-bold text-white">
              {t.viewSlides}
            </h1>
            <p className="text-xs text-[#A56ABD] font-medium">
              {lesson.title}
            </p>
          </div>

          <div className="px-3 py-1 rounded-full bg-[#49225B] text-xs font-bold text-[#E7DBEF]">
            {currentSlideIndex + 1} / {slides.length}
          </div>
        </header>

        {/* Main Slide Canvas */}
        <div
          id="slide-canvas"
          className="w-full aspect-[16/10] sm:h-80 rounded-3xl bg-gradient-to-br from-[#2D143B] via-[#230F30] to-[#1D0B28] border-2 border-[#6E3482]/70 shadow-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Ambient slide decor */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#6E3482]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Slide Header */}
          <div className="flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full bg-[#49225B]/80 border border-[#A56ABD]/40 text-[11px] font-bold text-[#E7DBEF]">
              {lesson.subject} · {lesson.gradeLevel}
            </span>
            <span className="text-xs font-semibold text-[#A56ABD]">
              DARSIFY SLIDE #{slide.slideNumber}
            </span>
          </div>

          {/* Slide Body */}
          <div className="space-y-4 z-10 my-auto">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {slide.slideTitle}
            </h2>

            <div className="space-y-2.5">
              {slide.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5EBFA]">
                  <span className="w-2 h-2 rounded-full bg-[#A56ABD] mt-1.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Footer */}
          <div className="flex items-center justify-between text-[11px] text-[#E7DBEF]/50 pt-3 border-t border-[#49225B]/60 z-10">
            <span>Darsify AI Interactive Classroom</span>
            <span>{currentSlideIndex + 1} of {slides.length}</span>
          </div>
        </div>

        {/* Slide Navigation Controls */}
        <div className="flex items-center justify-between bg-[#1A0B24] p-2.5 rounded-2xl border border-[#49225B]">
          <button
            type="button"
            disabled={currentSlideIndex === 0}
            onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
            className="px-4 py-2 rounded-xl bg-[#2A1335] hover:bg-[#371646] disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{t.prevSlide}</span>
          </button>

          {/* Thumbnail dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  currentSlideIndex === idx
                    ? 'w-7 bg-[#A56ABD]'
                    : 'w-2.5 bg-[#49225B] hover:bg-[#6E3482]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            disabled={currentSlideIndex === slides.length - 1}
            onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
            className="px-4 py-2 rounded-xl bg-[#6E3482] hover:bg-[#853EA0] disabled:opacity-40 text-xs font-bold text-white flex items-center gap-1.5"
          >
            <span>{t.nextSlide}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Teacher Notes Drawer */}
        <div className="rounded-2xl bg-[#230F30] border border-[#49225B] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-bold text-[#A56ABD]">
              <FileText className="w-4 h-4" />
              <span>{t.teacherNotes}</span>
            </span>
            <button
              type="button"
              onClick={() => setShowNotes(!showNotes)}
              className="text-[11px] text-[#E7DBEF]/60 hover:text-white"
            >
              {showNotes ? 'Jasırıw' : 'Kóriw'}
            </button>
          </div>

          {showNotes && (
            <p className="text-xs text-[#E7DBEF]/90 italic bg-[#180D21] p-3 rounded-xl border border-[#49225B]">
              "{slide.teacherNotes}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
