import axios from 'axios';
import {
  Question,
  QuestionFilters,
  QuestionMetadata,
  question,
  questionMetadata,
} from '~/lib/types/questions';

export async function fetchQuestionListMetadata(
  questionFilters: QuestionFilters,
): Promise<QuestionMetadata[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/questions/metadata`,
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

    return response.data.map((q: QuestionMetadata) => questionMetadata.parse(q));
  } catch (error) {
    console.error('Error fetching question list metadata:', error);
    throw error;
  }
}

export async function fetchQuestionData(titleSlug: string): Promise<Question> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/questions`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        title_slug: titleSlug,
      },
    });

    return question.parse(response.data);
  } catch (error) {
    console.error('Error fetching question data:', error);
    throw error;
  }
}
