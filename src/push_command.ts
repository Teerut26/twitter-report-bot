const { REST } = require("@discordjs/rest");
import { Routes } from "discord-api-types/v9";
import fs from "fs";
import path from "path";
require("dotenv").config();

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, "commands"));

for (const file of commandFiles) {
    const command = require(`${path.join(__dirname, "commands")}/${file}`);
    commands.push(command.data);
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        if (process.env.NODE_ENV === "development") {
            console.log("development");
            await rest.put(
                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID as string,
                    process.env.GUILD_ID as string
                ),
                { body: commands }
            );
        } else if (process.env.NODE_ENV === "production") {
            console.log("production");
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID as string),
                {
                    body: commands,
                }
            );
        }else {
            throw new Error("not found NODE_ENV");
            
        }

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
