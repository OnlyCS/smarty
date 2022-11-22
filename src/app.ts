import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { InteractionCreate, MessageCreate, MessageReactionAdd, Ready } from './events';


const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions
	],
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.User,
		Partials.GuildMember
	]
});

client.on('interactionCreate', InteractionCreate);
client.on('messageCreate', MessageCreate);
client.on('messageReactionAdd', MessageReactionAdd);
client.on('ready', Ready);

client.login(process.env.TOKEN);