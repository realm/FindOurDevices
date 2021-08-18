import { useNetInfo } from '@react-native-community/netinfo';

/**
 * A hook for communicating with the MongoDB Realm backend API.
 * @param {Object} realmUser - The logged in Realm user. 
 * @return {function} A function for calling a MongoDB Realm function.
 */
export function useRealmApi(realmUser) {
  const netInfo = useNetInfo();

  /**
   * Call the MongoDB Realm backend API.
   * @param {string} functionName - The name of the MongoDB Realm function to call.
   * @param {[]} functionArgs - The arguments to pass to the MongoDB Realm function.
   * @return {Object} The response of the API call. (The backend functions are set up to always return an object with either an "error" or "success" property) 
   */
  const callRealmApi = async (functionName, functionArgs) => {
    if (!realmUser)
      return { error: { message: 'You need to be logged in to continue.' } };
      
    const isOffline = !netInfo.isConnected || !netInfo.isInternetReachable;
    if (isOffline)
      return { error: { message: 'Please connect to the Internet to continue.' } };
  
    // We can call our configured MongoDB Realm functions as methods on the User.functions
    // property (e.g. realmUser.functions.createGroup(..)), or by passing the function name
    // and its arguments to User.callFunction('functionName', args) as seen below.
    
    // Changes made by the backend will be automatically synced by Realm and reacted to
    // via our change listeners (see /app/providers).

    // For realms/partitions with read-only permissions, such as the User realm and Group realms,
    // we only show changes once synced from the server, thus not offline. This is because
    // all changes to data in read-only partitions should and can only be modified by the backend.
  
    try {
      return await realmUser.callFunction(functionName, functionArgs);
    }
    catch (err) {
      return { error: { message: err.message } };
    }
  }

  return callRealmApi;
}
