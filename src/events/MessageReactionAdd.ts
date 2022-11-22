import { Message, MessageReaction, TextChannel, User } from 'discord.js';
import { MessageExt } from '../ext';

import config from '../config';


export async function MessageReactionAdd(reaction: MessageReaction, user: User) {
	const { emoji, me, message: discordMessage } = reaction;

	const message = MessageExt.create(discordMessage as Message);
	const starred = await message.guild.channels.fetch(config.channels.starred);

	await reaction.fetch().catch(() => null);
	if (emoji.name != '📌' || me || user.bot) return;

	await message.react('📌');
	await message.clone(starred as TextChannel, false);
}