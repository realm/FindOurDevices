import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import MapView from 'react-native-maps-osmdroid';

import { Icon } from './Icon';
import { MapMarker } from './MapMarker';
import { DropdownPicker } from './DropdownPicker';
import { colors } from '../styles/colors';

// If you are developing for Android and want to use Google Maps for the map functionality,
// you need to get an API key and set up a billing account with Google. To circumvent this,
// we have chosen to use the library 'react-native-maps-osmdroid' which is a wrapper around
// 'react-native-maps' that let's us use OpenStreetMaps instead of Google Maps. (The library
// API is mostly the same, thus the usage shown here is the same for 'react-native-maps'.)

// The first picker value will start at index "0" and will show all markers
const PICKER_VALUE_ALL_MARKERS = 0;

/**
 * @typedef {Object} Marker
 * @property {string} id - A unique ID of the marker.
 * @property {string} label - The label to use for the marker.
 * @property {Date} updatedAt - The date when the location of the marker was last updated.
 * @property {number} longitude - The location longitude.
 * @property {number} latitude - The location latitude.
 */

/**
 * Create a map component.
 * @param {Object} props
 * @param {Marker[]} props.markers - An array of marker objects
 * @param {string} props.pluralItemType - The type of items which the markers correspond to (ex. 'Devices', 'Members').
 * @param {function} props.onBackPress - Callback function to be called when the back button is pressed.
 * @return {React.Component} A map component.
 */
export function Map({ markers, pluralItemType, onBackPress }) {
  const [selectedPickerItem, setSelectedPickerItem] = useState(null);
  const [pickerItems, setPickerItems] = useState([]);
  const mapViewRef = useRef(null);

  useEffect(() => {
    createPickerItems();
  }, [markers.length]);

  useEffect(() => {
    updateFocusedRegion();
  }, [selectedPickerItem, markers]);

  const createPickerItems = () => {
    if (!markers.length)
      return resetPickerItems();

    setPickerItems([
      { label: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS },
      ...markers.map((marker, idx) => ({ label: marker.label, value: idx + 1 }))
    ]);
    setSelectedPickerItem({ label: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS });
  };

  const resetPickerItems = () => {
    setPickerItems([]);
    setSelectedPickerItem(null);
  };

  const getSelectedMarker = () => {
    // Handle the event where the default picker item is selected (index 0) or
    // the selected marker is invalid. The picker values for the markers start at
    // index 0, thus if the value is equal to "markers.length" it is still considered valid.
    const isValid = selectedPickerItem?.value >= 1 && selectedPickerItem?.value <= markers.length;
    if (!markers.length || !isValid)
      return null;

    return markers[selectedPickerItem.value - 1];
  };

  const updateFocusedRegion = () => {
    if (!selectedPickerItem || !mapViewRef.current)
      return;

    if (selectedPickerItem.value === PICKER_VALUE_ALL_MARKERS) {
      mapViewRef.current.fitToCoordinates(markers, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true
      });
    }
    else {
      const selectedMarker = getSelectedMarker();
      if (!selectedMarker)
        return;

      const ANIMATION_DURATION_MS = 1000;
      const newRegion = {
        latitude: selectedMarker.latitude,
        longitude: selectedMarker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.001
      };
      mapViewRef.current.animateToRegion(newRegion, ANIMATION_DURATION_MS);
    }
  };

  const markerColors = [
    '#8922ec', '#ffbf00', '#e328f5', '#00bf00', '#e328f5', '#1177ee',
    '#007fff', '#00ffff', '#3d2b1f', '#b5a642', '#a3e36c', '#161a58',
  ];

  return (
    <View style={styles.screen}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
      >
        {markers.map((marker, idx) => (
          <MapMarker
            key={marker.id}
            label={marker.label}
            location={marker}
            color={markerColors[idx % markerColors.length]}
          />
        ))}
      </MapView>
      {markers.length > 0 && (
        <View style={styles.dropdownContainer}>
          <DropdownPicker
            selectedItem={selectedPickerItem}
            items={pickerItems}
            onSelectItem={setSelectedPickerItem}
            openItemsDownward={false}
            noSelectedItemText='Select marker'
          />
        </View>
      )}
      <Pressable
        onPress={onBackPress}
        style={({ pressed }) => ([
          styles.backButton,
          styles.shadow,
          pressed && styles.pressed
        ])}
      >
        <Icon
          name='arrow-left'
          color={colors.white}
          size={30}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  },
  backButton: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 60,
    left: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 30
  },
  pressed: {
    opacity: 0.2
  },
  dropdownContainer: {
    width: '100%',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 30
  }
});
