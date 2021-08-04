import React, { useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import useGroup from '../hooks/useGroup';
import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import ListItem from '../components/ListItem';
import ListItemAction from '../components/ListItemAction';
import ItemSeparator from '../components/ItemSeparator';
import routes from '../navigation/routes';

function GroupScreen({ navigation, route }) {
  
  const { group } = useGroup(route.params.groupId);

  useLayoutEffect(() => {
    // In order for the header to be able to interact with the screen (this) component
    // we need to define the header options using 'navigation.setOptions' inside this
    // screen component.
    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          iconName='account-plus'
          onPress={() => console.log('Pressed to add a group member.')}
        />
      )
    })
  });

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        {group && (
          <FlatList
            data={group.members}
            keyExtractor={member => member.userId.toString()}
            renderItem={({ item }) => (
              <ListItem
                text={item.displayName}
                onPress={() => console.log(`Pressed group member ${item.displayName}.`)}
                renderRightActions={() => (
                  <ListItemAction
                    action='remove-member'
                    onPress={() => console.log(`Pressed btn to remove member ${item.displayName}.`)}
                  />
                )}
              />
            )}
            ItemSeparatorComponent={ItemSeparator}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text='View Map'
          onPress={() => navigation.navigate(routes.GROUP_MAP, {
            groupId: route.params.groupId
          })}
          otherStyles={{ marginBottom: 30 }}
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
  },
  buttonContainer: {
    marginHorizontal: 15
  }
});

export default GroupScreen;
