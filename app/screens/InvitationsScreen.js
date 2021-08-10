import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useDevices } from '../providers/DevicesProvider';  // USE LATER
import { useGroupManager } from '../hooks/useGroupManager';
import { FormTextInput } from '../components/FormTextInput';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import { Dropdown } from '../components/Dropdown';

export function InvitationsScreen() {
  const { userData } = useAuth();
  const { devices } = useDevices(); // USE LATER
  const { respondToInvitation } = useGroupManager();
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [temporaryDeviceId, setTemporaryDeviceId] = useState('');

  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  
  useEffect(() => {
    setPickerItems(devices.map((device, idx) => ({ name: device.name, id: device._id.toString() })));
  }, [devices]);

  const handleAccept = async () => {
    /* if (!selectedInvitation || !temporaryDeviceId)
      return; */
    if (!pickerValue)
      return

    // Our MongoDB Realm backend function will return an object
    // containing an error property if any errors occurred.
    const { error } = await respondToInvitation(selectedInvitation.groupId, true, pickerValue.id);
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
            itemSubTextExtractor={(invitation) => `From: ${invitation.senderEmail}`}
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
            submitText='Accept'
            onSubmit={handleAccept}
            onCancel={handleCancelAccept}
          >
            <Dropdown
              open={pickerIsOpen}
              value={pickerValue}
              items={pickerItems}
              setOpen={setPickerIsOpen}
              setValue={setPickerValue}
              top={false}
            />
           {/*  <FormTextInput
              placeholder='Device ID to join with'
              value={temporaryDeviceId}
              onChangeText={setTemporaryDeviceId}
              autoCorrect={false}
              autoCapitalize='none'
            /> */}
            {/* TEMPORARY (TODO: add dropdown for device names here) */}
          </ModalForm>
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
