import { z } from 'zod';

export const multipleChoiceOption = z.object({
  description: z.string(),
  isCorrect: z.boolean(),
});

export type MultipleChoiceOption = z.infer<typeof multipleChoiceOption>;

export const practiceQuestion = z.object({
  description: z.string(),
  options: z.array(multipleChoiceOption),
});

export type PracticeQuestion = z.infer<typeof practiceQuestion>;

export const practiceQuestions = z.object({
  questions: z.array(practiceQuestion),
});

export type PracticeQuestions = z.infer<typeof practiceQuestions>;
