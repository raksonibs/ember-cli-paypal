import Ember from 'ember';
import Token from 'ember-cli-paypal/core/token';
import Payment from 'ember-cli-paypal/core/payments';
import Results from 'ember-cli-paypal/core/results';

export default Ember.Service.extend({
	config: undefined,

	setConfig: function() {
		this.set('config',this.container.lookupFactory('config:environment'));
	}.on('init'),

	submitPayment: function(opt) {
		var config = this.get('config')
		
		if (config) {
			config = config.paypal;
		} else {
			// TODO: PROPER ERRORS
			return 'NO CONFIG'
		}

		
		Token._getToken(config)
		.then(
			function(success) {
				return Payment._submitPayment(opt);
			}, 
			
			function(fail) {
				return console.log('FAILURE', fail);
			}
		)
		.then(
			function(success) {
				return Results.paymentResults(results)	
			},
			function(fail) {
				// Errors.paymentErrors()
			}
			
		);	
		
	}
});
