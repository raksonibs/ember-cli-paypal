import Ember from 'ember';
import Token from 'ember-cli-paypal/core/token';
import Payment from 'ember-cli-paypal/core/payments';

export default Ember.Service.extend({
	config: undefined,

	setConfig: function() {
		this.set('config',this.container.lookupFactory('config:environment'));
	}.on('init'),

	submitPayment: function(opt) {
		var config = this.get('config')
		console.log('CONFIG', config)		
		
		// if (config) {
		// 	config = config.paypal;
		// }

		// if (!window.location.pptoken) {
		// 	Token._getToken(config).then(
		// 		function(success) {
		// 			Payment._submitPayment(opt);
		// 		}, 
				
		// 		function(fail) {
		// 			console.log('FAILURE', fail);
		// 		}
		// 	);	
		
		// } else {
		// 	Payment._submitPayment(opt);	
		// }
		
	}
});
