import { useState } from 'react';
import { View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

import { getQuestions } from '@/apis/questions';

import { Difficulty, ProblemOptions, TopicTag, defaultProblemOptions } from '@/types/problems';

export default function Index() {
  const [userOptions, setUserOptions] = useState<ProblemOptions>(defaultProblemOptions);

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      difficulty,
    }));
  };

  const handleTopicTagChange = (topicTag: TopicTag) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      topicTag,
    }));
  };

  return (
    <View className="p-4">
      <Text className="mb-4 text-xl font-bold">Choose Difficulty:</Text>
      <RadioButton.Group
        value={userOptions.difficulty}
        onValueChange={(value) => handleDifficultyChange(value as Difficulty)}
      >
        <View className="mb-2">
          <RadioButton.Item label="Easy" value="easy" />
        </View>
        <View className="mb-2">
          <RadioButton.Item label="Medium" value="medium" />
        </View>
        <View className="mb-2">
          <RadioButton.Item label="Hard" value="hard" />
        </View>
      </RadioButton.Group>

      <Text className="mb-4 mt-6 text-xl font-bold">Choose Topic Tag:</Text>
      <RadioButton.Group
        value={userOptions.topicTag}
        onValueChange={(value) => handleTopicTagChange(value as TopicTag)}
      >
        <View className="mb-2">
          <RadioButton.Item label="Array" value="array" />
        </View>
        <View className="mb-2">
          <RadioButton.Item label="Backtracking" value="backtracking" />
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        className="mt-6 rounded-lg bg-blue-500 py-2"
        onPress={() => getQuestions(userOptions)}
      >
        <Text className="font-bold text-white">Get Problems</Text>
      </Button>
    </View>
  );
}
