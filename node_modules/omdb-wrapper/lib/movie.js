"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = movie;

function movie() {
  return {
    getMovie: id => this.request(`${this.apiURL}/?i=${id}&apikey=${this.apiKEY}`)
  };
}