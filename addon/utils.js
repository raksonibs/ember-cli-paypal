import Ember from 'ember';
// import config from './config/environment';

// var clientID = 'AYZnZPw0ztH2YZARlYelfsBqQbB3sW6UDxqPeHgD8Jxg7z-f59Pz9CrQMUn_6TgyiQtyNLsQJz2C1BDi';
// var secret = 'EJSTRmMNrPs-pYjUNCsi5u_HVBZTDZiVSYGCn_B2SOVbB1PE0u-kqsJs_EUpUOggaxI8_5PhnxbT6Vz3';

// export function getToken(options) {
// 	var auth = 'Basic ' + btoa(clientID + ':' + secret);
// 	var data = { 'grant_type' : 'client_credentials' };
// 	var path = '/v1/oauth2/token';

// 	Ember.$.ajax({
// 		url: 'https://api.sandbox.paypal.com' + path,
// 		method: 'POST',
// 		beforeSend: function(xhr) {
// 			xhr.setRequestHeader('Authorization', auth);
// 		},
// 		data: data,
// 		success: function(success) {
// 			window.localStorage.pptoken = success.access_token;
// 		}
// 	});
// };
