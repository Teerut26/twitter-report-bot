import { CommandInteraction } from "discord.js";

module.exports = {
    name: "interactionCreate",
    async execute(interaction: CommandInteraction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(
            interaction.commandName
        );

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: "Error trying to executing this command.",
                ephemeral: true,
            });
        }
    },
};
