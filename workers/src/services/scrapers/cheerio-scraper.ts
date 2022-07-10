import { ScrapingData, ScrapingStatus } from "@mistho-scraper/common";
import axios from "axios";
import { load } from "cheerio";
import Scraper from "./scraper";

class CheerioScraper extends Scraper {
  async scrape(data: ScrapingData[]): Promise<ScrapingData[]> {
    const { data: htmlData } = await axios.get(this.url);
    const $ = load(htmlData);
    let status = ScrapingStatus.Success;
    return data.map((obj: ScrapingData) => {
      const value =
        $(obj.selector)?.text() || "error caused by " + obj.selector;
      if (value.includes("error")) status = ScrapingStatus.Fail;
      return {
        ...obj,
        value,
        status,
      } as ScrapingData;
    });
  }
}

export default CheerioScraper;
