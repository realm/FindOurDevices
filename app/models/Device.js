import { BSON } from 'realm';

/** Class representing a device (iPhone, Adroid, iPad, ...). */
class Device {
  /**
   * Create a Device.
   * @param {BSON.ObjectId} [id=new BSON.ObjectId()] - The id of the device.
   * @param {string} partition - The partition value to use on the realm.
   * @param {BSON.ObjectId} ownerId - The id of the owner of the device.
   * @param {string} iosOrAndroidId - The unique factory id of the device.
   * @param {string} name - The device's name.
   * @param {Location} [location] - The device's location.
   */
  constructor({ id = new BSON.ObjectId(), partition, ownerId, iosOrAndroidId, name, location }) {
    this._id = id;
    this._partition = partition;
    this.ownerId = ownerId;
    this.iosOrAndroidId = iosOrAndroidId;
    this.name = name;

    if (location)
      this.location = location;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'Device',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      ownerId: 'objectId',
      iosOrAndroidId: 'string',
      name: 'string',
      location: 'Location?'
    }
  };
}

export default Device;
