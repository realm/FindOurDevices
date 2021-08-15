import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Realm from 'realm';

import { useAuth } from './AuthProvider';
import Group from '../models/Group';
import GroupMember from '../models/GroupMember';
import Location from '../models/Location';

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure

const GroupContext = createContext();

function GroupProvider({ children, groupId }) {
  const { realmUser } = useAuth();
  const [group, setGroup] = useState(null);
  const realmRef = useRef();
  const subscriptionRef = useRef(null);

  useEffect(() => {
    if (!realmUser || !groupId)
      return;
    
    openRealm();

    return closeRealm;
  }, [realmUser, groupId]);

  const openRealm = async () => {
    try {
      // Open a local realm file with the schemas that are part of this partition
      const config = {
        schema: [Group.schema, GroupMember.schema, Location.schema],
        sync: {
          user: realmUser,
          partitionValue: `group=${groupId.toString()}`,
          // Add a callback on the 'error' property to log any sync errors while developing
          error: (session, syncError) => {
            console.error('syncError.name: ', syncError.name);
            if (syncError.message)
              console.error('syncError.message: ', message);
          }
        }
      };

      const realm = Realm.exists(config)
        ? new Realm(config)
        : await Realm.open(config);

      realmRef.current = realm;

      // NOTE: Object listener not firing when object is changed via a trigger function.
      // Temporary workaround: Use collection listener
      // TODO: Change this to get object directly, instead of array (w/ objectForPrimaryKey)
      const groups = realm.objects('Group').filtered('_id = $0', groupId);
      if (groups?.length)
        setGroup(groups[0]);
      
      subscriptionRef.current = groups;
      groups.addListener((/*collection, changes*/) => {
        setGroup(realm.objectForPrimaryKey('Group', groupId));
      });
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const subscription = subscriptionRef.current;
    subscription?.removeAllListeners();
    subscriptionRef.current = null;
    
    const realm = realmRef.current;
    realm?.close();
    realmRef.current = null;
    setGroup(null);
  };

  return (
    <GroupContext.Provider value={group}>
      {children}
    </GroupContext.Provider>
  )
}

// Components that call useGroup will be able to destructure the values
// provided in GroupContext.Provider
const useGroup = () => useContext(GroupContext);

export { GroupProvider, useGroup };

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure.
