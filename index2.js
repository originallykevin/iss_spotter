const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation, } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    // console.log('pass', pass)
    const date = new Date(0); // date -> 01 Jan 1970 00:00
    // console.log('Date(0)', Date(0))
    date.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  // .catch((error) => {
  //   console.log("It didn't work:", error.message);
  // });