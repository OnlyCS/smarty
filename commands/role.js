const discord = require("discord.js");
const utils = require("../utils/utils.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("role")
        .setDescription("Change your role's name and color")
        .addStringOption(option => option
            .setName("color")
            .setDescription("What to change the role's color to")
            .setRequired(false)
        )
        .addStringOption(option => option
            .setName("name")
            .setDescription("What to change the role's name to")
            .setRequired(false)
        )
        .toJSON(),

    async respond(interaction) {
        const { client, guild, member, options } = interaction;
        const color = (options.getString("color") || "").replace("#", "");
        const name = options.getString("name");

        const embed = utils.embed(member);

        await interaction.deferReply({ ephemeral: true });

        const humans = await guild.roles.fetch(client.config.roles.humans);
        const custom = await (member.roles.cache.find(role => role.color !== 0) ||
            (await guild.roles.create({ name: member.displayName, position: humans.position - 1 }))
                .setColor("FFFFFF"));

        await member.roles.add(custom);

        if (color) {
            if (!/^[0-9A-F]{6}$/i.test(color)) embed.setDescription(`Not a valid hex code.`)
            else await custom.setColor((color === "000000") ? "000001" : color);
        }

        if (name) {
            if (name.length > 100) embed.setDescription(`Name must be 100 characters or fewer.`)
            else await custom.setName(name);
        }

        embed.setDescription((color || name) ?
            `<@&${custom.id}> updated.` :
            `<@&${custom.id}> has the name ${custom.name} and the color \`${custom.hexColor}\`.`
        );

        await interaction.editReply({ embeds: [embed], ephemeral: true, components: [utils.share.button()] });

        return interaction;
    }
}