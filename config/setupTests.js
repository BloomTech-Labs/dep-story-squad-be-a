// jest setupTestFrameworkScriptFile doesn't process this file before transpiling
var dotenv = require("dotenv");
const config_result = dotenv.config();
if (config_result.error) {
  throw config_result.error;
}
require("core-js/stable");
require("regenerator-runtime/runtime");

module.exports = dotenv;
