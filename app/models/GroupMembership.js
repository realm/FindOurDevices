class GroupMembership {
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
      shareLocation: 'bool',
    }
  };
}

export default GroupMembership;
