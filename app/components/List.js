import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from './ListItem';
import { ListItemAction } from './ListItemAction';
import { ItemSeparator } from './ItemSeparator';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export function List({
  items,
  keyExtractor,
  itemTextExtractor = () => {},
  itemSubTextExtractor = () => {},
  onItemPress = () => {},
  fadeOnPress,
  rightActions = [],
  emptyListText = 'The list is empty.'
}) {
  return (
    <View style={styles.list}>
      {items?.length ? (
        <FlatList
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => (
            <ListItem
              text={itemTextExtractor(item)}
              subText={itemSubTextExtractor(item)}
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
      ) : (
        <Text style={styles.info}>
          {emptyListText}
        </Text>
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
  },
  info: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: fonts.sizeM,
    color: colors.grayDark
  }
});
