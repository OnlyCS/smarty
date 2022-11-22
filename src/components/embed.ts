import { EmbedBuilder, GuildMember } from 'discord.js';


export class Embed extends EmbedBuilder {
	constructor(member: GuildMember) {
		super();

		this
			.setColor('#2F3136')
			.setTimestamp()
			.setFooter({ text: '​', iconURL: member.displayAvatarURL()});
	}
}