import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import ItemSeparator from '../components/ItemSeparator';

import colors from '../styles/colors';

const GroupsScreen = () => {
  const [members] = useState([{ id: 1, name: 'Realm Team' }, { id: 2, name: 'Family' }, { id: 3, name: 'Friends' }]);

  return (
    <View style={styles.items}>
      <FlatList
        data={members}
        renderItem={ListItem}
        keyExtractor={item => item.id}
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
