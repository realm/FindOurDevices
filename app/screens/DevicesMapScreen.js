import React, { useMemo } from 'react';

import { useDevices } from '../providers/DevicesProvider';
import { Map } from '../components/Map';

export function DevicesMapScreen({ navigation }) {
  const { devices, currentIosOrAndroidId } = useDevices();

  const isCurrentDevice = (device) => device.iosOrAndroidId === currentIosOrAndroidId;

  // Filter out the devices that have their location set, then map each to an object
  // with fields that the Map component expects.
  // "useMemo" returns the value that its callback returns and memoizes the result.
  // This means that this component will not have to call "devices.filter(..).map(..)"
  // on each rerender, only if the "devices" changes (as seen by the 2nd arg to "useMemo")
  const markers = useMemo(() => devices
    .filter(device => device.location)
    .map(device => ({
      id: device._id.toString(),
      label: isCurrentDevice(device) ? `${device.name} (current)` : device.name,
      updatedAt: device.location.updatedAt,
      longitude: device.location.longitude,
      latitude: device.location.latitude
    })), [devices]);
  
  return (
    <Map
      markers={markers}
      pluralItemType='devices'
      onBackPress={() => navigation.goBack()}
    />
  );
}
