import { ScrollView, View } from 'react-native';

import RadioGroupItemWithLabel from '~/components/shared/radio-group-with-label';
import { RadioGroup } from '~/components/ui/radio-group';
import { Text } from '~/components/ui/text';
import {
  Difficulty,
  LeetcodeQuestionFilters,
  TopicTag,
  difficulty,
  topicTag,
} from '~/lib/types/leetcode';

type FiltersScreenProps = {
  userOptions: LeetcodeQuestionFilters;
  onDifficultyChange: (diff: Difficulty) => void;
  onTopicTagChange: (tag: TopicTag) => void;
};

export default function FiltersScreen({
  userOptions,
  onDifficultyChange,
  onTopicTagChange,
}: FiltersScreenProps) {
  return (
    <View className="flex-1">
      <View>
        <Text className="mb-4 text-xl font-bold">Difficulty</Text>
        <RadioGroup
          className="flex-row flex-wrap"
          value={userOptions.difficulty}
          onValueChange={(value) => onDifficultyChange(value as Difficulty)}
        >
          {difficulty.options.map((diff) => (
            <View key={diff} className="mb-2 mr-4 pl-2">
              <RadioGroupItemWithLabel value={diff} onLabelPress={() => onDifficultyChange(diff)} />
            </View>
          ))}
        </RadioGroup>
      </View>

      {/* Topic Section (Scrollable) */}
      <View className="mb-10 flex-1 pb-3">
        <Text className="my-4 text-xl font-bold">Topic</Text>
        <ScrollView className="flex-1">
          <RadioGroup
            value={userOptions.topicTag}
            onValueChange={(value) => onTopicTagChange(value as TopicTag)}
          >
            <View className="flex-row flex-wrap">
              {topicTag.options.sort().map((item) => (
                <View key={item} className="w-full p-2">
                  <RadioGroupItemWithLabel
                    value={item}
                    onLabelPress={() => onTopicTagChange(item)}
                  />
                </View>
              ))}
            </View>
          </RadioGroup>
        </ScrollView>
      </View>
    </View>
  );
}
