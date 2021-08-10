import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';

import fonts from '../styles/fonts';

export function Dropdown({
  open,
  value,
  items,
  setOpen,
  setValue,
  top
}) {

  const selectValue = (item) => {
    setValue(item);
    setOpen(false);
  }

  const renderItem = ({ item }) => (
    <Pressable style={styles.item} onPress={() => { selectValue(item) }}>
      <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
          <Text style={styles.text} > {item.name} </Text>
          { item.value == value?.value && <Text> ✓ </Text> }
        </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {top && open &&
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          style={styles.flatlist}
        />
      }
      <Pressable style={[styles.button, !open && { borderRadius: 10 } ]} onPress={() => setOpen(!open)}>
        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
          <Text style={styles.text}> {value?.name || 'Select a device'} </Text>
          <Text style={styles.text}> {open ? '∧' : 'v' } </Text>
        </View>
      </Pressable>
      {!top && open &&
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(_, index) => index}
          style={styles.flatlist}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    maxHeight: 500,
    marginVertical: 10,
  },
  button: {
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#f6f6f6',
    padding: 10
  },
  item: {
    padding: 10
  },
  text : {
    color: '#6e6969',
    fontSize: fonts.sizeM
  },
  flatlist : {
    borderColor: '#e1e1e1',
    backgroundColor: '#f6f6f6',
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  }
});
