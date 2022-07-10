import { Listener, ScrapingStartEvent, Subjects } from "@mistho-scraper/common";
import { Message } from "node-nats-streaming";
import { natsWrapper } from "../../nats-wrapper";
import CheerioScraper from "../../services/cheerio-scraper";
import Scraper from "../../services/scraper";
import { ScrapingFinishedPublisher } from "../publishers/scraping-finished-publisher";
import { queueGroupName } from "./queue-group-name";

export class ScrapingStartListener extends Listener<ScrapingStartEvent> {
  readonly subject: Subjects.ScrapingStart = Subjects.ScrapingStart;
  queueGroupName = queueGroupName;

  async onMessage(data: ScrapingStartEvent["data"], msg: Message) {
    console.log(process.env.NATS_CLIENT_ID + " starting to scrape " + data.url);
    const scraper = new CheerioScraper(data.url);
    if (!(scraper instanceof Scraper)) {
      console.error("All scrapers should extend base Scraper class!");
    } else {
      const content = await scraper.scrape(data.content);

      new ScrapingFinishedPublisher(natsWrapper.client).publish({
        scrapingId: data.scrapingId,
        content,
      });
    }
    msg.ack();
  }
}
