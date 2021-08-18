/** Class representing a group membership. */
class GroupMembership {
  /**
   * Create a GroupMembership.
   * @param {BSON.ObjectId} groupId - The ID of the group.
   * @param {string} groupPartition - The partition value to use on the realm.
   * @param {string} groupName - The group's name to be displayed.
   * @param {BSON.ObjectId} deviceId - The ID of the user's device to be used in the group.
   * @param {boolean} [shareLocation=true] - A boolean which tells if a user allows its location to be shared with the group.
   */
  constructor({ groupId, groupPartition, groupName, deviceId, shareLocation = true }) {
    this.groupId = groupId;
    this.groupPartition = groupPartition;
    this.groupName = groupName;
    this.deviceId = deviceId;
    this.shareLocation = shareLocation;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'GroupMembership',
    embedded: true, // default: false
    properties: {
      groupId: 'objectId',
      groupPartition: 'string',
      groupName: 'string',
      deviceId: 'objectId',
      shareLocation: 'bool'
    }
  };
}

export default GroupMembership;
