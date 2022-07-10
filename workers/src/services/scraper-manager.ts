import { NotFoundError, ScrapingData } from "@mistho-scraper/common";
import Scraper from "./scrapers/scraper";
import CheerioScraper from "./scrapers/cheerio-scraper";

export enum Scrapers {
  Cheerio,
  SomeOther,
}

class ScraperManager {
  scraper: Scraper;

  constructor(scraper: Scrapers, url: string) {
    switch (scraper) {
      case Scrapers.Cheerio:
        this.scraper = new CheerioScraper(url);
      default:
        throw new NotFoundError();
    }
  }

  async scrape(data: ScrapingData[]): Promise<ScrapingData[]> {
    return await this.scraper.scrape(data);
  }
}

export default ScraperManager;
