export default {
	guild: process.env.GUILD_ID,
	channels: {
		starred: process.env.STARRED,
		news: process.env.NEWS,
		chat: process.env.CHAT,
		verify: process.env.VERIFY
	},
	roles: {
		humans: process.env.HUMANS,
		overrides: process.env.OVERRIDES,
		bots: process.env.BOTS
	},
	admins: process.env.ADMINS.split(','),
	home: process.env.HOME,
	token: process.env.TOKEN
};
