import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenUI } from '@sudobility/genui_rn';
import { useChatManager, hasInputControls } from '@sudobility/genuivo_lib';
import { Alert, Button, Spinner, Text } from '@sudobility/components-rn';
import { useApi } from '@/context/ApiContext';
import { trackScreenView } from '@/analytics';

export default function ChatScreen() {
  const { userId, token } = useApi();
  const {
    currentRenderable,
    isLoading,
    error,
    handleAction,
    handleSubmit,
    restart,
  } = useChatManager({ userId, token });

  useEffect(() => {
    trackScreenView('Chat', 'ChatScreen');
  }, []);

  const showSubmit = hasInputControls(currentRenderable);
  const showRestart = !showSubmit && !isLoading;

  return (
    <SafeAreaView edges={['left', 'right']} className='flex-1 bg-background'>
      <ScrollView
        contentContainerClassName='p-4 gap-3'
        keyboardShouldPersistTaps='handled'
      >
        <GenUI renderable={currentRenderable} onAction={handleAction} />

        {error ? <Alert variant='error'>{error}</Alert> : null}

        {isLoading ? (
          <View className='flex-row items-center justify-center gap-2 py-6'>
            <Spinner size='small' />
            <Text color='muted'>Thinking...</Text>
          </View>
        ) : null}

        {showSubmit && !isLoading ? (
          <Button variant='primary' onPress={handleSubmit}>
            Submit
          </Button>
        ) : null}

        {showRestart ? (
          <Button variant='outline' onPress={restart}>
            New Conversation
          </Button>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
