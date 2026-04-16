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
import Toast from 'react-native-toast-message';
import { userApi } from '../../api';
import AuthHeader from '../../components/AuthHeader';
import PrimaryButton from '../../components/PrimaryButton';
import { palette, spacing } from '../../utils/theme';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Props = {
  onSuccess: () => void;
  onSwitchToSignup: () => void;
};

const LoginScreen = ({ onSuccess, onSwitchToSignup }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): string | null => {
    if (!email.trim()) {
      return 'Email is required.';
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (!password) {
      return 'Password is required.';
    }
    return null;
  };

  const onLogin = async () => {
    const validationError = validate();
    if (validationError) {
      Toast.show({ type: 'error', text1: validationError });
      return;
    }

    try {
      setIsLoading(true);
      await userApi.login({ email: email.trim(), password });
      onSuccess();
    } catch (error) {
      const raw = error instanceof Error ? error.message : 'Login failed. Please try again.';
      const message = raw.replace(/\s*\(URL:.*\)$/, '');
      Toast.show({ type: 'error', text1: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <View style={styles.content}>
        <AuthHeader title="Welcome Back" subtitle="Login and keep the music going." />
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor={palette.mutedText}
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor={palette.mutedText}
            autoCapitalize="none"
          />
          <Pressable
            onPress={() => setShowPassword((prev) => !prev)}
            style={styles.passwordToggleButton}
            disabled={isLoading}
          >
            <Text style={styles.passwordToggleText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        </View>
        <PrimaryButton
          title={isLoading ? 'Please wait...' : 'Login'}
          onPress={onLogin}
          disabled={isLoading}
          style={styles.button}
        />
        <Pressable onPress={onSwitchToSignup} style={styles.linkButton}>
          <Text style={styles.linkText}>New here? Create account</Text>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.cardSecondary,
    borderRadius: 12,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: palette.border,
  },
  passwordInput: {
    flex: 1,
    color: palette.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  passwordToggleButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  passwordToggleText: {
    color: palette.accent,
    fontWeight: '600',
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

export default LoginScreen;
