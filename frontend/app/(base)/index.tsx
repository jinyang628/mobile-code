import { useState } from 'react';
import { Button } from 'react-native-paper';

import { getProblems } from '@/apis/problems';

import { Difficulty, ProblemOptions, defaultProblemOptions } from '@/types/problems';

export default function Index() {
  const [userOptions, setUserOptions] = useState<ProblemOptions>(defaultProblemOptions);
  return <Button onPress={() => getProblems(userOptions)}>Hello World!</Button>;
}
