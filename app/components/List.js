import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ListItem from './ListItem';
import ListItemAction from './ListItemAction';
import ItemSeparator from './ItemSeparator';

function List({
  items,
  keyExtractor,
  itemTextFieldName,
  onItemPress = () => {},
  fadeOnPress,
  rightActionType,
  rightActionOnPress = () => {}
}) {
  return (
    <View style={styles.list}>
      {items && (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <ListItem
              text={item[itemTextFieldName]}
              onPress={() => onItemPress(item)}
              fadeOnPress={fadeOnPress}
              renderRightActions={() => (
                <ListItemAction
                  action={rightActionType}
                  onPress={() => rightActionOnPress(item)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});

export default List;
