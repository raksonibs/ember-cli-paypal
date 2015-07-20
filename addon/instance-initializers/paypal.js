export function initialize(instance) {
  var config = instance.container.lookupFactory('config:environment');
  var service = instance.container.lookup('paypal:main');
  service.set('clientId', config.paypal.clientId);
  service.set('clientSecret', config.paypal.clientSecret);  
}

export default {
  name: 'paypal',
  initialize: initialize
};
