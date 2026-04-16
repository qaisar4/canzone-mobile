import React, { useState } from 'react';
import { tokenStore } from '../utils/tokenStore';
import { AuthActionsProvider } from '../context/AuthActionsContext';
import SplashScreen from '../screens/auth/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainTabs from './MainTabs';

const RootNavigator = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAppLoading) {
    return <SplashScreen onFinished={() => setIsAppLoading(false)} />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <AuthActionsProvider value={{ logout: () => { tokenStore.clear(); setIsAuthenticated(false); } }}>
      <MainTabs />
    </AuthActionsProvider>
  );
};

export default RootNavigator;
