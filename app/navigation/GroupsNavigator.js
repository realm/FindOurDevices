import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

const Stack = createStackNavigator();

function GroupsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.GROUPS}
        component={/* GroupsScreen */}
      />
      <Stack.Screen
        name={routes.GROUPS_MAP}
        component={/* GroupsMapScreen */}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default GroupsNavigator;
