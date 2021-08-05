import React from 'react';

import { useDevices } from '../providers/DevicesProvider';
import Map from '../components/Map';

function DevicesMapScreen({ navigation }) {
  const { devices, currentIosOrAndroidId } = useDevices();

  const isCurrentDevice = (device) => device.iosOrAndroidId === currentIosOrAndroidId;

  // Filter out the devices that have their location set, then
  // map each to an object that the Map component expects.
  const getMarkers = () => devices
    .filter(device => device.location)
    .map(device => ({
      id: device._id.toString(),
      label: isCurrentDevice(device) ? `${device.name} (current)` : device.name,
      updatedAt: device.location.updatedAt,
      longitude: device.location.longitude,
      latitude: device.location.latitude
    })
  );
  
  return (
    <Map
      markers={getMarkers()}
      pluralItemType='devices'
      onBackPress={() => navigation.goBack()}
    />
  );
}

export default DevicesMapScreen;
