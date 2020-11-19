require("core-js/stable");
require("regenerator-runtime/runtime");
const dotenv = require("dotenv");
if (!process.env.NODE_ENV) {
  const config_result = dotenv.config();
  if (config_result.error) {
    throw config_result.error;
  }
}

module.exports = dotenv;
