import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import ItemSeparator from '../components/ItemSeparator';

import colors from '../styles/colors';

import { useGroups } from "../providers/GroupsProvider";

const GroupsScreen = () => {
  const { groups } = useGroups();

  return (
    <View style={styles.items}>
      <FlatList
        data={groups}
        renderItem={ListItem}
        keyExtractor={item => item._id.toString()}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  items: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.snowWhite
  }
});

export default GroupsScreen;
