"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;

function searcher(query, value, page) {
  return this.request(`${this.apiURL}/?${query}=${value}&apikey=${this.apiKEY}`); //return this.request(`${this.apiURL}/&${query}=${value}${(page) ? '&page='+page : '' }`);
}

function search() {
  return {
    movies: searcher.bind(this, 's')
  };
}