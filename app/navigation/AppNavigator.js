import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DevicesNavigator from './DevicesNavigator';
import GroupsNavigator from './GroupsNavigator';
import ProfileNavigator from './ProfileNavigator';
import routes from './routes';
import colors from '../styles/colors';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: colors.grayLight
      }}
    >
      <Tab.Screen
        name={routes.DEVICES}
        component={DevicesNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            /* icon component */
          )
        }}
      />
      <Tab.Screen
        name={routes.PROFILE}
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            /* icon component */
          )
        }}
      />
      <Tab.Screen
        name={routes.GROUPS}
        component={GroupsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            /* icon component */
          )
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
