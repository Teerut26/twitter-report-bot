import { TimeChoices } from "../enum/command/time_choices";

module.exports = async (interaction: any) => {
  switch (interaction.options.getString("time")) {
    case TimeChoices.NOW:
      return await interaction.reply(TimeChoices.NOW);
    case TimeChoices.MOST_TWEETED:
      return await interaction.reply(TimeChoices.MOST_TWEETED);
    case TimeChoices._24H:
      return await interaction.reply(TimeChoices._24H);
    case TimeChoices._7D:
      return await interaction.reply(TimeChoices._7D);
    case TimeChoices._30D:
      return await interaction.reply(TimeChoices._30D);
    case TimeChoices.YEAR:
      return await interaction.reply(TimeChoices.YEAR);
    default:
      break;
  }
};
