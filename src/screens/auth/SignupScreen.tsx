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

type Props = {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
};

type SignupRole = 'user' | 'artist';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SignupScreen = ({ onSuccess, onSwitchToLogin }: Props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<SignupRole>('user');
  const [isLoading, setIsLoading] = useState(false);

  const validate = (): string | null => {
    if (!name.trim()) {
      return 'Username is required.';
    }
    if (!email.trim()) {
      return 'Email is required.';
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (!password) {
      return 'Password is required.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters.';
    }
    return null;
  };

  const onSignup = async () => {
    const validationError = validate();
    if (validationError) {
      Toast.show({ type: 'error', text1: validationError });
      return;
    }

    try {
      setIsLoading(true);
    const response = await userApi.signup({ username: name.trim(), email: email.trim(), password, role });
      onSuccess();
    Toast.show({ type: 'success', text1: response?.data?.message ?? 'Signup successful' });
    } catch (error) {
      const raw = error instanceof Error ? error.message : 'Signup failed. Please try again.';
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
        <AuthHeader title="Create Account" subtitle="Join and discover fresh sounds." />
        <TextInput
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor={palette.mutedText}
          autoCapitalize="none"
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
        <View style={styles.roleContainer}>
          <Text style={styles.roleLabel}>Role</Text>
          <View style={styles.roleOptions}>
            <Pressable
              onPress={() => setRole('user')}
              style={[
                styles.roleOption,
                role === 'user' && styles.roleOptionActive,
              ]}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.roleOptionText,
                  role === 'user' && styles.roleOptionTextActive,
                ]}
              >
                User
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setRole('artist')}
              style={[
                styles.roleOption,
                role === 'artist' && styles.roleOptionActive,
              ]}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.roleOptionText,
                  role === 'artist' && styles.roleOptionTextActive,
                ]}
              >
                Artist
              </Text>
            </Pressable>
          </View>
        </View>
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
  roleContainer: {
    marginBottom: spacing.md,
  },
  roleLabel: {
    color: palette.mutedText,
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  roleOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  roleOption: {
    flex: 1,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: palette.cardSecondary,
  },
  roleOptionActive: {
    borderColor: palette.accent,
    backgroundColor: palette.accent,
  },
  roleOptionText: {
    color: palette.text,
    fontWeight: '600',
  },
  roleOptionTextActive: {
    color: palette.background,
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
