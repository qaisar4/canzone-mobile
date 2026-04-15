import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import AlbumsScreen from '../screens/tabs/AlbumsScreen';
import RandomSongsScreen from '../screens/tabs/RandomSongsScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import { MainTabParamList } from './types';
import { palette } from '../utils/theme';

const Tab = createBottomTabNavigator<MainTabParamList>();
const TabIcon = ({ icon }: { icon: string }) => <Text>{icon}</Text>;

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        backgroundColor: palette.card,
        borderTopColor: palette.border,
        height: 72,
        paddingTop: 8,
      },
      tabBarActiveTintColor: palette.accent,
      tabBarInactiveTintColor: palette.mutedText,
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '600',
      },
      // React Navigation tab icon callback intentionally returns a small render node.
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ focused }) => {
        const iconMap: Record<keyof MainTabParamList, string> = {
          Albums: '💿',
          RandomSongs: '🎵',
          Profile: '👤',
        };
        const icon = focused ? `${iconMap[route.name]} ` : iconMap[route.name];
        return <TabIcon icon={icon} />;
      },
    })}
  >
    <Tab.Screen name="Albums" component={AlbumsScreen} />
    <Tab.Screen
      name="RandomSongs"
      component={RandomSongsScreen}
      options={{ title: 'Random' }}
    />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

export default MainTabs;
