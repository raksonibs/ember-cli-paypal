import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';

// var dummyDataOneProduct = {
// 	items: [{
// 		amount: 					 {
// 			currency: 'USD',
// 			total: '$400.25',
// 			details: {}
// 		},
// 		description: 			 'Some long description',
// 		// item_list: 				 value.item_list,
// 		// related_resources: value.related_resources,
// 		// invoice_number: 	 value.invoice_number,
// 		// custom: 					 value.custom,
// 		// soft_descriptor: 	 value.soft_descriptor,
// 		// payment_options: 	 value.payment_options
// 	}
// 	]
// }

export function _submitPayment(opt) {
	return new Promise(function(resolve, reject) {
		var token = window.localStorage.pptoken;
		var auth = 'Bearer ';
		
		Utils
		._formatData(opt)
	  .then(
	 		function(dataResolve) {
				var path = '/v1/payments/payment';

				auth = 'Bearer ' + token;

				Ember.$.ajax({
					url: 'https://api.sandbox.paypal.com' + path,
					method: 'POST',
					contentType: 'application/json',
					beforeSend: function(xhr) {
						xhr.setRequestHeader('Authorization', auth);
					},
					data: dataResolve,
					success: function(success) {
						return resolve(success);
					},
					fail: function(fail) {
						return reject(fail);
					}
				});	
	 		},
	 		function(dataReject) {

	 		});

	
	});
}

