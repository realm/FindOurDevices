import React from 'react';

import { useGroup } from '../providers/GroupProvider';
import Map from '../components/Map';

function GroupMapScreen({ navigation }) {
  const { group } = useGroup();

  // Filter out the members that have their location set, then
  // map each to an object that the Map component expects.
  const getMarkers = () => group
    ? group.members 
      .filter(member => member.location)
      .map(member => ({
        id: member.deviceId.toString(),
        label: member.displayName,
        updatedAt: member.location.updatedAt,
        longitude: member.location.longitude,
        latitude: member.location.latitude
      }))
    : [];

  return (
    <Map
      markers={getMarkers()}
      pluralItemType='members'
      onBackPress={() => navigation.goBack()}
    />
  );
}

export default GroupMapScreen;
