import { Message, TextChannel, bold } from 'discord.js';


class InternalMessageExt {
	message: Message;

	constructor(message: Message) {
		this.message = message;
	}

	async clone(dest: TextChannel, remove: boolean) {
		const webhook = (await dest.fetchWebhooks()).first() || await dest.createWebhook({ name: 'Smarty' });

		const { attachments, author, channel, content, embeds, member, reference, type, url } = this.message;

		let reply: string;

		if (reference && type == 19) {
			const replied = MessageExt.create(await channel.messages.fetch(reference.messageId));
			const { member, author } = replied.message;
			const truncated = replied.truncate(30);

			reply = '<:curved:1034653422416302151> '
				+ bold(member?.displayName || author?.username || 'Anonymous')
				+ ` ${truncated}\n`
				+ '<:straight:1034653871613681714>\n ';
		}

		await webhook.send({
			allowedMentions: { parse: [] },
			avatarURL: member?.displayAvatarURL() || null,
			content: reply + content + (!remove ? `\n[[jump]](${url})` : '') || '',
			embeds: [...embeds],
			files: [...(attachments?.values() || [null])],
			username: member?.displayName || author?.username || 'Anonymous'
		}).catch(() => null);

		if (remove) await this.message.delete().catch(() => null);
	}

	truncate(length: number): string {
		if (this.message.content.length > length) return this.message.content.slice(0, length - 3) + '...';
		return this.message.content;
	}
}

export class MessageExt {
	static create(message: Message): Message & InternalMessageExt {
		const ext = new InternalMessageExt(message);

		return new Proxy(ext, {
			get(target, prop, receiver) {
				if (ext[prop]) return Reflect.get(target, prop, receiver);
				return Reflect.get(target.message, prop, receiver);
			},
			set(target, prop, value, receiver) {
				if (ext[prop]) return Reflect.set(target, prop, value, receiver);
				return Reflect.set(target.message, prop, receiver);
			}
		}) as Message & InternalMessageExt;
	}
}

export const MessageExtType = InternalMessageExt;