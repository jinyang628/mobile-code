import { z } from 'zod';

export const difficulty = z.enum(['Easy', 'Medium', 'Hard']);
export type Difficulty = z.infer<typeof difficulty>;

export const topicTag = z.enum(['array', 'backtracking']);
export type TopicTag = z.infer<typeof topicTag>;

export const questionFilters = z.object({
  difficulty: difficulty,
  topicTag: topicTag,
  page: z.number(),
});

export type QuestionFilters = z.infer<typeof questionFilters>;

export const defaultQuestionFilters: QuestionFilters = {
  difficulty: 'Medium',
  topicTag: 'array',
  page: 1,
};

export const questionHeader = z.object({
  id: z.string(),
  title: z.string(),
  titleSlug: z.string(),
});

export type QuestionHeader = z.infer<typeof questionHeader>;
