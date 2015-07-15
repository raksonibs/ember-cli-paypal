import Ember from 'ember';
import Token from 'ember-cli-paypal/core/token';
import Payment from 'ember-cli-paypal/core/payments';

export default Ember.Service.extend({

	submitPayment: function(opt) {
		if (!window.location.pptoken) {
			Token._getToken(opt).then(
				function(success) {
					Payment._submitPayment(opt);
				}, 
				
				function(fail) {
					console.log('FAILURE', fail);
				}
			);	
		} else {
			Payment._submitPayment(opt);	
		}
		
	}
});
