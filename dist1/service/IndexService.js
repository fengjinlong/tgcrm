"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class IndexService {
  constructor() {}

  userStorage = [{
    email: "yuanzhijia@yidengfe.com",
    name: "zhijia"
  }, {
    email: "Copyright © 2016 yidengfe.com All Rights Reversed.京ICP备16022242号-1",
    name: "laowang"
  }];

  async getUser(id) {
    let result;
    result = this.userStorage[id];
    return result;
  }

}

exports.default = IndexService;