import React, { memo } from 'react';
import { Marker, Callout, AnimatedRegion } from 'react-native-maps-osmdroid';
import { Text, StyleSheet } from 'react-native';
import Moment from 'react-moment';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.001;

function MapMarker({ location, color }) {
  return (
    <Marker.Animated
      coordinate={new AnimatedRegion({ // animation not working
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })}
      pinColor={color}
    >
      <Callout style={styles.callout}>
        <Text>
          {'Updated'} <Moment element={Text} fromNow>{location.updatedAt}</Moment>
        </Text>
      </Callout>
    </Marker.Animated>
  );
}

const styles = StyleSheet.create({
  callout: {
    padding: 10
  }
});

const shouldNotRerender = (prevProps, nextProps) => (
  prevProps.location.updatedAt === nextProps.location.updatedAt
  && prevProps.color === nextProps.color
);

export default memo(MapMarker, shouldNotRerender);
