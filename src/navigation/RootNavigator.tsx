import React, { useState } from 'react';
import { tokenStore } from '../utils/tokenStore';
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
        logout: () => {
          tokenStore.clear();
          userStore.clear();
          setIsAuthenticated(false);
        },
      }}
    >
      <MainTabs role={userRole} />
    </AuthActionsProvider>
  );
};

export default RootNavigator;
