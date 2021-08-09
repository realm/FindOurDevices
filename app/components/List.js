import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from './ListItem';
import { ListItemAction } from './ListItemAction';
import { ItemSeparator } from './ItemSeparator';

export function List({
  items,
  keyExtractor,
  itemTextExtractor = () => {},
  onItemPress = () => {},
  fadeOnPress,
  rightActions = []
}) {
  return (
    <View style={styles.list}>
      {items && (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <ListItem
              text={itemTextExtractor(item)}
              onPress={() => onItemPress(item)}
              fadeOnPress={fadeOnPress}
              renderRightActions={() => (
                <View style={styles.actionsContainer}>
                  {rightActions.map(({ actionType, onPress }, idx) => (
                    <ListItemAction
                      key={idx}
                      action={actionType}
                      onPress={() => onPress(item)}
                    />
                  ))}
                </View>
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
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
