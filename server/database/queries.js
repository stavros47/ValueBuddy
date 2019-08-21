const database = require('./index');

const businesses = () => database.raw('SELECT * FROM get_businesses()');

const businessByID = businessID => {
  return database.raw(`SELECT * FROM get_business(${businessID})`);
};

module.exports = {
  businesses,
  businessByID,
};
