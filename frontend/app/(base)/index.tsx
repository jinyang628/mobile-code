import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import FiltersScreen from '~/components/index/filters';
import QuestionsScreen from '~/components/index/questions';
import {
  Difficulty,
  QuestionFilters,
  TopicTag,
  defaultQuestionFilters,
} from '~/lib/types/questions';

const { width } = Dimensions.get('window');

export default function Index() {
  const [questionFilters, setQuestionFilters] = useState<QuestionFilters>(defaultQuestionFilters);
  // Animation values
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

  // Update screen state
  const updateScreenState = (isActive: boolean) => {
    setIsQuestionsScreenActive(isActive);
  };

  // Pan gesture using Gesture API (v2)
  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Only activate for horizontal movement
    .failOffsetY([-15, 15]) // Fail the gesture if there's significant vertical movement
    .onUpdate((event) => {
      // Only allow movement between screens, not arbitrary positions
      if (
        (isQuestionsScreenActive && event.translationX > 0) ||
        (!isQuestionsScreenActive && event.translationX < 0)
      ) {
        // Limit the drag to prevent stretching beyond screen boundaries
        const maxDrag = isQuestionsScreenActive ? width : width;
        const dragAmount =
          Math.min(Math.abs(event.translationX), maxDrag) * (event.translationX < 0 ? -1 : 1);

        translateX.value = isQuestionsScreenActive ? -width + dragAmount : dragAmount;
      }
    })
    .onEnd((event) => {
      // Snap to either filters or questions screen, no in-between states
      if (
        (event.velocityX < -500 && !isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX < 0 &&
          !isQuestionsScreenActive)
      ) {
        // Swipe left to questions with velocity or significant drag
        translateX.value = withSpring(-width, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(true);
      } else if (
        (event.velocityX > 500 && isQuestionsScreenActive) ||
        (Math.abs(event.translationX) > width / 3 &&
          event.translationX > 0 &&
          isQuestionsScreenActive)
      ) {
        // Swipe right to filters with velocity or significant drag
        translateX.value = withSpring(0, { damping: 20, stiffness: 150 });
        runOnJS(updateScreenState)(false);
      } else {
        // Snap back to current screen if gesture wasn't decisive
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
        <Animated.View style={[{ width: width * 2, flexDirection: 'row' }, animatedStyle]}>
          <View style={{ width }} className="flex-1 p-4">
            <FiltersScreen
              userOptions={questionFilters}
              isScreenActive={!isQuestionsScreenActive}
              onDifficultyChange={onDifficultyChange}
              onTopicTagChange={onTopicTagChange}
            />
          </View>

          <View style={{ width }} className="flex-1 p-4">
            <QuestionsScreen
              isScreenActive={isQuestionsScreenActive}
              questionFilters={questionFilters}
              onPageIncrement={onPageIncrement}
              onPageDecrement={onPageDecrement}
            />
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
