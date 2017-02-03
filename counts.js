module.exports = function RowCount (Model) {
  'use strict';

  Model.afterRemote('find', injectCounts);

  function injectCounts (ctx, unused, next) {
    var resources = ctx.result;
    var ctx.count = ctx.count || 'count';
    var ctx.rows = ctx.rows || 'rows';

    if (!Array.isArray(resources)) resources = [resources];

    if (!resources.length) {
        ctx.result[ctx.count] = 0;
        ctx.result[rows] = [];
        return next();
    }

    var args = ctx.args && ctx.args.filter && typeof ctx.args.filter == 'string'?JSON.parse(ctx.args.filter):{};
    args = ctx.args && ctx.args.filter && typeof ctx.args.filter == 'object'?ctx.args.filter:args;

    var filter = args && args.where ? args.where : {};

    totalCount(filter, function(err, count){
        if(!err){
            ctx.result[ctx.count] = count
            ctx.result[ctx.rows] = resources
        }else{
            console.log(err);
            return next(err);
        }

        return next();
    })
  }

  function totalCount(filter, done){
        Model.count(filter, function(err, count) {
            if(!err) return done(null, count);
            else return done("Unable to count: "+ err)
        })
  }
};


