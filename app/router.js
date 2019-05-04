'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/getLiveDetail', controller.live.getLiveDetail);
  router.get('/getLiveList', controller.live.getLiveList);
};
