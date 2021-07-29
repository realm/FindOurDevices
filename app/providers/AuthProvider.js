import React, { useState, createContext, useContext } from 'react';
import Realm from 'realm';

import getRealmApp from '../getRealmApp';

const app = getRealmApp();

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [realmUser, setRealmUser] = useState(app.currentUser);

  const signUp = async (email, password) => {
    try {
      // For the purpose of this example app we have configured our app to automatically confirm
      // users, otherwise new users must always confirm their ownership of the email address
      // before logging in. (That can be done by configuring Realm to send a confirmation email)
      await app.emailPasswordAuth.registerUser(email, password);
    }
    catch (err) {
      console.warn('Could not sign up: ', err.message);
    }
  };

  const logIn = async (email, password) => {
    try {
      // Note: User email addresses are case-sensisitve
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);

      console.log('Logged in!');
      
      // Setting the realm user will rerender the RootNavigationContainer and in turn
      // conditionally render the AppNavigator to show the authenticated screens of the app
      setRealmUser(user);
    }
    catch (err) {
      console.error('Could not log in. ', err.message);
    }
  };

  const logOut = () => {
    if (realmUser) {
      realmUser.logOut();

      console.log('Logged out!');

      // Setting the realm user to null will rerender the RootNavigationContainer
      // and in turn conditionally render the AuthNavigator to show the LoginScreen
      setRealmUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      logIn,
      logOut,
      signUp,
      realmUser
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Components that call useAuth will be able to destructure the values
// provided in AuthContext.Provider
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
