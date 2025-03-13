import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Chase } from 'react-native-animated-spinkit';

import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '~/apis/questions';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { QuestionFilters, QuestionHeader } from '~/lib/types/questions';
import { useColorScheme } from '~/lib/useColorScheme';

type QuestionsScreenProps = {
  isScreenActive: boolean;
  questionFilters: QuestionFilters;
  onPageIncrement: () => void;
  onPageDecrement: () => void;
};
export default function QuestionsScreen({
  isScreenActive,
  questionFilters,
  onPageIncrement,
  onPageDecrement,
}: QuestionsScreenProps) {
  const { isDarkColorScheme } = useColorScheme();

  const { data: questions = [], isLoading } = useQuery<QuestionHeader[]>({
    queryKey: ['questions', questionFilters],
    queryFn: () => getQuestions(questionFilters),
  });

  const renderQuestions = () => {
    if (isLoading) {
      return (
        <View className="flex items-center justify-center p-8">
          <Chase size={48} color={isDarkColorScheme ? '#FFFFFF' : '#000000'} />
        </View>
      );
    }
    if (questions.length === 0) {
      return <Text className="text-center text-lg">No questions found.</Text>;
    }

    return questions.map((qn) => (
      <TouchableOpacity
        key={qn.id}
        className="mb-2 w-full items-center rounded-lg border-2 border-gray-900 p-4 shadow-sm dark:border-white"
      >
        <Text className="text-center text-lg">{qn.title}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <ScrollView className="mb-4 flex-1" scrollEnabled={isScreenActive}>
        {renderQuestions()}
      </ScrollView>

      <View className="w-full flex-row items-center justify-between">
        <Button
          disabled={questionFilters.page === 1 || isLoading}
          className="w-20 bg-blue-500 dark:bg-blue-400"
          onPress={onPageDecrement}
        >
          <Text>Previous</Text>
        </Button>
        <Text className="text-lg font-bold">Page {questionFilters.page}</Text>
        <Button
          className="w-20 bg-blue-500 dark:bg-blue-400"
          disabled={questions.length === 0 || isLoading}
          onPress={onPageIncrement}
        >
          <Text>Next</Text>
        </Button>
      </View>
    </View>
  );
}
