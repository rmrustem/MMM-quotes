
var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
	
	services: {
		favqs: {
			url: 'https://favqs.com/api/qotd',
			content: function(json) { return json.quote.body },
			author: function(json) { return json.quote.author },
		},
		forismatic_en: {
			url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en',
			content: function(json) { return json.quoteText },
			author: function(json) { return json.quoteAuthor },
		},
		forismatic_ru: {
			url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru',
			content: function(json) { return json.quoteText },
			author: function(json) { return json.quoteAuthor }
		},
	},
	
	start: function() {
		console.log('Starting node helper: ' + this.name);
	},
	
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		
		if(notification === 'GET_NEW_QUOTE') {
			if (payload.service in this.services) {
				var service = this.services[payload.service];
				request(service.url, function (error, response, body) {
					if (!error && response.statusCode == 200) {
						try {
							var json = JSON.parse(body);
							self.sendSocketNotification('NEW_QUOTE', {
								content: service.content(json),
								author: service.author(json),
							});
						} catch (e) {
							// JSON parsing failed
						}
					}
				});
			}
		}
	},
});
