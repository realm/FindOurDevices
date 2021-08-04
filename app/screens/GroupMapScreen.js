import React from 'react';

import useGroup from '../hooks/useGroup';

import Map from '../components/Map';

function GroupMapScreen({ navigation, route }) {
  
  const { group } = useGroup(route.params.groupId);

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
