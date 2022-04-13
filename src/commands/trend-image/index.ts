import {
    CommandInteraction,
    MessageAttachment,
} from "discord.js";
import GetDataTrend, { ResponseInterface } from "../trend/modules/getData";
import { createCanvas } from "canvas";


const choicesCountry = [
    {
        name: "World Wide",
        value: "world-wide",
    },
    {
        name: "Japan",
        value: "japan",
    },
    {
        name: "Korea",
        value: "korea",
    },
    {
        name: "Thailand",
        value: "thailand",
    },
    {
        name: "Turkey",
        value: "turkey",
    },
    {
        name: "United Kingdom",
        value: "united-kingdom",
    },
    {
        name: "United States",
        value: "united-states",
    },
];

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

function limitString(string: string) {
    const limit: number = 27;
    let point = string.length > limit ? "..." : "";
    return string.substring(0, limit) + point;
  }

module.exports = {
    data: {
        name: "trend-image",
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

            const width = 500;
            const height = 850;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext("2d");

            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);

            context.font = "bold 37px twitter";
            context.textAlign = "left";
            context.fillStyle = "#0E140A";

            context.fillText(
                `World Wide ${time} trends`,
                26,
                77
            );

            context.font = "bold 16px Arial";
            context.textAlign = "center";
            context.fillStyle = "#9BA4AB";
            context.fillText("Generate By Twitter Report Bot", 250, 830);

            res.slice(0, 10).map((item, idx) => drawBody(idx, item));

            function drawBody(row: number, item: ResponseInterface) {
                context.font = "bold 24px twitter";
                context.textAlign = "left";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${row + 1}`, 26, 142 + 70 * row);

                context.font = "26px twitter";
                context.textAlign = "left";
                context.fillStyle = "#000000";
                context.fillText(`${limitString(item.hastag as string)}`, 60, 142 + 70 * row);

                context.font = "bold 16px twitter";
                context.textAlign = "left";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${item.record || "now"}`, 60, 165 + 70 * row);

                context.font = "bold 16px twitter";
                context.textAlign = "right";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${item.tweets}`, 480, 165 + 70 * row);
            }

            const attachment = new MessageAttachment(
                canvas.toBuffer(),
                "trend-image.png"
            );

            interaction.reply({ files: [attachment] });
        } else {
            let res = await getDataTrend.getCountry(
                country as string,
                time as TimeChoices
            );

            const width = 500;
            const height = 850;

            const canvas = createCanvas(width, height);
            const context = canvas.getContext("2d");

            context.fillStyle = "#FFFFFF";
            context.fillRect(0, 0, width, height);

            context.font = "bold 37px twitter";
            context.textAlign = "left";
            context.fillStyle = "#0E140A";

            context.fillText(
                `${
                    choicesCountry.filter((item) => item.value === country)[0]
                        .name
                } ${time} trends`,
                26,
                77
            );

            context.font = "bold 16px Arial";
            context.textAlign = "center";
            context.fillStyle = "#9BA4AB";
            context.fillText("Generate By Bot Twitter Report", 250, 830);

            res.slice(0, 10).map((item, idx) => drawBody(idx, item));

            function drawBody(row: number, item: ResponseInterface) {
                context.font = "bold 24px twitter";
                context.textAlign = "left";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${row + 1}`, 26, 142 + 70 * row);

                context.font = "26px twitter";
                context.textAlign = "left";
                context.fillStyle = "#000000";
                context.fillText(`${limitString(item.hastag as string)}`, 60, 142 + 70 * row);

                context.font = "bold 16px twitter";
                context.textAlign = "left";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${item.record || "now"}`, 60, 165 + 70 * row);

                context.font = "bold 16px twitter";
                context.textAlign = "right";
                context.fillStyle = "#9BA4AB";
                context.fillText(`${item.tweets}`, 480, 165 + 70 * row);
            }

            const attachment = new MessageAttachment(
                canvas.toBuffer(),
                "trend-image.png"
            );

            interaction.reply({ files: [attachment] });
        }
    },
};
