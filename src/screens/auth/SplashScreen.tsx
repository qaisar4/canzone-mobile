import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { palette } from '../../utils/theme';

type Props = {
  onFinished: () => void;
};

const SplashScreen = ({ onFinished }: Props) => {
  const scale = useRef(new Animated.Value(0.85)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timeout = setTimeout(onFinished, 1700);
    return () => clearTimeout(timeout);
  }, [onFinished, opacity, scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity, transform: [{ scale }] }}>
        <Text style={styles.logo}>Canzone</Text>
        <Text style={styles.tagline}>Find your next favorite song</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    color: palette.text,
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
  },
  tagline: {
    marginTop: 10,
    color: palette.accent,
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.6,
  },
});

export default SplashScreen;
