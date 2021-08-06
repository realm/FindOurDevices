class GroupInvitation {
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
