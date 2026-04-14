import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GenUI } from '@sudobility/genui_rn';
import { useChatManager, hasInputControls } from '@sudobility/genuivo_lib';
import { useApi } from '@/context/ApiContext';
import { useAppColors } from '@/hooks/useAppColors';
import { trackScreenView } from '@/analytics';

export default function ChatScreen() {
  const appColors = useAppColors();
  const { networkClient, baseUrl, userId, token } = useApi();
  const {
    currentRenderable,
    isLoading,
    error,
    handleAction,
    handleSubmit,
    restart,
  } = useChatManager({ networkClient, baseUrl, userId, token });

  useEffect(() => {
    trackScreenView('Chat', 'ChatScreen');
  }, []);

  const showSubmit = hasInputControls(currentRenderable);
  const showRestart = !showSubmit && !isLoading;

  return (
    <SafeAreaView
      edges={['left', 'right']}
      style={[styles.container, { backgroundColor: appColors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps='handled'
      >
        <GenUI renderable={currentRenderable} onAction={handleAction} />

        {error ? (
          <View
            style={[
              styles.errorBox,
              {
                backgroundColor: appColors.error + '15',
                borderColor: appColors.error + '40',
              },
            ]}
          >
            <Text style={[styles.errorText, { color: appColors.error }]}>
              {error}
            </Text>
          </View>
        ) : null}

        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size='small' color={appColors.primary} />
            <Text
              style={[styles.loadingText, { color: appColors.textSecondary }]}
            >
              Thinking...
            </Text>
          </View>
        ) : null}

        {showSubmit && !isLoading ? (
          <Pressable
            style={[styles.button, { backgroundColor: appColors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </Pressable>
        ) : null}

        {showRestart ? (
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: appColors.border,
              },
            ]}
            onPress={restart}
          >
            <Text style={[styles.buttonText, { color: appColors.text }]}>
              New Conversation
            </Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  errorBox: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  errorText: {
    fontSize: 14,
  },
  loadingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
