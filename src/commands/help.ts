import { CommandInteraction } from "discord.js";
const help = require("../embeds/help");

module.exports = async (interaction: CommandInteraction) => {
  return help(interaction);
};
