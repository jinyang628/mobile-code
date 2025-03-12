import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

import { getQuestions } from '~/apis/questions';
import RadioGroupItemWithLabel from '~/components/shared/radio-group-with-label';
import { Button } from '~/components/ui/button';
import { RadioGroup } from '~/components/ui/radio-group';
import { Text } from '~/components/ui/text';
import {
  Difficulty,
  QuestionFilters,
  QuestionHeader,
  TopicTag,
  defaultQuestionFilters,
  difficulty,
  topicTag,
} from '~/lib/types/questions';

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

  const handleDifficultyChange = (diff: Difficulty) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      diff,
    }));
  };

  const handleTopicTagChange = (tag: TopicTag) => {
    setUserOptions((prevOptions) => ({
      ...prevOptions,
      tag,
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
    <View className="flex-1 bg-gray-100 p-4">
      {/* Fixed height container */}
      <View style={{ height: '90%' }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Difficulty Section */}
          <Text className="mb-4 text-xl font-bold">Difficulty</Text>
          <RadioGroup
            value={userOptions.difficulty}
            style={{ flexDirection: 'row', flexWrap: 'wrap' }} // Make radio group horizontal
            onValueChange={(value) => handleDifficultyChange(value as Difficulty)}
          >
            {difficulty.options.map((diff) => (
              <View key={diff} className="mb-2 mr-4">
                <RadioGroupItemWithLabel
                  value={diff}
                  onLabelPress={() => handleDifficultyChange(diff)}
                />
              </View>
            ))}
          </RadioGroup>

          {/* Topic Tag Section */}
          <Text className="mb-4 mt-6 text-xl font-bold">Topic Tag</Text>
          <ScrollView
            className="h-40"
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }} // Make topic tags wrap
          >
            <RadioGroup
              value={userOptions.topicTag}
              onValueChange={(value) => handleTopicTagChange(value as TopicTag)}
            >
              {topicTag.options.sort().map((tag) => (
                <View key={tag} className="mb-2 mr-4">
                  <RadioGroupItemWithLabel
                    value={tag}
                    onLabelPress={() => handleTopicTagChange(tag)}
                  />
                </View>
              ))}
            </RadioGroup>
          </ScrollView>

          {/* Questions Section */}
          <Text className="mb-4 mt-6 text-xl font-bold">Questions:</Text>
          <ScrollView style={{ maxHeight: 200 }}>
            {' '}
            {/* Fixed height for questions scroll */}
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
          </ScrollView>

          {/* Pagination Section */}
          <View className="mt-6 w-full flex-row items-center justify-between">
            <Button
              disabled={userOptions.page === 1}
              className="bg-blue-500"
              onPress={decrementPage}
            >
              Previous
            </Button>
            <Text className="text-lg font-bold">Page {userOptions.page}</Text>
            <Button className="bg-blue-500" onPress={incrementPage}>
              Next
            </Button>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
