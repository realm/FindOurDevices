import React from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

/**
 * Create a form text input container component.
 * @param {Object} props - Props to pass to <TextInput> component.
 */
export function FormTextInput(props) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.inputText}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignSelf: 'stretch',
    paddingVertical: Platform.OS === 'ios' ? 15 : 0,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: colors.grayLight,
    borderRadius: 15,
    borderColor: colors.grayMedium,
    borderWidth: 1
  },
  inputText: {
    fontSize: fonts.sizeM
  }
});
