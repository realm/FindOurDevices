import 'react-native-gesture-handler'; // import this at the top if using gesture handlers
import React from 'react';

import { AuthProvider } from './app/providers/AuthProvider';
import RootNavigationContainer from './app/navigation/RootNavigationContainer';

console.log('===========');
console.log('App Running');

function App() {
  return (
    <AuthProvider>
      <RootNavigationContainer />
    </AuthProvider>
  );
}

export default App;
