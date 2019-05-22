'use strict';

const BaseController = require('../base/BaseController');
const noticeTypeList = [ 'getMessageNotice', 'getSendItemNotice', 'getVipEnterBannerNotice' ];

class LiveController extends BaseController {

  // 获取弹幕ws地址
  async getNotice() {
    const ctx = this.ctx;
    const { noticeType, profileRoom } = ctx.query;
    ctx.validate({
      noticeType: 'string',
      profileRoom: 'string',
    }, ctx.query);
    if (!noticeTypeList.includes(noticeType)) {
      throw new Error(`noticeType应是${noticeTypeList.join()}中的一个`);
    }
    ctx.body = await ctx.service.notice.getNotice({ noticeType, profileRoom: parseInt(profileRoom, 10) });
  }
}

module.exports = LiveController;
