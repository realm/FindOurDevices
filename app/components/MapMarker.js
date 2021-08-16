import React, { memo } from 'react';
import { Marker, Callout } from 'react-native-maps-osmdroid';
import { Text, StyleSheet, View } from 'react-native';
import Moment from 'react-moment';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.001;

export const MapMarker = memo(function MapMarker({ label, location, color }) {
  return (
    <Marker
      coordinate={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }}
      pinColor={color}
    >
      <Callout>
        <View style={styles.calloutView}>
          <Text style={styles.calloutText}>
            { label }
          </Text>
          <Text style={styles.calloutText}>
            {'Updated'} <Moment element={Text} fromNow>{location.updatedAt}</Moment>
          </Text>
        </View>
      </Callout>
    </Marker>
  );
}, shouldNotRerender);

const styles = StyleSheet.create({
  calloutView: {
    width: 200
  },
  calloutText: {
    textAlign: 'center'
  }
});

const shouldNotRerender = (prevProps, nextProps) => (
  prevProps.location.updatedAt === nextProps.location.updatedAt
  && prevProps.color === nextProps.color
);
