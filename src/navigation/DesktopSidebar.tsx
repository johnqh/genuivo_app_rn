import React from 'react';
import { View, Pressable } from 'react-native';
import { Heading, Text } from '@sudobility/components-rn';
import {
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
} from 'react-native-heroicons/outline';
import {
  ChatBubbleLeftRightIcon as ChatBubbleLeftRightIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
} from 'react-native-heroicons/solid';

export type SidebarTab = 'ChatTab' | 'SettingsTab';

interface DesktopSidebarProps {
  activeTab: SidebarTab;
  onTabPress: (tab: SidebarTab) => void;
}

const ICON_SIZE = 22;

const tabs: { key: SidebarTab; label: string }[] = [
  { key: 'ChatTab', label: 'Chat' },
  { key: 'SettingsTab', label: 'Settings' },
];

function TabIcon({ tab, focused }: { tab: SidebarTab; focused: boolean }) {
  // Icons are tinted via className (cssInterop maps text color -> Svg color).
  const className = focused ? 'text-primary' : 'text-muted-foreground';
  switch (tab) {
    case 'ChatTab':
      return focused ? (
        <ChatBubbleLeftRightIconSolid className={className} size={ICON_SIZE} />
      ) : (
        <ChatBubbleLeftRightIcon className={className} size={ICON_SIZE} />
      );
    case 'SettingsTab':
      return focused ? (
        <Cog6ToothIconSolid className={className} size={ICON_SIZE} />
      ) : (
        <Cog6ToothIcon className={className} size={ICON_SIZE} />
      );
  }
}

export function DesktopSidebar({ activeTab, onTabPress }: DesktopSidebarProps) {
  return (
    <View className='w-20 items-center border-r border-border bg-card pt-2'>
      <View className='mb-4 h-10 w-10 items-center justify-center rounded-md'>
        <Heading level={2} size='xl' color='primary'>
          G
        </Heading>
      </View>
      {tabs.map(({ key, label }) => {
        const focused = activeTab === key;
        return (
          <Pressable
            key={key}
            className={`mb-1 w-16 items-center rounded-md py-2 ${
              focused ? 'bg-background' : ''
            }`}
            onPress={() => onTabPress(key)}
          >
            <TabIcon tab={key} focused={focused} />
            <Text
              size='xs'
              weight='medium'
              color={focused ? 'primary' : 'muted'}
              className='mt-1'
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
