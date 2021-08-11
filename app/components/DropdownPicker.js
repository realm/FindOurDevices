import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Platform } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useToggle } from '../hooks/useToggle';
import { DropdownPickerItem } from './DropdownPickerItem';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export function DropdownPicker({ selectedItem, items, onSelectItem, openItemsDownward = true }) {
  const { isOn: isOpen, toggle: toggleOpen, turnOff: close } = useToggle(false);

  return (
    <View style={[styles.dropdown, openItemsDownward && styles.reverseOrder]}>
      {isOpen && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <DropdownPickerItem
              label={item.label}
              isSelected={item.value === selectedItem?.value}
              onPress={() => {
                close();
                onSelectItem(item);
              }}
            />
          )}
          style={[styles.itemsList, openItemsDownward ? styles.itemsListDownward : styles.itemsListUpward]}
        />
      )}
      <Pressable
        onPress={toggleOpen}
        style={[
          styles.item,
          styles.selectedItem,
          isOpen && (openItemsDownward ? styles.selectedItemOnOpenDownward : styles.selectedItemOnOpenUpward)
        ]}
      >
        <Text style={styles.label}>
          {selectedItem?.label || 'Select'}
        </Text>
        <MaterialCommunityIcons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          color={colors.grayDark}
          size={18}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    alignSelf: 'stretch',
    maxHeight: 500,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 3
      },
    })
  },
  itemsList: {
    borderWidth: 1,
    borderColor: colors.grayLight,
    backgroundColor: colors.grayLight
  },
  itemsListDownward: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopColor: colors.grayMedium,
  },
  itemsListUpward: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomColor: colors.grayMedium,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedItem: {
    borderRadius: 20,
    backgroundColor: colors.white
  },
  selectedItemOnOpenUpward: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  selectedItemOnOpenDownward: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  label: {
    color: colors.black,
    fontSize: fonts.sizeS
  },
  reverseOrder: {
    flexDirection: 'column-reverse'
  }
});
