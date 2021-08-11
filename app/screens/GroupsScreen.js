import React, { useState} from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useGroupManager } from '../hooks/useGroupManager';
import { useToggle } from '../hooks/useToggle';
import { FormTextInput } from '../components/FormTextInput';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import routes from '../navigation/routes';

export function GroupsScreen({ navigation, setGroupId }) {
  const { userData } = useAuth();
  const { createGroup, leaveGroup, removeGroup } = useGroupManager();
  const [newGroupName, setNewGroupName] = useState('');
  const { isOn: modalVisible, turnOff: closeModal }= useToggle(false, navigation, 'plus-circle');

  const handleCreateGroup = async () => {
    if (!newGroupName)
      return;

    // Our MongoDB Realm backend function will return an object
    // containing an error property if any errors occurred.
    const { error } = await createGroup(newGroupName);
    if (error)
      return Alert.alert(error.message);

    closeModal();
    setNewGroupName('');
  };

  const handleCancelCreateGroup = () => {
    closeModal();

    if (newGroupName)
      setNewGroupName('');
  };

  const handleRemoveGroup = async (groupId) => {
    const { error } = await removeGroup(groupId);
    if (error)
      return Alert.alert(error.message);
  };

  const handleLeaveGroup = async (groupId) => {
    const { error } = await leaveGroup(groupId);
    if (error)
      return Alert.alert(error.message);
  };

  return (
    <>
    <View style={styles.screen}>
      {userData && (
        <List
          items={userData.groups}
          keyExtractor={(group) => group.groupId.toString()}
          itemTextExtractor={(group) => group.groupName}
          onItemPress={(group) => {
            // When the groupId is set, GroupsNavigator rerenders and passes the
            // new group id to the GroupsProvider, which opens the group realm.
            setGroupId(group.groupId),
            navigation.navigate(routes.GROUP)}
          }
          rightActions={[
            {
              actionType: 'edit',
              onPress: (group) => console.log(`Clicked button to edit group '${group.groupId}'`)
            },
            {
              actionType: 'leave',
              onPress: (group) => handleLeaveGroup(group.groupId)
            },
            {
              actionType: 'remove',
              onPress: (group) => handleRemoveGroup(group.groupId)
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
    </ModalForm>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
