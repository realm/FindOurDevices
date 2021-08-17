import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Realm, { BSON } from 'realm';

import { getRealmApp } from '../getRealmApp';
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
  const subscriptionRef = useRef(null);

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
          // We can specify the behavior when opening a realm for the first time
          // ('newRealmFileBehavior') and for subsequent ones ('existingRealmFileBehavior').
          // If the user has logged in at least 1 time before, the realm will exist on disk
          // and can be opened even when offline.
          // We can either create the new file and sync in the background ('openImmediately'),
          // or wait for the file to be synced ('downloadBeforeOpen').
          // WARNING: Read-only realms on a "realm level" (specified via "config.readOnly: true")
          // must not be synced in the background. Otherwise it will cause an error if your session
          // is online. (This realm is read-only on a "file level" and is not affected by this.)
          newRealmFileBehavior: {
            type: 'openImmediately'    // default is 'downloadBeforeOpen'
          },
          existingRealmFileBehavior: {
            type: 'openImmediately'    // default is 'downloadBeforeOpen'
          },
          // Add a callback on the 'error' property to log any sync errors while developing
          error: (session, syncError) => {
            console.error('Sync error name: ', syncError.name);
            if (syncError.message)
              console.error('Sync error message: ', message);
          }
        }
      };

      const realm = await Realm.open(config);
      realmRef.current = realm;
      

      // When querying a realm to find objects (e.g. realm.objects('User')) the result we get back
      // and the objects in it are "live" and will always reflect the latest state.
      const userId = BSON.ObjectId(realmUser.id);
      //const user = realm.objectForPrimaryKey('User', userId); // NOTE: Object listener not working for embedded docs when changed by backend function
      const users = realm.objects('User').filtered('_id = $0', userId);
      if (users?.length)
        setUserData(users[0]);
      
      // Live queries and objects emit notifications when something has changed that we can listen for.
      subscriptionRef.current = users;
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
    const subscription = subscriptionRef.current;
    subscription?.removeAllListeners();
    subscriptionRef.current = null;
    
    const realm = realmRef.current;
    realm?.close();
    realmRef.current = null;
    setUserData(null);
  };
  
  const signUp = async (email, password) => {
    // For the purpose of this example app we have configured our app to automatically confirm
    // users, otherwise new users must always confirm their ownership of the email address
    // before logging in. (That can be done by configuring Realm to send a confirmation email)
    try {
      await app.emailPasswordAuth.registerUser(email, password);
      return { success: true };
    }
    catch (err) {
      return { error: { message: err.message } };
    }
  };

  const logIn = async (email, password) => {
    try {
      // Note: User email addresses are case-sensisitve
      const credentials = Realm.Credentials.emailPassword(email, password);
      const user = await app.logIn(credentials);
      
      // Setting the realm user will rerender the RootNavigationContainer and in turn
      // conditionally render the AppNavigator to show the authenticated screens of the app
      setRealmUser(user);
      
      console.log('Logged in!');
      return { success: true };
    }
    catch (err) {
      return { error: { message: err.message } };
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
