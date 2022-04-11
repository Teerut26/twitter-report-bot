import { SlashCommandBuilder } from "@discordjs/builders";
import { CheerioAPI } from "cheerio";
import { CommandInteraction, MessageEmbed } from "discord.js";
import GetDataTrend from "./modules/getData";
import * as cheerio from "cheerio";

interface Field {
    name: string;
    value: string;
}

export enum TimeChoices {
    NOW = "now",
    _24H = "day",
    _7D = "week",
    _30D = "month",
    YEAR = "year",
}

module.exports = {
    data: {
        name: "trend",
        description: "รายการ Top Hashtags in Thailand",
        options: [
            {
                type: 3,
                name: "country",
                description: "ประเทศ",
                choices: [
                    {
                        name: "world-wide",
                        value: "world-wide",
                    },
                    {
                        name: "japan",
                        value: "japan",
                    },
                    {
                        name: "korea",
                        value: "korea",
                    },
                    {
                        name: "thailand",
                        value: "thailand",
                    },
                    {
                        name: "turkey",
                        value: "turkey",
                    },
                    {
                        name: "united-kingdom",
                        value: "united-kingdom",
                    },
                    {
                        name: "united-states",
                        value: "united-states",
                    },
                ],
                required: true,
            },
            {
                type: 3,
                name: "time",
                description: "ช่างเวลา",
                choices: [
                    {
                        name: "ตอนนี้",
                        value: TimeChoices.NOW,
                    },
                    {
                        name: "24 ชม.",
                        value: TimeChoices._24H,
                    },
                    {
                        name: "7 วัน",
                        value: TimeChoices._7D,
                    },
                    {
                        name: "30 วัน",
                        value: TimeChoices._30D,
                    },
                    {
                        name: "ปี",
                        value: TimeChoices.YEAR,
                    },
                ],
                required: true,
            },
        ],
    },
    async execute(interaction: CommandInteraction) {
        const country = interaction.options.getString("country");
        const time = interaction.options.getString("time");

        let getDataTrend = new GetDataTrend();

        if (country === "world-wide") {
            let res = await getDataTrend.getWorldwide(time as TimeChoices);
            let result: Array<Field> = [];
            for (let index = 0; index < 10; index++) {
                result.push({
                    name: `${res[index].index}. ${res[index].hastag}`,
                    value: `${res[index].tweets} ${res[index].record} [ดูรายละเอียด](${res[index].link})`,
                });
            }

            let embed = new MessageEmbed()
                .setColor("#1D9BF0")
                .setTitle(`${country} ${time}`)
                .setThumbnail(
                    "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
                )
                .addFields(result)
                .setFooter({
                    text: `${interaction.client.ws.ping.toString()} ms`,
                })
                .setTimestamp();
            interaction.reply({
                embeds: [embed],
            });
        } else {
            let res = await getDataTrend.getCountry(
                country as string,
                time as TimeChoices
            );
            let result: Array<Field> = [];
            for (let index = 0; index < 10; index++) {
                result.push({
                    name: `${res[index].index}. ${res[index].hastag}`,
                    value: `${res[index].tweets} ${res[index].record} [ดูรายละเอียด](${res[index].link})`,
                });
            }

            let embed = new MessageEmbed()
                .setColor("#1D9BF0")
                .setTitle("sdfsdf")
                .setThumbnail(
                    "https://play-lh.googleusercontent.com/9N5WyhIgseJWfmtPCvJwik1rumF1jeTMqhV1Rxu_zU88duWQK9btrxVr4-Sn10HbcqCs"
                )
                .addFields(result)
                .setFooter({
                    text: `${interaction.client.ws.ping.toString()} ms`,
                })
                .setTimestamp();
            interaction.reply({
                embeds: [embed],
            });
        }

        // console.log(country);
        // console.log(time);

        // await interaction.reply("Pong !");
    },
};
