import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { useDevices } from '../providers/DevicesProvider';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import ListItemAction from '../components/ListItemAction';
import ItemSeparator from '../components/ItemSeparator';
import routes from '../navigation/routes';

function DevicesScreen({ navigation }) {
  const { devices } = useDevices();
  
  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={devices}
          keyExtractor={device => device._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              text={item.name}
              fadeOnPress={false}
              renderRightActions={() => (
                <ListItemAction
                  action='delete'
                  onPress={() => console.log(`Pressed btn to delete ${item.name}.`)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text='View Map'
          onPress={() => navigation.navigate(routes.DEVICES_MAP)}
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

export default DevicesScreen;
