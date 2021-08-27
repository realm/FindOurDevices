import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import { Icon } from './Icon';
import { fonts } from '../styles/fonts';
import { colors } from '../styles/colors';

/**
 * Create a dropdown picker item option component.
 * @param {Object} props
 * @param {string} props.label - The item label.
 * @param {boolean} props.isSelected - A boolean which adds a checkmark to the item if true.
 * @param {function} props.onPress - Callback function to be called when the item is pressed.
 * @return {React.Component} A dropdown picker item component.
 */
export function DropdownPickerItem({ label, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.item}
    >
      <Text
        numberOfLines={1}
        style={styles.label}
      >
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
    fontSize: fonts.sizeS,
    maxWidth: '90%'
  }
});
