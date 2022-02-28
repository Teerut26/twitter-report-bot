require("dotenv").config();
import OnInteraction from "./Event/onInteraction";
import RegisterCommand from "./register-command";
const { Client, Intents } = require("discord.js");

class Bot {
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
    this.client.on("interactionCreate", (interaction: any)=>new OnInteraction(interaction));
  }

  onReady(client: any): void {
    console.log(`Ready ${client.user.username}`);
  }

//   async onInteraction(interaction: any): Promise<void> {
    
//   }
}

new Bot();
