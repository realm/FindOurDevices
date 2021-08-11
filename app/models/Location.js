/** Class representing a location. */
class Location {
  /**
   * Create a Location.
   * @param {Date} updatedAt - The date of when the given location was last updated.
   * @param {number} longitude - The longitude of given location.
   * @param {number} longitude - The latitude of given location.
   */
  constructor({ updatedAt, longitude, latitude }) {
    this.updatedAt = updatedAt;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  // To use a class as an object type, define the object schema on the static property 'schema'.
  static schema = {
    name: 'Location',
    embedded: true,
    properties: {
      updatedAt: 'date',
      longitude: 'double',
      latitude: 'double'
    }
  };
}

export default Location;
