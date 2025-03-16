import axios from 'axios';
import { LeetcodeQuestion } from '~/lib/types/leetcode';
import { PracticeQuestions, practiceQuestions } from '~/lib/types/practice';

export async function generatePracticeQuestions(
  leetcodeQuestion: LeetcodeQuestion,
): Promise<PracticeQuestions> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/practice`,
      leetcodeQuestion,
    );

    return practiceQuestions.parse(response.data);
  } catch (error) {
    console.error('Error fetching question list metadata:', error);
    throw error;
  }
}
