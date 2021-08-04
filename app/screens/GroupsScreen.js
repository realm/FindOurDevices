import React, { useState} from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import useModalViaHeader from '../hooks/useModalViaHeader';
import List from '../components/List';
import ModalForm from '../components/ModalForm';
import routes from '../navigation/routes';

function GroupsScreen({ navigation, setGroupId }) {
  const { userData, createGroup } = useAuth();
  const [newGroupName, setNewGroupName] = useState('');
  const { modalVisible, closeModal }= useModalViaHeader(navigation, 'plus-circle', false);

  const handleCreateGroup = async () => {
    if (!newGroupName)
      return;

    // When our MongoDB Realm backend function is called, it will return an object
    // containing an error property if any errors occurred.
    const { error } = await createGroup(newGroupName);
    if (error)
      return Alert.alert(error.message);

    closeModal();
    setNewGroupName('');
  };

  const handleCancel = () => {
    closeModal();

    if (newGroupName)
      setNewGroupName('');
  };

  return (
    <>
    <View style={styles.screen}>
      {userData && (
        <List
          items={userData.groups}
          keyExtractor={group => group.groupId.toString()}
          itemTextFieldName='groupName'
          onItemPress={(item) => {
            setGroupId(item.groupId.toString()),
            navigation.navigate(routes.GROUP)}
          }
          rightActionType='edit'
          rightActionOnPress={(item) => console.log(`Pressed btn to edit group ${item.groupName}.`)}
        />
      )}
    </View>
    <ModalForm
      visible={modalVisible}
      title='Create Group'
      textInputProps={{
        placeholder: 'Name',
        value: newGroupName,
        onChangeText: setNewGroupName,
        autoCorrect: false,
        autoCapitalize: 'words'
      }}
      submitText='Create'
      onSubmit={handleCreateGroup}
      onCancel={handleCancel}
    />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default GroupsScreen;
