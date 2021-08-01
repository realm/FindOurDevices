import { useState, useEffect, useRef } from 'react';
import RNLocation from 'react-native-location';

function useLocation() {
  const [location, setLocation] = useState(null);
  const unsubscribeRef = useRef(null);

  const getLocation = async () => {
    const METERS_BEFORE_UPDATING_LOCATION = 20;
    RNLocation.configure({
      distanceFilter: METERS_BEFORE_UPDATING_LOCATION,
      desiredAccuracy: {
        ios: 'best',
        android: 'highAccuracy'
      },
    });

    const granted = await requestPermission();
    if (!granted)
      return console.log('Location permission not granted.');

    // The callback passed will be called everytime the device has moved METERS_BEFORE_UPDATING_LOCATION.
    // (The OS might batch location updates together, so our change handler may receive multiple location items)
    unsubscribeRef.current = RNLocation.subscribeToLocationUpdates((locations) => setLocation({
      updatedAt: new Date(),
      longitude: locations[0].longitude,
      latitude: locations[0].latitude
    }));
  };

  const requestPermission = async () => {
    try {
      // RNLocation returns a promise that resolves to true if granted, false if denied
      return await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel'
          }
        }
      });
    }
    catch (err) {
      return false;
    }
  }

  const unsubscribe = () => {
    if (unsubscribeRef.current)
      unsubscribeRef.current();
    
    unsubscribeRef.current = null;
    setLocation(null);
  };

  useEffect(() => {
    getLocation();

    return unsubscribe;
  }, []);

  return location;
}

export default useLocation;
