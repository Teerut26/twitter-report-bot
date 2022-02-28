export default class OnInteraction {
  constructor(interaction: any) {
    this.onInteraction(interaction);
  }

  async onInteraction(interaction: any): Promise<void> {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  }
}
