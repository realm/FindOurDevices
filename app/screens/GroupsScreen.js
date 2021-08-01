import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListItem from '../components/ListItem';
import ListItemAction from '../components/ListItemAction';
import ItemSeparator from '../components/ItemSeparator';

function GroupsScreen() {
  const members = [
    { id: 1, name: 'Realm Team' },
    { id: 2, name: 'Family' },
    { id: 3, name: 'Friends' }
  ];

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={members}
          keyExtractor={member => member.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              text={item.name}
              onPress={() => console.log(`Pressed group ${item.name}.`)}
              renderRightActions={() => (
                <ListItemAction
                  action='edit'
                  onPress={() => console.log(`Pressed btn to edit group ${item.name}.`)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  list: {
    flex: 1
  }
});

export default GroupsScreen;
