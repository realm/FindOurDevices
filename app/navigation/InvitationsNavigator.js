import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { InvitationsScreen } from '../screens/InvitationsScreen';
import routes from './routes';
import colors from '../styles/colors';

const Stack = createStackNavigator();

export function InvitationsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
      <Stack.Screen
        name={routes.INVITATIONS}
        component={InvitationsScreen}
        options={{ headerTitle: 'Group Invitations' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 2
      },
    })
  }
});
