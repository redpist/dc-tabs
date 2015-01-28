/* jshint node: true */
'use strict';

module.exports = {
  name: 'dc-tabs',
  included: function(app) {
    this._super.included(app);

    app.import('vendor/dc-tabs.css');
    app.import('addon/components/dc-tab-panel/template.hbs');
  }
};
