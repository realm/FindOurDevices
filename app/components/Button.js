import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

function Button({
  text,
  isPrimary = true,
  useShadow = true,
  onPress,
  otherStyles
}) {
  return (
    <TouchableOpacity
      style={[
        styles({ isPrimary }).button,
        useShadow && styles({}).shadow,
        otherStyles
      ]}
      onPress={onPress}
    >
      <Text style={styles({ isPrimary }).buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = ({ isPrimary }) => StyleSheet.create({
  button: {
    alignSelf: 'stretch',
    marginTop: 20,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: isPrimary ? colors.primary : colors.white,
    borderRadius: 40
  },
  buttonText: {
    fontSize: fonts.sizeM,
    color: isPrimary ? colors.white : colors.primary,
    fontWeight: 'bold'
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 2
      },
    })
  }
});

export default Button;
