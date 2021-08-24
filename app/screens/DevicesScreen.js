import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useDevices } from '../providers/DevicesProvider';
import { useToggle } from '../hooks/useToggle';
import { Button } from '../components/Button';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import { FormTextInput } from '../components/FormTextInput';
import { routes } from '../navigation/routes';

export function DevicesScreen({ navigation }) {
  const { devices, currentIosOrAndroidId, addCurrentDevice, setDeviceName } = useDevices();
  const [newDeviceName, setNewDeviceName] = useState('');
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [addDeviceModalVisible, toggleAddDeviceModal] = useToggle(false, navigation, 'plus-circle');
  const [editDeviceModalVisible, toggleEditDeviceModal] = useToggle(false);

  const handleAddDevice = async () => {
    const res = await addCurrentDevice();
    if (res?.error)
      return Alert.alert(res.error.message);

    if (addDeviceModalVisible)
      toggleAddDeviceModal();
  };

  const handleEditDeviceName = (device) => {
    setDeviceToEdit(device);

    if (!editDeviceModalVisible)
      toggleEditDeviceModal();
  };

  const handleSaveDeviceName = () => {
    if (!deviceToEdit)
      return Alert.alert('Please select which device to edit.');
  
    if (!newDeviceName)
      return Alert.alert('Please enter a name for the device.');

    const res = setDeviceName(deviceToEdit, newDeviceName);
    if (res?.error)
      return Alert.alert(res.error.message);

    if (editDeviceModalVisible)
      toggleEditDeviceModal();
    
    setDeviceToEdit(null);
    setNewDeviceName('');
  };

  const handleCancelEditDeviceName = () => {
    if (editDeviceModalVisible)
      toggleEditDeviceModal();

    if (deviceToEdit || newDeviceName) {
      setDeviceToEdit(null);
      setNewDeviceName('');
    }
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
              onPress: handleEditDeviceName
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
        onCancel={toggleAddDeviceModal}
      />
      <ModalForm
        visible={editDeviceModalVisible}
        title='New Device Name:'
        submitText='Save'
        onSubmit={handleSaveDeviceName}
        onCancel={handleCancelEditDeviceName}
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
