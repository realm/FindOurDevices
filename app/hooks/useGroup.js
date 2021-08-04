import { useState, useEffect, useRef } from 'react';
import Realm, { BSON } from 'realm';

import { useAuth } from '../providers/AuthProvider';
import Group from '../models/Group';
import GroupMember from '../models/GroupMember';
import Location from '../models/Location';

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure

function useGroup(groupId) {
  const { realmUser } = useAuth();
  const [group, setGroup] = useState(null);
  const realmRef = useRef();

  useEffect(() => {
    if (!realmUser)
      return;

    openRealm();

    return closeRealm;
  }, [realmUser]);

  const openRealm = async () => {
    try {
      // Open a local realm file with the schemas that are part of this partition
      const config = {
        schema: [Group.schema, GroupMember.schema, Location.schema],
        sync: {
          user: realmUser,
          partitionValue: `group=${groupId}`,
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

      // TO DO: Change this to get object directly, instead of array (w/ objectForPrimaryKey)
      // At the moment, getting the object directly makes its listener not fire for some reason
      // NOTE: Object listener not firing when object is changed via a trigger function.
      // Temporary workaround: Use collection listener
      const groups = realm.objects('Group').filtered('_id = $0', BSON.ObjectId(groupId));
      if (groups)
        setGroup(realm.objectForPrimaryKey('Group', BSON.ObjectId(groupId)));

      groups.addListener((/*collection, changes*/) => {
        console.log('Handling changes for group..')

        setGroup(realm.objectForPrimaryKey('Group', BSON.ObjectId(groupId)));
      });
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    //realm?.objectForPrimaryKey('Group', BSON.ObjectId(groupId)).removeAllListeners(); // TODO: Add this if object listener issue is solved
    realm?.objects('Group').removeAllListeners();
    realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setGroup(null);
  };

  const addGroupMember = (groupId, newGroupMemberEmail) => realmUser.functions.addGroupMember(groupId, newGroupMemberEmail);

  const setGroupName = (name) => {
    // We can call our configured MongoDB Realm functions as methods on the User.functions
    // property (as seen below), or by passing the function name and its arguments to
    // User.callFunction('functionName', args). When the backend changes the group name on
    // the Group, it will also change it on the embedded GroupMembership of each of its Users.
    // Since the changes apply to synced realms, the notification handler that we passed to
    // the change listener will get called and we can subsequently update the UI state.
    // (Currently we only show changes once synced from the server, thus not offline)

    // TODO: Implement the backend function setGroupName
    return realmUser.functions.setGroupName(name);

    // NOTE: See if caller should try-catch the call instead
  };

  return { group, addGroupMember/*, setGroupName*/ };
}

export default useGroup;

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure.
