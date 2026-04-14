/**
 * Navigation type definitions
 */
import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Stack param lists for each tab
export type ChatStackParamList = {
  ChatMain: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

// Root tab param list
export type RootTabParamList = {
  ChatTab: NavigatorScreenParams<ChatStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
};

// Screen props types
export type ChatScreenProps = NativeStackScreenProps<
  ChatStackParamList,
  'ChatMain'
>;
export type SettingsScreenProps = NativeStackScreenProps<
  SettingsStackParamList,
  'Settings'
>;

// Tab screen props
export type ChatTabProps = BottomTabScreenProps<RootTabParamList, 'ChatTab'>;
export type SettingsTabProps = BottomTabScreenProps<
  RootTabParamList,
  'SettingsTab'
>;

// Utility type for navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootTabParamList {}
  }
}
