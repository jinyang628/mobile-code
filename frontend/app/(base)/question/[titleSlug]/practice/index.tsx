import { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';

import { router } from 'expo-router';
import PaginationBottomBar from '~/components/shared/pagination-bottom-bar';
import { Text } from '~/components/ui/text';
import usePracticeQuestionsStore from '~/lib/stores/practice';
import { PracticeQuestion } from '~/lib/types/practice';
import { useColorScheme } from '~/lib/useColorScheme';

export default function PracticeScreen() {
  const { practiceQuestions } = usePracticeQuestionsStore();
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [question, setQuestion] = useState<PracticeQuestion | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const { isDarkColorScheme } = useColorScheme();

  const contentColor = isDarkColorScheme ? '#FFFFFF' : '#000000';

  useEffect(() => {
    if (!practiceQuestions) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [practiceQuestions]);

  useEffect(() => {
    if (!practiceQuestions) {
      return;
    }
    if (questionIndex >= practiceQuestions.questions.length) {
      console.log('Question index out of bounds. Navigating back to home screen.');
      router.push('/');
    }

    setQuestion(practiceQuestions.questions[questionIndex]);
  }, [questionIndex, practiceQuestions]);

  const onNextTabPress = () => {
    setQuestionIndex(questionIndex + 1);
    setShowExplanation(false);
  };

  const onPrevTabPress = () => {
    setQuestionIndex(questionIndex - 1);
    setShowExplanation(false);
  };

  if (isLoading) {
    return (
      <View className="flex items-center justify-center p-8">
        <Chase size={48} color={contentColor} />
      </View>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-100 p-4 dark:bg-gray-900">
      <View className="mb-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <Text className="mb-6 text-lg font-medium text-gray-900 dark:text-white">
          {question.description}
        </Text>

        <View className="space-y-4">
          {question.options.map((option, index) => {
            let optionStyle =
              'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4';
            let optionTextStyle = 'text-gray-900 dark:text-white';

            if (showExplanation) {
              if (option.isCorrect) {
                optionStyle =
                  'bg-green-50 dark:bg-green-900 border border-green-500 dark:border-green-700 rounded-lg p-4';
                optionTextStyle = 'text-green-900 dark:text-green-100';
              } else {
                optionStyle =
                  'bg-red-50 dark:bg-red-900 border border-red-500 dark:border-red-700 rounded-lg p-4';
                optionTextStyle = 'text-red-900 dark:text-red-100';
              }
            }

            return (
              <TouchableOpacity
                key={index}
                className={optionStyle}
                activeOpacity={0.8}
                onPress={() => setShowExplanation(true)}
              >
                <Text className={optionTextStyle}>
                  {String.fromCharCode(65 + index)}. {option.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {showExplanation && (
        <View className="mb-6 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <Text className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
            Explanation
          </Text>
          <Text className="text-gray-700 dark:text-gray-300">{question.explanation}</Text>
        </View>
      )}

      <PaginationBottomBar
        pageText="Question"
        pageNumber={questionIndex + 1}
        contentColor={contentColor}
        isPageDecrementDisabled={isLoading || questionIndex === 0}
        isPageIncrementDisabled={
          isLoading || questionIndex === practiceQuestions!.questions.length - 1
        }
        onPageDecrement={onPrevTabPress}
        onPageIncrement={onNextTabPress}
      />
    </View>
  );
}
