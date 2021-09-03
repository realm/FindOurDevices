import React from 'react';
import { View, Text, Modal, Pressable, Platform, StyleSheet, KeyboardAvoidingView } from 'react-native';

import { Button } from './Button';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

/**
 * Create a modal form component
 * @param {Object} props All additional props will be applied to the underlying <Modal> component.
 * @param {string} [props.animationType=fade] - The animation type to use (same as react native <Modal> component).
 * @param {boolean} props.visible - A boolean which specifies if the modal form should be visible if true.
 * @param {string} props.title - The modal form title.
 * @param {string} props.submitText - The modal submit button text.
 * @param {function} props.onSubmit - Callback function to be called when the submit button is pressed.
 * @param {function} props.onCancel - Callback function to be called when the cancel text is pressed.
 * @param {React.Component} props.children - Components to be rendered on the modal form.
 * @return {React.Component} A modal form component.
 */
export function ModalForm({
  animationType = 'fade',
  visible,
  title,
  submitText,
  onSubmit,
  onCancel,
  children,
  ...otherProps
}) {
  return (
    <Modal
      animationType={animationType}
      transparent={true}
      visible={visible}
      {...otherProps}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.modal}
      >
        <View style={styles.form}>
          <Text style={styles.title}>{title}</Text>
          {children}
          <Button
            text={submitText}
            onPress={onSubmit}
            style={{ padding: 10 }}
          />
          <Pressable
            onPress={onCancel}
            style={({ pressed }) => ([
              styles.cancelButton,
              pressed && styles.pressed
            ])}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  form: {
    width: '100%',
    maxWidth: 500,
    margin: 30,
    paddingTop: 35,
    paddingBottom: 25,
    paddingHorizontal: 25,
    alignSelf: 'center',
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
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
    alignSelf: 'flex-end'
  },
  cancelButtonText: {
    color: colors.grayDark,
    fontWeight: 'bold'
  },
  pressed: {
    opacity: 0.2
  }
});
