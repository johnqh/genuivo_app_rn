import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { ChatStackParamList } from './types';
import ChatScreen from '@/screens/ChatScreen';

const Stack = createNativeStackNavigator<ChatStackParamList>();

export function ChatStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name='ChatMain'
        component={ChatScreen}
        options={{ title: 'Chat' }}
      />
    </Stack.Navigator>
  );
}
