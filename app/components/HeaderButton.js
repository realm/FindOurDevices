import React from 'react';
import { TouchableOpacity, StyleSheet, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

export function HeaderButton({ iconName, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.button}
    >
      <MaterialCommunityIcons
        name={iconName}
        color={colors.primary}
        size={30}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      },
    })
  },
});
