import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useDevices } from '../providers/DevicesProvider';
import { useToggle } from '../hooks/useToggle';
import { Button } from '../components/Button';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import routes from '../navigation/routes';

export function DevicesScreen({ navigation }) {
  const { devices, currentIosOrAndroidId, addCurrentDevice } = useDevices();
  const { isOn: modalVisible, turnOff: closeModal } = useToggle(false, navigation, 'plus-circle');

  const handleAddDevice = async () => {
    const res = await addCurrentDevice();
    if (res?.error)
      return Alert.alert(res.error.message);

    closeModal();
  };

  return (
    <>
      <View style={styles.screen}>
        <List
          items={devices}
          keyExtractor={(device) => device._id.toString()}
          itemTextExtractor={(device) => device.name}
          itemSubTextExtractor={(device) => device.iosOrAndroidId === currentIosOrAndroidId ? 'current' : ''}
          fadeOnPress={false}
          rightActions={[
            {
              actionType: 'remove',
              onPress: (device) => console.log(`Pressed btn to remove ${device.name}.`)
            }
          ]}
          emptyListText='Add your first device.'
        />
        {
          devices?.length > 0 &&
          <View style={styles.buttonContainer}>
            <Button
              text='View Map'
              onPress={() => navigation.navigate(routes.DEVICES_MAP)}
              style={{ marginBottom: 30 }}
            />
          </View>
        }

      </View>
      <ModalForm
        visible={modalVisible}
        title='Add Current Device?'
        submitText='Yes'
        onSubmit={handleAddDevice}
        onCancel={closeModal}
      />
    </>
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
