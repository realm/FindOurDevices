import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Realm, { BSON } from 'realm';

import getRealmApp from '../getRealmApp';
import User from '../models/User';
import GroupMembership from '../models/GroupMembership';
import GroupInvitation from '../models/GroupInvitation';

const app = getRealmApp();

const AuthContext = createContext();

function AuthProvider({ children }) {
  // The realmUser is the registered user created by Realm
  const [realmUser, setRealmUser] = useState(app.currentUser);
  // The userData is the user object from our schema/model that we will set when opening the user realm
  const [userData, setUserData] = useState(null);
  // We store a reference to our realm using useRef that allows us to access it via
  // realmRef.current for the component's lifetime without causing rerenders if updated.
  const realmRef = useRef(null);

  useEffect(() => {
    // The user will be set once it logs in
    if (!realmUser)
      return;

    openRealm();

    // Return a cleanup callback to close the realm to prevent memory leaks
    return closeRealm;
  }, [realmUser]);

  const openRealm = async () => {
    try {
      // Open a local realm file with the schemas that are part of this partition
      const config = {
        schema: [User.schema, GroupMembership.schema, GroupInvitation.schema],
        sync: {
          user: realmUser,
          partitionValue: `user=${realmUser.id}`,
          // Add a callback on the 'error' property to log any sync errors while developing
          error: (session, syncError) => {
            console.error('syncError.name: ', syncError.name);
            if (syncError.message)
              console.error('syncError.message: ', message);
          }
        }
      };

      // If the realm already exists on disk, it means the user has logged in
      // at least 1 time before. Thus, you may then open the realm synchronously
      // to make sure it works even when offline. If it does not exist,
      // open it asynchronusly to sync data from the server to the device
      const realm = Realm.exists(config)
        ? new Realm(config)
        : await Realm.open(config);

      realmRef.current = realm;

      // When querying a realm to find objects (e.g. realm.objects('User')) the result we get back
      // and the objects in it are "live" and will always reflect the latest state.
      const userId = BSON.ObjectId(realmUser.id);
      //const user = realm.objectForPrimaryKey('User', userId); // NOTE: Object listener not working for embedded docs when changed by backend function
      const users = realm.objects('User').filtered('_id = $0', userId);
      if (users?.length)
        setUserData(users[0]);

      // Live queries and objects emit notifications when something has changed that we can listen for.
      users.addListener((/*object, changes*/) => {
        // [add comment]

        // By querying the object again, we get a new reference to the Result and triggers
        // a rerender by React. Setting the user to either 'user' or 'object' (from the
        // argument) will not trigger a rerender since it is the same reference
        setUserData(realm.objectForPrimaryKey('User', userId));  // note to self: since we actually do not have to refetch data, maybe its better if we update some integer in state to trigger the rerender?
      });
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    //realm?.objectForPrimaryKey('User', BSON.ObjectId(realmUser.id)).removeAllListeners(); // TODO: Add this if object listener issue is solved
    realm?.objects('User').removeAllListeners();
    realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setUserData(null);
  };

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

  const setDisplayName = (name) => {
    // We can call our configured MongoDB Realm functions as methods on the User.functions
    // property (as seen below), or by passing the function name and its arguments to
    // User.callFunction('functionName', args). When the backend changes the display name,
    // the change listener will call our notification handler where we update the UI state.
    // (Currently we only show changes once synced from the server, thus not offline)
    return realmUser.functions.setDisplayName(name);
  };

  return (
    <AuthContext.Provider value={{
      realmUser,
      userData,
      logIn,
      logOut,
      signUp,
      setDisplayName
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Components that call useAuth will be able to destructure the values
// provided in AuthContext.Provider
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
