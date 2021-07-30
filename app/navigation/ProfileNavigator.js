import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

// TEMPORARY
import TemporaryLogoutButton from '../components/TemporaryLogoutButton';

const Stack = createStackNavigator();

function ProfileNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PROFILE}
        component={TemporaryLogoutButton}
        //component={/* ProfileScreen */}
      />
      <Stack.Screen
        name={routes.PROFILE_EDIT}
        component={TemporaryLogoutButton}
        //component={/* ProfileEditScreen */}
      />
    </Stack.Navigator>
  );
}

export default ProfileNavigator;
