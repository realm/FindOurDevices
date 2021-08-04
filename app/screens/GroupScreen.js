import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import useGroup from '../hooks/useGroup';
import Button from '../components/Button';
import HeaderButton from '../components/HeaderButton';
import List from '../components/List';
import routes from '../navigation/routes';

function GroupScreen({ navigation, route }) {
  const { group } = useGroup(route.params.groupId);

  useLayoutEffect(() => {
    // In order for the header to be able to interact with the screen (this) component
    // we need to define the header options using 'navigation.setOptions' inside this
    // screen component. This way, we're able to control the modal from the header.
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
      {group && (
        <List
          items={group.members}
          keyExtractor={member => member.userId.toString()}
          itemTextFieldName='displayName'
          onItemPress={(item) => console.log(`Pressed group member ${item.displayName}.`)}
          rightActionType='remove-member'
          rightActionOnPress={((item) => console.log(`Pressed btn to remove member ${item.displayName}.`))}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          text='View Map'
          onPress={() => navigation.navigate(routes.GROUP_MAP, {
            // Pass params to a route by putting them in an object as the second argument.
            // The route can access them through route.params.<property>
            members: group ? group.members : []
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
  buttonContainer: {
    marginHorizontal: 15
  }
});

export default GroupScreen;
