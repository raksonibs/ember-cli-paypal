import Ember from 'ember';
import Token from 'ember-cli-paypal/core/token';
import Payment from 'ember-cli-paypal/core/payments';

export default Ember.Service.extend({

	submitPayment: function(opt) {
		Payment._submitPayment(opt);
	}
});
