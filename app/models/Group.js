import { BSON } from 'realm';

class Group {
  constructor({ id = new BSON.ObjectID(), partition, ownerId, name, members = [] }) {
    this._id = id;
    this._partition = partition;
    this.ownerId = ownerId;
    this.name = name;
    this.members = members;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'Group',
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      _partition: 'string',
      ownerId: 'objectId',
      name: 'string',
      members: { type: "list", objectType: "GroupMember" },
    }
  };
}

export default Group;
