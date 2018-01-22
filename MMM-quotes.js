Module.register('MMM-quotes',{
	// Module config defaults.
	defaults: {
		services: [ 'favqs', 'forismatic_en' ],
		showAuthor: true,
		updateInterval: 30000,
		fadeSpeed: 4000,
		classes: 'medium bright',
		authorClasses: 'small normal align-right',
	},
	
	// Define start sequence.
	start: function() {
		Log.info('Starting module: ' + this.name);
		
		this.quote = {content: '', author: ''};
		
		var self = this;
		this.interval = setInterval(function() {
			self.getNewQuote();
		}, this.config.updateInterval);
		
		this.getNewQuote();
		
	},
	
	getNewQuote: function() {
		var service = this.config.services[ Math.floor(Math.random() * this.config.services.length) ];
		this.sendSocketNotification('GET_NEW_QUOTE', { service: service });
	},
	
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'NEW_QUOTE') {
			this.quote = payload;
			this.updateDom(this.config.fadeSpeed);
		}
	},
	
	getDom: function() {
		var content = document.createTextNode(this.quote.content);
		var wrapper = document.createElement('div');
		wrapper.className = this.config.classes;
		wrapper.appendChild(content);
		
		// show the quote's author
		if (this.config.showAuthor) {
			var author = document.createTextNode(this.quote.author);
			var authorWrapper = document.createElement('div');
			authorWrapper.className = this.config.authorClasses;
			authorWrapper.appendChild(author);
			wrapper.appendChild(authorWrapper);
		}
		return wrapper;
	},
	
});
