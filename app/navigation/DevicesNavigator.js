import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { useDevices } from '../providers/DevicesProvider';
import HeaderButton from '../components/HeaderButton';
import DevicesScreen from '../screens/DevicesScreen';
import DevicesMapScreen from '../screens/DevicesMapScreen';
import routes from './routes';
import colors from '../styles/colors';

const Stack = createStackNavigator();

function DevicesNavigator() {
  const { addCurrentDevice } = useDevices();

  return (
    <Stack.Navigator screenOptions={{ headerStyle: styles.shadow }}>
      <Stack.Screen
        name={routes.DEVICES}
        component={DevicesScreen}
        options={{
          headerTitle: 'My Devices',
          headerRight: () => (
            <HeaderButton
              iconName='plus-circle'
              onPress={addCurrentDevice}  // modify to show a pop-up to select "yes" or "cancel"
            />
          )
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

export default DevicesNavigator;
