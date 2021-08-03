import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Realm from "realm";
import Group from '../models/Group';
import GroupMember from '../models/GroupMember';
import Location from '../models/Location';
import { BSON } from 'realm';
import { useAuth } from '../providers/AuthProvider';

import ListItem from '../components/ListItem';
import ListItemAction from '../components/ListItemAction';
import ItemSeparator from '../components/ItemSeparator';

function GroupScreen({ route }) {

  const [groupId] = useState(route.params.groupId);
  const [group, setGroupData] = useState(null);
  const { realmUser } = useAuth();
  const realmRef = useRef(null);

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

      const group = realm.objectForPrimaryKey('Group', new BSON.ObjectId(groupId));

      if (group)
        setGroupData(group);

      console.log(group.members);

      group.addListener(() => {
        const groupObject = realm.objectForPrimaryKey('Group', new BSON.ObjectId(groupId));
        setGroupData(groupObject);
      });
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setGroupData(null);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.list}>
        <FlatList
          data={group?.members}
          keyExtractor={member => member.userId.toString()}
          renderItem={({ item }) => (
            <ListItem
              text={item.displayName}
              onPress={() => console.log(`Pressed group ${item.name}.`)}
              renderRightActions={() => (
                <ListItemAction
                  action='edit'
                  onPress={() => console.log(`Pressed btn to edit group ${item.name}.`)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  list: {
    flex: 1
  }
});

export default GroupScreen;
