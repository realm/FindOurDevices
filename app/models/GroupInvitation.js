/** Class representing a group invitation. */
class GroupInvitation {
  /**
   * Create a GroupInvitation.
   * @param {BSON.ObjectId} groupId - The id of the group.
   * @param {string} groupName - The group's name to be displayed on the invite.
   * @param {string} senderEmail - The id of the user who sent the invitation.
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

export default GroupInvitation;
