class GroupMembership {
  constructor({ groupId, groupPartition, deviceId, shareLocation = true }) {
    this.groupId = groupId;
    this.groupPartition = groupPartition;
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
      deviceId: 'objectId',
      shareLocation: 'bool',
    }
  };
}

export default GroupMembership;
