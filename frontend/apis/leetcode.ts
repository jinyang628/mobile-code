import axios from 'axios';
import {
  LeetcodeQuestion,
  LeetcodeQuestionFilters,
  LeetcodeQuestionMetadata,
  leetcodeQuestion,
  leetcodeQuestionMetadata,
} from '~/lib/types/leetcode';

export async function fetchLeetcodeQuestionListMetadata(
  leetcodeQuestionFilters: LeetcodeQuestionFilters,
): Promise<LeetcodeQuestionMetadata[]> {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/leetcode/metadata`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          difficulty: leetcodeQuestionFilters.difficulty,
          topic_tag: leetcodeQuestionFilters.topicTag,
          page: leetcodeQuestionFilters.page,
        },
      },
    );

    return response.data.map((q: LeetcodeQuestionMetadata) => leetcodeQuestionMetadata.parse(q));
  } catch (error) {
    console.error('Error fetching question list metadata:', error);
    throw error;
  }
}

export async function fetchLeetcodeQuestionData(titleSlug: string): Promise<LeetcodeQuestion> {
  try {
    const response = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/api/leetcode`, {
      headers: {
        'Content-Type': 'application/json',
      },
      params: {
        title_slug: titleSlug,
      },
    });

    return leetcodeQuestion.parse(response.data);
  } catch (error) {
    console.error('Error fetching question data:', error);
    throw error;
  }
}
