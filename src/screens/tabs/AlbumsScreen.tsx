import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import AnimatedCard from '../../components/AnimatedCard';
import { albumsApi } from '../../api';
import { Album } from '../../utils/mockData';
import { palette, spacing } from '../../utils/theme';

const AlbumsScreen = () => {
  const [data, setData] = useState<Album[]>([]);

  useEffect(() => {
    const load = async () => {
      const result = await albumsApi.listAlbums();
      setData(result);
    };
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albums</Text>
      <Text style={styles.subtitle}>All artist albums will appear here.</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <AnimatedCard delay={index * 90} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.artist}</Text>
            <Text style={styles.year}>{item.year}</Text>
          </AnimatedCard>
        )}
      />
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
  listContent: {
    paddingBottom: spacing.lg,
  },
  card: {
    marginBottom: spacing.sm,
  },
  cardTitle: {
    color: palette.text,
    fontSize: 17,
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: 4,
    color: palette.accent,
  },
  year: {
    marginTop: 8,
    color: palette.mutedText,
  },
});

export default AlbumsScreen;
