import {
  CommandInteraction,
  MessageEmbed,
} from "discord.js";
import { TimeChoices } from "../enum/command/TimeChoices";

export const MessageEmbedType1 = async (
  interaction: CommandInteraction,
  timeChoices: TimeChoices,
  data: any
) => {
  const result = data.map((item: any) => ({
    name: `${item.index}. ${item.hastag}`,
    value: `${item.tweets} ${item.record} [ดูรายละเอียด](${item.link})`,
  }));

  let embed = new MessageEmbed()
    .setColor("#1D9BF0")
    .setTitle(timeChoices)
    .setThumbnail(
      "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
    )
    .addFields(result)
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
    const result = data.map((item: any) => ({
      name: `${item.index}. ${item.hastag}`,
      value: `${item.tweets} [ดูรายละเอียด](${item.link})`,
    }));
  
    let embed = new MessageEmbed()
      .setColor("#1D9BF0")
      .setTitle(timeChoices)
      .setThumbnail(
        "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
      )
      .addFields(result)
      .setTimestamp();
    interaction.reply({
      embeds: [embed],
    });
  };
