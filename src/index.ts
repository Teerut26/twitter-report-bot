require("dotenv").config();
import RegisterCommand from "./register-command";
const { Client, Intents } = require("discord.js");

class WatchActivity {
  private token = process.env.TOKEN;
  private client: any;

  constructor() {
    this.client = new Client({
      intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      ],
    });
    new RegisterCommand();
    this.client.login(this.token);
    this.client.on("ready", this.onReady);
    this.client.on("interactionCreate", this.onInteraction);
  }

  onReady(client: any): void {
    console.log(`Ready ${client.user.username}`);
  }

  async onInteraction(interaction: any): Promise<void> {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'ping') {
      await interaction.reply('Pong!');
    }
  }
}

new WatchActivity();
