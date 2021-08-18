import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../styles/colors';

/**
 * Create a separator component for a list item.
 */
export function ListItemSeparator() {
  return (
    <View style={styles.separator} />
  );
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: colors.grayMedium, 
    borderBottomWidth: 1
  }
});
