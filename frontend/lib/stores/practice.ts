import { create } from 'zustand';
import { PracticeQuestions } from '~/lib/types/practice';

interface CachedPracticeQuestions {
  key: string;
  questions: PracticeQuestions;
  timestamp: number;
}

interface PracticeQuestionsState {
  practiceQuestions: PracticeQuestions | null;
  cachedQuestionsData: CachedPracticeQuestions | null;
  setPracticeQuestions: (questions: PracticeQuestions, key: string) => void;
  shouldRegenerateQuestions: (key: string) => boolean;
}

const CACHE_EXPIRY_TIME: number = 60 * 60 * 1000; // 1 hour in milliseconds

const usePracticeQuestionsStore = create<PracticeQuestionsState>((set, get) => ({
  practiceQuestions: null,
  cachedQuestionsData: null,

  setPracticeQuestions: (practiceQuestions: PracticeQuestions, key: string) => {
    if (practiceQuestions.questions.length === 0) {
      console.error('Cannot set practice questions with zero length');

      return;
    }
    set({
      practiceQuestions,
      cachedQuestionsData: {
        key,
        questions: practiceQuestions,
        timestamp: Date.now(),
      },
    });
  },

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
