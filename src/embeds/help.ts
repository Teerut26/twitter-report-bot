import { CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
// import { TimeChoices } from "../enum/command/TimeChoices";

module.exports = async (interaction: CommandInteraction) => {
  let embed = new MessageEmbed()
    .setColor("#1D9BF0")
    .setTitle("รายการคำสั้ง")
    .addField("/trend", `trend twitter`);
  const row = new MessageActionRow().addComponents(
    new MessageButton()
      .setCustomId("primary")
      .setLabel("Primary")
      .setStyle("PRIMARY")
  );
  interaction.reply({
    embeds: [embed],
    components:[row]
  });
};
