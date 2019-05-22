'use strict';

const Service = require('egg').Service;
const crypto = require('crypto');

class NoticeService extends Service {

  // 签名
  getSign(data = '', timestamp) {
    const key = this.ctx.app.config.huya.secretId;
    const dataStr = JSON.stringify(data);
    const now = timestamp || Math.round(Date.now() / 1000);
    const str = `data=${dataStr}&key=${key}&timestamp=${now}`;
    return crypto.createHash('md5')
      .update(str, 'utf-8')
      .digest('hex');
  }

  // 根据类别和房间号去生成 ws 地址
  async getNotice({ noticeType, profileRoom }) {
    const now = Math.round(Date.now() / 1000);
    const appId = this.ctx.app.config.huya.secretId;
    const data = { profileRoom };
    const signature = this.getSign(data, now);
    return `wss://openapi.huya.com/index.html?do=${noticeType}&data=${JSON.stringify(data)}&appId=${appId}&timestamp=${now}&sign=${signature}`;
  }
}

module.exports = NoticeService;
