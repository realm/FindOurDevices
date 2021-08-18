import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { Icon } from './Icon';
import colors from '../styles/colors';

/**
 * Create a list item action component.
 * @param {string} action - A string that specifies the icon that should be used.
 * @param {function} onPress - Callback function to be called when the list item action is pressed.
 */
export function ListItemAction({ action, onPress }) {
  const iconNameAndColor = useMemo(() => {
    switch (action) {
      case 'remove':
        return { name: 'trash-can-outline', color: colors.red }
      case 'edit':
        return { name: 'lead-pencil', color: colors.primary }
      case 'leave':
        return { name: 'logout', color: colors.orange }
      case 'remove-member':
        return { name: 'account-remove', color: colors.red }
      case 'accept':
        return { name: 'check', color: colors.primary }
      case 'decline':
        return { name: 'close', color: colors.red }
      default:
        throw new Error('Unsupported list item action type: ', action);
    }
  }, [action]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ([
        styles.container,
        pressed && styles.pressed
      ])}
    >
      <Icon
        {...iconNameAndColor}
        size={25}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grayMedium,
    borderWidth: 1,
    borderRadius: 23
  },
  pressed: {
    opacity: 0.2
  }
});
