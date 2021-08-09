import { BSON } from 'realm';

/** Class representing a group. */
class Group {
  /**
   * Create a Group.
   * @param {BSON.ObjectId} [id=new BSON.ObjectId()] - The id of the group.
   * @param {string} partition - The partition value to use on the realm.
   * @param {BSON.ObjectId} ownerId - The id of the owner of the group.
   * @param {string} name - The group's name.
   * @param {GroupMember[]} [members=[]] - The members of the group.
   */
  constructor({ id = new BSON.ObjectId(), partition, ownerId, name, members = [] }) {
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
      members: { type: 'list', objectType: 'GroupMember' }
    }
  };
}

export default Group;
