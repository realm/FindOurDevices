import { BSON } from 'realm';

class User {
  constructor({ id = new BSON.ObjectId(), partition, email, displayName, deviceIds = [], groupMemberships = [], groupInvitations = [] }) {
    this._id = id;
    this._partition = partition;
    this.email = email;
    this.displayName = displayName;
    this.deviceIds = deviceIds;
    this.groups = groupMemberships;
    this.invitations = groupInvitations;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'User',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      email: 'string',
      displayName: 'string',
      deviceIds: 'objectId[]',
      groups: { type: 'list', objectType: 'GroupMembership' },
      invitations: { type: 'list', objectType: 'GroupInvitation' }
    }
  };
}

export default User;
