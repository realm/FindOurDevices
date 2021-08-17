import React from 'react';
import { Text, Pressable, StyleSheet, Platform } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Button({
  text,
  isPrimary = true,
  useShadow = true,
  onPress,
  style
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ([
        styles.button,
        isPrimary && styles.primaryButton,
        useShadow && styles.shadow,
        pressed && styles.pressed,
        style
      ])}
    >
      <Text style={[styles.buttonText, isPrimary && styles.buttonTextPrimary]}>
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginTop: 20,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 40
  },
  primaryButton: {
    backgroundColor: colors.primary
  },
  buttonText: {
    fontSize: fonts.sizeM,
    color: colors.primary,
    fontWeight: 'bold'
  },
  buttonTextPrimary: {
    color: colors.white
  },
  pressed: {
    opacity: 0.2
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2
      },
    })
  }
});
