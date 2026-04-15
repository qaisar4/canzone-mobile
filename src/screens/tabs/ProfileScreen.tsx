import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AnimatedCard from '../../components/AnimatedCard';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuthActions } from '../../context/AuthActionsContext';
import { getGreetingByTime } from '../../utils/helpers';
import { palette, spacing } from '../../utils/theme';

const ProfileScreen = () => {
  const { logout } = useAuthActions();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>{getGreetingByTime()}, welcome back!</Text>

      <AnimatedCard style={styles.profileCard} delay={120}>
        <Text style={styles.name}>Canzone User</Text>
        <Text style={styles.email}>hello@canzone.app</Text>
        <Text style={styles.meta}>Favorite genre: Indie Pop</Text>
        <Text style={styles.meta}>Listening streak: 14 days</Text>
      </AnimatedCard>

      <PrimaryButton title="Logout" onPress={logout} style={styles.logoutButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
  },
  title: {
    color: palette.text,
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: spacing.xs,
    color: palette.mutedText,
    marginBottom: spacing.md,
  },
  profileCard: {
    backgroundColor: palette.cardSecondary,
    marginBottom: spacing.lg,
  },
  name: {
    color: palette.text,
    fontSize: 20,
    fontWeight: '800',
  },
  email: {
    marginTop: 5,
    color: palette.accent,
    fontWeight: '600',
  },
  meta: {
    marginTop: 12,
    color: palette.mutedText,
  },
  logoutButton: {
    marginTop: spacing.sm,
  },
});

export default ProfileScreen;
