import React, { useMemo } from 'react';

import { useGroup } from '../providers/GroupProvider';
import { Map } from '../components/Map';

export function GroupMapScreen({ navigation }) {
  const group = useGroup();

  // Filter out the devices that have their location set, then map each to an object
  // with fields that the Map component expects.
  // "useMemo" returns the value that its callback returns and memoizes the result.
  // This means that this component will not have to call "group.members.filter(..).map(..)"
  // on each rerender, only if the "group" changes (as seen by the 2nd arg to "useMemo")
  const markers = useMemo(() => group
    ? group.members 
      .filter(member => member.location)
      .map(member => ({
        id: member.deviceId.toString(),
        label: member.displayName,
        updatedAt: member.location.updatedAt,
        longitude: member.location.longitude,
        latitude: member.location.latitude
      }))
    : []
  , [group]);

  return (
    <Map
      markers={markers}
      pluralItemType='members'
      onBackPress={() => navigation.goBack()}
    />
  );
}
