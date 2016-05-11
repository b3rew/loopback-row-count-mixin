module.exports = function RowCount (Model) {
  'use strict';

  Model.afterRemote('findById', injectCounts);
  Model.afterRemote('findOne', injectCounts);
  Model.afterRemote('find', injectCounts);

  function injectCounts (ctx, unused, next) {
    var resources = ctx.result;
    if (!Array.isArray(resources)) resources = [resources];
    if (!resources.length) {
      return next();
    }
    totalCount(function(count){
        ctx.result = {
          count: count,
          records: resources       
        }
        return next();
    })
  }

  function totalCount(done){
    Model.count().then(function (count) {
        done(count)
    }).catch(function(){
       console.log("Unable to count!");
       throw e;
    });
  }
};

