/** Class representing a group invitation. */
export class GroupInvitation {
  /**
   * Create a GroupInvitation.
   * @param {Object} props
   * @param {BSON.ObjectId} props.groupId - The ID of the group.
   * @param {string} props.groupName - The name of the group that the invite concerns.
   * @param {string} props.senderEmail - The email of the user who sent the invitation.
   */
  constructor({ groupId, groupName, senderEmail }) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.senderEmail = senderEmail;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'GroupInvitation',
    embedded: true,
    properties: {
      groupId: 'objectId',
      groupName: 'string',
      senderEmail: 'string'
    }
  };
}
