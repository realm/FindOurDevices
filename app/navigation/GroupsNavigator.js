import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import GroupScreen from '../screens/GroupScreen';
import GroupsScreen from '../screens/GroupsScreen';
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
        // 'options.headerRight' is set in the GroupsScreen via 'navigation.setOptions'
      />
      <Stack.Screen
        name={routes.GROUP}
        component={GroupScreen}
        options={{
          headerTitle: 'Members',
          headerBackTitleVisible: false,
          headerBackImage: ({/* tintColor */}) => (
            <MaterialCommunityIcons
              name='chevron-left'
              color={colors.primary}
              size={30}
              style={{ marginLeft: 10 }}
            />
          )
          // 'options.headerRight' is set in the GroupScreen via 'navigation.setOptions'
        }}
      />
      <Stack.Screen
        name={routes.GROUP_MAP}
        component={TemporaryLogoutButton}
        //component={/* GroupMapScreen */}
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
