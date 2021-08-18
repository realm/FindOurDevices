import React from 'react';
import { Pressable, StyleSheet, Platform } from 'react-native';

import { Icon } from './Icon';
import colors from '../styles/colors';

/**
 * Create a header button to be used on react-navigation header.
 * @param {string} iconName - The icon name to be passed to <Icon> component.
 * @param {function} onPress - Callback function to be called when the header button is pressed.
 */
export function HeaderButton({ iconName, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ([
        styles.button,
        pressed && styles.pressed
      ])}
    >
      <Icon
        name={iconName}
        color={colors.primary}
        size={30}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      },
    })
  },
  pressed: {
    opacity: 0.2
  }
});
