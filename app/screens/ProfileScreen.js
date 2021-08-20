import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';

import { useAuth } from '../providers/AuthProvider';
import { useToggle } from '../hooks/useToggle';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { FormTextInput } from '../components/FormTextInput';
import { ModalForm } from '../components/ModalForm';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function ProfileScreen() {
  const { userData, logOut, setDisplayName } = useAuth();
  const [newDisplayName, setNewDisplayName] = useState('');
  const { isOn: modalVisible, turnOn: openModal, turnOff: closeModal } = useToggle(false);

  const handleSaveName = async () => {
    if (!newDisplayName)
      return Alert.alert('Please enter a name.');

    const { error } = await setDisplayName(newDisplayName);
    if (error)
      return Alert.alert(error.message);

    closeModal();
    setNewDisplayName('');
  };

  const handleCancelEditName = () => {
    closeModal();

    if (newDisplayName)
      setNewDisplayName('');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Icon
          name='account-circle'
          color={colors.white}
          size={80}
        />
        <Text style={styles.displayName}>
          {userData?.displayName}
        </Text>
      </View>
      <View style={styles.lowerView}>
        <View>
          <Pressable
            onPress={openModal}
            style={styles.userInfoItem}
          >
            <Icon
              name='lead-pencil'
              color={colors.primary}
              size={25}
            />
            <Text style={[styles.userInfoItemText, styles.textHighlight]}>
              Set new display name
            </Text>
          </Pressable>
          <View style={styles.userInfoItem}>
            <Icon
              name='email-outline'
              color={colors.grayDark}
              size={25}
            />
            <Text style={styles.userInfoItemText}>
              {userData?.email}
            </Text>
          </View>
        </View>
        <Button
          text='Log Out'
          onPress={logOut}
        />
      </View>
      <ModalForm
        visible={modalVisible}
        title='New Display Name:'
        submitText='Save'
        onSubmit={handleSaveName}
        onCancel={handleCancelEditName}
      >
        <FormTextInput
          placeholder='Name'
          value={newDisplayName}
          onChangeText={setNewDisplayName}
          autoCorrect={false}
          autoCapitalize='none'
        />
      </ModalForm>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      },
    })
  },
  lowerView: {
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
  displayName: {
    marginTop: 20,
    color: colors.white,
    fontSize: fonts.sizeM,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20
  },
  userInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  userInfoItemText: {
    marginHorizontal: 15,
    color: colors.grayDark,
    fontSize: fonts.sizeM
  },
  textHighlight: {
    color: colors.primary
  }
});
