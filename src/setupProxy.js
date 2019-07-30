const path = require('path');
const mockerApi = require('mocker-api');

module.exports = function mock(app) {
  mockerApi(app, path.resolve(__dirname, '../mock/index'));
};
