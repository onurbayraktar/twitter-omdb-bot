"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _search = _interopRequireDefault(require("./search"));

var _movie = _interopRequireDefault(require("./movie"));

var _config = require("./config");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.fetch = require('node-fetch');

class OmdbWrapper {
  constructor(options) {
    this.apiURL = options.apiURL || _config.API_URL;
    this.apiKEY = options.apiKEY;
    this.movie = _movie.default.bind(this)();
    this.search = _search.default.bind(this)();
  }

  request(url) {
    // ${this.token}`
    return fetch(url).then(_utils.toJSON);
  }

}

exports.default = OmdbWrapper;