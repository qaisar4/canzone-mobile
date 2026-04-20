import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import AlbumsScreen from '../screens/tabs/AlbumsScreen';
import RandomSongsScreen from '../screens/tabs/RandomSongsScreen';
import ProfileScreen from '../screens/tabs/ProfileScreen';
import ArtistAlbumsScreen from '../screens/artist/ArtistAlbumsScreen';
import UploadScreen from '../screens/artist/UploadScreen';
import { ArtistTabParamList, MainTabParamList } from './types';
import { palette } from '../utils/theme';

const UserTab = createBottomTabNavigator<MainTabParamList>();
const ArtistTab = createBottomTabNavigator<ArtistTabParamList>();

const tabBarScreenOptions = {
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
    fontWeight: '600' as const,
  },
};

const TabIcon = ({ icon }: { icon: string }) => <Text>{icon}</Text>;

type Props = {
  role: 'user' | 'artist';
};

const UserTabs = () => (
  <UserTab.Navigator
    screenOptions={({ route }) => ({
      ...tabBarScreenOptions,
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
    <UserTab.Screen name="Albums" component={AlbumsScreen} />
    <UserTab.Screen
      name="RandomSongs"
      component={RandomSongsScreen}
      options={{ title: 'Random' }}
    />
    <UserTab.Screen name="Profile" component={ProfileScreen} />
  </UserTab.Navigator>
);

const ArtistTabs = () => (
  <ArtistTab.Navigator
    screenOptions={({ route }) => ({
      ...tabBarScreenOptions,
      // eslint-disable-next-line react/no-unstable-nested-components
      tabBarIcon: ({ focused }) => {
        const iconMap: Record<keyof ArtistTabParamList, string> = {
          ArtistAlbums: '💿',
          Upload: '➕',
          Profile: '👤',
        };
        const icon = focused ? `${iconMap[route.name]} ` : iconMap[route.name];
        return <TabIcon icon={icon} />;
      },
    })}
  >
    <ArtistTab.Screen
      name="ArtistAlbums"
      component={ArtistAlbumsScreen}
      options={{ title: 'My Albums' }}
    />
    <ArtistTab.Screen
      name="Upload"
      component={UploadScreen}
    />
    <ArtistTab.Screen name="Profile" component={ProfileScreen} />
  </ArtistTab.Navigator>
);

const MainTabs = ({ role }: Props) =>
  role === 'artist' ? <ArtistTabs /> : <UserTabs />;

export default MainTabs;
