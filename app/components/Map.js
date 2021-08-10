import React, { useRef, useEffect, useState } from 'react';
import MapView from 'react-native-maps-osmdroid';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { MapMarker } from './MapMarker';
import { Dropdown } from './Dropdown';
import colors from '../styles/colors';

// If you are developing for Android and want to use Google Maps for the map functionality,
// you need to get an API key and set up a billing account with Google. To circumvent this,
// we have chosen to use the library 'react-native-maps-osmdroid' which is a wrapper around
// 'react-native-maps' that let's us use OpenStreetMaps instead of Google Maps. (The library
// API is mostly the same, thus the usage shown here is the same for 'react-native-maps'.)

const PICKER_VALUE_ALL_MARKERS = 0;

export function Map({ markers, pluralItemType, onBackPress }) {
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState({ name: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS });
  const [pickerItems, setPickerItems] = useState([]);
  const mapViewRef = useRef(null);

  useEffect(() => {
    createPickerItems();
  }, [markers.length]);

  useEffect(() => {
    updateFocusedRegion();
  }, [pickerValue, markers]);

  const createPickerItems = () => {
    if (!markers.length)
      return;

    setPickerItems([
      { name: `All ${pluralItemType}`, value: PICKER_VALUE_ALL_MARKERS },
      ...markers.map((marker, idx) => ({ name: marker.label, value: idx + 1 }))
    ]);
  };

  const getSelectedMarker = () => {
    // The picker values are 1-based numbers based of the 'markers' indexes
    return markers[pickerValue.value - 1];
  };

  const updateFocusedRegion = () => {
    if (!pickerValue || !mapViewRef.current)
      return;

    if (pickerValue.value === PICKER_VALUE_ALL_MARKERS) {
      mapViewRef.current.fitToCoordinates(markers, {
        edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
        animated: true
      });
    }
    else {
      const ANIMATION_DURATION_MS = 1000;
      const newRegion = {
        latitude: getSelectedMarker().latitude,
        longitude: getSelectedMarker().longitude,
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
      <View style={[styles.overlay, styles.shadow]}>
        {/* <DropDownPicker
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropDownContainer}
          open={pickerIsOpen}
          value={pickerValue}
          items={pickerItems}
          setOpen={setPickerIsOpen}
          setValue={setPickerValue}
          setItems={setPickerItems}
          labelProps={{ numberOfLines: 1 }}
          dropDownDirection='TOP'
        /> */}
        <Dropdown
          open={pickerIsOpen}
          value={pickerValue}
          items={pickerItems}
          setOpen={setPickerIsOpen}
          setValue={setPickerValue}
          top={true}
        />
      </View>
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
  overlay: {
    width: Dimensions.get('window').width - 60,
    position: 'absolute',
    bottom: 30,
    borderRadius: 20
  },
  dropdown: {
    paddingHorizontal: 20,
    borderColor: colors.white,
    borderRadius: 20
  },
  dropDownContainer: {
    paddingHorizontal: 10,
    borderRadius: 20,
    borderColor: colors.grayLight,
    borderBottomColor: colors.grayMedium,
    backgroundColor: colors.grayLight
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
});
