import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import routes from './routes';
import colors from '../styles/colors';

import { GroupsProvider } from '../providers/GroupsProvider';
import GroupsScreen from '../screens/GroupsScreen';

// TEMPORARY
import TemporaryLogoutButton from '../components/TemporaryLogoutButton';

const Stack = createStackNavigator();

function GroupsNavigator() {
  return (
    <GroupsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name={routes.GROUPS}
          component={GroupsScreen}
          options={{
            // change later to return a custom component with onPress property to create a group
            headerRight: () => (
              <MaterialCommunityIcons
                name='plus-circle'
                color={colors.primary}
                size={30}
              />
            )
          }}
        />
        <Stack.Screen
          name={routes.GROUPS_MAP}
          component={TemporaryLogoutButton}
          //component={/* GroupsMapScreen */}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </GroupsProvider>
  );
}

export default GroupsNavigator;
