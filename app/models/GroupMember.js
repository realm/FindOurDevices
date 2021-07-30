class GroupMember {
  constructor({ userId, displayName, deviceId, location }) {
    this.userId = userId;
    this.displayName = displayName;
    this.deviceId = deviceId;
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
      location: 'Location?',
    }
  };
}

export default GroupMember;
