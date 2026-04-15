import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { palette } from '../utils/theme';

type Props = {
  title: string;
  subtitle: string;
};

const AuthHeader = ({ title, subtitle }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 22,
  },
  title: {
    fontSize: 30,
    color: palette.text,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    color: palette.mutedText,
    fontSize: 14,
  },
});

export default AuthHeader;
