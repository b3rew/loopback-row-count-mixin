module.exports = function mixin (app) {
  app.loopback.modelBuilder.mixins.define('RowCount', require('./counts'));
};
