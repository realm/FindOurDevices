import React from 'react';

import { useGroup } from '../providers/GroupProvider';
import Map from '../components/Map';

function GroupMapScreen({ navigation }) {
  const { group } = useGroup();

  const getMarkers = () => group ? group.members 
    .filter(member => member.location)
    .map(member => ({
      id: member.deviceId.toString(),
      label: member.displayName,
      updatedAt: member.location.updatedAt,
      longitude: member.location.longitude,
      latitude: member.location.latitude
    })
  ) : [];

  return (
    <Map
      markers={getMarkers()}
      pluralItemType='members'
      onBackPress={() => navigation.goBack()}
    />
  );
}

export default GroupMapScreen;
