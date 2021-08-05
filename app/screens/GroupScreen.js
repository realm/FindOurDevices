import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useGroup } from '../providers/GroupProvider';
import useModalViaHeader from '../hooks/useModalViaHeader';
import Button from '../components/Button';
import List from '../components/List';
import ModalForm from '../components/ModalForm';
import routes from '../navigation/routes';

function GroupScreen({ navigation }) {
  const { group, addGroupMember } = useGroup();
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const { modalVisible, closeModal }= useModalViaHeader(navigation, 'account-plus', false);

  const handleAddMember = async () => {
    if (!newMemberEmail)
      return;

    // When our MongoDB Realm backend function is called, it will return an object
    // containing an error property if any errors occurred.
    const { error } = await addGroupMember(group._id, newMemberEmail);
    if (error)
      return Alert.alert(error.message);

    closeModal();
    setNewMemberEmail('');
  };

  const handleCancelAddMember = () => {
    closeModal();

    if (newMemberEmail)
      setNewMemberEmail('');
  };

  return (
    <>
    <View style={styles.screen}>
      {group && (
        <List
          items={group.members}
          keyExtractor={(member) => member.userId.toString()}
          itemTextExtractor={(member) => member.displayName}
          onItemPress={(member) => console.log(`Pressed group member ${member.displayName}.`)}
          rightActions={[
            {
              actionType: 'remove-member',
              onPress: (member) => console.log(`Pressed btn to remove member ${member.displayName}.`)
            }
          ]}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button
          text='View Map'
          onPress={() => navigation.navigate(routes.GROUP_MAP)}
          otherStyles={{ marginBottom: 30 }}
        />
      </View>
    </View>
    <ModalForm
      visible={modalVisible}
      title='Add Member'
      textInputProps={{
        placeholder: 'Email',
        value: newMemberEmail,
        onChangeText: setNewMemberEmail,
        autoCorrect: false,
        autoCapitalize: 'none',
        keyboardType: 'email-address',
        textContentType: 'emailAddress'  // iOS only
      }}
      submitText='Add'
      onSubmit={handleAddMember}
      onCancel={handleCancelAddMember}
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

export default GroupScreen;
