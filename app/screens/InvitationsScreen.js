import React, { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useDevices } from '../providers/DevicesProvider';
import { useGroupManager } from '../hooks/useGroupManager';
import { List } from '../components/List';
import { ModalForm } from '../components/ModalForm';
import { DropdownPicker } from '../components/DropdownPicker';

export function InvitationsScreen() {
  const { userData } = useAuth();
  const { devices } = useDevices();
  const { respondToInvitation } = useGroupManager();
  const [selectedInvitation, setSelectedInvitation] = useState(null);
  const [selectedPickerItem, setSelectedPickerItem] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  
  useEffect(() => {
    setPickerItems(devices.map(device => ({ label: device.name, value: device._id.toString() }) ));

    // Add "devices.length" to the dependency array to only run this function if the
    // user adds a device. Adding only "devices" causes the function to run every
    // time the location of any of the user's devices change.
  }, [devices.length]);

  const handleAccept = async () => {
    if (!selectedInvitation || !selectedPickerItem)
      return;

    // Our MongoDB Realm backend function will return an object
    // containing an error property if any errors occurred.
    const selectedDeviceId = selectedPickerItem.value;
    const { error } = await respondToInvitation(selectedInvitation.groupId, true, selectedDeviceId);
    if (error)
      return Alert.alert(error.message);

    setSelectedInvitation(null);
    setSelectedPickerItem(null);
  };

  const handleCancelAccept = () => setSelectedInvitation(null);

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
            emptyListText='You currently have no invitations.'
          />
          <ModalForm
            visible={!!selectedInvitation}
            title='Accept Invitation'
            submitText='Accept'
            onSubmit={handleAccept}
            onCancel={handleCancelAccept}
          >
            <DropdownPicker
              selectedItem={selectedPickerItem}
              items={pickerItems}
              onSelectItem={setSelectedPickerItem}
              noSelectedItemText='Select device to join with'
            />
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
