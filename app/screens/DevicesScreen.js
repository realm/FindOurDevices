import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useDevices } from '../providers/DevicesProvider';
import { useToggle } from '../hooks/useToggle';
import { Button } from '../components/Button';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import { FormTextInput } from '../components/FormTextInput';
import routes from '../navigation/routes';

export function DevicesScreen({ navigation }) {
  const { devices, currentIosOrAndroidId, addCurrentDevice/*, TODO: import "setDeviceName" */ } = useDevices();
  const [newDeviceName, setNewDeviceName] = useState('');
  const { isOn: addDeviceModalVisible, turnOff: closeAddDeviceModal } = useToggle(false, navigation, 'plus-circle');
  const { isOn: deviceNameModalVisible, turnOn: openDeviceNameModal, turnOff: closeDeviceNameModal } = useToggle(false);

  const handleAddDevice = async () => {
    const res = await addCurrentDevice();
    if (res?.error)
      return Alert.alert(res.error.message);

    closeAddDeviceModal();
  };

  const handleSetNewDeviceName = async () => {
    if (!newDeviceName)
      return Alert.alert('Please enter a name for the device.');

    // TODO: uncomment after importing "setDeviceName"
    // const res = await setDeviceName(newDeviceName);
    // if (res?.error)
    //   return Alert.alert(res.error.message);

    closeDeviceNameModal();
    setNewDeviceName('');
  };

  const handleCancelSetNewDeviceName = () => {
    closeDeviceNameModal();

    if (newDeviceName)
      setNewDeviceName('');
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
              actionType: 'edit',
              onPress: openDeviceNameModal
            }
          ]}
          emptyListText='Add your first device.'
        />
        {devices?.length > 0 && (
          <View style={styles.buttonContainer}>
            <Button
              text='View Map'
              onPress={() => navigation.navigate(routes.DEVICES_MAP)}
              style={{ marginBottom: 30 }}
            />
          </View>
        )}
      </View>
      <ModalForm
        visible={addDeviceModalVisible}
        title='Add Current Device?'
        submitText='Yes'
        onSubmit={handleAddDevice}
        onCancel={closeAddDeviceModal}
      />
      <ModalForm
        visible={deviceNameModalVisible}
        title='New Device Name:'
        submitText='Save'
        onSubmit={handleSetNewDeviceName}
        onCancel={handleCancelSetNewDeviceName}
      >
        <FormTextInput
          placeholder='Name'
          value={newDeviceName}
          onChangeText={setNewDeviceName}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </ModalForm>
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
