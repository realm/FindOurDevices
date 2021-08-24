import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Platform } from 'react-native';

import { useToggle } from '../hooks/useToggle';
import { Icon } from './Icon';
import { DropdownPickerItem } from './DropdownPickerItem';
import { fonts } from '../styles/fonts';
import { colors } from '../styles/colors';

/**
 * Create a dropdown picker component.
 * @param {Object} [selectedItem] - The selected item of the dropdown list.
 * @param {string} selectedItem.label - The selected item label.
 * @param {string} selectedItem.value - The selected item value (some time of unique identifier).
 * @param {Object[]} items - An array of items for the dropdown.
 * @param {string} items[].label - The dropdown item label.
 * @param {string} items[].value - The dropdown item value.
 * @param {function} onSelectItem - Callback function to be called when a dropdown item is pressed.
 * @param {string} noSelectedItemText - Text to display on the dropdown when no drodpown item is selected.
 * @return {React.Component} A dropdown picker component.
 */
export function DropdownPicker({
  selectedItem,
  items,
  onSelectItem,
  openItemsDownward = true,
  noSelectedItemText = 'Select'
}) {
  const [isOpen, toggleOpen] = useToggle(false);

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
                if (isOpen)
                  toggleOpen();

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
        <Text
          style={styles.label}
          numberOfLines={1}
        >
          {selectedItem?.label || noSelectedItemText}
        </Text>
        <Icon
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
    fontSize: fonts.sizeS,
    maxWidth: '90%'
  },
  reverseOrder: {
    flexDirection: 'column-reverse'
  }
});
