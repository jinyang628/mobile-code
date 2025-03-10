import axios from 'axios';
import { QuestionFilters, QuestionHeader, questionHeader } from '~/lib/types/questions';

export async function getQuestions(questionFilters: QuestionFilters): Promise<QuestionHeader[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/questions/headers`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          difficulty: questionFilters.difficulty,
          topic_tag: questionFilters.topicTag,
          page: questionFilters.page,
        },
      },
    );

    return response.data.map((question: QuestionHeader) => questionHeader.parse(question));
  } catch (error) {
    console.error('Error getting questions:', error);
    throw error;
  }
}
