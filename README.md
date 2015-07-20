# Ember-cli-paypal

### NOTE: This addon is VERY alpha. 

TODO: (feel free to help)
- Tests!!
- Proper error handling
- yudoc / jsdoc inline documentation
- The rest of the PayPal REST API (ha!)

## Installation:
`npm install --save-dev ember-cli-paypal`

## Usage
In your `config/environments.js` add the following values:
```
ENV.paypal: {
    endPoint: '',
    clientId: '',
    secret: ''
}
```

Your `endPoint` will either be `'https://api.sandbox.paypal.com'` or `'https://api.paypal.com'` depending on your environment. Your `clientId` and `secret` are provided by your [PayPal Developer Account](https://developer.paypal.com/developer/).

Currently, the only REST endpoint supported is `POST /v1/payments/payment`. Specifically, payment with a credit card. 

The following is the minimum data and proper format necessary to complete a transaction:
```
var data = {
    "intent": "sale",
    "payer": {
        "payment_method": "credit_card",
        "funding_instruments": [{
            "credit_card": {
                "type": "visa",
                "number": "4111111111111111",
                "expire_month": 2,
                "expire_year": 2018,
                "cvv2": "123",
                "first_name": "test",
                "last_name": "test",
                "billing_address": {
                    "line1": "123 street",
                    "city": "CityVille",
                    "state": "CA",
                    "postal_code": "12345",
                    "country_code": "US"
                }
            }
        }]
    },
    "transactions": [{
        "amount": {
            "currency": "USD",
            "total": "30",
            "details": {
                "subtotal": "30"
            }
        },
        "description": "FE test"
    }],
    "redirect_urls": {
        "return_url": "http://localhost:9000/billing",
        "cancel_url": "http://localhost:9000/billing"
    }
}
```
Refer to [here](https://gist.github.com/JDillon522/baa79eb1a4e47b06be60) for a (mostly) complete schema of possible inputs.

### Methods:

##### `this.paypal.submitPayment(data, callback)` : 
Submit payment data to paypal's api. The callback will return the response from the API for you to handle as you wish.

## Contributing:
Yes Please.

I would gratefully appreciate any help to improve this addon. 

