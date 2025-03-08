import { z } from 'zod';

export const difficulty = z.enum(['easy', 'medium', 'hard']);
export type Difficulty = z.infer<typeof difficulty>;

export const topicTag = z.enum(['array', 'backtracking']);
export type TopicTag = z.infer<typeof topicTag>;

export const problemOptions = z.object({
  difficulty: difficulty,
  topicTag: topicTag,
});
export type ProblemOptions = z.infer<typeof problemOptions>;

export const defaultProblemOptions: ProblemOptions = {
  difficulty: 'medium',
  topicTag: 'array',
};
