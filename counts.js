module.exports = function RowCount (Model, Config) {
  'use strict';

  Model.afterRemote('find', injectCounts);

  function injectCounts (ctx, unused, next) {
    var resources = ctx.result;
    ctx.result = {}
    ctx.count = Config.count || 'count';
    ctx.rows = Config.rows || 'rows';

    ctx.result[ctx.count] = resources.length;
    ctx.result[ctx.rows] = resources;
    return next();
  }
};
