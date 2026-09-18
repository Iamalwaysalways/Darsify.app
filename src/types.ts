export type Language = 'kaa' | 'uz' | 'en' | 'ru';

export type Screen =
  | 'auth'
  | 'dashboard'
  | 'lesson_overview'
  | 'lesson_plan'
  | 'matching_game'
  | 'quiz'
  | 'model_3d'
  | 'slides'
  | 'classroom_mode';

export interface UserProfile {
  name: string;
  email: string;
  school: string;
  subject: string;
  avatarInitial: string;
}

export interface LessonStage {
  stageName: string;
  duration: string;
  teacherScript: string;
  studentActivity: string;
  keyTips?: string;
}

export interface LessonPlan {
  durationMinutes: number;
  stages: LessonStage[];
}

export interface MatchingPair {
  id: string;
  term: string;
  definition: string;
  category?: string;
}

export interface MatchingGame {
  gameTitle: string;
  instructions: string;
  pairs: MatchingPair[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  quizTitle: string;
  questions: QuizQuestion[];
}

export interface ModelPart {
  id: string;
  name: string;
  color: string;
  role: string;
  interestingFact: string;
  coords: { x: number; y: number };
}

export interface VisualModel {
  modelType: 'cell' | 'solar' | 'plant' | 'atom' | 'geometry' | 'ecosystem' | 'math';
  modelTitle: string;
  description: string;
  parts: ModelPart[];
}

export interface SlideItem {
  slideNumber: number;
  slideTitle: string;
  bullets: string[];
  teacherNotes: string;
  keyVisual?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  materialsCount: number;
  status: 'ready' | 'draft' | 'processing';
  createdAt: string;
  timeAgo: string;
  summary: string;
  learningGoals: string[];
  lessonPlan: LessonPlan;
  matchingGame: MatchingGame;
  quiz: Quiz;
  visualModel: VisualModel;
  slides: SlideItem[];
}

export interface AppSettings {
  language: Language;
  theme: 'purple-dark' | 'lavender-light';
  soundEffects: boolean;
  autoPlayVoice?: boolean;
  aiCreativity?: 'balanced' | 'rigorous' | 'creative';
  aiDetailLevel?: 'fast' | 'balanced' | 'deep';
}
