import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

export function ListItemAction({ action, onPress }) {
  const getIconNameAndColor = () => {
    switch (action) {
      case 'remove':
        return { name: 'trash-can-outline', color: colors.red }
      case 'edit':
        return { name: 'lead-pencil', color: colors.green }
      case 'leave':
        return { name: 'logout', color: colors.blue }
      case 'remove-member':
        return { name: 'account-remove', color: colors.red }
      case 'accept':
        return { name: 'check', color: colors.green }
      case 'decline':
        return { name: 'close', color: colors.red }
      default:
        throw new Error('Unsupported list item action type: ', action);
    }
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed ? { opacity: 0.2 } : {}}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons
          {...getIconNameAndColor()}
          size={25}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grayMedium,
    borderWidth: 1,
    borderRadius: 23
  },
});
