import React, { useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useDevices } from '../providers/DevicesProvider';  // USE LATER
import useGroupManager from '../hooks/useGroupManager';
import List from '../components/List';
import ModalForm from '../components/ModalForm';

function InvitationsScreen() {
  const { userData } = useAuth();
  //const { devices } = useDevices(); // USE LATER
  const { respondToInvitation } = useGroupManager();
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [temporaryDeviceId, setTemporaryDeviceId] = useState('');

  const handleAccept = async () => {
    if (!selectedInvitation || !temporaryDeviceId)
      return;

    // Our MongoDB Realm backend function will return an object
    // containing an error property if any errors occurred.
    const { error } = await respondToInvitation(selectedInvitation.groupId, true, temporaryDeviceId);
    if (error)
      return Alert.alert(error.message);

    setSelectedInvitation(null);
    setTemporaryDeviceId('');
  };

  const handleCancelAccept = () => {
    setSelectedInvitation(null);

    if (temporaryDeviceId)
      setTemporaryDeviceId('');
  };
  
  return (
    <View style={styles.screen}>
      {userData && (
        <>
        <List
          items={userData.invitations}
          keyExtractor={(invitation) => invitation.groupId.toString()}
          itemTextExtractor={(invitation) => invitation.groupName}
          fadeOnPress={false}
          rightActions={[
            {
              actionType: 'accept',
              onPress: (invitation) => setSelectedInvitation(invitation)
            },
            {
              actionType: 'decline',
              onPress: (invitation) => respondToInvitation(invitation.groupId, false)
            }
          ]}
        />
        <ModalForm
          visible={!!selectedInvitation}
          title='Accept Invitation'
          // TEMPORARY (TODO: pass in the device names to use for dropdown)
          textInputProps={{
            placeholder: 'Device ID to join with',
            value: temporaryDeviceId,
            onChangeText: setTemporaryDeviceId,
            autoCorrect: false,
            autoCapitalize: 'none'
          }}
          submitText='Accept'
          onSubmit={handleAccept}
          onCancel={handleCancelAccept}
        />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

export default InvitationsScreen;
