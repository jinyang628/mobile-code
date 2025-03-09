import axios from 'axios';

import { ProblemOptions as QuestionFilters } from '@/types/problems';

export async function getQuestions(questionFilters: QuestionFilters): Promise<void> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/questions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        difficulty: questionFilters.difficulty,
        topic_tag: questionFilters.topicTag,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error getting questions:', error);
  }
}
