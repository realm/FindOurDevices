/** Class representing a group member. */
export class GroupMember {
  /**
   * @typedef {Object} Location
   * @property {Date} location.updatedAt - The date when the location was last updated.
   * @property {number} location.longitude - The location longitude.
   * @property {number} location.latitude - The location latitude.
   */

  /**
   * Create a GroupMember.
   * @param {Object} props
   * @param {BSON.ObjectId} props.userId - The ID of the member.
   * @param {string} props.displayName - The member's name to be displayed on the group.
   * @param {string} props.deviceName - The name of the member's device to be used in the group.
   * @param {Location} [props.location] - The member's location.
   */
  constructor({ userId, displayName, deviceName, location }) {
    this.userId = userId;
    this.displayName = displayName;
    this.deviceName = deviceName;

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
      deviceName: 'string',
      location: 'Location?'
    }
  };
}
