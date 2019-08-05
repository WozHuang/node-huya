'use strict';

// app/extend/helper.js
const cheerio = require('cheerio');
module.exports = {
  async cheerioLoad(url) {
    const response = await this.ctx.curl(url);
    return cheerio.load(response.data);
  },

  /**
   * 从请求中获取pageNo和pageSize
   * @return {{pageNo: (*|number), pageSize: (*|number)}} 构造后的page对象
   */
  getPage() {
    return {
      pageNo: this.ctx.query.pageNo || this.ctx.request.body.pageNo || 1,
      pageSize: this.ctx.query.pageSize || this.ctx.request.body.pageSize || 10,
    };
  },

  /**
   * 把 HuYa 返回的分页信息构造成page对象
   * @param {object} data 接口返回的分页信息
   * @return {{pageNo: *, totalPage: *, pageSize: *, time: *, totalCount: *}} page 对象
   */
  returnPage(data) {
    const { page: pageNo, pageSize, totalPage, totalCount, time } = data;
    return { pageNo, pageSize, totalPage, totalCount, time };
  },
};
