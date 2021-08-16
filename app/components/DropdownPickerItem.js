import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { Icon } from './Icon';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

/**
 * Create a dropdown picker item option component.
 * @param {string} label - The item label.
 * @param {boolean} isSelected - A boolean which adds a checkmark to the item if true.
 * @param {function} onPress - Callback function to be called when the item is pressed.
 */
export function DropdownPickerItem({ label, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.item}
    >
      <Text style={styles.label}>
        {label}
      </Text>
      {isSelected && (
        <Icon
          name='check'
          color={colors.grayDark}
          size={18}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    color: colors.black,
    fontSize: fonts.sizeS
  }
});
