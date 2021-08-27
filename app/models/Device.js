import { BSON } from 'realm';

/** Class representing a device (e.g. phone, tablet). */
export class Device {
  /**
   * @typedef {Object} Location
   * @property {Date} location.updatedAt - The date when the location was last updated.
   * @property {number} location.longitude - The location longitude.
   * @property {number} location.latitude - The location latitude.
   */

  /**
   * Create a Device.
   * @param {Object} props
   * @param {BSON.ObjectId} [props.id=new BSON.ObjectId()] - The ID of the device.
   * @param {string} props.partition - The partition value to use on the realm.
   * @param {BSON.ObjectId} props.ownerId - The ID of the owner of the device.
   * @param {string} props.iosOrAndroidId - The unique device ID for the vendor.
   * @param {string} props.name - The device's name.
   * @param {Location} [props.location] - The device's location.
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
