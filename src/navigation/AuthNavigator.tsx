import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import { AuthStackParamList } from './types';

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = {
  onAuthSuccess: () => void;
};

const AuthNavigator = ({ onAuthSuccess }: Props) => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login">
      {({ navigation }) => (
        <LoginScreen
          onSuccess={onAuthSuccess}
          onSwitchToSignup={() => navigation.navigate('Signup')}
        />
      )}
    </Stack.Screen>
    <Stack.Screen name="Signup">
      {({ navigation }) => (
        <SignupScreen
          onSuccess={onAuthSuccess}
          onSwitchToLogin={() => navigation.navigate('Login')}
        />
      )}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AuthNavigator;
