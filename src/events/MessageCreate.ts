import { Message, TextChannel } from 'discord.js';
import { MessageExt } from '../ext';
import config from '../config';


export async function MessageCreate(discordMessage: Message) {
	const message = MessageExt.create(discordMessage);

	const { author, channel, client, guild, mentions } = message;
	const { verify, news, chat } = config.channels;

	if (channel.id == verify) return await message.delete().catch(() => null);
	if (author.id == client.user.id) return;

	if (channel.id == news) {
		const everyone = mentions.everyone;
		const chatChannel = await guild.channels.fetch(chat);
		await message.clone(chatChannel as TextChannel, !everyone);
	}
}