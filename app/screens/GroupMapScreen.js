import React, { useMemo } from 'react';

import { useGroup } from '../providers/GroupProvider';
import { Map } from '../components/Map';

export function GroupMapScreen({ navigation }) {
  const { group } = useGroup();

  // Filter out the members that have their location set, then
  // map each to an object that the Map component expects.
  // useMemo makes it so markers is not recreated with every render, but only when changes to "group" happen
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
