import React from 'react';
import { Text, Pressable, StyleSheet, Platform } from 'react-native';

import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

/**
 * Create a button component.
 * @param {string} text - The button text.
 * @param {boolean} [isPrimary=true] - Whether or not the button should be styled as a primary button.
 * @param {boolean} [useShadow=true] - Whether or not the button should have a shadow.
 * @param {function} onPress - Callback function to be called when the button is pressed.
 * @param {Object} style - Other style prop to override the default one.
 * @return {React.Component} A button component.
 */
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
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
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
