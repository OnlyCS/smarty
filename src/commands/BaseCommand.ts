import { CommandInteraction, EmbedBuilder, ModalSubmitInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody, SlashCommandBuilder } from 'discord.js';
import { ShareButton } from '../components';


export interface ReplyData {
	embed: EmbedBuilder
	ephemeral: boolean
	share: {
		shown: boolean
		disabled?: boolean
	}
}

export abstract class BaseCommand {
	data: RESTPostAPIChatInputApplicationCommandsJSONBody;

	constructor(name: string, description: string) {
		this.data = new SlashCommandBuilder()
			.setName(name)
			.setDescription(description)
			.toJSON();
	}

	run(interaction: CommandInteraction | ModalSubmitInteraction): Promise<CommandInteraction | ModalSubmitInteraction> {
		return this.reply(this.exec(interaction), interaction);
	}

	async reply(data: ReplyData, interaction: CommandInteraction | ModalSubmitInteraction): Promise<CommandInteraction | ModalSubmitInteraction> {
		if (Object.keys(data).length == 0) throw new Error('You havent initalized this properly');

		const embeds = [data.embed];
		const ephemeral = data.ephemeral;
		const components = data.share.shown
			? [ShareButton(data.share.disabled || false)] as any
			: [];

		await interaction.reply({ embeds, ephemeral, components });
		return interaction;
	}

	abstract exec(interaction: CommandInteraction | ModalSubmitInteraction): ReplyData;
}