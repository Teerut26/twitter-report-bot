import { CommandInteraction } from "discord.js";
import moment from "moment";

module.exports = {
    data: {
        name: "uptime",
        description: "bot uptime",
    },
    async execute(interaction: CommandInteraction) {
        moment.locale("th"); 
        interaction.reply(`${moment().subtract(interaction.client.uptime as number,"milliseconds").fromNow()}`);
    },
};
