import { z } from 'zod';

export const difficulty = z.enum(['Easy', 'Medium', 'Hard']);
export type Difficulty = z.infer<typeof difficulty>;

export const topicTag = z.enum([
  'array',
  'backtracking',
  'string',
  'hash-table',
  'dynamic-programming',
  'math',
  'sorting',
  'greedy',
  'depth-first-search',
  'binary-search',
  'database',
  'matrix',
  'tree',
  'breadth-first-search',
  'bit-manipulation',
  'two-pointers',
  'prefix-sum',
  'heap-priority-queue',
  'binary-tree',
  'simulation',
  'stack',
  'graph',
  'counting',
  'sliding-window',
  'design',
  'enumeration',
  'union-find',
  'linked-list',
  'number-theory',
  'ordered-set',
  'monotonic-stack',
  'segment-tree',
  'trie',
  'combinatorics',
  'bitmask',
  'queue',
  'divide-and-conquer',
  'recursion',
  'memoization',
  'binary-indexed-tree',
  'geometry',
  'binary-search-tree',
  'hash-function',
  'string-matching',
  'topological-sort',
  'shortest-path',
  'rolling-hash',
  'interactive',
  'data-stream',
  'monotonic-queue',
  'randomized',
  'merge-sort',
  'doubly-linked-list',
  'counting-sort',
  'iterator',
  'concurrency',
  'probability-and-statistics',
  'quickselect',
  'suffix-array',
  'bucket-sort',
  'line-sweep',
  'minimum-spanning-tree',
  'shell',
  'reservoir-sampling',
  'strongly-connected-component',
  'eulerian-circuit',
  'radix-sort',
  'rejection-sampling',
  'biconnected-component',
]);
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

export const questionMetadata = z.object({
  id: z.string(),
  title: z.string(),
  titleSlug: z.string(),
});

export type QuestionMetadata = z.infer<typeof questionMetadata>;

export const codeSnippet = z.object({
  lang: z.string(),
  code: z.string(),
});

export type CodeSnippet = z.infer<typeof codeSnippet>;

export const question = questionMetadata.extend({
  content: z.string(),
  codeSnippets: z.array(codeSnippet),
});

export type Question = z.infer<typeof question>;
