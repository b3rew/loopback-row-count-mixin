module.exports = function RowCount(Model, options) {
  'use strict';


  Model.afterRemote('find', injectCounts);

  function injectCounts(ctx, unused, next) {
    var resources = ctx.result;
    if (!Array.isArray(resources)) resources = [resources];
    if (!resources.length) {
      if (options.header) {
        ctx.res.set('Access-Control-Expose-Headers', 'x-total-count');
        ctx.res.set('X-Total-Count', 0);
      } else {
        ctx.result = {
          count: 0,
          rows: []
        };
      }
      return next();
    }
    var args = ctx.args && ctx.args.filter && typeof ctx.args.filter == 'string' ? JSON.parse(ctx.args.filter) : {};
    args = ctx.args && ctx.args.filter && typeof ctx.args.filter == 'object' ? ctx.args.filter : args;

    var filter = args && args.where ? args.where : {};
    totalCount(filter, function(err, count) {
      if (!err) {
        if (options.header) {
          ctx.res.set('Access-Control-Expose-Headers', 'x-total-count');
          ctx.res.set('X-Total-Count', count);
        } else {
          ctx.result = {
            count: count,
            rows: resources
          };
        }
      } else {
        console.log(err);
        return next(err);
      }

      return next();
    })
  }

  function totalCount(filter, done) {
    Model.count(filter, function(err, count) {
      if (!err) return done(null, count);
      else return done("Unable to count: " + err)
    })
  }
};