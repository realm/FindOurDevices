/** Class representing a group invitation. */
export class GroupInvitation {
  /**
   * Create a GroupInvitation.
   * @param {BSON.ObjectId} groupId - The ID of the group.
   * @param {string} groupName - The name of the group that the invite concerns.
   * @param {string} senderEmail - The email of the user who sent the invitation.
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
