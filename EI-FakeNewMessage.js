"use strict";

/**
 * Zeigt einen nach einer zufälligen Zeit eine neue Nachricht an
 */
Module.register("EI-FakeNewMessage", {

	// Module config defaults.
	defaults: {
		messages: [
			"Christine<br>Willst du heute Abend ins Kino gehen?",
			"Tom<br>Vergiss bitte nicht, dass du heute Julia abholen musst.",
			"Lucas<br>Willst du morgen Abend Essen gehen?",
			"Steffen<br>Geht klar, bis später.",
			"Karolin<br>Ich komme heute etwas später nach Hause."
		],
		maxTime: 180, // in seconds
		minTime: 10
	},

	time: 170,
	randomTime: 10,

	// Define start sequence.
	start: function() {
		const self = this;
		Log.info("Starting module: " + self.name);

		self.time = self.config.maxTime - self.config.minTime;
		setInterval(function(){ self.sendFakeMessage(); }, 1000);
	},

	sendFakeMessage: function() {
		const self = this;

		if (self.randomTime <= 0) {
			let randomNumber = Math.random() * (self.config.messages.length - 1);
			let msgIndex = Math.floor(randomNumber);
			self.sendNotification(
					"SHOW_ALERT",
					{
						type:"notification",
						message: self.config.messages[msgIndex],
						timer: 5000
					});

			self.randomTime = Math.floor(
					(Math.random() * self.time) + self.config.minTime);
		} else{
			self.randomTime -= 1;
		}
	}
});
