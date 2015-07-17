import Ember from 'ember';
import objects from 'ember-cli-paypal/core/objects';

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
			'payer': objects._payerObj(data.payer),
			'transactions': objects._transactionObj(data.transactions),
			'redirect_urls': objects._redirectUrls(data.redirect_urls)
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


