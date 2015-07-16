import Ember from 'ember';

export function _getToken(paypal) {
	return new Promise(function(resolve, reject) {
		var auth = 'Basic ' + btoa(paypal.clientId + ':' + paypal.secret);
		var data = { 'grant_type' : 'client_credentials' };
		var href = paypal.endPoint;
		var path = '/v1/oauth2/token';

		// If token exists already
		if (window.localStorage.pptoken) {
			resolve();
		} else {
			Ember.$.ajax({
				url: href + path,
				method: 'POST',
				beforeSend: function(xhr) {
					xhr.setRequestHeader('Authorization', auth);
				},
				data: data,
				success: function(success) {
					window.localStorage.pptoken = success.access_token;
					return resolve();
				},
				fail: function(fail) {
					// TODO: implement proper error handling with PayPal errors
					return reject(fail);
				}
			});
		}		
	});		
}
