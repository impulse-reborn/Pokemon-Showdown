'use strict';

let messages = [
	`has vanished into nothingness!`,
	`used Explosion!`,
	`fell into the void.`,
	`went into a cave without a repel!`,
	`has left the building.`,
	`was forced to give StevoDuhHero's mom an oil massage!`,
	`was hit by Magikarp's Revenge!`,
	`ate a bomb!`,
	`is blasting off again!`,
	`(Quit: oh god how did this get here i am not good with computer)`,
	`was unfortunate and didn't get a cool message.`,
	`{{user}}'s mama accidently kicked {{user}} from the server!`,
	`felt Insist's wrath.`,
	`got rekt by Travis CI!`,
	`exited life.exe.`,
	`found a species called "friends" (whatever that means).`,
];

exports.commands = {
	d: "poof",
	cpoof: "poof",
	poof: function (target, room, user) {
		if (Config.poofOff) return this.errorReply("Poof is currently disabled.");
		if (target && !this.can("broadcast")) return false;
		if (room.id !== "lobby") return false;
		let message = target || messages[Math.floor(Math.random() * messages.length)];
		if (message.indexOf(`{{user}}`) < 0) message = `{{user}} ${message}`;
		message = message.replace(/{{user}}/g, user.name);
		if (!this.canTalk(message)) return false;

		let colour = "#" + [1, 1, 1].map(function () {
			let part = Math.floor(Math.random() * 0xaa);
			return (part < 0x10 ? "0" : "") + part.toString(16);
		}).join("");

		room.addRaw(`<strong><font color="${colour}">~~ ${message} ~~</font></strong>`);
		user.disconnectAll();
	},
	poofhelp: ["/poof - Disconnects the user and leaves a message in the room."],

	poofon: function () {
		if (!this.can("hotpatch")) return false;
		Config.poofOff = false;
		return this.sendReply("Poof is now enabled.");
	},
	poofonhelp: ["/poofon - Enable the use /poof command."],

	nopoof: "poofoff",
	poofoff: function () {
		if (!this.can("hotpatch")) return false;
		Config.poofOff = true;
		return this.sendReply("Poof is now disabled.");
	},
	poofoffhelp: ["/poofoff - Disable the use of the /poof command."],
};
