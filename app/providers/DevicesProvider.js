import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import Realm, { BSON } from 'realm';
import { getUniqueId, getDeviceName } from 'react-native-device-info';

import { useAuth } from './AuthProvider';
import useLocation from '../hooks/useLocation';
import Device from '../models/Device';
import Location from '../models/Location';

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure

const DevicesContext = createContext();

function DevicesProvider({ children }) {
  const { realmUser } = useAuth();
  const currentDeviceLocation = useLocation();
  const [currentIosOrAndroidId] = useState(getUniqueId());
  const [devices, setDevices] = useState([]);
  const realmRef = useRef(null);

  useEffect(() => {
    if (!realmUser)
      return;

    openRealm();

    return closeRealm;
  }, [realmUser]);

  useEffect(() => {
    if (!currentDeviceLocation)
      return;
    
    // The useLocation hook updates the currentDeviceLocation state when the device
    // physically moves. When this happens, we also want to update that location in
    // our realm to persist it and also so that it can sync to other clients.
    updateLocation(currentDeviceLocation);
  }, [currentDeviceLocation]);

  const openRealm = async () => {
    try {
      // Open a local realm file with the schemas that are part of this partition
      const config = {
        schema: [Device.schema, Location.schema],
        sync: {
          user: realmUser,
          partitionValue: `device=${realmUser.id}`,
          error: (session, syncError) => {
            console.error('syncError.name: ', syncError.name);
            if (syncError.message)
              console.error('syncError.message: ', message);
          }
        }
      };

      const realm = Realm.exists(config)
        ? new Realm(config)
        : await Realm.open(config);

      realmRef.current = realm;

      const devices = realm.objects('Device');
      if (devices.length)
        setDevices(devices);

      devices.addListener((/*collection, changes*/) => {
        setDevices(realm.objects('Device'));
      });
    }
    catch (err) {
      console.error('Error opening realm: ', err.message);
    }
  };

  const closeRealm = () => {
    const realm = realmRef.current;
    realm?.removeAllListeners();
    realm?.close();
    realmRef.current = null;
    setDevices([]);
  };

  const updateLocation = ({ updatedAt, longitude, latitude }) => {
    const realm = realmRef.current;
    if (!realm)
      return;

    // TODO: Place index on iosOrAndroidId
    // We can filter out the user's current device by passing the iOS or Android ID using
    // argument placeholders (e.g. $0, $1, $2, ...) in the query. 
    const currentDevice = realm.objects('Device').filtered('iosOrAndroidId = $0', currentIosOrAndroidId)[0];
    if (!currentDevice)
      return;

    // Everything in the function passed to "realm.write" is a transaction and will
    // hence succeed or fail together. A transcation is the smallest unit of transfer
    // in Realm so we want to be mindful of how much we put into one single transaction
    // and split them up if appropriate (more commonly seen server side). Since clients
    // may occasionally be online during short time spans we want to increase the possibility
    // of sync participants to successfully sync everything in the transaction, otherwise
    // no changes propagate and the transaction needs to start over when connectivity allows.
    realm.write(() => {
      // Normally when updating a record in a NoSQL or SQL database, we have to type
      // a statement that will later be interpreted and used as instructions for how
      // to update the record. But in RealmDB, the objects are "live" because they are
      // actually referencing the object's location in memory on the device (memory mapping).
      // So rather than typing a statement, we modify the object directly by changing
      // the property values. If the changes adhere to the schema, Realm will accept
      // this new version of the object and wherever this object is being referenced
      // locally will also see the changes "live".
      currentDevice.location = new Location({ updatedAt, longitude, latitude });
    });
  };

  const addCurrentDevice = async () => {
    console.log('current device location: ', currentDeviceLocation);  // TEMPORARY (add getLatestLocation in useLocation to update immediately)

    const realm = realmRef.current;
    if (!realm)
      return;

    if (deviceAlreadyExists())
      return { error: { message: 'The device has already been added.' } };

    const device = new Device({
      partition: `device=${realmUser.id}`,
      ownerId: BSON.ObjectId(realmUser.id),
      iosOrAndroidId: currentIosOrAndroidId,
      name: await getDeviceName()
    });

    if (currentDeviceLocation)
      device.location = new Location({ ...currentDeviceLocation });
    
    realm.write(() => {
      realm.create('Device', device);
    });
  };

  const deviceAlreadyExists = () => devices.some(device => device.iosOrAndroidId === currentIosOrAndroidId);

  return (
    <DevicesContext.Provider value={{
      devices,
      currentIosOrAndroidId,
      addCurrentDevice
    }}>
      {children}
    </DevicesContext.Provider>
  )
}

// Components that call useDevices will be able to destructure the values
// provided in DeviceContext.Provider
const useDevices = () => useContext(DevicesContext);

export { DevicesProvider, useDevices };

// For complimentary comments on the use of Realm in this module, see
// /app/providers/AuthProvider.js as it follows a similar structure.