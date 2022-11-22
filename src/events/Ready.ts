import { Client } from 'discord.js';

import commands from '../commands';
import config from '../config';


export async function Ready(client: Client) {
	const guild = await client.guilds.fetch(config.guild);
	const data = [];

	commands.forEach(data.push);
	data.map(d => d.data);

	await guild.commands.set(data);
	await guild.members.fetch();
	await guild.roles.fetch();
	await guild.channels.fetch();
	await guild.invites.fetch();
	await guild.emojis.fetch();

	guild.roles.cache.filter(r => r.members.size == 0).forEach(r => r.delete());
	client.user.setActivity('with fire', { type: 0 });
}