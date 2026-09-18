import React, { useState, useEffect } from 'react';
import { X, Edit3, Check } from 'lucide-react';
import { Lesson, Language } from '../types';
import { translations } from '../data/translations';

interface EditLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  lesson: Lesson | null;
  onSaveLesson: (updated: Lesson) => void;
  language: Language;
}

export const EditLessonModal: React.FC<EditLessonModalProps> = ({
  isOpen,
  onClose,
  lesson,
  onSaveLesson,
  language,
}) => {
  if (!isOpen || !lesson) return null;

  const t = translations[language];
  const [title, setTitle] = useState(lesson.title);
  const [subject, setSubject] = useState(lesson.subject);
  const [gradeLevel, setGradeLevel] = useState(lesson.gradeLevel);

  useEffect(() => {
    setTitle(lesson.title);
    setSubject(lesson.subject);
    setGradeLevel(lesson.gradeLevel);
  }, [lesson]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSaveLesson({
      ...lesson,
      title: title.trim(),
      subject: subject.trim(),
      gradeLevel: gradeLevel.trim(),
    });
    onClose();
  };

  return (
    <div
      id="edit-lesson-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="edit-lesson-modal-dialog"
        className="w-full max-w-md rounded-3xl bg-[#230F30] border border-[#6E3482]/60 shadow-2xl p-6 text-white relative"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#49225B]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#6E3482]/40 flex items-center justify-center text-[#E7DBEF]">
              <Edit3 className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base">{t.editTopicTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]/70"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
              {t.topicLabel}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#180D21] border border-[#6E3482]/70 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                {t.subjectLabel}
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#180D21] border border-[#49225B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                Klass / Bosqich
              </label>
              <input
                type="text"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#180D21] border border-[#49225B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#2A1335] hover:bg-[#371646] text-[#E7DBEF] text-xs font-semibold"
            >
              {t.close}
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] hover:from-[#7c3a93] hover:to-[#b377cb] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#6E3482]/40"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{t.editTopicBtn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
