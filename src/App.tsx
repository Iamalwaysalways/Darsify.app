import React, { useState } from 'react';
import { initialLessons } from './data/initialLessons';
import { Lesson, UserProfile, AppSettings, Screen, Language } from './types';
import { AuthScreen } from './components/AuthScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { LessonOverviewScreen } from './components/LessonOverviewScreen';
import { LessonPlanView } from './components/LessonPlanView';
import { MatchingGameView } from './components/MatchingGameView';
import { QuizView } from './components/QuizView';
import { Model3DView } from './components/Model3DView';
import { SlidesView } from './components/SlidesView';
import { LiveClassroomView } from './components/LiveClassroomView';
import { CreateLessonModal } from './components/CreateLessonModal';
import { SettingsModal } from './components/SettingsModal';
import { EditLessonModal } from './components/EditLessonModal';

export default function App() {
  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(null);

  // Application settings (Language defaults to Karakalpak as requested in Karakalpak prompt, theme purple-dark)
  const [settings, setSettings] = useState<AppSettings>({
    language: 'kaa',
    theme: 'purple-dark',
    soundEffects: true,
    aiDetailLevel: 'balanced',
  });

  // Current active view / screen
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  // Lessons state initialized with rich Uzbek/Karakalpak educational content
  const [lessons, setLessons] = useState<Lesson[]>(initialLessons);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(initialLessons[0]);

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isEditLessonOpen, setIsEditLessonOpen] = useState(false);
  const [lessonToEdit, setLessonToEdit] = useState<Lesson | null>(null);

  const handleLanguageChange = (lang: Language) => {
    setSettings((prev) => ({ ...prev, language: lang }));
  };

  const handleLogin = (newUser: UserProfile) => {
    setUser(newUser);
    setCurrentScreen('dashboard');
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setCurrentScreen('lesson_overview');
  };

  const handleLessonCreated = (newLesson: Lesson) => {
    setLessons((prev) => [newLesson, ...prev]);
    setSelectedLesson(newLesson);
    setCurrentScreen('lesson_overview');
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setLessonToEdit(lesson);
    setIsEditLessonOpen(true);
  };

  const handleSaveEditedLesson = (updated: Lesson) => {
    setLessons((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    if (selectedLesson.id === updated.id) {
      setSelectedLesson(updated);
    }
  };

  // If not authenticated, render AuthScreen with top language switcher
  if (!user) {
    return (
      <AuthScreen
        language={settings.language}
        onLanguageChange={handleLanguageChange}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div
      className={`min-h-screen w-full ${
        settings.theme === 'lavender-light'
          ? 'bg-[#F5EBFA] text-gray-900'
          : 'bg-[#180D21] text-white'
      }`}
    >
      {/* Screen Router */}
      {currentScreen === 'dashboard' && (
        <DashboardScreen
          user={user}
          lessons={lessons}
          language={settings.language}
          onOpenCreateLesson={() => setIsCreateModalOpen(true)}
          onSelectLesson={handleSelectLesson}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenEditLesson={handleOpenEditLesson}
        />
      )}

      {currentScreen === 'lesson_overview' && (
        <LessonOverviewScreen
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('dashboard')}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenEditLesson={handleOpenEditLesson}
        />
      )}

      {currentScreen === 'lesson_plan' && (
        <LessonPlanView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
        />
      )}

      {currentScreen === 'matching_game' && (
        <MatchingGameView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
          onGoToQuiz={() => setCurrentScreen('quiz')}
        />
      )}

      {currentScreen === 'quiz' && (
        <QuizView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
          onGoToModel3D={() => setCurrentScreen('model_3d')}
        />
      )}

      {currentScreen === 'model_3d' && (
        <Model3DView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
        />
      )}

      {currentScreen === 'slides' && (
        <SlidesView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
        />
      )}

      {currentScreen === 'classroom_mode' && (
        <LiveClassroomView
          lesson={selectedLesson}
          language={settings.language}
          onBack={() => setCurrentScreen('lesson_overview')}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Global Modals */}
      <CreateLessonModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        language={settings.language}
        onLessonCreated={handleLessonCreated}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdateUser={setUser}
        settings={settings}
        onUpdateSettings={setSettings}
      />

      <EditLessonModal
        isOpen={isEditLessonOpen}
        onClose={() => setIsEditLessonOpen(false)}
        lesson={lessonToEdit}
        onSaveLesson={handleSaveEditedLesson}
        language={settings.language}
      />
    </div>
  );
}
