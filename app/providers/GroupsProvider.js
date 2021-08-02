import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import Group from '../models/Group';
import GroupMember from '../models/GroupMember';
import Location from '../models/Location';
import { BSON } from 'realm';

import { useAuth } from "./AuthProvider";

const GroupsContext = React.createContext(null);

const GroupsProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const { realmUser } = useAuth();
  const realmRef = useRef(null);

  const partitions = ['group=6103cebb7330fb698653498b', 'group=6104218e6e79ca0660bec623'];

  useEffect(() => {
    if (!realmUser)
      return;

    openRealm();

    return closeRealm;
  }, [realmUser]);

  const openRealm = async () => {
    try {

      const config = {
        schema: [Group.schema, GroupMember.schema, Location.schema],
        sync: {
          user: realmUser,
          partitionValue: 'mock',
          // Add a callback on the 'error' property to log any sync errors while developing
          error: (session, syncError) => {
            console.error('syncError.name: ', syncError.name);
            if (syncError.message)
              console.error('syncError.message: ', message);
          }
        }
      };

      const groupRealms = [];
      const groupsObjects = [];

      partitions.forEach(async p => {

        config.sync.partitionValue = p;

        const realm = Realm.exists(config)
          ? new Realm(config)
          : await Realm.open(config);

        groupRealms.push(realm);

        const groupId = p.split('=')[1]; // Get Group Id from partition value
        const groupObject = realm.objectForPrimaryKey('Group', new BSON.ObjectId(groupId));

        if (groupObject)
          groupsObjects.push(groupObject);
      });

      realmRef.current = groupRealms;
      setGroups(groupsObjects);
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    realm.forEach(r => {
      r?.removeAllListeners();
      r?.close();
    });
    realmRef.current = null;
    setGroups([]);
  };

  // Render the children within the GroupContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useGroups hook.
  return (
    <GroupsContext.Provider
      value={{
        groups,
      }}
    >
      {children}
    </GroupsContext.Provider>
  );
};

const useGroups = () => useContext(GroupsContext);

export { GroupsProvider, useGroups };
