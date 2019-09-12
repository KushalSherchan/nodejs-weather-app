const request = require("request");

const forecast = (longitude, latitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/069fdb687bbcd4feaac88558a9be3dac/" +
    longitude +
    "," +
    latitude;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback(error, undefined);
    } else {
      callback(undefined, {
        place: body.timezone,
        summary: body.daily.data[0].summary
      });
    }
  });
};

module.exports = forecast;
