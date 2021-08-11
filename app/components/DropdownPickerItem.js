import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import fonts from '../styles/fonts';
import colors from '../styles/colors';

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
        <MaterialCommunityIcons
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