'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  async getLiveDetail(roomHost) {
    const ctx = this.ctx;
    const $ = await ctx.helper.cheerioLoad(`https://www.huya.com/${roomHost}`);
    const scr = $('[data-fixed=true]')
      .eq(3)
      .html();
    // 如果没有匹配的直播，返回的文件会不一样
    if (/window\.localStorage/.test(scr)) {
      throw new Error('no match live');
    }
    const script = String(scr)
      .replace(/window\.performanceInfo\._hmt.push[^;]*?;/, '')
      .replace(/window\.TT_LIVE_TIMING[^;]*?;/, '')
      .replace(/&quot;/g, '\\"')
      .replace(/var /g, 'result.');
    // eslint-disable-next-line no-new-func
    return (Function(`const result = {};${script};return result`))();
  }

  async getLiveList() {
    const { ctx } = this;
    const { pageNo } = ctx.helper.getPage();
    const response = await ctx.curl(`https://www.huya.com/cache.php?m=LiveList&do=getLiveListByPage&tagAll=0&page=${pageNo}`);
    const res = JSON.parse(response.data);
    const list = res.data.datas;
    const page = ctx.helper.returnPage(res.data);
    return { list, page };
  }
}

module.exports = LiveService;
