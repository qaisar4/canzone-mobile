import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { userApi } from '../../api';
import AuthHeader from '../../components/AuthHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { palette, spacing } from '../../utils/theme';

type Props = {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
};

const SignupScreen = ({ onSuccess, onSwitchToLogin }: Props) => {
  const [name, setName] = useState('Music Lover');
  const [email, setEmail] = useState('hello@canzone.app');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  const onSignup = async () => {
    setIsLoading(true);
    await userApi.signup({ name, email, password });
    setIsLoading(false);
    onSuccess();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.content}>
        <AuthHeader title="Create Account" subtitle="Join and discover fresh sounds." />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor={palette.mutedText}
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={palette.mutedText}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={palette.mutedText}
          autoCapitalize="none"
        />
        <PrimaryButton
          title={isLoading ? 'Creating...' : 'Sign up'}
          onPress={onSignup}
          disabled={isLoading}
          style={styles.button}
        />
        <Pressable onPress={onSwitchToLogin} style={styles.linkButton}>
          <Text style={styles.linkText}>Already have an account? Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  content: {
    backgroundColor: palette.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  input: {
    backgroundColor: palette.cardSecondary,
    color: palette.text,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
  },
  button: {
    marginTop: spacing.sm,
  },
  linkButton: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  linkText: {
    color: palette.accent,
    fontWeight: '600',
  },
});

export default SignupScreen;
