import { ScrapingData } from "@mistho-scraper/common";

abstract class Scraper {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  abstract scrape(data: ScrapingData[]): Promise<ScrapingData[]>;
}

export default Scraper;
