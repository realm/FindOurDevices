import React, { useMemo } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import { Icon } from './Icon';
import colors from '../styles/colors';

export function ListItemAction({ action, onPress }) {
  const iconNameAndColor = useMemo(() => {
    switch (action) {
      case 'remove':
        return { name: 'trash-can-outline', color: colors.red }
      case 'edit':
        return { name: 'lead-pencil', color: colors.primary }
      case 'leave':
        return { name: 'logout', color: colors.orange }
      case 'remove-member':
        return { name: 'account-remove', color: colors.red }
      case 'accept':
        return { name: 'check', color: colors.primary }
      case 'decline':
        return { name: 'close', color: colors.red }
      default:
        throw new Error('Unsupported list item action type: ', action);
    }
  }, [action]);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed ? { opacity: 0.2 } : {}}
    >
      <View style={styles.container}>
        <Icon
          {...iconNameAndColor}
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
