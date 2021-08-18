# FindOurDevices - Realm React Native App (frontend)

A React Native + MongoDB Realm application for allowing users to see location and movement of its own devices or those of people in the same group.

#### Realm backend repo:

> This React Native app requires a Realm backend that can be found [here](https://github.com/realm/FindOurDevices-backend).

#### Blog post:

> To read more about the app and its use of Realm, as well as learning more about RealmDB data modeling, partitions, and permissions, see the app's blog post at: [insert link to blog post here](https://)

# Get Started

## 1. Clone the repo:

```bash
# using https
git clone https://github.com/realm/FindOurDevices

# using ssh
git clone git@github.com:realm/FindOurDevices.git
```

## 2. Install dependencies:

```bash
cd FindOurDevices
npm install
```

#### If using iOS, also run:

```bash
npx pod-install
```

## 3. Add your Realm App ID

If you have set up your Realm backend (see [FindOurDevices-backend](https://github.com/realm/FindOurDevices-backend)) you can copy the Realm App ID from the MongoDB Realm UI.

Once copied, open `/app/config.js` and paste the ID as the value of `REALM_APP_ID`. 

## 4. Run the app:

1. In one terminal:
```bash
npx react-native start
```

2. In another terminal:
```bash
# open iOS simulator
npx react-native run-ios

# open android emulator
npx react-native run-android
```

# Notes

## A. Simulating device movement

[add instructions here]

## B. Replacing OpenStreetMaps with Google Maps

If you are developing for Android and want to use Google Maps for the map functionality, you need to get an API key and set up a billing account with Google.

To circumvent this, we have chosen to use the library `react-native-maps-osmdroid` which is a wrapper around `react-native-maps` that let's us use OpenStreetMaps instead of Google Maps. (The library API is mostly the same, thus the usage is the same.)

1. In `/app/components/Map.js`, replace...
    <s>
    ```jsx
    import MapView from 'react-native-maps-osmdroid';
    ```
    </s>
    ...with:

    ```jsx
    import MapView from 'react-native-maps';
    ```
2. Refer to the `react-native-maps` docs and Google Maps API docs for instructions on how to proceed.