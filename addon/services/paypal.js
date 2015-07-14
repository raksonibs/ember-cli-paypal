import Ember from 'ember';
import Token from './token';

export default Ember.Service.extend({
	
	submitPayment: function(opt) {
		var token = window.localStorage.pptoken;
		var auth = 'Bearer ';
		var data = { 'grant_type' : 'client_credentials' };
		var path = '/v1/payments/payment';


		if (!token) {
			token = Token.getToken(opt);				
		} 

		auth = 'Bearer ' + token;

		Ember.$.ajax({
			url: 'https://api.sandbox.paypal.com' + path,
			method: 'GET',
			beforeSend: function(xhr) {
				xhr.setRequestHeader('Authorization', auth);
			},
			data: data,
			success: function(success) {
				console.log('PAYMENTS', success)
			}
		});
		
	}
});
