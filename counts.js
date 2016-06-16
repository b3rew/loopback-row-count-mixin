module.exports = function RowCount (Model) {
  'use strict';

  Model.afterRemote('find', injectCounts);

  function injectCounts (ctx, unused, next) {
    var resources = ctx.result;
    if (!Array.isArray(resources)) resources = [resources];
    if (!resources.length) {
      return next();
    }
    var filter = ctx.args && ctx.args.filter && ctx.args.filter.where ? ctx.args.filter.where : {};
    totalCount(filter, function(err, count){
        if(!err){
            ctx.result = {
                count: count,
                rows: resources
            };
        }else{
            console.log(err);
            return next(err);
        }

        return next();
    })
  }

  function totalCount(filter, done){
        Model.count(filter, function(err, count) {
            if(!err) return done(null, count)
            else return done("Unable to count: "+ err)
        })
  }
};


