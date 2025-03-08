import axios from 'axios';

import { ProblemOptions } from '@/types/problems';

export async function getProblem(problemOptions: ProblemOptions): Promise<void> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/problems`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        difficulty: problemOptions.difficulty,
        topic_tag: problemOptions.topicTag,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error getting problems:', error);
  }
}
