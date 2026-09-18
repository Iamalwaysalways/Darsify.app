import React, { useState } from 'react';
import {
  Bell,
  Settings,
  Plus,
  BookOpen,
  Clock,
  Users,
  ChevronRight,
  Sparkles,
  Edit3,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { DarsifyLogo } from './DarsifyLogo';
import { Lesson, UserProfile, Language } from '../types';
import { translations } from '../data/translations';

interface DashboardScreenProps {
  user: UserProfile;
  lessons: Lesson[];
  language: Language;
  onOpenCreateLesson: () => void;
  onSelectLesson: (lesson: Lesson) => void;
  onOpenSettings: () => void;
  onOpenEditLesson: (lesson: Lesson) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  lessons,
  language,
  onOpenCreateLesson,
  onSelectLesson,
  onOpenSettings,
  onOpenEditLesson,
}) => {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'biologiya' | 'geografiya' | 'matematika'>('all');
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.subject.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && lesson.subject.toLowerCase() === activeTab;
  });

  return (
    <div
      id="dashboard-screen"
      className="min-h-screen w-full bg-gradient-to-b from-[#180D21] via-[#230F30] to-[#14081C] text-white flex flex-col items-center p-4 sm:p-6 pb-20 relative"
    >
      {/* Background ambient lighting in user palette (#49225B, #6E3482, #A56ABD) */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#6E3482]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-[#49225B]/30 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container max-w-xl (aligned with mobile-first app preview & responsive desktop) */}
      <div className="w-full max-w-xl flex flex-col space-y-5 z-10">
        {/* HEADER: matching image 3 */}
        <header className="w-full flex items-center justify-between pt-1">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <DarsifyLogo size="sm" showTagline={false} />
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Notification Bell */}
            <div className="relative">
              <button
                id="notifications-bell-btn"
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-2xl bg-[#2A1335]/80 hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#A56ABD] ring-2 ring-[#2A1335] animate-pulse" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#230F30] border border-[#6E3482] shadow-2xl p-3 text-xs z-50 animate-fadeIn">
                  <div className="font-bold text-white mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#A56ABD]" />
                    Xabarnamalar
                  </div>
                  <div className="space-y-2 text-[#E7DBEF]/80">
                    <div className="p-2 rounded-xl bg-[#180D21] border border-[#49225B]">
                      <p className="font-semibold text-white">✨ Jańa 3D model qosıldı</p>
                      <p className="text-[11px] text-[#E7DBEF]/60">Jasusha hám ósimlikler boyınsha interaktivler tayın.</p>
                    </div>
                    <div className="p-2 rounded-xl bg-[#180D21] border border-[#49225B]">
                      <p className="font-semibold text-white">🎯 340 oqıwshı test tapsırdı</p>
                      <p className="text-[11px] text-[#E7DBEF]/60">Viktorina nátiyjeleri jaqsı kórsetkishti kórsetti.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings button explicitly requested */}
            <button
              id="dashboard-settings-btn"
              type="button"
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-2xl bg-[#2A1335]/80 hover:bg-[#371646] border border-[#49225B] flex items-center justify-center text-[#E7DBEF] transition-colors"
              title={t.settings}
            >
              <Settings className="w-5 h-5" />
            </button>

            {/* User Avatar Initial */}
            <button
              id="user-avatar-btn"
              type="button"
              onClick={onOpenSettings}
              className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6E3482] to-[#A56ABD] font-bold text-sm text-white flex items-center justify-center shadow-md shadow-[#6E3482]/40 hover:scale-105 transition-transform ring-1 ring-white/20"
              title={user.name}
            >
              {user.avatarInitial}
            </button>
          </div>
        </header>

        {/* WELCOME BANNER: matching image 3 */}
        <div
          id="welcome-banner"
          className="w-full rounded-3xl bg-gradient-to-r from-[#321342] via-[#2A1335] to-[#3B174F] border border-[#6E3482]/50 p-5 sm:p-6 shadow-xl relative overflow-hidden"
        >
          {/* Subtle lightning watermark in background */}
          <div className="absolute right-4 -bottom-4 opacity-10 pointer-events-none">
            <Sparkles className="w-36 h-36 text-[#A56ABD]" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#49225B]/80 text-[#E7DBEF] border border-[#A56ABD]/30 mb-2">
            <span>✨</span> {user.school}
          </span>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {t.welcomeTeacher}
          </h1>
          <p className="text-sm text-[#E7DBEF]/80 mt-1 font-medium">
            {t.todayPrompt}
          </p>

          {/* Big CTA Button "+ Jańa dars jaratıw" */}
          <div className="mt-4">
            <button
              id="create-new-lesson-btn"
              type="button"
              onClick={onOpenCreateLesson}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#6E3482] via-[#853EA0] to-[#A56ABD] hover:from-[#7c3992] hover:to-[#b573cd] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-[#6E3482]/40 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Plus className="w-5 h-5" />
              <span>{t.createNewLesson}</span>
            </button>
          </div>
        </div>

        {/* STATS CARDS: matching image 3 */}
        <div id="stats-grid" className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {/* Stat 1: 24 Jaratılǵan dars */}
          <div className="rounded-2xl bg-[#230F30]/90 border border-[#49225B] p-3 sm:p-4 flex flex-col justify-between shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#6E3482]/30 flex items-center justify-center text-[#A56ABD] mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                24
              </div>
              <div className="text-[11px] sm:text-xs text-[#E7DBEF]/70 font-medium mt-1 leading-tight">
                {t.statLessons}
              </div>
            </div>
          </div>

          {/* Stat 2: 18 saat Tejelgen waqıt */}
          <div className="rounded-2xl bg-[#230F30]/90 border border-[#49225B] p-3 sm:p-4 flex flex-col justify-between shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#6E3482]/30 flex items-center justify-center text-[#A56ABD] mb-2">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                18 <span className="text-xs font-normal text-[#E7DBEF]/60">{t.hours}</span>
              </div>
              <div className="text-[11px] sm:text-xs text-[#E7DBEF]/70 font-medium mt-1 leading-tight">
                {t.statTimeSaved}
              </div>
            </div>
          </div>

          {/* Stat 3: 340 Oqıwshılar */}
          <div className="rounded-2xl bg-[#230F30]/90 border border-[#49225B] p-3 sm:p-4 flex flex-col justify-between shadow-md">
            <div className="w-8 h-8 rounded-xl bg-[#6E3482]/30 flex items-center justify-center text-[#A56ABD] mb-2">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-white leading-none">
                340
              </div>
              <div className="text-[11px] sm:text-xs text-[#E7DBEF]/70 font-medium mt-1 leading-tight">
                {t.statStudents}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: Sońǵı darslar (Recent lessons) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <span>{t.recentLessons}</span>
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-[#49225B] text-[#E7DBEF]">
                {filteredLessons.length}
              </span>
            </h2>

            {/* Quick search input */}
            <div className="relative w-44 sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#E7DBEF]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="İzlew..."
                className="w-full pl-8 pr-2.5 py-1 rounded-xl bg-[#1A0B24] border border-[#49225B] text-white text-xs focus:ring-1 focus:ring-[#A56ABD] outline-none placeholder-[#E7DBEF]/30"
              />
            </div>
          </div>

          {/* Subject Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'Barlıǵı' },
              { id: 'biologiya', label: 'Biologiya' },
              { id: 'geografiya', label: 'Geografiya' },
              { id: 'matematika', label: 'Matematika' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#6E3482] text-white shadow-sm ring-1 ring-[#A56ABD]/50'
                    : 'bg-[#230F30] text-[#E7DBEF]/60 hover:text-white border border-[#49225B]/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Lessons List matching image 3 cards */}
          <div className="space-y-2.5">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                id={`lesson-card-${lesson.id}`}
                className="w-full rounded-2xl bg-[#230F30]/80 hover:bg-[#2F153E] border border-[#49225B] hover:border-[#6E3482] p-4 transition-all duration-200 flex items-center justify-between group shadow-md"
              >
                <div
                  onClick={() => onSelectLesson(lesson)}
                  className="flex-1 cursor-pointer flex items-center gap-3.5"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#49225B] border border-[#6E3482]/60 flex items-center justify-center text-[#E7DBEF] group-hover:scale-105 group-hover:bg-[#6E3482] transition-all">
                    <BookOpen className="w-5 h-5 text-[#A56ABD] group-hover:text-white" />
                  </div>

                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#F5EBFA] transition-colors line-clamp-1">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-[#E7DBEF]/60 mt-0.5 flex items-center gap-1.5">
                      <span>{lesson.subject}</span>
                      <span>·</span>
                      <span>{lesson.timeAgo}</span>
                      <span>·</span>
                      <span className="text-emerald-400 font-medium">
                        {lesson.materialsCount} material
                      </span>
                    </p>
                  </div>
                </div>

                {/* Right controls: Quick Rename/Edit Topic button + Arrow */}
                <div className="flex items-center gap-1 pl-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEditLesson(lesson);
                    }}
                    title="Temanı ózgertiw"
                    className="p-2 rounded-xl text-[#E7DBEF]/40 hover:text-[#A56ABD] hover:bg-white/5 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectLesson(lesson)}
                    className="p-2 rounded-xl text-[#E7DBEF]/40 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {filteredLessons.length === 0 && (
              <div className="py-8 text-center text-xs text-[#E7DBEF]/50">
                Mavzular topilmadi. "+ Jańa dars jaratıw" tugmasini bosing.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
