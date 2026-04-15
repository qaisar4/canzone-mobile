import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { songsApi } from '../../api';
import AnimatedCard from '../../components/AnimatedCard';
import PrimaryButton from '../../components/PrimaryButton';
import { Song } from '../../utils/mockData';
import { palette, spacing } from '../../utils/theme';

const RandomSongsScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadSongs = async () => {
    const result = await songsApi.getRandomSongs(4);
    setSongs(result);
  };

  useEffect(() => {
    loadSongs();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadSongs();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random Songs</Text>
      <Text style={styles.subtitle}>Tap shuffle for a fresh list every time.</Text>

      <PrimaryButton title="Shuffle" onPress={loadSongs} style={styles.shuffleButton} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={palette.accent} />
        }
      >
        {songs.map((item, index) => (
          <AnimatedCard key={item.id} delay={index * 100} style={styles.card}>
            <Text style={styles.song}>{item.name}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
            <Text style={styles.duration}>{item.duration}</Text>
          </AnimatedCard>
        ))}
      </ScrollView>
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
  shuffleButton: {
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  card: {
    marginBottom: spacing.sm,
  },
  song: {
    color: palette.text,
    fontWeight: '700',
    fontSize: 16,
  },
  artist: {
    marginTop: 4,
    color: palette.accent,
  },
  duration: {
    marginTop: 8,
    color: palette.mutedText,
  },
});

export default RandomSongsScreen;
