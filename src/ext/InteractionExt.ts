import { ShareButton } from '../components';


export class InternalInteractionExt {
	interaction: any;

	constructor(interaction: any) {
		this.interaction = interaction;
	}

	async addShareListener(sharable = true) {
		const button = ShareButton(!sharable);
		const reply = await this.interaction.fetchReply();

		reply.awaitMessageComponent(button => button.customId === 'share')
			.then(press => {
				press.reply({ embeds: reply.embeds });
				this.interaction.editReply({ embeds: reply.embeds, components: [button] });
			})
			.catch(() => null);
	}
}

export class InteractionExt {
	static create(message: any) {
		const ext = new InternalInteractionExt(message);

		return new Proxy(ext, {
			get(target, prop, receiver) {
				if (ext[prop]) return Reflect.get(target, prop, receiver);
				return Reflect.get(target.interaction, prop, receiver);
			},
			set(target, prop, value, receiver) {
				if (ext[prop]) return Reflect.set(target, prop, value, receiver);
				return Reflect.set(target.interaction, prop, receiver);
			}
		}) as any;
	}
}