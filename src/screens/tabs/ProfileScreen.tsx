import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { userApi, UserProfile } from '../../api/userApi';
import AnimatedCard from '../../components/AnimatedCard';
import PrimaryButton from '../../components/PrimaryButton';
import { useAuthActions } from '../../context/AuthActionsContext';
import { getGreetingByTime } from '../../utils/helpers';
import { palette, spacing } from '../../utils/theme';

const ProfileScreen = () => {
  const { logout } = useAuthActions();
  const [profile, setProfile] = useState<UserProfile | null>(null);

  console.log("Profile screen is here");
  console.log("Profile is here", profile);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    setError(null);
    try {
      const user = await userApi.getProfile();
      setProfile(user);
    } catch (err) {
      const raw = err instanceof Error ? err.message : 'Failed to load profile.';
      setError(raw.replace(/\s*\(URL:.*\)$/, ''));
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchProfile(true);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator color={palette.accent} size="large" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => fetchProfile()} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      );
    }

    if (!profile) return null;

    return (
      <AnimatedCard style={styles.profileCard} delay={120}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarLetter}>
            {profile?.username?.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.name}>{profile?.username}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{profile.role.toUpperCase()}</Text>
        </View>
        {profile.createdAt && (
          <Text style={styles.meta}>
            Member since {new Date(profile.createdAt).toLocaleDateString()}
          </Text>
        )}
      </AnimatedCard>
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={palette.accent}
        />
      }
    >
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>{getGreetingByTime()}, welcome back!</Text>

      {renderContent()}

      <PrimaryButton title="Logout" onPress={logout} style={styles.logoutButton} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
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
  centered: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  errorText: {
    color: palette.mutedText,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  retryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: palette.accent,
  },
  retryText: {
    color: palette.accent,
    fontWeight: '600',
  },
  profileCard: {
    backgroundColor: palette.cardSecondary,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarLetter: {
    color: palette.background,
    fontSize: 32,
    fontWeight: '800',
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
  roleBadge: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.card,
  },
  roleText: {
    color: palette.mutedText,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  meta: {
    marginTop: spacing.sm,
    color: palette.mutedText,
    fontSize: 13,
  },
  logoutButton: {
    marginTop: spacing.sm,
  },
});

export default ProfileScreen;
