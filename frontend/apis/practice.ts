import axios from 'axios';
import { LeetcodeQuestion } from '~/lib/types/leetcode';
import { PracticeQuestion, practiceQuestion } from '~/lib/types/practice';

export async function generatePracticeQuestions(
  leetcodeQuestion: LeetcodeQuestion,
): Promise<PracticeQuestion[]> {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/api/practice`,
      leetcodeQuestion,
    );

    return response.data.map((q: PracticeQuestion) => practiceQuestion.parse(q));
  } catch (error) {
    console.error('Error fetching question list metadata:', error);
    throw error;
  }
}
