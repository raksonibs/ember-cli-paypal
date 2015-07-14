'use strict';

module.exports = function( environment, appConfig ) {
  var config = {
  	// Sandbox
  	sandboxAccount: '',
  	sandboxEndPoint: '',

  	// Live
  	paypalAccount: '',
  	liveEndPoint: '',

  	// Credentials
  	clientID: '',
  	secret: ''
  };

  if (environment === 'development') {
  	config.sandboxAccount = 'joseph.dillon.522-facilitator@gmail.com';
  	config.sandboxEndPoint = 'api.sandbox.paypal.com'
  	config.clientID = 'AYZnZPw0ztH2YZARlYelfsBqQbB3sW6UDxqPeHgD8Jxg7z-f59Pz9CrQMUn_6TgyiQtyNLsQJz2C1BDi';
  	config.secret = 'EJSTRmMNrPs-pYjUNCsi5u_HVBZTDZiVSYGCn_B2SOVbB1PE0u-kqsJs_EUpUOggaxI8_5PhnxbT6Vz3';
  }

  if (environment === 'testing') {
    config.sandboxAccount = 'joseph.dillon.522-facilitator@gmail.com';
  	config.sandboxEndPoint = 'api.sandbox.paypal.com'
  	config.clientID = 'AYZnZPw0ztH2YZARlYelfsBqQbB3sW6UDxqPeHgD8Jxg7z-f59Pz9CrQMUn_6TgyiQtyNLsQJz2C1BDi';
  	config.secret = 'EJSTRmMNrPs-pYjUNCsi5u_HVBZTDZiVSYGCn_B2SOVbB1PE0u-kqsJs_EUpUOggaxI8_5PhnxbT6Vz3';
  }

  if (environment === 'production') {
    config.liveEndPoint = 'api.paypal.com';
  }

  return config;
};
