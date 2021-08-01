import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { GroupsProvider } from '../providers/GroupsProvider';
import GroupsScreen from '../screens/GroupsScreen';
import HeaderButton from '../components/HeaderButton';
import routes from './routes';
import colors from '../styles/colors';

// TEMPORARY
import TemporaryLogoutButton from '../components/TemporaryLogoutButton';

const Stack = createStackNavigator();

function GroupsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
      <Stack.Screen
        name={routes.GROUPS}
        component={GroupsScreen}
        options={{
          // change later to add onPress to create a group
          headerRight: () => (
            <HeaderButton
              iconName='plus-circle'
              onPress={() => console.log('Pressed btn to create a group.')}
            />
          )
        }}
      />
      <Stack.Screen
        name={routes.GROUPS_MAP}
        component={TemporaryLogoutButton}
        //component={/* GroupsMapScreen */}
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

export default GroupsNavigator;
