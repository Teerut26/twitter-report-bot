import { Client } from "discord.js";

module.exports = {
    name: "ready",
    once: true,
    execute(client: Client) {
        console.log(client.uptime);
        console.log(client.user?.username, "is Ready !");
    },
};
