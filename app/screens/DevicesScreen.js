import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useDevices } from '../providers/DevicesProvider';
import Button from '../components/Button';
import List from '../components/List';
import routes from '../navigation/routes';

function DevicesScreen({ navigation }) {
  const { devices } = useDevices();
  
  return (
    <View style={styles.screen}>
      <List
        items={devices}
        keyExtractor={device => device._id.toString()}
        itemTextFieldName='name'
        onItemPress={(item) => console.log(`Clicked on ${item.name}.`)}
        fadeOnPress={false}
        rightActionType='delete'
        rightActionOnPress={(item) => console.log(`Pressed btn to delete ${item.name}.`)}
      />
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
  buttonContainer: {
    marginHorizontal: 15
  }
});

export default DevicesScreen;
