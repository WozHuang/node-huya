'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {
  setError(msg) {
    throw new Error(msg);
  }
}

module.exports = BaseController;
