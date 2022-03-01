import { CommandInteraction } from "discord.js";

const trend = require("../commands/trend")
export default class OnInteraction {
  constructor(interaction: CommandInteraction) {
    this.onInteraction(interaction);
  }

  async onInteraction(interaction: any): Promise<void> {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
      case "trend":
        return trend(interaction)
      default:
        break;
    }
  }
}
