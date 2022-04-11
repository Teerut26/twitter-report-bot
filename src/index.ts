import { Client, Collection, Intents } from "discord.js";
import fs from "fs";

const client = new Client({ intents: [Intents.FLAGS.GUILDS] }); //เราไม่จำเป็นต้องใช้ FLAGS.GUILD_MESSAGES อีกแล้ว เนื่องจาก interaction มีให้เราทุกอย่าง

//ทำการโหลดไฟล์คำสั่งเข้าบอท
client.commands = new Collection();
const commandFiles = fs
    .readdirSync("./commands")

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs
    .readdirSync("./events")

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(process.env.TOKEN);
