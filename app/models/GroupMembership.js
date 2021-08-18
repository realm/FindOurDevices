/** Class representing a group membership. */
class GroupMembership {
  /**
   * Create a GroupMembership.
   * @param {BSON.ObjectId} groupId - The ID of the group.
   * @param {string} groupName - The group's name to be displayed.
   * @param {BSON.ObjectId} deviceId - The ID of the user's device to be used in the group.
   * @param {boolean} isOwner - Whether or not the user is the owner of the group.
   * @param {boolean} [shareLocation=true] - Whether or not the user allows its location to be shared with the group.
   */
  constructor({ groupId, groupName, deviceId, isOwner, shareLocation = true }) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.deviceId = deviceId;
    this.isOwner = isOwner;
    this.shareLocation = shareLocation;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'GroupMembership',
    embedded: true, // default: false
    properties: {
      groupId: 'objectId',
      groupName: 'string',
      deviceId: 'objectId',
      isOwner: 'bool',
      shareLocation: 'bool'
    }
  };
}

export default GroupMembership;
