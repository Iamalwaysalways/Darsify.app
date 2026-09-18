import React, { useState } from 'react';
import { X, Settings, Globe, Palette, User, Volume2, Sparkles, Check } from 'lucide-react';
import { Language, UserProfile, AppSettings } from '../types';
import { translations } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  settings: AppSettings;
  onUpdateSettings: (updated: AppSettings) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  settings,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const t = translations[settings.language];
  const [userName, setUserName] = useState(user.name);
  const [school, setSchool] = useState(user.school);
  const [subject, setSubject] = useState(user.subject);
  const [theme, setTheme] = useState(settings.theme);
  const [soundEffects, setSoundEffects] = useState(settings.soundEffects);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: userName,
      school: school,
      subject: subject,
      avatarInitial: userName.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() || 'US',
    });
    onUpdateSettings({
      ...settings,
      theme,
      soundEffects,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="settings-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
    >
      <div
        id="settings-modal-dialog"
        className="w-full max-w-lg rounded-3xl bg-[#230F30] border border-[#6E3482]/60 shadow-2xl p-6 text-white relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#49225B]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#6E3482]/40 border border-[#A56ABD]/40 flex items-center justify-center text-[#E7DBEF]">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{t.settings}</h2>
              <p className="text-xs text-[#E7DBEF]/60">Darsify qollanbası sazlawları</p>
            </div>
          </div>
          <button
            id="close-settings-btn"
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#E7DBEF]/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          {/* Language Selection */}
          <div className="bg-[#180D21] p-4 rounded-2xl border border-[#49225B]">
            <div className="flex items-center justify-between mb-2.5">
              <label className="flex items-center gap-2 text-xs font-bold text-[#E7DBEF]">
                <Globe className="w-4 h-4 text-[#A56ABD]" />
                <span>{t.languageSelect}</span>
              </label>
              <span className="text-[11px] text-[#A56ABD]">
                {settings.language.toUpperCase()}
              </span>
            </div>
            <LanguageSwitcher
              currentLanguage={settings.language}
              onLanguageChange={(lang) => onUpdateSettings({ ...settings, language: lang })}
              variant="full"
            />
          </div>

          {/* Theme selection */}
          <div className="bg-[#180D21] p-4 rounded-2xl border border-[#49225B]">
            <label className="flex items-center gap-2 text-xs font-bold text-[#E7DBEF] mb-3">
              <Palette className="w-4 h-4 text-[#A56ABD]" />
              <span>{t.theme}</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setTheme('purple-dark')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  theme === 'purple-dark'
                    ? 'bg-[#49225B] border-[#A56ABD] ring-2 ring-[#A56ABD]/50'
                    : 'bg-[#2A1335]/60 border-[#49225B]/60 text-[#E7DBEF]/70'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#49225B] border border-[#A56ABD] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#6E3482]" />
                </div>
                <span className="text-xs font-semibold">{t.themeDark}</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('lavender-light')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  theme === 'lavender-light'
                    ? 'bg-[#49225B] border-[#A56ABD] ring-2 ring-[#A56ABD]/50'
                    : 'bg-[#2A1335]/60 border-[#49225B]/60 text-[#E7DBEF]/70'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#E7DBEF] border border-[#6E3482] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#6E3482]" />
                </div>
                <span className="text-xs font-semibold">{t.themeLight}</span>
              </button>
            </div>
          </div>

          {/* Teacher Profile */}
          <div className="bg-[#180D21] p-4 rounded-2xl border border-[#49225B] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7DBEF] mb-1">
              <User className="w-4 h-4 text-[#A56ABD]" />
              <span>{t.teacherProfile}</span>
            </div>

            <div>
              <label className="block text-[11px] text-[#E7DBEF]/70 mb-1">{t.fullName}</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#230F30] border border-[#49225B] text-white text-xs focus:ring-2 focus:ring-[#A56ABD] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-[#E7DBEF]/70 mb-1">{t.schoolName}</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#230F30] border border-[#49225B] text-white text-xs focus:ring-2 focus:ring-[#A56ABD] outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] text-[#E7DBEF]/70 mb-1">{t.subjectSpecialty}</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#230F30] border border-[#49225B] text-white text-xs focus:ring-2 focus:ring-[#A56ABD] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Sound & AI options */}
          <div className="bg-[#180D21] p-4 rounded-2xl border border-[#49225B] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-[#A56ABD]" />
              <div>
                <div className="text-xs font-bold text-white">Interaktiv sesler (Audio FX)</div>
                <div className="text-[10px] text-[#E7DBEF]/60">Oyınlar hám viktorina ushın ses effektleri</div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-[#371646] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#6E3482]"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#2A1335] hover:bg-[#371646] text-[#E7DBEF] text-xs font-semibold"
            >
              {t.close}
            </button>
            <button
              id="save-settings-submit-btn"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#6E3482] to-[#A56ABD] hover:from-[#7c3a93] hover:to-[#b377cb] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#6E3482]/40"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Saqlandı!</span>
                </>
              ) : (
                <span>{t.saveSettings}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
