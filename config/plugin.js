'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   had enabled by egg
//   static: {
//     enable: true,
//   }
// };

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
