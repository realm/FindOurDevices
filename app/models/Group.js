import { BSON } from 'realm';

/** Class representing a group. */
export class Group {
  /**
   * Create a Group.
   * @param {Object} props
   * @param {BSON.ObjectId} [props.id=new BSON.ObjectId()] - The ID of the group.
   * @param {string} props.partition - The partition value to use for the object.
   * @param {BSON.ObjectId} props.ownerId - The ID of the owner of the group.
   * @param {string} props.name - The group's name.
   * @param {GroupMember[]} [props.members=[]] - The members of the group.
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
