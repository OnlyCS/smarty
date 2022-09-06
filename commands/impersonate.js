const discord = require("discord.js");
const utils = require("../utils/utils.js");
const fs = require("fs");

const impersonators = new discord.Collection();

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("impersonate")
        .setDescription("Impersonate another user")
        .addSubcommand(subcommand => subcommand
            .setName("start")
            .setDescription("Start impersonating someone")
            .addUserOption(option => option
                .setName("person")
                .setDescription("The person to impersonate")
                .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName("stop")
            .setDescription("Stop impersonating someone")
        )
        .addSubcommand(subcommand => subcommand
            .setName("view")
            .setDescription("View current impersonations")
        )
        .toJSON(),

    async respond(interaction) {
        const user = interaction.user;
        const guild = interaction.guild;

        const embed = new discord.EmbedBuilder().setColor("#636363").setTimestamp();

        switch (interaction.options.getSubcommand()) {
            case "start":
                const target = interaction.options.getMember("person");
                embed.setDescription(`Started impersonating ${target.displayName}`)
                    .setTimestamp()
                    .setFooter({ text: "became a ventriloquist", iconURL: interaction.member.user.avatarURL() });
                
                impersonators.set(user.id, target.user.id);
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case "stop":
                embed.setDescription(`Stopped impersonating ${guild.members.cache.get(impersonators.get(user.id)).displayName}`)
                    .setFooter({ text: "left the criminal underworld", iconURL: interaction.member.user.avatarURL() });

                impersonators.delete(user.id)
                await interaction.reply({ embeds: [embed], ephemeral: true });
                break;

            case "view":
                if (impersonators.length > 0) {
                    const text = [];

                    impersonators.keys.forEach(key => {
                        const impersonator = guild.members.cache.get(key).displayName;
                        const target = guild.members.cache.get(impersonators.get(key)).displayName;
                        text.push(`${impersonator} is impersonating ${target}`);
                    })

                    embed.setTitle("Current impersonations")
                        .setDescription(text.join("\n"))
                        .setFooter({ text: "exposed the impersonators", iconURL: interaction.member.user.avatarURL() });

                    await interaction.reply({ embeds: [embed] });
                } else {
                    await interaction.reply("No one is impersonating anyone");
                }

                break;
        }
    }
}