import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../providers/AuthProvider';
import { DevicesProvider } from '../providers/DevicesProvider';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

function RootNavigationContainer() {
  const { realmUser } = useAuth();

  return (
    <NavigationContainer>
      {realmUser
        ? <DevicesProvider>
            <AppNavigator />
          </DevicesProvider>
        : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default RootNavigationContainer;
