import { create } from 'zustand';
import { PracticeQuestion } from '~/lib/types/practice';

interface CachedPracticeQuestions {
  key: string;
  questions: PracticeQuestion[];
  timestamp: number;
}

interface PracticeQuestionsState {
  practiceQuestions: PracticeQuestion[];
  cachedQuestionsData: CachedPracticeQuestions | null;
  setPracticeQuestions: (questions: PracticeQuestion[], key: string) => void;
  shouldRegenerateQuestions: (key: string) => boolean;
}

const CACHE_EXPIRY_TIME: number = 60 * 60 * 1000; // 1 hour in milliseconds

const usePracticeQuestionsStore = create<PracticeQuestionsState>((set, get) => ({
  practiceQuestions: [],
  cachedQuestionsData: null,

  setPracticeQuestions: (practiceQuestions: PracticeQuestion[], key: string) =>
    set({
      practiceQuestions,
      cachedQuestionsData: {
        key,
        questions: practiceQuestions,
        timestamp: Date.now(),
      },
    }),

  shouldRegenerateQuestions: (key: string) => {
    const { cachedQuestionsData } = get();

    // Regenerate if:
    // 1. No cached data exists
    if (!cachedQuestionsData) {
      return true;
    }

    // 2. Keys don't match
    if (cachedQuestionsData.key !== key) {
      return true;
    }

    // 3. Cache has expired (older than 1 hour)
    const currentTime = Date.now();
    if (currentTime - cachedQuestionsData.timestamp > CACHE_EXPIRY_TIME) {
      return true;
    }

    // Otherwise, use cached questions
    return false;
  },
}));

export default usePracticeQuestionsStore;
