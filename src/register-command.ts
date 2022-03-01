import { TimeChoices } from "./enum/command/TimeChoices";
import { CommandOptionType } from "./enum/CommandOptionType";

require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const path = require("path");

export default class RegisterCommand {
  private commands: Array<Object> = [
    {
      name: "trend",
      description: "รายการ Top Hashtags in Thailand",
      options: [
        {
          name: "time",
          description: "ช่างเวลา",
          required: true,
          type: CommandOptionType.STRING,
          choices: [
            {
              name: "ตอนนี้",
              value: TimeChoices.NOW,
              type: CommandOptionType.STRING,
            },
            {
              name: "24 ชม",
              value: TimeChoices._24H,
              type: CommandOptionType.STRING,
            },
            {
              name: "7 วัน",
              value: TimeChoices._7D,
              type: CommandOptionType.STRING,
            },
            {
              name: "30 วัน",
              value: TimeChoices._30D,
              type: CommandOptionType.STRING,
            },
            {
              name: "ปี",
              value: TimeChoices.YEAR,
              type: CommandOptionType.STRING,
            },
          ],
        },
      ],
    },
    {
        name:"help",
        description: "ช่วยเหลือ"
    }
  ];

  private client_id = process.env.CLIENT_ID;
  private guild_id = process.env.GUILD_ID;
  private rest: any;

  constructor() {
    this.rest = new REST({ version: "9" }).setToken(process.env.TOKEN);
    console.log(path.join(__dirname, "commands"));

    this.register();
  }

  register(): void {
    (async () => {
      try {
        console.log("Started refreshing application (/) commands.");

        await this.rest.put(
          Routes.applicationGuildCommands(this.client_id, this.guild_id),
          { body: this.commands }
        );

        console.log("Successfully reloaded application (/) commands.");
      } catch (error) {
        console.error(error);
      }
    })();
  }
}
