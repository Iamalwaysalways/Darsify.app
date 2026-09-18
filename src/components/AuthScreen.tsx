import React, { useState } from 'react';
import { Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { DarsifyLogo } from './DarsifyLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language, UserProfile } from '../types';
import { translations } from '../data/translations';

interface AuthScreenProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogin: (user: UserProfile) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  language,
  onLanguageChange,
  onLogin,
}) => {
  const t = translations[language];
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [teacherName, setTeacherName] = useState('Gulnaz Joldasova');
  const [teacherEmail, setTeacherEmail] = useState('gulnaz.ustaz@darsify.edu.uz');
  const [schoolName, setSchoolName] = useState('Nókis qalası 1-sanlı qánigelestirilgen mektep');
  const [subject, setSubject] = useState('Biologiya');

  const handleGoogleLogin = () => {
    onLogin({
      name: 'Gulnaz Joldasova',
      email: 'gulnaz.ustaz@gmail.com',
      school: 'Nókis qalası 1-sanlı mektep',
      subject: 'Biologiya & Tábiyattanıw',
      avatarInitial: 'GJ',
    });
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim() || !teacherEmail.trim()) return;
    onLogin({
      name: teacherName.trim(),
      email: teacherEmail.trim(),
      school: schoolName.trim() || 'Mektep',
      subject: subject.trim() || 'Biologiya',
      avatarInitial: teacherName
        .split(' ')
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'US',
    });
  };

  return (
    <div
      id="auth-screen-container"
      className="min-h-screen w-full flex flex-col justify-between items-center p-4 sm:p-6 bg-gradient-to-b from-[#180D21] via-[#2A1335] to-[#14081C] text-white relative overflow-hidden"
    >
      {/* Ambient background glow matching user palette (#49225B, #6E3482, #A56ABD) */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#6E3482]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#A56ABD]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-[#49225B]/40 rounded-full blur-3xl pointer-events-none" />

      {/* TOP BAR: Language selector right at the top as explicitly requested */}
      <header className="w-full max-w-md flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#49225B]/70 border border-[#A56ABD]/30 text-[#E7DBEF]">
            <Sparkles className="w-3 h-3 text-[#A56ABD]" />
            Uzbekistan EdTech MVP
          </span>
        </div>

        {/* User requested: "en daslep akaunt ashqanda login email kiritkende shoqarida til ozgertiw imkani bolsin" */}
        <LanguageSwitcher
          currentLanguage={language}
          onLanguageChange={onLanguageChange}
        />
      </header>

      {/* MAIN CARD: Matching user image 4 */}
      <main className="w-full max-w-md my-auto z-10 py-6">
        <div
          id="login-card"
          className="w-full rounded-3xl bg-[#230F30]/80 backdrop-blur-xl border border-[#49225B]/70 p-6 sm:p-8 shadow-2xl shadow-black/60 flex flex-col items-center text-center relative"
        >
          {/* Darsify Logo */}
          <div className="mb-6">
            <DarsifyLogo size="lg" showTagline={true} />
          </div>

          {!showEmailForm ? (
            <div className="w-full space-y-4">
              {/* Google Sign In Button */}
              <button
                id="google-login-btn"
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-[#F5EBFA] text-gray-900 font-bold text-sm sm:text-base flex items-center justify-center gap-3 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.14z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.36 7.34 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.92 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
                  />
                </svg>
                <span>{t.loginGoogle}</span>
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex-1 h-px bg-[#49225B]" />
                <span className="text-xs text-[#E7DBEF]/50 font-medium px-2">{t.or}</span>
                <div className="flex-1 h-px bg-[#49225B]" />
              </div>

              {/* Email Sign In Button */}
              <button
                id="email-login-toggle-btn"
                type="button"
                onClick={() => setShowEmailForm(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#371646] hover:bg-[#49225B] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-3 border border-[#6E3482]/60 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
              >
                <Mail className="w-5 h-5 text-[#A56ABD]" />
                <span>{t.loginEmail}</span>
              </button>

              {/* Instant Teacher Demo button */}
              <div className="pt-2">
                <button
                  id="instant-demo-login-btn"
                  type="button"
                  onClick={handleGoogleLogin}
                  className="text-xs text-[#A56ABD] hover:text-[#E7DBEF] underline underline-offset-4 transition-colors"
                >
                  ⚡ Tez kórsetiw rejimi (Ustaz akkauntı menen kiriw)
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                  {t.fullName}
                </label>
                <input
                  id="teacher-name-input"
                  type="text"
                  required
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B24] border border-[#6E3482]/70 text-white placeholder-[#E7DBEF]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                  Email
                </label>
                <input
                  id="teacher-email-input"
                  type="email"
                  required
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#1A0B24] border border-[#6E3482]/70 text-white placeholder-[#E7DBEF]/40 text-sm focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                    {t.schoolName}
                  </label>
                  <input
                    id="teacher-school-input"
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0B24] border border-[#49225B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#E7DBEF]/80 mb-1.5">
                    {t.subjectSpecialty}
                  </label>
                  <input
                    id="teacher-subject-input"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#1A0B24] border border-[#49225B] text-white text-xs focus:outline-none focus:ring-2 focus:ring-[#A56ABD]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailForm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2A1335] hover:bg-[#371646] text-[#E7DBEF] font-medium text-xs border border-[#49225B]"
                >
                  {t.back}
                </button>
                <button
                  id="submit-email-login-btn"
                  type="submit"
                  className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] hover:from-[#7c3a93] hover:to-[#b377cb] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#6E3482]/40"
                >
                  <span>{t.loginEmail}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* Terms notice matching image 4 */}
          <p className="text-[11px] text-[#E7DBEF]/50 mt-6 leading-relaxed">
            {t.termsNotice}
          </p>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-md text-center py-2 text-[11px] text-[#A56ABD]/70 z-10">
        <span>darsify.ai · O'zbekiston ustozlari uchun AI platformasi</span>
      </footer>
    </div>
  );
};
