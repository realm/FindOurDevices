# FindOurDevices - Realm React Native App (frontend)

A React Native + MongoDB Realm example application for allowing users to see location and movement of its own devices or those of people in the same group.

#### Realm backend repo:

> This React Native app requires a Realm backend that can be found [here](https://github.com/realm/FindOurDevices-backend).

#### Blog post:

> To read more about the app and its use of Realm, as well as learning more about RealmDB data modeling, partitions, and permissions, see the app's blog post at: [insert link to blog post here](https://)

# Table of Contents

- [Getting Started](#getting-started)
  - [1. Set up development environment](#set-up-development-environment)
  - [2. Clone the repo](#clone-the-repo)
  - [3. Install dependencies](#install-dependencies)
  - [4. Add your Realm App ID](#add-realm-app-id)
  - [5. Run the app](#run-the-app)
- [Notes](#notes)
  - [Simulating device movement](#simulating-device-movement)
  - [Replacing OpenStreetMaps with Google Maps](#adding-google-maps)
- [Troubleshooting](#troubleshooting)
  - [Objects not syncing](#objects-not-syncing)
  - [Triggers not being fired](#triggers-not-being-fired)
  - [Functions not being called by triggers](#functions-not-being-called-by-triggers)
  - [Permission errors](#permission-errors)
  - [Detecting network connection on simulator when reenabling WiFi](#detecting-network-connection-on-simulator)

# Getting Started

## 1. Set up development environment

In order to use React Native and iOS and/or Android simulators, please refer to the [React Native environment set-up docs](https://reactnative.dev/docs/environment-setup) and view instructions for **React Native CLI Quickstart**.

## 2. Clone the repo

```bash
# using https
git clone https://github.com/realm/FindOurDevices

# using ssh
git clone git@github.com:realm/FindOurDevices.git
```

## 3. Install dependencies

```bash
cd FindOurDevices
npm install
```

#### If using iOS, also run:

```bash
npx pod-install
```

## 4. Add your Realm App ID

If you have set up your Realm backend (see [FindOurDevices-backend](https://github.com/realm/FindOurDevices-backend)) you can copy the Realm App ID from the [MongoDB Realm UI](https://account.mongodb.com/account/login).

Once copied, open `/app/config.js` and paste the ID as the value of `REALM_APP_ID`. 

## 5. Run the app

1. In one terminal, run:
```bash
npx react-native start
```

2. In another terminal, run:
```bash
# open iOS simulator
npx react-native run-ios

# open android emulator
npx react-native run-android
```

# Notes

## Simulating device movement

[add instructions here]

## Replacing OpenStreetMaps with Google Maps

If you are developing for Android and want to use Google Maps for the map functionality, you need to get an API key and set up a billing account with Google.

To circumvent this, we have chosen to use the library `react-native-maps-osmdroid` which is a wrapper around `react-native-maps` that let's us use OpenStreetMaps instead of Google Maps. (The library API is mostly the same, thus the usage is the same.)

1. Install the dependency
    ```bash
    npm install react-native-maps

    # If using iOS, also run:
    npx pod-install
    ```
2. In `/app/components/Map.js`, replace...
    <s>
    ```jsx
    import MapView from 'react-native-maps-osmdroid';
    ```
    </s>
    ...with:

    ```jsx
    import MapView from 'react-native-maps';
    ```
3. Refer to the `react-native-maps` docs and Google Maps API docs for instructions on how to proceed.

# Troubleshooting

A great help when troubleshooting is to look at the app's log in the MongoDB Realm UI under `Manage > Logs` in the sidebar.

## Objects not syncing

When developing and modifying schemas or making changes to documents directly in MongoDB Atlas, you may experience issues syncing the modfied object if the changes do not comply with your Realm data model. Realm Sync only propagates valid objects without throwing any errors if any of the objects do not comply with your schema/model.

Make sure to check that all expected fields and types exist on the object/document.

Some issues may also be related to permissions (see [Permission errors](#permission-errors)).

## Triggers not being fired

The first time you import your backend Realm app to MongoDB Realm, some triggers may not get enabled. Go to the MongoDB Realm UI then navigate to `Build > Triggers` in the sidebar. Enable any trigger that is not currently enabled.

Also make sure the trigger is configured correctly on the backend. Trigger configurations contain a `"match"` field where you may specify when the trigger should fire using the MongoDB query language.

## Functions not being called by triggers

When developing, if you notice from looking at the logs in the MongoDB Realm UI that a trigger is fired but the function that the trigger is supposed to call is not called, you may be using a device with an IP-address that is not listed on the access list of the API key (see [Permission errors](#permission-errors)).

## Permission errors

When the Realm backend was set up, you had to add your IP to the Realm CLI API key access list. If you develop from another device or if using a different network connection (or other reasons), your IP address will be different.

To edit the access list, navigate to `Access Mananger > Project Access > API Keys` at the top of the Atlas UI and choose which of your keys to edit.

## Detecting network connection on simulator when reenabling WiFi

There is a [known issue](http://www.openradar.appspot.com/29913522) with network change notifications on the iOS simulator that occurs when the simulator is running, then WiFi is turned off, then turned on again. The simulator will be notified of when the WiFi got turned off, but not when it got reenabled.

To be able to test this scenario with greater confidence, please use a real device.
