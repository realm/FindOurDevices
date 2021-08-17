import Realm from 'realm';

import { REALM_APP_ID } from './config';

let app;

// Returns the shared instance of the Realm app.
export const getRealmApp = () => {
  if (!app) {
    // Create a Realm app and connect to your MongoDB Realm instance using your Realm app ID.
    const config = {
      id: REALM_APP_ID,
      timeout: 10000,
      app: {
        name: 'default',
        version: '0'
      }
    };
    app = new Realm.App(config);

    // Set a log level to help troubleshoot
    Realm.App.Sync.setLogLevel(app, 'debug');
  }

  return app;
}
