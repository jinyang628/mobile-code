import { ScrollView, View } from 'react-native';

import RadioGroupItemWithLabel from '~/components/shared/radio-group-with-label';
import { RadioGroup } from '~/components/ui/radio-group';
import { Text } from '~/components/ui/text';
import { Difficulty, QuestionFilters, TopicTag, difficulty, topicTag } from '~/lib/types/questions';

type FiltersScreenProps = {
  userOptions: QuestionFilters;
  isScreenActive: boolean;
  onDifficultyChange: (diff: Difficulty) => void;
  onTopicTagChange: (tag: TopicTag) => void;
};

export default function FiltersScreen({
  userOptions,
  isScreenActive,
  onDifficultyChange,
  onTopicTagChange,
}: FiltersScreenProps) {
  return (
    <ScrollView className="flex-1" scrollEnabled={isScreenActive}>
      <Text className="mb-4 text-xl font-bold">Difficulty</Text>
      <RadioGroup
        className="flex-row flex-wrap"
        value={userOptions.difficulty}
        onValueChange={(value) => onDifficultyChange(value as Difficulty)}
      >
        {difficulty.options.map((diff) => (
          <View key={diff} className="mb-2 mr-4">
            <RadioGroupItemWithLabel value={diff} onLabelPress={() => onDifficultyChange(diff)} />
          </View>
        ))}
      </RadioGroup>

      <Text className="mb-4 mt-6 text-xl font-bold">Topic</Text>
      <View className="h-40">
        <ScrollView className="flex-row flex-wrap">
          <RadioGroup
            value={userOptions.topicTag}
            onValueChange={(value) => onTopicTagChange(value as TopicTag)}
          >
            {topicTag.options.sort().map((tag) => (
              <View key={tag} className="mb-2 mr-4">
                <RadioGroupItemWithLabel value={tag} onLabelPress={() => onTopicTagChange(tag)} />
              </View>
            ))}
          </RadioGroup>
        </ScrollView>
      </View>
    </ScrollView>
  );
}
