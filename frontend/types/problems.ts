import { z } from 'zod';

export const difficulty = z.enum(['EASY', 'MEDIUM', 'HARD']);
export type Difficulty = z.infer<typeof difficulty>;

export const problemOptions = z.object({
  difficulty: difficulty,
});
export type ProblemOptions = z.infer<typeof problemOptions>;

export const defaultProblemOptions: ProblemOptions = {
  difficulty: 'MEDIUM',
};
