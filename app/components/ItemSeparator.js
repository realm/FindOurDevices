import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../styles/colors';

/**
 * Create a item separator component (used to separate item components in a list).
 */
export function ItemSeparator() {
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
