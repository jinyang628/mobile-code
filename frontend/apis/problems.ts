import { API_URL } from '@/apis/constants';
import axios from 'axios';

import { Difficulty, ProblemOptions, difficulty } from '@/types/problems';

export async function getProblems(problemOptions: ProblemOptions): Promise<void> {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
