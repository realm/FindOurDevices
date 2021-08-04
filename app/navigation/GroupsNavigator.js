import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { GroupProvider } from '../providers/GroupProvider';
import GroupScreen from '../screens/GroupScreen';
import GroupsScreen from '../screens/GroupsScreen';
import GroupMapScreen from '../screens/GroupMapScreen';
import routes from './routes';
import colors from '../styles/colors';

const Stack = createStackNavigator();

function GroupsNavigator() {
  const [groupId, setGroupId] = useState(null);

  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
      <Stack.Screen
        name={routes.GROUPS}
        // 'options.headerRight' is set in the GroupsScreen with
        // 'navigation.setOptions' via our useModal hook
      >
        {props => <GroupsScreen {...props} setGroupId={setGroupId} />}
      </Stack.Screen>
      <Stack.Screen
        name="Group"
        options={{
          headerShown: false
        }}
      >
        {props =>
          <GroupProvider {...props} groupId={groupId}>
            <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
              <Stack.Screen
                name={routes.GROUP}
                component={GroupScreen}
                options={{
                  headerTitle: 'Members',
                  headerBackTitleVisible: false,
                  headerBackImage: ({/* tintColor */ }) => (
                    <MaterialCommunityIcons
                      name='chevron-left'
                      color={colors.primary}
                      size={30}
                      style={{ marginLeft: 10 }}
                    />
                  )
                  // 'options.headerRight' is set in the GroupScreen with
                  // 'navigation.setOptions' via our useModal hook
                }}
              />
              <Stack.Screen
                name={routes.GROUP_MAP}
                component={GroupMapScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </GroupProvider>
        }
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.1,
    shadowRadius: 3
  }
});

export default GroupsNavigator;
