/** Class representing a group member. */
class GroupMember {
  /**
   * Create a GroupMember.
   * @param {BSON.ObjectId} userId - The id of the member.
   * @param {string} displayName - The member's name to be displayed on the group.
   * @param {BSON.ObjectId} deviceId - The id of the member's device to be used in the group.
   * @param {Location} [location] - The member's location.
   */
  constructor({ userId, displayName, deviceId, location }) {
    this.userId = userId;
    this.displayName = displayName;
    this.deviceId = deviceId;

    if (location)
      this.location = location;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'GroupMember',
    embedded: true,
    properties: {
      userId: 'objectId',
      displayName: 'string',
      deviceId: 'objectId',
      location: 'Location?'
    }
  };
}

export default GroupMember;
