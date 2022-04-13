import { Client } from "discord.js";
import cron from "node-cron";
import GetDataTrend from "../commands/trend/modules/getData";

module.exports = {
    name: "ready",
    once: true,
    async execute(client: Client) {
        const getDataTrend = new GetDataTrend();
        let resInit = await getDataTrend.getCountry("thailand", "now");

        
        //init
        let indexInit = 0;
        let intervalKeyInit = setInterval(async () => {
            if (indexInit > 9) indexInit = 0;
            console.log(
                `>> ${indexInit + 1}. ${resInit[indexInit].hastag as string} ${
                    resInit[indexInit].tweets as string
                } >> ${new Date().toLocaleString("th-TH")}`
            );
            await client.user?.setActivity({
                name: `${indexInit + 1}. ${
                    resInit[indexInit].hastag as string
                } | ${resInit[indexInit].tweets as string}`,
                type: "WATCHING",
            });
            indexInit += 1;
        }, 5000);



        //corn
        let cronIntervalLists: NodeJS.Timer[] = [];
        cron.schedule("*/5 * * * *", async () => {
            clearInterval(intervalKeyInit);
            cronIntervalLists.map((cronIntervalList) => clearInterval(cronIntervalList));
            let res = await getDataTrend.getCountry("thailand", "now");

            let index = 0;
            let cronInterval = setInterval(async () => {
                if (index > 9) index = 0;
                console.log(
                    `>> ${indexInit + 1}. ${res[index].hastag as string} ${
                        res[index].tweets as string
                    } >> ${new Date().toLocaleString("th-TH")}`
                );
                await client.user?.setActivity({
                    name: `${indexInit + 1}. ${res[index].hastag as string} | ${
                        res[index].tweets as string
                    }`,
                    type: "WATCHING",
                });
                index += 1;
            }, 5000);
            cronIntervalLists.push(cronInterval);
        });
        console.log(client.user?.username, "is Ready !");
    },
};
