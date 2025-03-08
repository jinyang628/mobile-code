import { LeetCode } from 'leetcode-query';
import { ProblemList } from 'leetcode-query';

import { Difficulty } from '@/types/problems';

interface GetProblemsProps {
  difficulty: Difficulty;
}

export async function getProblems({ difficulty }: GetProblemsProps): Promise<ProblemList> {
  const leetcode = new LeetCode();
  const problemList: ProblemList = await leetcode.problems({
    filters: {
      difficulty: difficulty,
    },
  });
  return problemList;
}
