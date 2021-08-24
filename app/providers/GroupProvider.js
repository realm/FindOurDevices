import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Realm from 'realm';

import { useAuth } from './AuthProvider';
import { Group } from '../models/Group';
import { GroupMember } from '../models/GroupMember';
import { Location } from '../models/Location';

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure

const GroupContext = createContext();

/**
 * A provider for storing and controlling the Group realm/partition.
 * @param {Realm.BSON.ObjectId} groupId - The ID of the group.
 * @return {React.Component} The provider of the context.
*/
function GroupProvider({ groupId, children }) {
  const { realmUser } = useAuth();
  const [group, setGroup] = useState(null);
  const [groupWasDeleted, setGroupWasDeleted] = useState(false);
  const [userWasRemovedFromGroup, setUserWasRemovedFromGroup] = useState(false);
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
          newRealmFileBehavior: {
            type: 'openImmediately'
          },
          existingRealmFileBehavior: {
            type: 'openImmediately'
          },
          // WARNING: REMEMBER TO REMOVE THE CONSOLE.LOG FOR PRODUCTION AS FREQUENT CONSOLE.LOGS
          // GREATLY DECREASES PERFORMANCE AND BLOCKS THE UI THREAD. IF THE USER IS OFFLINE,
          // SYNCING WILL NOT BE POSSIBLE AND THIS CALLBACK WILL BE CALLED FREQUENTLY.
          
          // error: (session, syncError) => {
          //   console.error(`There was an error syncing the Group realm. (${syncError.message ? syncError.message : 'No message'})`);
          // }
        }
      };

      const realm = await Realm.open(config);
      realmRef.current = realm;

      const groups = realm.objects('Group').filtered('_id = $0', groupId);
      if (groups?.length)
        setGroup(groups[0]);
      
      subscriptionRef.current = groups;
      groups.addListener((collection, changes) => {
        setGroup(realm.objectForPrimaryKey('Group', groupId));

        // We only check if there are deletions using ".length" rather then looping through
        // the deletions since the "groups" collection will always be 1 single group
        if (changes.deletions.length)
          return setGroupWasDeleted(true);

        changes.modifications.forEach((index) => {
          const modifiedGroup = collection[index];
          const isMember = modifiedGroup.members.some(member => member.userId.toString() === realmUser.id);
          if (!isMember)
            return setUserWasRemovedFromGroup(true);
        });
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
    <GroupContext.Provider value={{
      group,
      groupWasDeleted,
      userWasRemovedFromGroup
    }}>
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
