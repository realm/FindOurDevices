import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../styles/colors';

function ListItemAction({ action, onPress }) {
  const getIconNameAndColor = () => {
    switch (action) {
      case 'delete':
        return { name: 'trash-can', color: colors.red }
      case 'edit':
        return { name: 'lead-pencil', color: colors.blue }
      case 'leave-group':
        return { name: 'logout', color: colors.red }
      case 'remove-member':
        return { name: 'account-remove', color: colors.red }
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
          size={30}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ListItemAction;
