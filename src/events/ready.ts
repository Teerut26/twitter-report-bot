import { Client } from "discord.js";
import cron from "node-cron";
import GetDataTrend from "../commands/trend/modules/getData";

module.exports = {
    name: "ready",
    once: true,
    async execute(client: Client) {
        const getDataTrend = new GetDataTrend();

        let res = await getDataTrend.getCountry("thailand", "now");
        console.log(
            `>> ${res[0].hastag as string} ${
                res[0].tweets as string
            } >> ${new Date().toLocaleString("th-TH")}`
        );
        client.user?.setActivity({
            name: `${res[0].hastag as string} | ${res[0].tweets as string}`,
            type: "WATCHING",
        });

        cron.schedule("5 * * * *", async () => {
            let res = await getDataTrend.getCountry("thailand", "now");
            console.log(
                `>> ${res[0].hastag as string} ${
                    res[0].tweets as string
                } >> ${new Date().toLocaleString("th-TH")}`
            );
            client.user?.setActivity({
                name: `${res[0].hastag as string} | ${res[0].tweets as string}`,
                type: "WATCHING",
            });
        });

        console.log(client.user?.username, "is Ready !");
    },
};
