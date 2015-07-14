import Ember from 'ember';
import Token from './token';

export default Ember.Service.extend({
	
	submitPayment: function() {
		var token = window.localStorage.pptoken;

		if (!token) {
			token = Token.getToken();	
		}
		
	}
});
