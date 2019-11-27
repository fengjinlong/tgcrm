"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import safeRequest from '../util/SafeRequest'
class ApiService {
  constructor({
    safeRequest
  }) {
    this.safeRequest = safeRequest;
  }

  getInfo(url, arg, callback) {
    return this.safeRequest.fetch(url, arg, callback);
  }

}

exports.default = ApiService;