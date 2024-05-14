//If you wanted send logs externally like to papertrail, that feature would
//be in its own module and would only have to make the change there locally

// create methods/functions for info and error logging
const info = (...params) => {
  console.log(...params);
};

const error = (...params) => {
  console.error(...params);
};

// export an object that has 2 fields, both are functions/methods
module.exports = { info, error };
