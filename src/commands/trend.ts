import { CommandInteraction } from "discord.js";
import { MessageEmbedType1, MessageEmbedType2 } from "../embeds/trend";
import { TimeChoices } from "../enum/command/TimeChoices";
import { getDataType1, getDataType2 } from "./../modules/trend";

module.exports = async (interaction: CommandInteraction) => {
  switch (interaction.options.getString("time")) {
    case TimeChoices.NOW:
      return MessageEmbedType2(interaction, TimeChoices.NOW, await getDataType2(TimeChoices.NOW));
    case TimeChoices._24H:
      return MessageEmbedType1(interaction, TimeChoices._24H, await getDataType1(TimeChoices._24H));
    case TimeChoices._7D:
        return MessageEmbedType1(interaction, TimeChoices._7D, await getDataType1(TimeChoices._7D));
    case TimeChoices._30D:
        return MessageEmbedType1(interaction, TimeChoices._30D, await getDataType1(TimeChoices._30D));
    case TimeChoices.YEAR:
        return MessageEmbedType1(interaction, TimeChoices.YEAR, await getDataType1(TimeChoices.YEAR));
    default:
      break;
  }
};
