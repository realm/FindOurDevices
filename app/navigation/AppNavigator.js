import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from '../screens/LandingScreen';
import routes from './routes';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.LANDING}
        component={LandingScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;