/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    // console.log('body', body);
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  ip = '70.74.196.251';
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    // console.log('body', body)
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    // console.log('latitude:', data.latitude, 'longitude:', data.longitude)
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    };
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

// fetchMyIP();
// fetchCoordsByIP();

module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
};