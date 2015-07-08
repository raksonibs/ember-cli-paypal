import PayPal from '../services/paypal';

export function initialize(registry, application) {
  // application.inject('route', 'foo', 'service:foo');
  registry.register("paypal:main", PayPal);
  application.inject('route', 'paypal', 'paypal:main');
  application.inject('controller', 'paypal', 'paypal:main');
}

export default {
  name: 'paypal',
  initialize: initialize
};
