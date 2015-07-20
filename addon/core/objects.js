import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';

// *********************************************
//
// PAYPAL OBJECTS
//
// *********************************************

// PROMISES

export function _payerObj(payer) {
	return new Promise(function(resolve) {
		var payerData = {
			payment_method: payer.payment_method || 'paypal'
			// status: _verifyAccount(payer)
		};
		var fundingInstruments;
		var payerInfo;

		if (payer.payment_method !== 'paypal') {
			fundingInstruments = _fundingInstrumentsObj(payer.funding_instruments);
			payerInfo = _payerInfoObj(payer.payer_info);

			if (payerInfo.length) {
				payerData.payer_info = payerInfo;
			}
			if (fundingInstruments.length) {				
				payerData.funding_instruments	= fundingInstruments;
			}			
		}

		return resolve(payerData);
	});	
}

export function _transactionObj(transactions) {
	return new Promise(function(resolve, reject) {
		var items = transactions;
		var totalTransactions = [];

		// TODO : better errors
		if (!items) { return reject('NO TRANSACTIONS'); }

		Ember.$.each(items, function(index, value) {
			// Ammount is the only required value
			if (!value.amount) { return false; }

			totalTransactions.push({
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

		return resolve(totalTransactions);
	});		
}

export function _redirectUrls(urls) {
	return new Promise(function(resolve) {			
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

export function _fundingInstrumentsObj(funding) {
	var instruments = [];
	var credit_cardObj = {
		credit_card: {}
	};
	var credit_card_tokenObj = {
		credit_card_token: {}
	};
	var cc;

	Ember.$.each(funding, function(index, value) {
		if (value.credit_card) {
			cc = value.credit_card;
			
			Ember.$.each(cc, function(index, value) {
				if (value) {
					if (index === 'billing_address') {
						credit_cardObj.credit_card[index] = _addressObj(value);
					
					} else {
						credit_cardObj.credit_card[index] = value;	
					}
				}
			});

			instruments.push(credit_cardObj);
	      
		} else if (value.credit_card_token) {
			cc = value.credit_card_token;

			Ember.$.each(cc, function(index, value) {
				if (value) {
					if (index === 'billing_address') {
						credit_card_tokenObj.credit_card_token[index] = _addressObj(value);
					
					} else {
						credit_card_tokenObj.credit_card_token[index] = value;	
					}
				}							
			});

			instruments.push(credit_card_tokenObj);
		
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

export function _payerInfoObj(info) {
	var payer = {};

	if (!info) { return {}; }

	Ember.$.each(info, function(index, value) {
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
