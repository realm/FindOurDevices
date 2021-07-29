import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

const Stack = createStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PROFILE}
        component={/* ProfileScreen */}
      />
      <Stack.Screen
        name={routes.PROFILE_EDIT}
        component={/* ProfileEditScreen */}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
