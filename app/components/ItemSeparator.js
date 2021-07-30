import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../styles/colors';

const ItemSeparator = () => {
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

export default ItemSeparator;
