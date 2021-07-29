import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

const Stack = createStackNavigator();

function DevicesNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.DEVICES}
        component={/* DevicesScreen */}
      />
      <Stack.Screen
        name={routes.DEVICES_MAP}
        component={/* DevicesMapScreen */}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default DevicesNavigator;
