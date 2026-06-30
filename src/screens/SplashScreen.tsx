import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Heading } from '@sudobility/components-rn';
import { useAppColors } from '@/hooks/useAppColors';
import { APP_NAME } from '@/config/constants';

export default function SplashScreen() {
  // ActivityIndicator needs a concrete color (no className), so derive it from
  // the active design tokens via useAppColors rather than a hardcoded literal.
  const appColors = useAppColors();

  return (
    <View className='flex-1 items-center justify-center bg-background'>
      <Heading level={1} size='3xl' className='mb-6'>
        {APP_NAME}
      </Heading>
      <ActivityIndicator
        size='large'
        color={appColors.primary}
        className='mt-4'
      />
    </View>
  );
}
