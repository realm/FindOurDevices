import React, { useRef, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps-osmdroid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MapMarker } from './MapMarker';
import { DropdownPicker } from './DropdownPicker';
import colors from '../styles/colors';

// If you are developing for Android and want to use Google Maps for the map functionality,
// you need to get an API key and set up a billing account with Google. To circumvent this,
// we have chosen to use the library 'react-native-maps-osmdroid' which is a wrapper around
// 'react-native-maps' that let's us use OpenStreetMaps instead of Google Maps. (The library
// API is mostly the same, thus the usage shown here is the same for 'react-native-maps'.)

const PICKER_VALUE_ALL_MARKERS = 0; // Represents and all markers view, all other markers start at index 1

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
    if (!markers.length) {
      setPickerItems([]);
      setSelectedPickerItem(null);
      return;
    }

    setPickerItems([
      { label: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS },
      ...markers.map((marker, idx) => ({ label: marker.label, value: idx + 1 }))
    ]);
    setSelectedPickerItem({ label: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS });
  };

  const getSelectedMarker = () => {
    // No markers exist or selected marker is invalid
    if (markers.length === 0 || selectedPickerItem === null || selectedPickerItem.value > markers.length)
      return null;

    // The picker values are 1-based numbers based of the 'markers' indexes
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

      if (selectedMarker === null)
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
    '#8922ec', '#161a58', '#e328f5', '#f3ac56', '#1177ee', '#00bf00',
    '#a3e36c', '#ffbf00', '#00ffff', '#007fff', '#3d2b1f', '#b5a642'
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
            location={marker}
            color={markerColors[idx % markerColors.length]}
          />
        ))}
      </MapView>
      {
        markers.length > 0 &&
        <View style={styles.dropdownContainer}>
          <DropdownPicker
            selectedItem={selectedPickerItem}
            items={pickerItems}
            onSelectItem={setSelectedPickerItem}
            openItemsDownward={false}
          />
        </View>
      }
      <TouchableOpacity
        style={[styles.backButton, styles.shadow]}
        onPress={onBackPress}
      >
        <MaterialCommunityIcons
          name='arrow-left'
          color={colors.white}
          size={30}
        />
      </TouchableOpacity>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
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
  dropdownContainer: {
    width: Dimensions.get('window').width - 60,
    position: 'absolute',
    bottom: 30
  }
});
