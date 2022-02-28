export default class OnInteraction {
  constructor(interaction: any) {
    this.onInteraction(interaction);
  }

  async onInteraction(interaction: any): Promise<void> {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
      case "ping":
        return await interaction.reply("Pong!");
      default:
        break;
    }
  }
}
