import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import PrimaryButton from '../../components/PrimaryButton';
import { palette, spacing } from '../../utils/theme';

type ContentType = 'song' | 'album';

const CONTENT_TYPES: { label: string; value: ContentType; icon: string }[] = [
  { label: 'Song', value: 'song', icon: '🎵' },
  { label: 'Album', value: 'album', icon: '💿' },
];

const UploadScreen = () => {
  const [contentType, setContentType] = useState<ContentType>('song');
  const [title, setTitle] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [year, setYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setTitle('');
    setAlbumName('');
    setYear('');
  };

  const onSubmit = async () => {
    if (!title.trim()) {
      Toast.show({ type: 'error', text1: 'Title is required.' });
      return;
    }
    if (contentType === 'song' && !albumName.trim()) {
      Toast.show({ type: 'error', text1: 'Album name is required for a song.' });
      return;
    }

    try {
      setIsLoading(true);
      // TODO: wire up real upload API
      await new Promise(res => setTimeout(res, 800));
      Toast.show({
        type: 'success',
        text1: `${contentType === 'song' ? 'Song' : 'Album'} uploaded!`,
        text2: `"${title.trim()}" has been published.`,
      });
      reset();
    } catch {
      Toast.show({ type: 'error', text1: 'Upload failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Upload</Text>
        <Text style={styles.subtitle}>Publish new content to Canzone.</Text>

        {/* Content type toggle */}
        <View style={styles.toggleRow}>
          {CONTENT_TYPES.map(type => (
            <Pressable
              key={type.value}
              style={[
                styles.toggleItem,
                contentType === type.value && styles.toggleItemActive,
              ]}
              onPress={() => {
                setContentType(type.value);
                reset();
              }}
            >
              <Text style={styles.toggleIcon}>{type.icon}</Text>
              <Text
                style={[
                  styles.toggleLabel,
                  contentType === type.value && styles.toggleLabelActive,
                ]}
              >
                {type.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.label}>
            {contentType === 'song' ? 'Song Title' : 'Album Title'}
          </Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder={contentType === 'song' ? 'e.g. Midnight Run' : 'e.g. Golden Hours'}
            placeholderTextColor={palette.mutedText}
          />

          {contentType === 'song' && (
            <>
              <Text style={styles.label}>Album</Text>
              <TextInput
                style={styles.input}
                value={albumName}
                onChangeText={setAlbumName}
                placeholder="e.g. Skyline Letters"
                placeholderTextColor={palette.mutedText}
              />
            </>
          )}

          {contentType === 'album' && (
            <>
              <Text style={styles.label}>Release Year</Text>
              <TextInput
                style={styles.input}
                value={year}
                onChangeText={setYear}
                placeholder={String(new Date().getFullYear())}
                placeholderTextColor={palette.mutedText}
                keyboardType="number-pad"
                maxLength={4}
              />
            </>
          )}

          <View style={styles.filePickerCard}>
            <Text style={styles.filePickerIcon}>
              {contentType === 'song' ? '🎧' : '🖼️'}
            </Text>
            <Text style={styles.filePickerTitle}>
              {contentType === 'song' ? 'Attach Audio File' : 'Attach Cover Art'}
            </Text>
            <Text style={styles.filePickerSub}>
              {contentType === 'song'
                ? 'MP3 or AAC, up to 50 MB'
                : 'JPG or PNG, up to 5 MB'}
            </Text>
            <Pressable style={styles.browseButton}>
              <Text style={styles.browseText}>Browse Files</Text>
            </Pressable>
          </View>

          <PrimaryButton
            title={isLoading ? 'Uploading…' : `Publish ${contentType === 'song' ? 'Song' : 'Album'}`}
            onPress={onSubmit}
            disabled={isLoading}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
    marginBottom: spacing.lg,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  toggleItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm + 2,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.card,
  },
  toggleItemActive: {
    borderColor: palette.accent,
    backgroundColor: palette.cardSecondary,
  },
  toggleIcon: {
    fontSize: 18,
  },
  toggleLabel: {
    color: palette.mutedText,
    fontWeight: '600',
    fontSize: 15,
  },
  toggleLabelActive: {
    color: palette.accent,
  },
  form: {
    backgroundColor: palette.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  label: {
    color: palette.mutedText,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
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
  filePickerCard: {
    backgroundColor: palette.cardSecondary,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  filePickerIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  filePickerTitle: {
    color: palette.text,
    fontWeight: '700',
    fontSize: 15,
    marginBottom: spacing.xs,
  },
  filePickerSub: {
    color: palette.mutedText,
    fontSize: 13,
    marginBottom: spacing.md,
  },
  browseButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs + 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: palette.accent,
  },
  browseText: {
    color: palette.accent,
    fontWeight: '600',
    fontSize: 14,
  },
  submitButton: {
    marginTop: spacing.xs,
  },
});

export default UploadScreen;
