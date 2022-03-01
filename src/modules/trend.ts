import * as cheerio from "cheerio";
import { TimeChoices } from "../enum/command/TimeChoices";
import axios from "axios";
import { CheerioAPI } from "cheerio";

export const getDataType1 = async (type: TimeChoices): Promise<Object> => {
  let { data } = await axios({
    method: "get",
    url: `https://getdaytrends.com/thailand/top/tweeted/${type}/`,
    headers: {
      authority: "getdaytrends.com",
      accept: "text/html, */*; q=0.01",
      "x-requested-with": "XMLHttpRequest",
      "sec-ch-ua-mobile": "?0",
      referer: `https://getdaytrends.com/thailand/top/tweeted/${type}/`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
    },
  });
  const $: CheerioAPI = cheerio.load(data);
  const result: Object =
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

  return result;
};

export const getDataType2 = async (type: TimeChoices): Promise<Object> => {
  let { data } = await axios({
    method: "get",
    url: `https://getdaytrends.com/thailand/`,
    headers: {
      "x-requested-with": "XMLHttpRequest",
      
    },
  });
  const $: CheerioAPI = cheerio.load(data);
  console.log(data);
  
  const result =
    Array.from(
      $(
        "table.table.table-hover.text-left.clickable.ranking.trends.wider.mb-0 > tbody > tr"
      )
    ).map((element) => ({
      index: Number.parseInt($(element).find("tr > th").text()),
      hastag: $(element).find("td.main > a").html(),
      tweets: $(element).find("td:nth-child(3)").html(),
      record: $(element).find("td:nth-child(4)").html(),
      link: `https://twitter.com/search?q=${encodeURIComponent(
        $(element).find("td.main > a").text()
      )}&src=trend_click&vertical=trends`,
    }));

  return result;
};
