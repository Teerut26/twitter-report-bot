import { CommandInteraction, MessageEmbed } from "discord.js";
import { TimeChoices } from "../enum/command/TimeChoices";

interface Field {
  name: string;
  value: string;
}

export const MessageEmbedType1 = async (
  interaction: CommandInteraction,
  timeChoices: TimeChoices,
  data: any
) => {
  let result: Array<Field> = [];
  for (let index = 0; index < 10; index++) {
    result.push({
      name: `${data[index].index}. ${data[index].hastag}`,
      value: `${data[index].tweets} ${data[index].record} [ดูรายละเอียด](${data[index].link})`,
    });
  }

  let embed = new MessageEmbed()
    .setColor("#1D9BF0")
    .setTitle(timeChoices)
    .setThumbnail(
      "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
    )
    .addFields(result)
    .setFooter({ text: `${interaction.client.ws.ping.toString()} ms` })
    .setTimestamp();
  interaction.reply({
    embeds: [embed],
  });
};

export const MessageEmbedType2 = async (
  interaction: CommandInteraction,
  timeChoices: TimeChoices.NOW,
  data: any
) => {
  let result: Array<Field> = [];
  for (let index = 0; index < 10; index++) {
    result.push({
      name: `${data[index].index}. ${data[index].hastag}`,
      value: `${data[index].tweets} [ดูรายละเอียด](${data[index].link})`,
    });
  }

  let embed = new MessageEmbed()
    .setColor("#1D9BF0")
    .setTitle(timeChoices)
    .setThumbnail(
      "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
    )
    .addFields(result)
    .setFooter({ text: `${interaction.client.ws.ping.toString()} ms` })
    .setTimestamp();
  interaction.reply({
    embeds: [embed],
  });
};
