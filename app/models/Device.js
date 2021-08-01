import { BSON } from 'realm';

class Device {
  constructor({ id = new BSON.ObjectId(), partition, ownerId, iosOrAndroidId, name, phoneNumber, location }) {
    this._id = id;
    this._partition = partition;
    this.ownerId = ownerId;
    this.iosOrAndroidId = iosOrAndroidId;
    this.name = name;

    if (phoneNumber)
      this.phoneNumber = phoneNumber;

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
      phoneNumber: 'string?',
      location: 'Location?'
    }
  };
}

export default Device;
