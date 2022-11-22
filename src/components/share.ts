import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';


export const ShareButton = (disabled = false) =>
	new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setCustomId('share')
				.setLabel('Share')
				.setStyle(ButtonStyle.Secondary)
				.setDisabled(disabled)
		);