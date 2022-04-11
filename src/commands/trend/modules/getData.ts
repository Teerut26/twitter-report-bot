import * as cheerio from "cheerio";
import axios, { AxiosResponse } from "axios";
import { CheerioAPI } from "cheerio";
import { TimeChoices } from "..";

interface ResponseInterface {
    index: number;
    hastag: string | null;
    tweets: string | null;
    record: string | null;
    link: string;
}

export default class GetDataTrend {
    private instance = axios.create({
        baseURL: "https://getdaytrends.com",
        headers: {
            authority: "getdaytrends.com",
            accept: "text/html, */*; q=0.01",
            "x-requested-with": "XMLHttpRequest",
            "sec-ch-ua-mobile": "?0",
            "user-agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
        },
    });

    public async getWorldwide(time: TimeChoices): Promise<ResponseInterface[]> {
        let result;

        if (time === "now") {
            let res = await this.instance.get(`/`);
            const $: CheerioAPI = cheerio.load(res.data);
            result =
                Array.from(
                    $(
                        "table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr"
                    )
                ).map((element) => ({
                    index: Number.parseInt($(element).find("tr > th").text()),
                    hastag: $(element).find("td.main > a").html(),
                    tweets: $(element).find("td.main > div.desc > span").text(),
                    record: null,
                    link: `https://twitter.com/search?q=${encodeURIComponent(
                        $(element).find("td.main > a").text()
                    )}&src=trend_click&vertical=trends`,
                })) || [];
        } else {
            let res = await this.instance.get(`/top/tweeted/${time}/`);
            const $: CheerioAPI = cheerio.load(res.data);
            result =
                Array.from(
                    $(
                        "body > div.inset > table.table.table-hover.text-left.clickable.ranking.top.mb-0 > tbody > tr"
                    )
                ).map((element) => ({
                    index: Number.parseInt($(element).find("tr > th").text()),
                    hastag: $(element).find("td.main > a").html(),
                    tweets: $(element).find("td:nth-child(3)").html(),
                    record: $(element).find("td:nth-child(4)").html(),
                    link: `https://twitter.com/search?q=${encodeURIComponent(
                        $(element).find("td.main > a").text()
                    )}&src=trend_click&vertical=trends`,
                })) || [];
        }

        return result;
    }

    public async getCountry(
        country: string,
        time: string
    ): Promise<ResponseInterface[]> {
        let result;

        if (time === "now") {
            let res = await this.instance.get(`/${country}`);
            const $: CheerioAPI = cheerio.load(res.data);
            result =
                Array.from(
                    $(
                        "table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr"
                    )
                ).map((element) => ({
                    index: Number.parseInt($(element).find("tr > th").text()),
                    hastag: $(element).find("td.main > a").html(),
                    tweets: $(element).find("td.main > div.desc > span").text(),
                    record: null,
                    link: `https://twitter.com/search?q=${encodeURIComponent(
                        $(element).find("td.main > a").text()
                    )}&src=trend_click&vertical=trends`,
                })) || [];
        } else {
            let res = await this.instance.get(
                `/${country}/top/tweeted/${time}/`
            );

            const $: CheerioAPI = cheerio.load(res.data);
            result =
                Array.from(
                    $(
                        "body > div.inset > table.table.table-hover.text-left.clickable.ranking.top.mb-0 > tbody > tr"
                    )
                ).map((element) => ({
                    index: Number.parseInt($(element).find("tr > th").text()),
                    hastag: $(element).find("td.main > a").html(),
                    tweets: $(element).find("td:nth-child(3)").html(),
                    record: $(element).find("td:nth-child(4)").html(),
                    link: `https://twitter.com/search?q=${encodeURIComponent(
                        $(element).find("td.main > a").text()
                    )}&src=trend_click&vertical=trends`,
                })) || [];
        }
        return result;
    }
}
