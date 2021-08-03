import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';

import ListItem from '../components/ListItem';
import ListItemAction from '../components/ListItemAction';
import ItemSeparator from '../components/ItemSeparator';

import routes from '../navigation/routes';

function GroupsScreen({ navigation }) {

  const { userData } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={userData.groups}
          keyExtractor={group => group.groupId.toString()}
          renderItem={({ item }) => (
            <ListItem
              text={item.groupName}
              onPress={() => navigation.navigate(routes.GROUP, {
                groupId: item.groupId.toString(),
              })}
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
