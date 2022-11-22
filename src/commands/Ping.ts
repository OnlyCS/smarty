import { CommandInteraction, GuildMember } from 'discord.js';

import { BaseCommand, ReplyData } from '.';
import { Embed } from '../components';


export class Ping extends BaseCommand {
	constructor() {
		super('ping', 'Ping the bot');
	}

	exec(interaction: CommandInteraction): ReplyData {
		const { member, createdTimestamp } = interaction;
		const latency = Date.now() - createdTimestamp;

		const embed = new Embed(member as GuildMember)
			.setDescription(`The bot is up and the latency is ${latency} ms`);

		return {
			embed,
			ephemeral: true,
			share: { shown: true }
		};
	}
}