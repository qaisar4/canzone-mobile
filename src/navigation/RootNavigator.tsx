import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { userApi } from '../api/userApi';
import { userStore } from '../utils/userStore';
import { AuthActionsProvider } from '../context/AuthActionsContext';
import SplashScreen from '../screens/auth/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

const RootNavigator = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'artist'>('user');

  if (isAppLoading) {
    return <SplashScreen onFinished={() => setIsAppLoading(false)} />;
  }

  if (!isAuthenticated) {
    return (
      <AuthNavigator
        onAuthSuccess={() => {
          const role = userStore.get()?.role ?? 'user';
          setUserRole(role);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <AuthActionsProvider
      value={{
        logout: async () => {
          try {
           const response = await userApi.logout();
            Toast.show({ type: 'success', text1: response?.data?.message });
          } catch (error) {
            const raw = error instanceof Error ? error.message : 'Logout failed. Please try again.';
            const message = raw.replace(/\s*\(URL:.*\)$/, '');
            Toast.show({ type: 'error', text1: message });
          } finally {
            setIsAuthenticated(false);
          }
        },
      }}
    >
      <MainTabs role={userRole} />
    </AuthActionsProvider>
  );
};

export default RootNavigator;
