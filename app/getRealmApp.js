import Realm from "realm";

let app;

// Returns the shared instance of the Realm app.
const getRealmApp = () => {
  if (!app) {
    const appId = "<your Realm app ID here>"; // Set Realm app ID here.
    // Create a Realm app and connect to your MongoDB Realm instance using your Realm app ID.
    const config = {
      id: appId,
      timeout: 10000,
      app: {
        name: "default",
        version: "0"
      }
    };
    app = new Realm.App(config);

    // Set a log level to help troubleshoot
    Realm.App.Sync.setLogLevel(app, 'debug');
  }

  return app;
}

export default getRealmApp;