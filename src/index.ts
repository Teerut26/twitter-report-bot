import { registerFont } from "canvas";
import { Client, Collection, Intents } from "discord.js";
import fs from "fs";
import path from "path";
import "./push_command"
require("dotenv").config();

declare module "discord.js" {
    export interface Client {
        commands: Collection<unknown, any>;
    }
}

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const fontFiles = fs.readdirSync("fonts");
console.log(`------------loads font------------`);
for (const file of fontFiles) {
    console.log(`[X] ${file}`);
    registerFont(`fonts/${file}`, {
        family: "twitter",
    });
}
console.log(`------------loads success------------`);

client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, "commands"))
// .filter(file => file.match( /.ts|.js/g ));

console.log(`------------load commands------------`)
for (const file of commandFiles) {
    console.log(`[X] ${file}`)
    const command = require(`${path.join(__dirname, "commands")}/${file}`);
    client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync(path.join(__dirname, "events")).filter(file => file.match( /.ts|.js/g ));

console.log(`------------load events------------`)
for (const file of eventFiles) {
    console.log(`[X] ${file}`)
    const event = require(`${path.join(__dirname, "events")}/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
console.log(`------------success------------`)

client.login(process.env.TOKEN);

//ref https://github.com/manybaht/manybaht-music
