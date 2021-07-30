import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import fonts from '../styles/fonts';

const ListItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemTextButton}>
        <Text style={styles.itemText}> {item.name} </Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  itemTextButton: {
    flex: 1,
    paddingVertical: 20,
  },
  itemText: {
    fontSize: fonts.sizeM
  }
});

export default ListItem;
