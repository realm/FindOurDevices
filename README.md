# FindOurDevices - Realm React Native App (frontend)

A React Native + MongoDB Realm example application for allowing users to see location and movement of its own devices or those of people in the same group.

#### MongoDB Realm Backend:

> This React Native app requires a MongoDB Realm backend that can be found [here](https://github.com/realm/FindOurDevices-backend).

#### Diagrams & Data Modeling Pointers:

> To get a better overview of the implementation as well as the RealmDB data modeling, partitions, and permissions, see [Diagrams](#diagrams).

#### Demo Video:

> A video showcasing the app functionality can be found [here (TODO: INSERT LINK)](https://).

#### Screenshots:

![Welcome Screen](https://user-images.githubusercontent.com/44657095/130261299-e04996ef-d6af-4929-ba7b-12b304832326.png) ![Group Map View](https://user-images.githubusercontent.com/44657095/130261293-b15e346d-0ece-46ad-895a-449fa2a97aaf.png)

# Table of Contents

- [Getting Started](#getting-started)
  - [1. Set up development environment](#1-set-up-development-environment)
  - [2. Clone the repo](#2-clone-the-repo)
  - [3. Install dependencies](#3-install-dependencies)
  - [4. Add your Realm App ID](#4-add-your-realm-app-id)
  - [5. Run the app](#5-run-the-app)
- [Notes](#notes)
  - [Simulating device movement](#simulating-device-movement)
  - [Replacing OpenStreetMaps with Google Maps](#replacing-openstreetmaps-with-google-maps)
- [Troubleshooting](#troubleshooting)
  - [Objects not syncing](#objects-not-syncing)
  - [Triggers not being fired](#triggers-not-being-fired)
  - [Functions not being called by triggers](#functions-not-being-called-by-triggers)
  - [Permission errors](#permission-errors)
  - [Detecting network connection on simulator when reenabling WiFi](#detecting-network-connection-on-simulator-when-reenabling-wifi)
- [Diagrams](#diagrams)
  - [Use Case Diagram](#use-case-diagram)
  - [RealmDB Data Model](#realmdb-data-model)
  - [Object Relationships Within and Across Partitions](#object-relationships-within-and-across-partitions)
  - [Comparison of Permissions for Shared Realms](#comparison-of-permissions-for-shared-realms)
  - [Solving Privacy Issues of an Earlier Data Model Version](#solving-privacy-issues-of-an-earlier-data-model-version)
  - [Visual Representation of the Integration of Realm](#visual-representation-of-the-integration-of-realm)
  - [Activities and Data Flow When Updating the Location of a Device](#activities-and-data-flow-when-updating-the-location-of-a-device)

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

1. Start Metro (the JavaScript bundler). Open a terminal and from the root of the project run:

```bash
npx react-native start
```

2. Build the app and run it on a simulator. Open a separate terminal and from the root of the project run:

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
3. Refer to the [react-native-maps docs](https://github.com/react-native-maps/react-native-maps/blob/HEAD/docs/installation.md) and [Google Maps API docs](https://developers.google.com/maps/documentation/) for instructions on how to proceed.

# Troubleshooting

A great help when troubleshooting is to look at the log of the app in the [MongoDB Realm UI](https://account.mongodb.com/account/login) under `Manage > Logs` in the sidebar.

## Objects not syncing

When developing and modifying schemas or making changes to documents directly in [MongoDB Atlas](https://account.mongodb.com/account/login), you may experience issues syncing the modfied object if the changes do not conform to your Realm data model. Realm Sync only propagates valid objects without throwing any errors if any of the objects do not conform to your schema/model.

Make sure to check that all expected fields and types exist on the object/document.

Some issues may also be related to permissions (see [Permission errors](#permission-errors)).

## Triggers not being fired

The first time you import your backend Realm app to MongoDB Realm, some triggers may not get enabled. Go to the [MongoDB Realm UI](https://account.mongodb.com/account/login) then navigate to `Build > Triggers` in the sidebar. Enable any trigger that is not currently enabled.

Also make sure the trigger is configured correctly on the backend. Trigger configurations contain a `match` field where you may specify when the trigger should fire using the MongoDB query language.

## Functions not being called by triggers

When developing, if you notice from looking at the logs in the [MongoDB Realm UI](https://account.mongodb.com/account/login) that a trigger is fired but the function that the trigger is supposed to call is not called, you may be using a device with an IP-address that is not listed on the access list of the API key (see [Permission errors](#permission-errors)).

## Permission errors

When the Realm backend was set up, you had to add your IP to the Realm CLI API key access list. If you develop from another device or using a different network connection (or other reasons), your IP address will be different.

To edit the access list, navigate to `Access Mananger > Project Access > API Keys` at the top of the [MongoDB Atlas UI](https://account.mongodb.com/account/login) and choose which of your keys to edit.

## Detecting network connection on simulator when reenabling WiFi

There is a [known issue](http://www.openradar.appspot.com/29913522) with network change notifications on the iOS simulator that occurs when the simulator is (a) running, then (b) WiFi is turned off, then (c) turned on again. The simulator will be notified when the WiFi got turned off, but not when it got reenabled.

To be able to test this scenario with greater confidence, please use a real device.

# Diagrams

The diagrams presented and the notes therein provide insights into ways of thinking about RealmDB data modeling, partitioning, and permissions.

> ⚠️ FindOurDevices uses a synced cluster with only [synced realms](https://docs.mongodb.com/realm/sync/rules/). Data access rules and permissions are different for [non-synced realms](https://docs.mongodb.com/realm/mongodb/define-roles-and-permissions/) which provide more granular, field-level rules.

## Use Case Diagram

#### Description:

A visual overview of what a user can do with the application.

#### Helps understand:

Application capabilities.

**[INSERT DIAGRAM HERE]**

## RealmDB Data Model

#### Description:

An Entity Relationship diagram of the FindOurDevices data model showing all Realm objects and their relationships.

#### Helps understand:

Data modeling in Realm.

**[INSERT DIAGRAM HERE]**

## Object Relationships Within and Across Partitions

#### Description:

Potential problems that you may run into when modeling data and referencing objects, as well as various solutions for circumventing the issue and what solution FindOurDevices uses.

#### Helps understand:

Partitioning in Realm.

**[INSERT DIAGRAM HERE]**

## Comparison of Permissions for Shared Realms

#### Description:

A comparison of the permissions of two different applications (one being FindOurDevices) for the part of the app that uses a shared realm. It explains why the synced permission rules for FindOurDevices are not the same (i.e. does not allow “write” permission).

#### Helps understand:

Partitions and permissions for synced realms.

**[INSERT DIAGRAM HERE]**

## Solving Privacy Issues of an Earlier Data Model Version

#### Description:

Explanation of permission related issues of an earlier data model version of FindOurDevices and how a remodel solved the issue.

#### Helps understand:

Partitions and permissions for synced realms and how to spot a similar weakness in your data model.

**[INSERT DIAGRAM HERE]**

## Visual Representation of the Integration of Realm

#### Description:

Illustration of how Realm is integrated in FindOurDevices (for the use case of having groups) and from what exact places of the data model the data on various screens come from. It also shows what Realm-related operations are performed when the user interacts with the screen.

#### Helps understand:

Realm integration, denormalization, and opening/closing of realms.

**[INSERT DIAGRAM HERE]**

## Activities and Data Flow When Updating the Location of a Device

#### Description:

Illustration of what activities happen and how the data flows when the main use case of the app occurs (i.e. a device moves X meters and the new location can be seen on the map by the user and any group members that the user is a part of). All activities within a specific column in the diagram represent what happens on that specific entity (e.g. on John’s phone, Mary’s phone, or on the MongoDB Realm backend).

#### Helps understand:

Realm integration, Realm Sync, partitioning, and change listeners.

**[INSERT DIAGRAM HERE]**
