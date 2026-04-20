import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AnimatedCard from '../../components/AnimatedCard';
import { albumsApi } from '../../api';
import { Album } from '../../utils/mockData';
import { palette, spacing } from '../../utils/theme';

const ArtistAlbumsScreen = () => {
  const [data, setData] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = async () => {
    setIsLoading(true);
    try {
      const result = await albumsApi.listAlbums();
      setData(result);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Albums</Text>
      <Text style={styles.subtitle}>Albums you have published.</Text>

      {isLoading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Loading…</Text>
        </View>
      ) : data.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>💿</Text>
          <Text style={styles.emptyTitle}>No albums yet</Text>
          <Text style={styles.emptyText}>
            Head to the Upload tab to publish your first album.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <AnimatedCard delay={index * 90} style={styles.card}>
              <View style={styles.cardRow}>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardSubtitle}>{item.artist}</Text>
                  <Text style={styles.year}>{item.year}</Text>
                </View>
                <Pressable style={styles.editButton}>
                  <Text style={styles.editText}>Edit</Text>
                </Pressable>
              </View>
            </AnimatedCard>
          )}
        />
      )}
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
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
  editButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.border,
    marginLeft: spacing.sm,
  },
  editText: {
    color: palette.mutedText,
    fontSize: 13,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: spacing.xl * 2,
  },
  emptyIcon: {
    fontSize: 52,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: palette.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: palette.mutedText,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
});

export default ArtistAlbumsScreen;
