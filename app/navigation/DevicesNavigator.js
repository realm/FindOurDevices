import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { DevicesScreen } from '../screens/DevicesScreen';
import { DevicesMapScreen } from '../screens/DevicesMapScreen';
import routes from './routes';
import colors from '../styles/colors';

const Stack = createStackNavigator();

export function DevicesNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
      <Stack.Screen
        name={routes.DEVICES}
        component={DevicesScreen}
        options={{
          headerTitle: 'My Devices'
          // 'options.headerRight' is set in the DevicesScreen with
          // 'navigation.setOptions' via our useToggle hook
        }}
      />
      <Stack.Screen
        name={routes.DEVICES_MAP}
        component={DevicesMapScreen}
        options={{ headerShown: false }}
      />
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
