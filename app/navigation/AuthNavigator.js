import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import routes from './routes';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.WELCOME}
        component={/* WelcomeScreen */}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.LOGIN}
        component={/* LoginScreen */}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.SIGNUP}
        component={/* SignupScreen */}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
