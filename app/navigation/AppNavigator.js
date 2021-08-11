import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { DevicesNavigator } from './DevicesNavigator';
import { GroupsNavigator } from './GroupsNavigator';
import { InvitationsNavigator } from './InvitationsNavigator';
import { ProfileScreen } from '../screens/ProfileScreen';
import routes from './routes';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

export function AppNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.grayDark
      }}
    >
      <Tab.Screen
        name={routes.DEVICES}
        component={DevicesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='tablet-cellphone'
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name={routes.GROUPS}
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-group-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name={routes.INVITATIONS}
        component={InvitationsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='bell-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='account-outline'
              color={color}
              size={size}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
