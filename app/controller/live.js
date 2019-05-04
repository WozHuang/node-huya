'use strict';

const BaseController = require('../base/BaseController');

class LiveController extends BaseController {
  async getLiveDetail() {
    const ctx = this.ctx;
    ctx.validate({ host: 'string' }, ctx.query);
    const host = ctx.query.host;
    ctx.body = await ctx.service.live.getLiveDetail(host);
    ctx.type = 'json';
  }

  async getLiveList() {
    this.ctx.body = await this.ctx.service.live.getLiveList();
  }
}

module.exports = LiveController;
