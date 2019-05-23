'use strict';

const BaseController = require('../base/BaseController');

class LiveController extends BaseController {

  // 获取弹幕ws地址
  async getNotice() {
    const ctx = this.ctx;
    const { host } = ctx.query;
    ctx.validate({
      host: 'string',
    }, ctx.query);
    ctx.body = await ctx.service.notice.getNotice({ profileRoom: parseInt(host, 10) });
  }
}

module.exports = LiveController;
