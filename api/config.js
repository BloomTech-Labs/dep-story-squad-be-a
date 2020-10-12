// import dotenv from 'dotenv';
require('core-js/stable');
require('regenerator-runtime/runtime');
const dotenv = require('dotenv');
if (!process.env.NODE_ENV) {
  const config_result = dotenv.config();
  console.log('config_result', config_result);
  if (config_result.error) {
    throw config_result.error;
  }
}
// import "core-js/stable";
// import "regenerator-runtime/runtime";

// export default dotenv;
module.exports = dotenv;
