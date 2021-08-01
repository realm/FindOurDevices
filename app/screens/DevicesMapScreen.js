import React from 'react';

import { useDevices } from '../providers/DevicesProvider';
import Map from '../components/Map';

function DevicesMapScreen({ navigation }) {
  const { devices, currentIosOrAndroidId } = useDevices();

  const isCurrentDevice = (device) => device.iosOrAndroidId === currentIosOrAndroidId;

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
