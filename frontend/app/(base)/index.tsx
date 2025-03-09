import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Button, RadioButton, Text } from 'react-native-paper';

import { getQuestions } from '@/apis/questions';

import {
  Difficulty,
  QuestionFilters,
  QuestionHeader,
  TopicTag,
  defaultQuestionFilters,
} from '@/types/questions';

export default function Index() {
  const [userOptions, setUserOptions] = useState<QuestionFilters>(defaultQuestionFilters);
  const [questions, setQuestions] = useState<QuestionHeader[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data: QuestionHeader[] = await getQuestions(userOptions);
        setQuestions(data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, [userOptions]);

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

  const incrementPage = () => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      page: prevOptions.page + 1,
    }));
  };

  const decrementPage = () => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      page: Math.max(prevOptions.page - 1, 1), // Ensure page doesn't go below 1
    }));
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text className="mb-4 text-xl font-bold">Choose Difficulty:</Text>
        <RadioButton.Group
          value={userOptions.difficulty}
          onValueChange={(value) => handleDifficultyChange(value as Difficulty)}
        >
          <View className="mb-2">
            <RadioButton.Item label="Easy" value="Easy" />
          </View>
          <View className="mb-2">
            <RadioButton.Item label="Medium" value="Medium" />
          </View>
          <View className="mb-2">
            <RadioButton.Item label="Hard" value="Hard" />
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

        <Text className="mb-4 mt-6 text-xl font-bold">Questions:</Text>
        {questions.length > 0 ? (
          questions.map((question) => (
            <TouchableOpacity
              key={question.id}
              className="mb-2 w-full items-center rounded-lg bg-white p-4 shadow-sm"
            >
              <Text className="text-lg">{question.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text className="text-gray-500">No questions found.</Text>
        )}

        <View className="mt-6 w-full flex-row items-center justify-between">
          <Button
            mode="contained"
            disabled={userOptions.page === 1}
            className="bg-blue-500"
            onPress={decrementPage}
          >
            Previous
          </Button>
          <Text className="text-lg font-bold">Page {userOptions.page}</Text>
          <Button mode="contained" className="bg-blue-500" onPress={incrementPage}>
            Next
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
