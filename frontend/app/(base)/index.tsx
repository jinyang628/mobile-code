import React, { useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import FiltersScreen from '~/components/screens/filters';
import QuestionsScreen from '~/components/screens/questions';
import {
  Difficulty,
  LeetcodeQuestionFilters,
  TopicTag,
  defaultLeetcodeQuestionFilters,
} from '~/lib/types/leetcode';

const { width } = Dimensions.get('window');

export default function Index() {
  const [questionFilters, setQuestionFilters] = useState<LeetcodeQuestionFilters>(
    defaultLeetcodeQuestionFilters,
  );
  const translateX = useSharedValue(0);
  const [isQuestionsScreenActive, setIsQuestionsScreenActive] = useState<boolean>(false);

  const onDifficultyChange = (diff: Difficulty) => {
    setQuestionFilters((prevOptions) => ({
      ...prevOptions,
      difficulty: diff,
      page: 1,
    }));
  };

  const onTopicTagChange = (tag: TopicTag) => {
    setQuestionFilters((prevOptions) => ({
      ...prevOptions,
      topicTag: tag,
      page: 1,
    }));
  };

  const onPageIncrement = () => {
    setQuestionFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
  };

  const onPageDecrement = () => {
    setQuestionFilters((prevFilters) => ({
      ...prevFilters,
      page: Math.max(prevFilters.page - 1, 1),
    }));
  };

  const updateScreenState = (isActive: boolean) => {
    setIsQuestionsScreenActive(isActive);
  };

  const toggleScreen = () => {
    const newState = !isQuestionsScreenActive;
    translateX.value = withSpring(newState ? -width : 0, { damping: 20, stiffness: 150 });
    setIsQuestionsScreenActive(newState);
  };

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .failOffsetY([-15, 15])
    .onUpdate((event) => {
      const clampedTranslationX = Math.max(Math.min(event.translationX, 0), -width);

      if (
        (isQuestionsScreenActive && event.translationX > 0) ||
        (!isQuestionsScreenActive && event.translationX < 0)
      ) {
        translateX.value = isQuestionsScreenActive
          ? -width + clampedTranslationX
          : clampedTranslationX;
      }
    })
    .onEnd((event) => {
      if (
        (event.velocityX < -500 && !isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX < 0 &&
          !isQuestionsScreenActive)
      ) {
        translateX.value = withSpring(-width, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(true);
      } else if (
        (event.velocityX > 500 && isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX > 0 &&
          isQuestionsScreenActive)
      ) {
        translateX.value = withSpring(0, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(false);
      } else {
        translateX.value = withSpring(isQuestionsScreenActive ? -width : 0, {
          damping: 20,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="flex-1">
      <GestureDetector gesture={panGesture}>
        <Animated.View className="h-screen flex-row" style={[{ width: width * 2 }, animatedStyle]}>
          <View className="flex-1 p-4" style={{ width }}>
            <FiltersScreen
              userOptions={questionFilters}
              onDifficultyChange={onDifficultyChange}
              onTopicTagChange={onTopicTagChange}
            />
            <TouchableOpacity
              className="absolute right-0 top-1/2 -mt-6 rounded-l-full bg-blue-500 p-3"
              onPress={toggleScreen}
            >
              <Text className="text-white">›</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-1 p-4" style={{ width }}>
            <QuestionsScreen
              questionFilters={questionFilters}
              onPageIncrement={onPageIncrement}
              onPageDecrement={onPageDecrement}
            />
            <TouchableOpacity
              className="absolute left-0 top-1/2 -mt-6 rounded-r-full bg-blue-500 p-3"
              onPress={toggleScreen}
            >
              <Text className="text-white">‹</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
