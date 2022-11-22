import { CommandInteraction, ModalSubmitInteraction } from 'discord.js';
import { InteractionExt, InteractionExtType } from '../ext';

import commands from '../commands';
import config from '../config';


type CommandIExt = InteractionExtType & CommandInteraction;
type ModalSubmitIExt = InteractionExtType & ModalSubmitInteraction;

export async function InteractionCreate(discordInteraction) {
	const interaction = InteractionExt.create(discordInteraction) as CommandIExt | ModalSubmitIExt;

	const { commandName, channel } = interaction as CommandIExt;
	const { customId } = interaction as ModalSubmitIExt;

	if (channel.id == config.channels.news) return;

	if (interaction.isCommand())
		commands.get(commandName)
			.run(interaction)
			.then(() => interaction.addShareListener());

	if (interaction.isModalSubmit())
		commands.get(customId.split('_')[0])
			.run(interaction)
			.catch(() => null);
}