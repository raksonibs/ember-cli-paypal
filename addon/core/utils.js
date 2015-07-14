import Ember from 'ember';
import Utils from 'ember-cli-paypal/core/utils';


export function _formatTotals(price) {
	if (!price) { return ''; }

	// Ensure amount is a string and format properly
	if (typeof price === 'string') {
		price = parseFloat(price.replace(/[^\d\.]/g,''));
	} else if (typeof price === 'number') {
		// Do nothing.
	} else {
		// TODO: PROPER ERROR HANDLING
		return 'ERROR. PRICE NEEDS TO BE NUMBER'
	}

	return price.toString();
}



// For Credit-card transactions

export function _makeFundingInstrumentsObj(opt) {
	// https://developer.paypal.com/docs/api/#fundinginstrument-object
	// not necessary for direct paypal payments (i think)
	// return 'MAKING FUNDING INSTRUMENTS OBJ'
}

export function _makePayerInfoObj(obj) {
	// https://developer.paypal.com/docs/api/#payerinfo-object
	// not necessary. Paypal fills this in directly when payment_method is set to paypal
	// return 'MAKING PAYER INFO'
}

export function _verifyAccount(obj) {
	// Unknown use. Only applies to paypal
	// return 'VERIFYING ACCOUNT'
}
