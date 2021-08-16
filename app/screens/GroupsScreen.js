import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useDevices } from '../providers/DevicesProvider';
import { useGroupManager } from '../hooks/useGroupManager';
import { useToggle } from '../hooks/useToggle';
import { FormTextInput } from '../components/FormTextInput';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import { DropdownPicker } from '../components/DropdownPicker';
import routes from '../navigation/routes';

export function GroupsScreen({ navigation, setGroupId }) {
  const { userData } = useAuth();
  const { devices } = useDevices();
  const { createGroup, leaveGroup, removeGroup } = useGroupManager();
  const [newGroupName, setNewGroupName] = useState('');
  const { isOn: modalVisible, turnOff: closeModal } = useToggle(false, navigation, 'plus-circle');
  const [selectedPickerItem, setSelectedPickerItem] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);

  useEffect(() => {
    setPickerItems(devices.map(device => ({ label: device.name, value: device._id.toString() })));
  }, [devices.length]);

  const handleCreateGroup = async () => {
    if (!newGroupName || !selectedPickerItem)
      return;

    // Our MongoDB Realm backend function will return an object
    // containing an error property if any errors occurred.
    const selectedDeviceId = selectedPickerItem.value;
    const { error } = await createGroup(newGroupName, selectedDeviceId);
    if (error)
      return Alert.alert(error.message);

    closeModal();
    setNewGroupName('');
    setSelectedPickerItem(null);
  };

  const handleCancelCreateGroup = () => {
    closeModal();

    if (newGroupName)
      setNewGroupName('');
  };

  const handleRemoveGroup = async (groupMembership) => {
    const { error } = await removeGroup(groupMembership.groupId);
    if (error)
      return Alert.alert(error.message);
  };

  const handleLeaveGroup = async (groupMembership) => {
    const { error } = await leaveGroup(groupMembership.groupId);
    if (error)
      return Alert.alert(error.message);
  };

  return (
    <>
      <View style={styles.screen}>
        {userData && (
          <List
            items={userData.groups}
            keyExtractor={(groupMembership) => groupMembership.groupId.toString()}
            itemTextExtractor={(groupMembership) => groupMembership.groupName}
            onItemPress={(groupMembership) => {
              // When the groupId is set, GroupsNavigator rerenders and passes the
              // new group id to the GroupsProvider, which opens the group realm.
              setGroupId(groupMembership.groupId);
              navigation.navigate(routes.GROUP);
            }}
            rightActions={[
              {
                actionType: 'leave',
                onPress: handleLeaveGroup
              },
              {
                actionType: 'remove',
                onPress: handleRemoveGroup
              }
            ]}
            emptyListText='Create a group.'
          />
        )}
      </View>
      <ModalForm
        visible={modalVisible}
        title='Create Group'
        submitText='Create'
        onSubmit={handleCreateGroup}
        onCancel={handleCancelCreateGroup}
      >
        <FormTextInput
          placeholder='Name'
          value={newGroupName}
          onChangeText={setNewGroupName}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <DropdownPicker
          selectedItem={selectedPickerItem}
          items={pickerItems}
          onSelectItem={setSelectedPickerItem}
          noSelectedItemText='Select device to join with'
        />
      </ModalForm>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
