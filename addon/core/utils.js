import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';

// *********************************************
//
// LOW LEVEL METHODS
//
// *********************************************


export function _formatTotals(price) {
	if (!price) { return ''; }

	// Ensure amount is a string and format properly
	if (typeof price === 'string') {
		price = parseFloat(price.replace(/[^\d\.]/g,''));
	} else if (typeof price === 'number') {
		// Do nothing.
	} else {
		// TODO: PROPER ERROR HANDLING
		return 'ERROR. PRICE NEEDS TO BE NUMBER';
	}

	return price.toString();
}

export function _formatData(data) {
	return new Promise(function(resolve, reject) {
		Ember.RSVP.hash({
			'intent': 'sale',
			'payer': Utils._payerObj(data),
			'transactions': Utils._transactionObj(data),
			'redirect_urls': Utils._redirectUrls(data)
		}).then(function(hash) {
			try {
				hash = JSON.stringify(hash);	
			} catch (err) {
				return reject(err);
			}
			
			return resolve(hash);	
		});
	});
}


// *********************************************
//
// PAYPAL OBJECTS
//
// *********************************************

// PROMISES

export function _payerObj(opt) {
	return new Promise(function(resolve) {
		var payer = {
			payment_method: opt.payer.payment_method || 'paypal'
			// status: _verifyAccount(opt)
		};

		if (payer.payment_method !== 'paypal') {
			payer.funding_instruments = _fundingInstrumentsObj(opt);
			payer.payer_info = _payerInfoObj(opt);
		}

		return resolve(payer);
	});	
}

export function _transactionObj(opt) {
	return new Promise(function(resolve) {
		var items = opt.transactions;
		var transactions = [];

		if (!items) { return reject('NO TRANSACTIONS'); }

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
		});

		return resolve(transactions);
	});		
}

export function _redirectUrls(opt) {
	return new Promise(function(resolve) {
			var urls = opt.redirect_urls;
			var redirect = {
				return_url: urls && urls.return_url || window.location.href,
				cancel_url: urls && urls.cancel_url || window.location.href
			}
			return resolve(redirect);
	});
}

export function _amountObj(amount) {
	var validPayPalCountries = ['USD','AUD','BRL','CAD','CZK','DKK','EUR','HKD','HUF','ILS','JPY','MYR','MXN','TWD','NZD','NOK','PHP','PLN','GBP','SGD','SEK','CHF','THB','TRY'];
	var total = amount.total;
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

	total = Utils._formatTotals(total);

	return {
		currency: countryCode,
		total: total,
		details: _detailsObject(amount.details)
	};
}

export function _detailsObject(opt) {
	var details = {};

	if (!opt) { return {}; }

	if (opt.optformatShipping) {
		details.shipping = Utils._formatTotals(opt.formatShipping);	
	}
	if (opt.subtotal) {
		details.subtotal = Utils._formatTotals(opt.subtotal);	
	}
	if (opt.tax) {
		details.tax = Utils._formatTotals(opt.tax);	
	}
	if (opt.handling_fee) {
		details.handling_fee = Utils._formatTotals(opt.handling_fee);
	}
	if (opt.insurance) {
		details.insurance = Utils._formatTotals(opt.insurance);	
	}
	if (opt.shipping_discount) {
		details.shipping_discount = Utils._formatTotals(opt.shipping_discount);
	}	

	return details;
}

export function _fundingInstrumentsObj(opt) {
	var instruments = [];
	var credit_card = {};
	var credit_card_token = {};
	var cc;

	Ember.$.each(opt.payer.funding_instruments, function(index, value) {
		if (value.credit_card) {
			cc = value.credit_card;
			
			Ember.$.each(cc, function(index, value) {
				if (value) {
					if (index === 'billing_address') {
						credit_card[index] = _addressObj(value);
					
					} else {
						credit_card[index] = value;	
					}
				}
			});

			instruments.push(credit_card);
	      
		} else if (value.credit_card_token) {
			cc = value.credit_card_token;

			Ember.$.each(cc, function(index, value) {
				if (value) {
					if (index === 'billing_address') {
						credit_card_token[index] = _addressObj(value);
					
					} else {
						credit_card_token[index] = value;	
					}
				}							
			});

			instruments.push(credit_card_token);
		
		} 
	}); 
	
	return instruments;
}

export function _addressObj(addr) {
	var address = {};

	Ember.$.each(addr, function(index, value) {
		address[index] = value;
	});

	return address;
}

export function _payerInfoObj(obj) {
	var payer = {};

	Ember.$.each(obj, function(index, value) {
		if (value) {
			if (index === 'shipping_address') {
				payer[index] = _addressObj(value);
			} else {
				payer[index] = value;	
			}
		}					
	});

	return payer;
}

export function _verifyAccount(obj) {
	// Unknown use. Only applies to paypal
	// return 'VERIFYING ACCOUNT'
}
