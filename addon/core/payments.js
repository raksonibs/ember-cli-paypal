import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';
import Token from 'ember-cli-paypal/core/token';

var dummyDataOneProduct = {
	items: [{
		amount: 					 {
			currency: 'USD',
			total: '$400.25',
			details: {}
		},
		description: 			 'Some long description',
		// item_list: 				 value.item_list,
		// related_resources: value.related_resources,
		// invoice_number: 	 value.invoice_number,
		// custom: 					 value.custom,
		// soft_descriptor: 	 value.soft_descriptor,
		// payment_options: 	 value.payment_options
	}
	]
}

export function _submitPayment(opt) {
	opt = dummyDataOneProduct;
	var token = window.localStorage.pptoken;
	var auth = 'Bearer ';
	var data = { 
		'intent': 'sale',
		'payer': _payerObj(opt),
		'transactions': _transactionObj(opt),
		'redirect_urls': _redirectUrls(opt)
	};
	var path = '/v1/payments/payment';


	if (!token) {
		token = Token.getToken(opt);				
	} 

	auth = 'Bearer ' + token;
		console.log('DATA', data)
	// Ember.$.ajax({
	// 	url: 'https://api.sandbox.paypal.com' + path,
	// 	method: 'POST',
	// 	beforeSend: function(xhr) {
	// 		xhr.setRequestHeader('Authorization', auth);
	// 	},
	// 	data: data,
	// 	success: function(success) {
	// 		console.log('PAYMENTS', success)
	// 	}
	// });	
}

export function _payerObj(opt) {
	var payer = {
		payment_method: 'paypal',
		// funding_instruments: _makeFundingInstrumentsObj(opt),
		// payer_info: _makePayerInfoObj(opt),
		// status: _verifyAccount(opt)
	}

	return payer;
};

export function _transactionObj(opt) {
	var items = opt.items;
	var transactions = [];

	if (!items) { return false; }

	Ember.$.each(items, function(index, value) {
		// Ammount is the only required value
		if (!value.amount) { return false; }

		transactions.push({
			amount: 					 _amountObj(value.amount),
			description: 			 value.description,
			// item_list: 				 value.item_list,
			// related_resources: value.related_resources,
			// invoice_number: 	 value.invoice_number,
			// custom: 					 value.custom,
			// soft_descriptor: 	 value.soft_descriptor,
			// payment_options: 	 value.payment_options
		});
	})
};

export function _redirectUrls(opt) {
	// body...
	console.log('MAKE REDIRECT')
};

export function _amountObj(amount) {
	var validPayPalCountries = ['USD','AUD','BRL','CAD','CZK','DKK','EUR','HKD','HUF','ILS','JPY','MYR','MXN','TWD','NZD','NOK','PHP','PLN','GBP','SGD','SEK','CHF','THB','TRY'];
	var price = amount.price;
	var countryCode;

	// Ensure we have a valid country code
	Ember.$.each(validPayPalCountries, function(index, value) {
		if (index === (validPayPalCountries.length - 1)) {
			countryCode = 'NONE';
		}

		if (value === amount.currency) {
			countryCode = amount.currency;
			return false;
		}
	});

	price = Utils._formatTotals(price);

	return {
		currency: countryCode,
		total: price,
		details: _detailsObject(amount.details)
	}
};

export function _detailsObject(details) {
	if (!details) { return ''; }

	return {
		shipping: Utils._formatTotals(details.formatShipping),
		subtotal: Utils._formatTotals(details.subtotal),
		tax: Utils._formatTotals(details.tax),
		handling_fee: Utils._formatTotals(details.handling_fee),
		insurance: Utils._formatTotals(details.insurance),
		shipping_discount: Utils._formatTotals(details.shipping_discount)
	}
}
