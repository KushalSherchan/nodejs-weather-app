const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1Ijoic2hlcmNoYW5rdXNoYWwiLCJhIjoiY2swOXV1aDNlMGJ6cDNnbzRlNTA0OTlsaCJ9.PmfPTZbJVST8o-FC1VZ55Q&limit=1";

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find find location. Try another search", undefined);
    } else {
      const place = body.features[0].center;
      callback(undefined, {
        longitude: place[0],
        latitude: place[1],
        address: body.query
      });
    }
  });
};

module.exports = geocode;
