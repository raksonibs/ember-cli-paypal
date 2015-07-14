/* jshint node: true */
'use strict';
var config = import('config/environment');

module.exports = {
  name: 'ember-cli-paypal',
  isDevelopingAddon: function() {
  	return true;
  }
};
