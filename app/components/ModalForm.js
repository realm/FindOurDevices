import React from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, Platform, StyleSheet } from 'react-native';

import { Button } from './Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function ModalForm({ animationType = 'fade', visible, title, textInputProps, submitText, onSubmit, onCancel }) {
  // Our application is not expecting various types of layouts in the forms provided,
  // thus this component only allows one (or none) text input and one (or none) drop down.
  // If you want to allow more flexibility in what form fields to allow, simply make use
  // of the 'children' prop and allow users of this component to add their own fields.
  // TODO: Implement drop down
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
    >
      <View style={styles.modal}>
        <View style={styles.form}>
          <Text style={styles.title}>{title}</Text>
          {textInputProps && (
            <View style={styles.inputContainer}>
              <TextInput
                {...textInputProps}
                style={styles.input}
              />
            </View>
          )}
          <Button
            text={submitText}
            onPress={onSubmit}
            style={{ padding: 10 }}
          />
          <TouchableOpacity
            onPress={onCancel}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  form: {
    margin: 30,
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 25,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5
      },
    })
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: fonts.sizeL,
    fontWeight: 'bold'
  },
  inputContainer: {
    marginVertical: 10,
    padding: Platform.OS === 'ios' ? 15 : 0,
    alignSelf: 'stretch',
    backgroundColor: colors.grayLight,
    borderColor: colors.grayMedium,
    borderRadius: 10,
    borderColor: '#e1e1e1',
    borderWidth: 1
  },
  input: {
    fontSize: fonts.sizeM
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignSelf: 'flex-end'
  },
  cancelButtonText: {
    color: colors.grayDark,
    fontWeight: 'bold'
  }
});
