import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';


export function _getToken(opt) {
	return new Promise(function(resolve, reject) {
		var auth = 'Basic ' + btoa(opt.clientID || clientID + ':' + opt.secret || secret);
		var data = { 'grant_type' : 'client_credentials' };
		var path = '/v1/oauth2/token';

		Ember.$.ajax({
			url: 'https://api.sandbox.paypal.com' + path,
			method: 'POST',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', auth);
			},
			data: data,
			success: function(success) {
				window.localStorage.pptoken = success.access_token;
				resolve(success.access_token);
			},
			fail: function(fail) {
				reject(fail);
			}
		});
	});		
};
