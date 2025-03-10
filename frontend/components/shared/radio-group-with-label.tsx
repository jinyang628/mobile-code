import { View } from 'react-native';

import { Label } from '~/components/ui/label';
import { RadioGroupItem } from '~/components/ui/radio-group';

export default function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={'flex-row items-center gap-2'}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
