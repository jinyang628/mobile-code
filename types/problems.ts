import { z } from 'zod';

export const difficulty = z.enum(['EASY', 'MEDIUM', 'HARD']);
export type Difficulty = z.infer<typeof difficulty>;
